const express = require('express')
const { JSDOM } = require('jsdom');
var bodyParser = require('body-parser');
var cors = require('cors')

const port = parseInt(process.env.PORT, 10);

const app = express()
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "test.wikipedia.org"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});


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
