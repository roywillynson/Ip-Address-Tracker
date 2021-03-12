/* const { ip, location, isp } = geolocalizacion;

 const { lat, lng, city, region, postalCode, timezone } = location; // Info de la location

 // Objeto informacion ip
 let newGeolocalization = {
   ip,
   location: `${city} ${region}, ${postalCode}`,
   timezone: `UTC ${timezone}`,
   isp,
   ubicacion: { lat, lng },
 };
*/

class Geolocalization {
  constructor(ip, location, isp) {
    this.ip = ip;
    this.location = location;
    this.isp = isp;
  }

  // Get coordenadas {latitud, longitud}
  getCoordenada() {
    const { lat, lng } = this.location;
    return { lat, lng };
  }
  // Get location in string
  getLocationString() {
    const { city, region, postalCode } = this.location;
    return `${city} ${region}, ${postalCode}`;
  }

  // Get location object
  getLocation() {
    return this.location;
  }

  // Get ip
  getIp() {
    return this.ip;
  }

  // Get timezone
  getTimeZone() {
    return this.location.timezone;
  }

  // Get timezone string
  getTimeZoneString() {
    return `UTC ${this.location.timezone}`;
  }

  // Get isp
  getISP() {
    return this.isp;
  }
}

module.exports = Geolocalization;
