var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = 8073;
var nodemailer = require('nodemailer');



app.use(bodyParser());
app.use(express.static('../view'));

var MongoClient = require('mongodb').MongoClient;
   // Connection URL
var url = 'mongodb://localhost:27017/bridgelabz';

//post
app.post('/setData', function (req, res) {
    console.log("POST: ");
    res.header("Access-Control-Allow-Origin: *");
    res.header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    // The above 4 lines are required for Cross Domain Communication(Allowing the methods that come as  
    // Cross Domain Request
    //send mail
   

  var  transport = nodemailer.createTransport('direct', {
    debug: true, //this!!!
  });

 
    var data = req.body;
    var mailOption={
              from: data.email,
              to: 'yadav.jayprakash19@gmail.com',
              subject: 'Message from ' + data.name,
              text: data.name
    };
  console.log('hi',mailOption)
    transporter.sendMail(mailOption,function(error, response){  //callback
   if(error){
      return console.log(error);
   }else{
       console.log("Message sent: " + response.data);
   }
   // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
  transporter.close(); 
});
 res.json(data);
    




   //Use connect method to connect to the server
    MongoClient.connect(url, function (err, db) {
       console.log("Connected successfully to server");
        var collection = db.collection('doc');
      
        // Insert some documents
        collection.save({ name:req.body.name,email: req.body.email, subject: req.body.subject, profile: req.body.profile,message: req.body.message },
            function (err, saved) { // Query in MongoDB via Mongo JS Module
                if (err || !saved) res.end("User not saved");
                else res.end("User saved");
            });
       //db close
        db.close();
    });

});
app.listen(port, function () {
    console.log("server running");
})



