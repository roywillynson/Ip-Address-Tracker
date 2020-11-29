// Configuracion
const { attribution, accessToken, id } = require("./config/map.config");

// Varibles
const map = new L.Map("mapa", { zoomControl: false });
const marker = new L.Marker([0, 0]);
// Marcador en el mapa
const customIcon = new L.Icon({
  iconUrl: "https://www.flaticon.com/svg/static/icons/svg/252/252025.svg",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

//Lat = latitude, lng = Longitud
function initMap({ lat = 0, lng = 0 } = {}, zoom) {
  // Mostrar mapa
  const layer = new L.TileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution,
      maxZoom: 18,
      id,
      tileSize: 512,
      zoomOffset: -1,
      accessToken,
    }
  );

  // Modificar coordenada
  map.setView([lat, lng], zoom);
  map.addLayer(layer);

  const latlng = new L.LatLng(lat, lng);

  //Marcador
  marker.setIcon(customIcon);
  marker.setLatLng(latlng);

  marker.addTo(map);
}

//Lat = latitude, lng = Longitud
function changeMap({ lat, lng } = {}, zoom) {
  if (!lat || !lng) return;

  // Modificar coordenada
  map.setView([lat, lng], zoom);

  // Marcador en el mapa
  const latlng = new L.LatLng(lat, lng);
  marker.setLatLng(latlng);
}

module.exports = {
  changeMap,
  initMap,
};
