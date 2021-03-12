import "./css/style.css";

const {
  getMyGeolocalization,
  getGeolocalizationByIp,
} = require("./services/geolocalization.service");
const Geocalicalization = require("./models/geolocalization.model");

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

// Obtener mi geolocalizacion y mostrarla en el inicio de la app
async function initGeolocalization() {
  // Traer mi ip
  const geolocalization = await getMyGeolocalization();

  // destructuring
  const { ip, location, isp } = geolocalization;

  // Objeto informacion de la ip
  const newGeolocalization = new Geocalicalization(ip, location, isp);

  // Configurar el mapa con mi geolocalizacion
  await initMap(newGeolocalization.getCoordenada());

  updateInfoGeolocalization(newGeolocalization);
}

// Cambiar geolocalizacion a otra
async function changeGeolocalization(e) {
  e.preventDefault();
  // Obtener valor del input
  const searchIPOrDomain = document.getElementById("input-domain-ip").value;

  //Validar si esta vacio el campo
  if (!searchIPOrDomain) {
    alert("Campo no puede estar vacio");
    return;
  }

  const newGeolocalization = await searchInfoGeolocalizationByIP(
    searchIPOrDomain
  );

  await changeMap(newGeolocalization.getCoordenada());

  updateInfoGeolocalization(newGeolocalization);
}

// Actualizar la informacion de geolocalizacion
function updateInfoGeolocalization(geolocalization) {
  // Reemplazar valores en pantalla

  document.querySelector(".location").textContent =
    geolocalization?.getLocationString() || "Ninguna";

  document.querySelector(".timezone").textContent =
    geolocalization?.getTimeZoneString() || "Ninguna";

  document.querySelector(".isp").textContent =
    geolocalization?.getISP() || "Ninguna";
  document.querySelector(".ip-address").textContent =
    geolocalization?.getIp() || "Ninguna";
}

// Buscar geolocalizacion por ip
async function searchInfoGeolocalizationByIP(ipAddress = "") {
  //Obtener geolocalizacion
  const { ip, location, isp } = await getGeolocalizationByIp(ipAddress);

  const geolocalization = new Geocalicalization(ip, location, isp);

  return geolocalization;
}
