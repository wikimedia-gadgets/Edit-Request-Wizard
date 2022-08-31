const fetch = require('node-fetch');
// const { exec } = require('child_process')
const nodemailer = require("nodemailer");

// fetch('https://edit-wizard.toolforge.org/ping').then(function(response){
//     const statusCode = response.status;
//     const statusText = response.statusText;
//     if(!response.ok){
//         exec(`echo "Edit Request Wizard service is not running. You are requested to look into it as soon as possible.\nStatus Code : ${statusCode} \nStatus Text : ${statusText}" | /usr/bin/mail -s "Edit-Wizard server not running" tools.edit-wizard@toolforge.org`, (err, output) => {})
//     }
// })

fetch('https://edit-wizard.toolforge.org/ping').then(function(response){
    const statusCode = response.status;
    const statusText = response.statusText;
    if(!response.ok){
        let transporter = nodemailer.createTransport({ host: "mail.tools.wmflabs.org" });
        transporter.sendMail({
            from: "ankitguptabhabha@gmail.com", // sender address
            to: "ankitguptabhabha@gmail.com", // list of receivers
            subject: "Edit Request Wizard service is not running", // Subject line
            text: `Edit Request Wizard service is not running. You are requested to look into it as soon as possible.\nStatus Code : ${statusCode} \nStatus Text : ${statusText}`, // plain text body
            // html: "<b>Hello world?</b>", // html body
          });
    }
})

