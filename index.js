
var cloudscraper = require('cloudscraper');

const express = require('express');
const app = express();
const port = process.env.PORT || 9001;

var cors = require('cors');


var path = require('path');

function getStr(str, first_character, last_character) {
  if (str.match(first_character + "(.*)" + last_character) == null) {
    return null;
  } else {
    new_str = str.match(first_character + "(.*)" + last_character)[1].trim()
    return new_str;
  }
}

app.use(cors());

app.engine('html', require('ejs').renderFile);
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'))
})
app.get('/video', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
	if(!req.query.q){
		res.end(JSON.stringify({video_config_media:false}));
	}else {
		e = cloudscraper.get(req.query.q);
		e.then(function(e){
			file = getStr(e, "vilos.config.media = ", ";") || false;
			seila = JSON.stringify(JSON.parse(file)) || false;
			res.end(JSON.stringify({video_config_media:seila}));
		}).catch(function(e){res.end(JSON.stringify({video_config_media:false}))})
	}
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;