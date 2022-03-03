const bcryptjs = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      
      const { username, password } = req.body
      
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const loginUser = bcryptjs.compareSync(password, users[i].passHash)
          if(loginUser) {
            let userReturn = {...users[i]}
            delete userReturn.passHash
            return res.status(200).send(userReturn)
          }
        }
      }
      res.status(400).send("User not found.")
      // console.log('Logging In User')
    },
    register: (req, res) => {
        console.log('Registering User')

        const{username, email, firstName, lastName, password} = req.body
        
        const salt = bcryptjs.genSaltSync(5)

        const passHash = bcryptjs.hashSync(password, salt)

        const user = {
          username,
          email,
          firstName,
          lastName,
          passHash
       }
        users.push(user)
        let secureRegister = {...user}
        delete secureRegister.passHash
        res.status(200).send(secureRegister)
    }
}