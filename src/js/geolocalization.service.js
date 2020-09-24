const fetch = require("node-fetch");

// INFORMACION DE LA API
const { apiKey, url } = require("./geolocalization.config");

// GET : Obtiene geolocalizacion por el ip proporcionado
async function getGeolocalizationByIp(ip) {
  try {
    let response = await fetch(`${url}?apiKey=${apiKey}&ipAddress=${ip}`);

    let result = await response.json();

    //validar ipv4 and ipv5
    if (result.messages) throw new Error("Debe entrar un ipv6 o ipv4");

    return result;
  } catch (error) {
    console.log(error.message);
  }
}

// GET : Obtiene mi ip
async function getMyGeolocalization() {
  try {
    let response = await fetch(`${url}?apiKey=${apiKey}`);

    let result = await response.json();

    return result;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  getMyGeolocalization,
  getGeolocalizationByIp,
};
