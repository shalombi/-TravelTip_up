export const locService = {
    getLocs,
    addLocation
}
// locService.addLocation
// createdAt, updatedAt
let gId = 101
let gLocs = [{id:101,lat:34,lng:32,name:'home',createdAt:'18:45'}]

const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function addLocation(lat, lng, name) {
    console.log(lat, lng, name, 'lat,lng,name');
}
