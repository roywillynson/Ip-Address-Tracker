import "../css/style.css";

const {
  getMyGeolocalization,
  getGeolocalizationByIp,
} = require("./geolocalization.service");

const { changeMap, initMap } = require("./map");

/*****************************
 *      Event Listeners
 ****************************/

// inicio de la app
document.addEventListener("DOMContentLoaded", init);

// Configuracion inicial
async function init() {
  // Iniciar mapa
  await initGeolocalization();
  // Events Listeners
  let $formulario = document.getElementById("formulario");
  // Event Submit
  $formulario.addEventListener("submit", changeGeolocalization);
}

/********************************
 *      Funcionalidades
 *********************************/
async function initGeolocalization() {
  // Traer mi ip
  const {
    ip,
    location: { lat, lng, city, region, postalCode, timezone }, // Info de la location
    isp,
  } = await getMyGeolocalization();

  // Objeto informacion ip
  let geolocalization = {
    ip,
    location: `${city} ${region}, ${postalCode}`,
    timezone: `UTC ${timezone}`,
    isp,
  };

  // Configurar el mapa con mi geolocalizacion
  await initMap({ lat, lng }, 12);

  updateInfoGeolocalization(geolocalization);
}

async function changeGeolocalization(e) {
  e.preventDefault();
  // Obtener valor del input
  const searchIPOrDomain = document.getElementById("input-domain-ip").value;
  //Validar si esta vacio el campo
  if (!searchIPOrDomain) {
    console.log("Campo no puede estar vacio");
    return;
  }

  const newGeolocalization = await searchInfoGeolocalizationByIP(
    searchIPOrDomain
  );

  if (newGeolocalization) {
    await changeMap(newGeolocalization.ubicacion, 12);

    updateInfoGeolocalization(newGeolocalization);
  }
}

// Actualizar la informacion de geolocalizacion
function updateInfoGeolocalization(geolocalization) {
  // Destructuring de la geolocalizacion
  const { ip, location, timezone, isp } = geolocalization;
  // Reemplazar valores en pantalla
  document.querySelector(".ip-address").textContent = ip;
  document.querySelector(".location").textContent = location;
  document.querySelector(".timezone").textContent = timezone;
  document.querySelector(".isp").textContent = isp;
}

// Buscar geolocalizacion por ip
async function searchInfoGeolocalizationByIP(ipAddress) {
  //Obtener geolocalizacion
  const geolocalizacion = await getGeolocalizationByIp(ipAddress);

  //Validar si no encontro la geolozalizacion
  if (!geolocalizacion) return;

  const {
    ip,
    location: { lat, lng, city, region, postalCode, timezone }, // Info de la location
    isp,
  } = geolocalizacion;

  // Objeto informacion ip
  let newGeolocalization = {
    ip,
    location: `${city} ${region}, ${postalCode}`,
    timezone: `UTC ${timezone}`,
    isp,
    ubicacion: { lat, lng },
  };

  return newGeolocalization;
}
