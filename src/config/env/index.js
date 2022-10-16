export default {
  geolocalization: {
    API_KEY: process.env.GEO_API_KEY,
    API_URL: process.env.GEO_API_URL,
  },
  map: {
    ZOOM: 14,
    tileLayer: {
      url: process.env.TILE_LAYER_URL,
      options: {
        accessToken: process.env.TILE_LAYER_ACCESS_TOKEN,
        id: process.env.TILE_LAYER_ID,
        attribution:
          '© <a href="https://www.mapbox.com/contribute/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1,
      },
    },
  },
};
