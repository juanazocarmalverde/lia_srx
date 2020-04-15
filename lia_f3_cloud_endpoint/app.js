// [START app]
'use strict';

// [START setup]
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('case sensitive routing', true);
app.use(bodyParser.json());
// [END setup]

app.get('/reverse-logistics', (req, res) => {
	
	var requestJson = JSON.stringify(req.body);
	console.log('llamado a reverse logistics');
	console.log(requestJson);
	 res.status(200).json(requestJson).end();
	/*var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:8181/reverse-logistics", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(requestJson);
    console.log('llamado a endpoint');
    xhr.onload = function() {
    	  if (xhr.status != 200) { // analyze HTTP status of the response
    		  console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    	  } else { // show the result
    	   // console.log(xhr.responseText); // responseText is the server
    	    var respuesta = JSON.parse(xhr.responseText);
    	    res.status(200).json(respuesta).end();
    	  }
    	}; */
});

app.get('/reverse-logistics/:id/', (req, res) => {
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:8181/insert_vote", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(req.body.message);
    
    xhr.onload = function() {
    	  if (xhr.status != 200) { // analyze HTTP status of the response
    		  console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    	  } else { // show the result
    	   // console.log(xhr.responseText); // responseText is the server
    	    var respuesta = JSON.parse(xhr.responseText);
    	    res.status(200).json(respuesta).end();
    	  }
    	};
    
});

const authInfoHandler = (req, res) => {
  let authUser = {id: 'anonymous'};
  const encodedInfo = req.get('X-Endpoint-API-UserInfo');
  if (encodedInfo) {
    authUser = JSON.parse(Buffer.from(encodedInfo, 'base64'));
  }
  res.status(200).json(authUser).end();
};

app.get('/auth/info/googlejwt', authInfoHandler);
app.get('/auth/info/googleidtoken', authInfoHandler);

if (module === require.main) {
  // [START listen]
  const PORT = process.env.PORT || 8081;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
    console.log('Nueva version');
  });
  // [END listen]
}
// [END app]

module.exports = app;
