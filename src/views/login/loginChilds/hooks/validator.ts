export const checkUsername = (username: string): boolean => {
  //以字母开头,一种以上，长度为6-18
  const reg = /^[a-zA-Z]{1,1}\w{5,17}$/
  return reg.test(username)
}

export const checkPassword = (password: string): boolean => {
  const reg = /^[a-zA-Z]{1,1}\w{5,17}/
  const regn = /[0-9]/
  return reg.test(password) && regn.test(password)
}
