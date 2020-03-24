// TODO: Check the total length of the penultimate and
// ultimate words; opt not to join if too long.
const preventWidows = str =>
  str.includes(" ")
    ? str.slice(0, str.lastIndexOf(" ")) +
      " " +
      str.slice(str.lastIndexOf(" ") + 1)
    : str

export default preventWidows
