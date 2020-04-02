require("dotenv").config()
const axios = require("axios")
const sanity = require("@sanity/client")

const client = sanity({
  dataset: process.env.SANITY_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const API_KEY = process.env.GOOGLE_API_KEY

const delay = interval => new Promise(resolve => setTimeout(resolve, interval))

const geocodeAddress = async address => {
  const encodedAddress = encodeURIComponent(address)
  await delay(50) // avoid OVER_QUOTA errors from Google API

  const { results, status } = await axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`
    )
    .then(response => response.data)

  if (status !== "OK") throw new Error(`Something went wrong: ${status}`)

  switch (results.length) {
    case 0:
      throw new Error(`No results found for ${address}`)
    case 1:
      return results[0]
    default:
      console.warn(`Multiple results found for ${address}; using the first.`)
      return results[0]
  }
}

const execute = () => {
  migrate(
    {
      conditions: [
        "_type == 'restaurant'",
        "!(_id in path('drafts.**'))",
        "defined(locations)",
        "defined(locations[].address)",
        "count(locations[!defined(geoLocation)]) > 0",
      ],
      fields: [
        "'name': title",
        "locations[!defined(geoLocation)] { _key, address }",
      ],
      limit: 10, // avoid OVER_QUOTA errors from Google
    },
    async ({ name, locations }) => {
      const patches = await Promise.all(
        locations.map(async loc => {
          const geoData = await geocodeAddress(loc.address)
          if (!geoData) return null
          return [
            [
              `locations..[_key == "${loc._key}"].rawGeodata`,
              JSON.stringify(geoData),
            ],
            [
              `locations..[_key == "${loc._key}"].address`,
              geoData.formatted_address,
            ],
            [
              `locations..[_key == "${loc._key}"].geoLocation`,
              {
                _type: "geopoint",
                ...geoData.geometry.location,
              },
            ],
          ]
        })
      )

      return {
        _operation: "patch",
        props: {
          set: patches
            .flat()
            .filter(x => x)
            .reduce((acc, [k, v] = []) => {
              if (!k) return acc
              acc[k] = v
              return acc
            }, {}),
        },
      }
    }
  )
}

const fetchDocuments = ({ conditions, fields = [], limit = 100 }) =>
  client.fetch(
    `*[${conditions.join(" && ")}][0...${limit}] {
      _id,
      _rev,
      ${fields.join(", ")}
    }`
  )

const createTransaction = operations =>
  operations.reduce((tx, [{ _operation, props }, doc]) => {
    switch (_operation) {
      case "create":
        return tx.create(props)
      case "delete":
        return tx.delete(doc._id)
      case "patch":
        props.ifRevisionID = doc._rev
        return tx.patch(doc._id, props)
      // TODO: Add additional operation types as needed

      default:
        return tx
    }
  }, client.transaction())

const commitTransaction = tx => tx.commit()

const migrateBatch = async (
  fetchParams,
  buildOperation,
  options = { singleRun: false }
) => {
  const documents = await fetchDocuments(fetchParams)

  const operations = await Promise.all(
    documents.map(async doc => [await buildOperation(doc), doc])
  ).catch(err => {
    throw err
  })

  if (operations.length === 0) {
    console.log("No more documents to migrate!")
    return null
  }
  console.log(
    `Migrating batch:\n %s`,
    operations
      .map(
        ([op, doc]) =>
          `${op._operation} ${doc._id} => ${JSON.stringify(op.props)}`
      )
      .join("\n")
  )

  const transaction = createTransaction(operations)
  await commitTransaction(transaction)

  if (!options.singleRun) {
    return migrateBatch(fetchParams, buildOperation)
  }
}

const migrate = (fetchParams, buildPatch) => {
  migrateBatch(fetchParams, buildPatch).catch(err => {
    console.error(err)
    process.exit(1)
  })
}

execute()
