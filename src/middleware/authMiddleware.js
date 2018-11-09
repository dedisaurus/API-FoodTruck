import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

const TOKENTIME = 60*60*24*30; // 30 days (2592000)
const SECRET = "w3 Hav3 th3 kn0w";

let authenticate = expressJwt({ secret: SECRET});
let generateAccessToken = (req, res, next) =>{
    req.token= req.token ||{}; //req.token value nya ambil yg udah ada atau kosong.
    req.token = jwt.sign({
        id:req.user.id,
    }, SECRET, {
        expiresIn: TOKENTIME //30days
    } );
    next(); // and then once this is done it is going to call next and let it go to the handlers
};

let respond = (req, res) =>{
    res.status(200).json({
        user : req.user.username,
        token: req.token
    });
};

module.exports = {
    authenticate, generateAccessToken, respond
};