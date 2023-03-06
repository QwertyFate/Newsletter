const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    const FirstName = req.body.Fname;
    const LastName = req.body.Lname;
    const Email = req.body.Email;


    var data ={
        members:[{
            email_address: Email,
            status: "subscribed",
            merge_fields: {
                FNAME: FirstName,
                LNAME: LastName
            }
        }]
    };
    var jsondata = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/a313a566fc";
    const options = {

        method: "POST",
        auth: "Qwerty:5274a6ec49a40df69ec180eedac05d5b-us21"
    };

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        } else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
            
        })
    })
    
    request.write(jsondata);
    request.end();
});


app.post("/failure", function(req, res){
    res.redirect("/");
});


app.listen(3000,function(){
   console.log("started a new server at port 3000"); 
});



//5274a6ec49a40df69ec180eedac05d5b-us21

//list id  a313a566fc