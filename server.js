var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 8075;
var nodemailer = require('nodemailer');
app.use(bodyParser());
//mongo connection
var MongoClient = require('mongodb').MongoClient;
// Connection URL
var url = 'mongodb://localhost:27017/bridgelabz?auto_reconnect';

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
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL 
        auth: {
            user: 'yadav.jayprakash19@gmail.com',
            pass: 'Wanted941'
        }
    });
     //data- from post
     var data = req.body;
    
     //message body
     var mailOption = {
        from: "Jayprakash yadav <yadav.jayprakash19@gmail.com>",
        to: data.email,
        subject: 'Message from ' + 'jayprakash19',
        html: "<p>Dear" + " " + data.name + ",</p><br>" + "Thanks for applying. BridgeLabz gives aspiring engineers " +
        "<b>Live Practical Experience </b>" + "and a chance to develop in-depth knowledge in a well defined Tech Stack by developing real-world Apps and a  " +
        "and a chance to develop in-depth knowledge in a well defined Tech Stack by developing real-world Apps and " +
        "<b> a Job with Tech Companies</b>" + ".Please visit our website " + "<a href= http://www.bridgelabz.com > bridgelabz.com</a>" +
        " and read the attached FAQ for more details." + "<br>" +
        "<a href= https://docs.google.com/document/d/1qC5ZTHOSFjSRMYzvHJuNwc2jnv3iEZ3YVEl9D8FUVMo/edit > BridgeLabz Writeup and FAQ</a>" +
        "<br>" + "Please note you are expected to know Coding and have Engineering Degree. So engineers comfortable with coding only come for walk-in interview. The Walk-In Interview timings are:" + "<br>" + "<br" +
        "<br>" + "<table style= border-collapse: collapse; border: 1px solid black> <tr> <td style=border: 1px solid black>Tuesday, Wednesday and Thursday</td> <td style= border: 1px solid black >(1PM - 6PM)</td> </tr> <tr><td style= border: 1px solid black >Friday and Saturday</td><td style= border: 1px solid black >Full Day (Morning 10AM - 6PM)</td> </tr> </table>" + "<br>" + "Best Wishes," + "<br>" + "BridgeLabz LPP" + "<br>" +
        "Live Practical Experience and Job with Tech Companies" + "<br>" + "<a href= https://www.google.com/maps/place/BridgeLabz+Solutions+LLP/@19.050264,72.9154953,17z/data=!3m1!4b1!4m5!3m4!1s0x3be7c60c3f703e35:0x434d5c50ce19bcd4!8m2!3d19.050264!4d72.917684?hl=en> BridgeLabz Solutions LLP, #801, Sai Samarth Business Park, Near Govandi Station East, Mumbai - 400088</a>" + "<br>" + "<a href= http://bridgelabz.com >http://bridgelabz.com/ </a>" +
        "<p style= font-size:15px;white-space:pre-wrap;color:rgb(75,75,75);font-family:roboto, sans-serif; >Warm Regards</p>" +
        "<p style= font-size:15px;white-space:pre-wrap;color:rgb(75,75,75);font-family:roboto, sans-serif; >Tel: Veejay Basottia</p>" +
        "<p style= font-size:15px;white-space:pre-wrap;color:rgb(75,75,75);font-family:roboto, sans-serif; >Tel: +917045948949</p>"
    };
    console.log('hi', mailOption)
    transporter.sendMail(mailOption, function (error, response) {  //callback
        if (error) {
            return console.log('error',error);
        } else {

            console.log("Message Sent");
        }
        // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
        transporter.close();
    });
    res.json(data);
   //Use connect method to connect to the server
    MongoClient.connect(url, function (err, db) {
        console.log(db)
        console.log("Connected successfully to server");
        // Insert some documents
        db.collection('doc1').insert({ name: req.body.name, email: req.body.email, subject: req.body.subject, profile: req.body.profile, message: req.body.message },
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



