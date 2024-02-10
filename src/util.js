export const getUser = () => {
  return JSON.parse(
    window.localStorage.getItem('loggedUser')
      ? window.localStorage.getItem('loggedUser')
      : window.sessionStorage.getItem('loggedUser'),
  )
}
