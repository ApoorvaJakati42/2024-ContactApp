const jwt = require("jsonwebtoken")

const auth = async (req , res , next) => {
    console.log("Auth Middleware Function");
    console.log("Request listened" , req.method , req.path );
    //Steps to create this function
    //1. Get token from header which is sent from frontend axios
    //2. Extract the stored id
    // 3. Fetch the user from db
    // 4.If found attach it to req or User context and call next()
    // 5. If not found res.send error
    // 6. Attach token to the user context

    try {
        const token = req.header('Authorization').replace('Bearer ' , '')
        const decode = jwt.verify(token , 'apoorvaJakati');
        //1.The decode will be having an id and using that fetch the admin user from db
        //2.If user is not found then send error 
        //3.If user is present then call next()
        //4.Store some values before calling next ex. req.user = user
    } catch (error) {
        res.status(401).send({ error : "Please Authenticate."})
    }
    next()
}

module.exports = auth