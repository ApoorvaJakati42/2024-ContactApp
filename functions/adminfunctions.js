const jwt = require("jsonwebtoken")

const generateAuthToken = (email) => {
    const token = jwt.sign({ email } , "apoorvaJakati"  , {
      expiresIn : "5 seconds"
    })
   // console.log("Jwt generated token ",token);
    return token;

    // const payload = jwt.verify(token , "apoorvaJakati");
    // console.log("Jwt verify ",payload);
}

module.exports = generateAuthToken