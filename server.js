const express = require('express')
const { JSDOM } = require('jsdom');
var bodyParser = require('body-parser');
var cors = require('cors')

const port = 3000

const app = express()
app.use(bodyParser.json())
app.use(cors()) 


// app.get('/get', (req, res) => {
//     res.status(200);
//     res.send('Hello World!')
// })

app.post('/post', async (req, res) => {
  const { linkValue, quoteValue } = req.body;
  try {
    fetch(linkValue)
    .then(res => res.text())
    .then((html) => {
      const { document } = (new JSDOM(html)).window;
      const isParagraphTextOnPage =  document.body.textContent.includes( quoteValue )
      res.send({isParagraphTextOnPage})
    }); 
  } catch (error) {
    console.log(error)
    res.send('failure')
  } 
})








app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})