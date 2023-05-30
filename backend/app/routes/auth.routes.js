const {verifySignUp} = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports =  function(app){
    //console.log(app);
    app.use(function (req, res, next){
        res.header(
            "Access-Controller-Allow-Headers",
            "x-access-token, Origin, Content-type, Accept"
        );
        next();
    });
    
    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDubplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );
    app.post("/api/auth/signin", controller.signin);
};