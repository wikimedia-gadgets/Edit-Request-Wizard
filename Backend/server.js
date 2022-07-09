const express = require('express')
const { JSDOM } = require('jsdom');
var bodyParser = require('body-parser');
var cors = require('cors')

const port = parseInt(process.env.PORT, 10);

const app = express()
app.use(bodyParser.json())
app.use(cors()) 


app.post('/api/v1/verifyQuote', async (req, res) => {
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