const fetch = require('node-fetch');
const { exec } = require('node:child_process')

fetch('localhost:3000/ping').then(function(response){
    if(!response.ok){
        exec('-e "Subject: Test message subject\n\nTest message" | /usr/sbin/exim -odf -i tools.edit-wizard@toolforge.org', (err, output) => {})
    }
})