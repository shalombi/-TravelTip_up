export const storageService = {
  load: loadLocs,
  save: saveLocs,
}

function loadLocs(key) {
  var val = localStorage.getItem(key)
  return JSON.parse(val)
}

function saveLocs(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}
