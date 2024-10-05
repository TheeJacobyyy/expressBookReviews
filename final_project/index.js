const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))


app.use("/customer/auth/*", function auth(req, res, next) {
    
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send("Authorization token is required.");
    }

    
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send("Token not found.");
    }

    
    verifyToken(token, function(err, user) {
        if (err) {
            return res.status(403).send("Invalid token.");
        }
        
        
        req.user = user;
        next(); 
    });



function verifyToken(token, callback) {
    
    
   
    const mockUser = { id: 1, name: "John Doe" }; 
    callback(null, mockUser); 
}

});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
