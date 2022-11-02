export const locService = {
    getLocs,
    addLocation,
    deleteLocation
}

import { mapService } from './map.service.js'






// TODO:  export gLocs to loc.serveries.js

import { storageService } from './storage.service.js'
import { utilsService } from './utils.service.js'

const LOCS_KEY = 'locsDB'

let gId = 103
let gLocs = _loadLocs() || []

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs)
        }, 2000)
    })
}

function addLocation(lat, lng, name) {
    //create a new location
    const loc = _createLoc(lat, lng, name)
    //add new location to gLocs
    gLocs.push(loc)
    //save to storage
    _saveLocs()
}


function deleteLocation(idx) {
    const deletedLoc = gLocs.splice(idx, 1)
    console.log('deletedLoc', deletedLoc);
    _saveLocs()
}

function _createLoc(lat, lng, name) {
    return {
        id: gId++,
        name,
        lat,
        lng,
        createdAt: utilsService.formatDate(new Date()),
    }
}

function _loadLocs() {
    return storageService.load(LOCS_KEY)
}

function _saveLocs() {
    storageService.save(LOCS_KEY, gLocs)
}
//


