export const locService = {
    getLocs,
    addLocation,
}

import { mapService } from './map.service.js'
// mapService.panTo

// import { generalControllerFunc } from '../app.controller.js'
// generalControllerFunc.initMap
// console.log(generalControllerFunc.initMap());
// panTo(lat, lng)
// console.log(mapService.panTo);



window.deleteLocation = deleteLocation
window.goLocation = goLocation

// locService.addLocation
// createdAt, updatedAt

let gId = 101

// TODO:  export gLocs to loc.serveries.js
// let gLocs = [
//     { id: 101, lat: 34, lng: 32, name: 'home1', createdAt: '18:45' },
//     { id: 102, lat: 35, lng: 33, name: 'home2', createdAt: '18:50' },
//     { id: 103, lat: 36, lng: 34, name: 'home3', createdAt: '18:55' }
// ]

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

function deleteLocation(elBtn) {
    console.log('deleteLocation');
    console.log(elBtn.value, 'elBtn');
}
function goLocation(elBtn, elBtn2) {
    // console.log(elBtn);
    // const loc = elBtn.value
    console.log('goLocation');
    console.log(elBtn, elBtn2);
    // console.log(lat, lng, '----');
    // mapService.panTo(locationCoords.lat, locationCoords.lng)
    // lng
    mapService.panTo(30, 32)

}