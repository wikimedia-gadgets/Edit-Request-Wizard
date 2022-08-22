const express = require('express');
const { JSDOM } = require('jsdom');
const fetch = require('node-fetch');
const morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

const port = parseInt(process.env.PORT || '3000', 10);
// const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));

//To check if the service is running
app.get('/ping', function(req, res) {
  res.send('pong')
})

//Caching the JSON
var data;
const json_url = "https://en.wikipedia.org/w/index.php?title=Wikipedia:TESTING-DONT-USE-unreliable.json&action=raw";
function updateData() { data = fetch(json_url).then((response) => response.json()); }
updateData();
setInterval(updateData, 1000 * 60 * 60 * 12);


// API to verify source
app.post('/api/v1/verifySource', async (req, res) => {
  const linkValue = req.body;

  const BreakError = {};
  var flag = 0;
  var comment = "";
  var kind = "";
  try{
    var url = new URL(linkValue.linkValue);
    try {
      data.then(function(json){
        try{
        (json).forEach(element => {
          const Origins = element.list;
          var regex = element.regex;
          var re = new RegExp('\\b(?:' + regex + ')\\b');
          if(element.list != null){
            if (Origins.some(origin => url.origin.includes(origin))) {
              comment = element.comment;
              kind = element.kind;
              flag = 1;
              res.send({ comment, flag, kind });
              throw BreakError;
            }
          }
          if(element.regex!=null){
            if(re.test(url)){
              comment = element.comment;
              kind = element.kind;
              flag = 1;
              res.send({ comment, flag, kind });
              throw BreakError;
            }
          }
        });
      } catch (err) {
        if (err !== BreakError) throw err;
      }
        if(flag==0){
          res.send({comment, flag, kind});
        }
      });
      
    } 
    catch (error) {
      res.send('failure')
      res.sendStatus(404);
    }
    }
    catch(error){
      flag=2;
      res.send({comment, flag, kind});
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
      // const isParagraphTextOnPage = document.body.textContent.replaceAll('\xa0', ' ').includes(quoteValue.replaceAll('\xa0', ' '));
      const isParagraphTextOnPage = document.body.textContent.includes(quoteValue);
      res.send({isParagraphTextOnPage})
    }); 
  } catch (error) {
    console.log(error)
    res.send('failure')
    res.sendStatus(404);
  } 
})

module.exports = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})