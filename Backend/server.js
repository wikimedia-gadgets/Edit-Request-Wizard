const express = require('express');
const { JSDOM } = require('jsdom');
const fetch = require('node-fetch');
const got = require('got');
// const QuickLRU = require('quick-lru');
var bodyParser = require('body-parser');
var cors = require('cors');

const port = parseInt(process.env.PORT, 10);
// const port = 3000;

// const lru = new QuickLRU({maxSize: 1000});

const app = express();
app.use(bodyParser.json());
app.use(cors());

//To check if the service is running
app.get('/ping', function(req, res) {
  res.send('pong')
})

//API to verify source
app.post('/api/v1/verifySource', async (req, res) => {
  const linkValue = req.body;
  const url = new URL(linkValue.linkValue);
  var flag = false;
  var comment = "";
  var kind = "";
  try {
    got( "https://en.wikipedia.org/w/index.php?title=Wikipedia:TESTING-DONT-USE-unreliable.json&action=raw", { cache: lru }).json()
    .then((json) => {
      (json).forEach(element => {
        const Origins = element.list;
        if(typeof Origins == "undefined"){
          return;
        }
        if (Origins.some(origin => url.origin.includes(origin))) {
          comment = element.comment;
          kind = element.kind;
          flag = true;
          // res.header("Cache-Control", "max-age=60, stale-while-revalidate=86400")
          res.send({ comment, flag, kind })
        }
      });
      if(!flag){
        res.send({comment, flag, kind});
      }
    }); 
  } 
  catch (error) {
    console.log(error)
    res.send('failure')
    res.sendStatus(404);
  } 
})



// API to verify the quote if it comes from source
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
    res.sendStatus(404);
  } 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})