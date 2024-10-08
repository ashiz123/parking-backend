

const register = (req, res, next) => {
    res.send('register')
}


const login = (req, res, next) => {
    res.send('login')
}


module.exports = {register, login}