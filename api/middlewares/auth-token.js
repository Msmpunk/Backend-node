
const jwt = require('jsonwebtoken'),
      SEED = require('../config/config').SEED;


exports.authToken = async (req, res ,next) => {
  try{

    const token = req.query.token;

    const result = await jwt.verify(token, SEED, (err, decoded) => {

      console.log(err)

      if (err) {
        return res.status(401).json({
          ok: false,
          message: 'invalid token',
          error: err
        });
      }

      req.user = decoded.user;
      next();


    });

    return result;


  }catch(e){
    return res.status(500).json({error: 'There is a problem in the server'})
  }
};