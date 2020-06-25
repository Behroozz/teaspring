const getHeaders = (authToken) => {
  return {
    headers: {
      "Auth-Token": authToken,
      "Content-Type": "application/json"
    }
  }
}

module.exports = {
  getHeaders
}