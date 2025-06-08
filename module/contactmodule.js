const mongoose = require('mongoose');


const ContactSchema = new mongoose.Schema({
    

FullName: String,
Email: String,
Phone: String,
Message: String,
createdAt: {
    type: Date,
    default: Date.now 
  }

});


module.exports = mongoose.model('contacts', ContactSchema);