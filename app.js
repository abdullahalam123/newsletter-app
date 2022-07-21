const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile( __dirname + "/signup.html");
});

app.post("/", function(req, res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.mail;

  var data = {
    members: [
      {
        email_address : email,
        status : "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us6.api.mailchimp.com/3.0/lists/87909546bd";

  const options = {
    method : "POST",
    auth : "abdulla:c705f988d70c173ff4214bf721088162-us6"
  }

  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
