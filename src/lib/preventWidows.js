const preventWidows = str =>
  str.includes(" ")
    ? str.slice(0, str.lastIndexOf(" ")) +
      " " +
      str.slice(str.lastIndexOf(" ") + 1)
    : str

export default preventWidows
