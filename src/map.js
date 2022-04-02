// Configuracion
const config = require("./config/env.config");

// Varibles
const map = new L.Map("mapa", { zoomControl: false });
const marker = new L.Marker([0, 0]);
// Marcador en el mapa
const customIcon = new L.Icon({
  iconUrl: "/images/icon-marker.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

//Lat = latitude, lng = Longitud
function initMap({ lat = 0, lng = 0 } = {}) {
  const latlng = new L.LatLng(lat, lng);
  // Mostrar mapa
  const layer = new L.TileLayer(config.map.tileLayer.url, {
    ...config.map.tileLayer.options,
  });

  // Modificar coordenada
  map.setView(latlng, config.map.ZOOM);
  map.addLayer(layer);

  //Marcador
  marker.setIcon(customIcon);
  marker.setLatLng(latlng);

  marker.addTo(map);
}

//Lat = latitude, lng = Longitud
function changeMap({ lat, lng } = {}) {
  if (!lat || !lng) return;

  const latlng = new L.LatLng(lat, lng);

  // Modificar coordenada
  map.setView(latlng, config.map.ZOOM);

  // Marcador en el mapa
  marker.setLatLng(latlng);
}

module.exports = {
  changeMap,
  initMap,
};
