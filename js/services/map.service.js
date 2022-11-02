export const mapService = {
    initMap,
    addMarker,
    panTo
}


// Var that is used throughout this Module (not global)
var gMap

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
            renderMarks()
            console.log('Map!', gMap)
        })
}

function addMarker(loc) {
    const lat = loc.latLng.lat()
    const lng = loc.latLng.lng()

    var marker = new google.maps.Marker({
        position: { lat, lng },
        map: gMap,
        icon: 'icons8-round-pushpin-48.png',
        title: 'Hello World!'
    })
    console.log('marker',marker);
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyA-1aMyp3nQr5PbdGaMQo6FTXCj5fupAvU'
    // const API_KEY = '' //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}