export const mapService = {
    initMap,
    addMarker,
    panTo,
    showUserLoc,
    goLocation
}

// 
import { locService } from './loc.service.js'
import { renderFunc } from '../app.controller.js'

// renderFunc.renderLocations()
// Var that is used throughout this Module (not global)
var gMap, infoWindow

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            gMap.addListener('click', addMarker)
            renderFunc.renderLocations()
            console.log('Map!', gMap)
        })
}

function addMarker(loc) {
    const lat = loc.latLng.lat()
    const lng = loc.latLng.lng()
    const name = 'home'

    const marker = new google.maps.Marker({
        position: { lat, lng },
        map: gMap,
        icon: 'icons8-round-pushpin-48.png',
        title: 'Hello World!',
    })
    locService.addLocation(lat, lng, name)
    console.log('marker', marker)
    //
    renderFunc.renderLocations()
    return marker
}

function showUserLoc() {
    const locationButton = document.createElement('button')

    locationButton.textContent = 'Pan to Current Location'
    locationButton.classList.add('custom-map-control-button')
    gMap.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }
                gMap.setCenter(pos)
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter())
            }
        )
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter())
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos)
    infoWindow.setContent(
        browserHasGeolocation
            ? 'Error: The Geolocation service failed.'
            : "Error: Your browser doesn't support geolocation."
    )
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'X need enter api key 🔑 X'
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


function goLocation(idx) {
    locService.getLocs().then(locations => {
        const { lat } = locations[idx]
        const { lng } = locations[idx]
        mapService.panTo(lat, lng)
    })


}
