export const getUser = () => {
  return JSON.parse(
    window.localStorage.getItem('loggedUser')
      ? console.log('xdd')
      : window.sessionStorage.getItem('loggedUser'),
  )
}
