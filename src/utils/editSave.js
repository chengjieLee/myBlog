export const saveEdited = (content) => {
  window.localStorage.setItem('edited', content)
}

export const getEdited = () => {
  let res = window.localStorage.getItem('edited')!=='undefined' ? window.localStorage.getItem('edited') : undefined
  return res
}
