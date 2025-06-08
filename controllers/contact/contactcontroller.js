const fs = require('fs').promises;
const path = require('path');

const nodemailer = require("nodemailer");

var ContactModule = require('../../module/contactmodule');



class ContactApi {

    
    async saveContactData(requestData) {

        try {			

            const contactData = new ContactModule(requestData);

            await contactData.save();

            return "Successfully Saved Contact Data";


        } catch (error) {

            return "Error saving Contact Data" ;

            
        }
    }




async  sendEmail(to,name,phone,message) {

try {
    // Adjust the path based on where your 'templates' directory is relative to your server's root

   const filePath = path.join(__dirname, '../..', 'public', 'templates', 'email.html');

    const html = await fs.readFile(filePath, 'utf8');

var resp =  html.replaceAll('{{Name}}',name).replace('{{Message}}',message).replace('{{Phone}}',phone).replace('{{Email}}',to);


    //console.log('File contents:' + html); // Log the content if needed (e.g., for debugging)
    
    // Send the content as a response or process further
    //res.send(data); // Sending the email HTML as the response (for demonstration)
  } catch (err) {
    console.error('Error reading the file:', err); // Log the error
    //res.status(500).send('Error reading the file'); // Send an error response to the client
  }


   
  try {
    
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: 'taxmanager.karan@gmail.com',
        pass: 'dcnzjjkmkvigkiur' 
      }
    });
const subject = 'Thanks For Contacting Us';


    const mailOptions = {
      from: 'taxmanager.karan@gmail.com',
      to,
      subject,
      html: resp,
      
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent Successfully');
    return info;
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
}






     

			



}

module.exports = ContactApi;