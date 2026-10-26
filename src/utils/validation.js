let nameRe = /^[a-z ,.'-]+$/i
let emailRe = /^\w{2,30}@\w{2,20}\.\w{2,20}$/i
let phoneRe = /^(\+\d{2})?\d{11,16}$/
let UrlRe =
  /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/

function validateFieldform(input, regx) {
  return regx.test(input)
}

export { nameRe, emailRe, phoneRe, UrlRe, validateFieldform }
