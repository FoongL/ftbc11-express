const jwt = require('jsonwebtoken')

const jwtAuth = (req,res,next) =>{
    const token = req.headers.authorization.split(' ')[1]
    try{
        const verifiedToken = jwt.verify(token, 'mySuperDuperSecret')
        console.log(verifiedToken)
    } catch(err){
        return res.status(403).json({success: false, msg: 'invalid token'})
    }

    next()
}

module.exports = jwtAuth