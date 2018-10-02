import bcrypt from 'bcryptjs'
export function hasPassword (value) {
  return new Promise((resolve, reject) => {
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(value, salt)
    console.log(hash)
    resolve(hash)
  })
}
