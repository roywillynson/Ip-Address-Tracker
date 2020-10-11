const axios = require("axios").default;

// INFORMACION DE LA API
const { apiKey, url } = require("./geolocalization.config");

// GET : Obtiene geolocalizacion por el ip proporcionado
async function getGeolocalizationByIp(ip) {
  try {
    let response = await axios.get(`${url}?apiKey=${apiKey}&ipAddress=${ip}`);

    //validar ipv4 and ipv5
    if (response.data.messages) throw new Error("Debe entrar un ipv6 o ipv4");

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

// GET : Obtiene mi ip
async function getMyGeolocalization() {
  try {
    let response = await axios.get(`${url}?apiKey=${apiKey}`);

    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  getMyGeolocalization,
  getGeolocalizationByIp,
};
