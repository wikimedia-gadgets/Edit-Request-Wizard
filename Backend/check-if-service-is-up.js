const fetch = require('node-fetch');
const { exec } = require('child_process')

fetch('https://edit-wizard.toolforge.org/ping').then(function(response){
    const statusCode = response.statusCode;
    const statusText = response.statusText;
    if(!response.ok){
        exec(`echo "Edit Request Wizard service is not running. You are requested to look into it as soon as possible.\nStatus Code : ${statusCode} \nStatus Text : ${statusText}" | /usr/bin/mail -s "Edit-Wizard server not running" tools.edit-wizard@toolforge.org`, (err, output) => {})
    }
})