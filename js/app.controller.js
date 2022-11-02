import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

export const renderFunc = { renderLocations }

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onShowUserLoc = onShowUserLoc
window.onDeleteLocation = onDeleteLocation
window.onGoLocation = onGoLocation


function onInit() {
    mapService
        .initMap()
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
    locService.getLocs().then((locs) => {
        console.log('Locations:', locs)
        document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
    })
}

function onGetUserPos() {
    getPosition()
        .then((pos) => {
            console.log('User position is:', pos.coords)
            document.querySelector(
                '.user-pos'
            ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch((err) => {
            console.log('err!!!', err)
        })
}
function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}

function onShowUserLoc() {

    mapService.showUserLoc()
}

function renderLocations() {
    console.log('renderLocations');

    let strHTML = `<tbody>`
    const elTableContainer = document.querySelector('.location-table-container table')
    const locations = locService.getLocs().then(locations => {

        locations.forEach((loc, idx) => strHTML += (
            `
            <tr>
              <td><button value = "${idx}" onclick="onDeleteLocation(this.value)">Delete</button></td>
              <td><button value = ${idx} onclick="onGoLocation(this.value)">Go</button></td> 
              <td> id:\t ${locations[idx].id}, lat:\t ${locations[idx].lat}, lng:\t ${locations[idx].lng}, name: ${locations[idx].name}, createdAt: ${locations[idx].createdAt} \n </td>
            </tr>
            `
        ))
        strHTML += `</tbody>`
        elTableContainer.innerHTML = strHTML

    })

}

function onDeleteLocation(idx) {
    locService.deleteLocation(idx)
    renderLocations()
}

function onGoLocation(idx) {
    mapService.goLocation(idx)
}


    //TODO : SEND OBJECT AS A PARAMETER // AT <td><button value =  onclick="goLocation(this)">Go</button></td> 