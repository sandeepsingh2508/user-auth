const jwt = require("jsonwebtoken")
const branchDB = require('../models/branchModel');
const  response  = require("./response");
require('dotenv').config();

const isAuthorized = async (req, res, next) => {
    const token = req.headers.Authorization || req.headers.authorization;
    let decoded;
    if (!token) {
        return response.validationError(res,"Unauthorized")
    //   return next(createError.Unauthorized("Unauthorized"));
    }
    try {
      decoded = jwt.verify(token, process.env.JWTSECRET);
      const branch = await branchDB.findOne({ _id: decoded.id });
      if (!branch) {
        return response.notFoundError(res,"No branch found")
      }

      req.branch = branch;
      req.decoded = decoded;
      return next();
    } catch (err) {
      console.log("error", err)
      response.internalServerError(res,err.message||"Internal server error")
    }
  };
  module.exports= isAuthorized;
  
