// Express Rout module import 
var express = require('express');
var router = express.Router();
const validator = require('validator');

// File and Functions import
const { getogdataFromJson, getogdataFromDatabase } = require('../helper/OgData.js');

// File canvert in object

const contactinfo = require('../controllers/contact/contactcontroller.js')
const contacthandler = new contactinfo();

router.get("/", async (req, res) => {

    res.render("../views/main/index"); 
});


router.get("/faqs", async (req, res) => {

    res.render("../views/main/faqs"); 
});


router.get("/contact", async (req, res) => {


    res.render("../views/main/contact",{cmail:"",fdata:''}); 
});


router.get("/viewmore", async (req, res) => {

    res.render("../views/main/viewmore"); 
});


router.get("/contactform", async (req, res) => {

var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

console.log(fullUrl);


res.render("../views/main/contact",{cmail:"",fdata:''}); 
});

router.post("/contactform", async (req, res) => {


const formData = JSON.parse(req.body.fdata);

const email = formData.Email;


if (validator.isEmail(email)) {
  console.log("Valid email");
} else {


console.log("Invalid email");
res.render("../views/main/contact",{cmail:"Invalid Email",fdata:formData});

return false;

}


///database
const contactdata = await contacthandler.saveContactData(formData) ;

//Email 
const maildata = await contacthandler.sendEmail(formData.Email,formData.FullName, formData.Phone,formData.Message) ;

res.redirect("/contact");
    //res.render("../views/main/contact",{cmail:"",fdata:''}); 
});



// Home Pages 
router.get(["/"], async (req, res) => {
    try {
        // Param Get Pages Meta Data
        //var ogdata = await getogdataFromDatabase("CredManager");

        // Render form view
        return res.status(200).render("../views/main/index.ejs", {
            tagdata: "Home"
        });

    } catch (error) {
        // Redirect to another error page 
        req.flash('Request AuthenticatedsRoutes For login', error);
        return res.status(500).redirect("/error_404");
    }
});






// Export the Rout Functions
module.exports = router;