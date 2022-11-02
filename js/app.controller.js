import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

export const renderFunc = { renderLocations }
// export const generalControllerFunc = { initMap }
// generalControllerFunc.initMap
// renderFunc.renderLocations

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onGetUserPos = onGetUserPos

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}


///////////////

let gLocs = [
    { id: 101, lat: 34, lng: 32, name: 'home1', createdAt: '18:45' },
    { id: 102, lat: 35, lng: 33, name: 'home2', createdAt: '18:50' },
    { id: 103, lat: 36, lng: 34, name: 'home3', createdAt: '18:55' }
]

function getGlocations() {
    return gLocs
}

function renderLocations() {
    console.log('renderLocations');
    // console.log('gLocs', gLocs);
    const locations = getGlocations()
    console.log();
    const elTableContainer = document.querySelector('.location-table-container table')
    let strHTML = `<tbody>`
    // console.log('locations',locations);
    // button
    //TODO : SEND OBJECT AS A PARAMETER // AT <td><button value =  onclick="goLocation(this)">Go</button></td> 
    locations.forEach((loc, idx) => strHTML += (
        `
      <tr>
        <td><button value = "${locations[idx].id}" onclick="deleteLocation(this)">Delete</button></td>
        <td><button value =  onclick="goLocation(this)">Go</button></td> 
        <td> id:\t ${locations[idx].id}, lat:\t ${locations[idx].lat}, lng:\t ${locations[idx].lng}, name: ${locations[idx].name}, createdAt: ${locations[idx].createdAt} \n </td>
      </tr>
    `
    ))
    strHTML += `</tbody>`
    // {id: 101, lat: 34, lng: 32, name: 'home1', createdAt: '18:45'}
    elTableContainer.innerHTML = strHTML
    // lat: 36, lng: 34
}


// function goLocation() {
//     console.log('go location');
// }