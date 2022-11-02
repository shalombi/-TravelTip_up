export const utilsService = {
  formatDate,
}

function formatDate(time) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }

  return new Intl.DateTimeFormat('en', options).format(time)
}
