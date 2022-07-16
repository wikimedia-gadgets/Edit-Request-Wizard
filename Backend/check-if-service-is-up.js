const fetch = require('node-fetch');
const { exec } = require('child_process')

fetch('https://edit-wizard.toolforge.org/ping').then(function(response){
    if(!response.ok){
        exec('echo "Edit-Wizard server not running" | /usr/bin/mail -s "Edit Request Wizard service is not running. You are requested to look into it as soon as possible" tools.edit-wizard@toolforge.org', (err, output) => {})
    }
})