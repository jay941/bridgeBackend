var express = require('express'),
    app = express(),
    expressValidator = require('express-validator'),
    bodyParser = require('body-parser'),
    nodemailer = require('nodemailer'),
    port = 8073;
    cors=require('cors');

//configuration

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser());
app.use(cors());
app.use(expressValidator());

 //mongo connection
var  MongoClient = require('mongodb').MongoClient;
    // Connection URL
var  url = 'mongodb://demo:demo007@ds023694.mlab.com:23694/heroku_0k7kk5fx';
//post


app.post('/setData',function (req, res) {
    console.log("POST: ");
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers"," Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    // The above 4 lines are required for Cross Domain Communication(Allowing the methods that come as  
    // Cross Domain Request
    //data- from post
     var data = req.body;
     var name = req.body.name;
     var email = req.body.email;
     console.log(data)
    //validation
    req.checkBody('name', 'Invalid Name').notEmpty();
    req.checkBody('email', 'Invalid Email').isEmail({ errorMessage: 'Invalid Email' });

    var errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }//end of if 
    else {

        //send mail configuration
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL 
            auth: {
                user: 'noreply@bridgelabz.com',
                pass: 'bridgelabz@123'
            }
        });
        //Template and Message body
        var mailOption = {
            from: "BridgeLabz LLP <noreply@bridgelabz.com>",
            to: data.email,
            subject: 'BridgeLabz LLP',
            html: "<p>Dear" + " " + data.name + ",</p><br>" + "Thanks for applying. BridgeLabz gives aspiring engineers " +
            "<b>Live Practical Experience </b>" + "and a chance to develop in-depth knowledge in a well defined Tech Stack by developing real-world Apps and a  " +
            "and a chance to develop in-depth knowledge in a well defined Tech Stack by developing real-world Apps and " +
            "<b> a Job with Tech Companies</b>" + ".Please visit our website " + "<a href= http://www.bridgelabz.com > bridgelabz.com</a>" +
            " and read the attached FAQ for more details." + "<br>" +
            "<a href= https://docs.google.com/document/d/1qC5ZTHOSFjSRMYzvHJuNwc2jnv3iEZ3YVEl9D8FUVMo/edit > BridgeLabz Writeup and FAQ</a>" +
            "<br>" + "Please note you are expected to know Coding and have Engineering Degree. So engineers comfortable with coding only come for walk-in interview. The Walk-In Interview timings are:" + "<br>" + "<br" +
            "<br>" + "<table style= border-collapse: collapse; border: 1px solid black> <tr> <td style=border: 1px solid black>Tuesday, Wednesday and Thursday</td> <td style= border: 1px solid black >(1PM - 6PM)</td> </tr> <tr><td style= border: 1px solid black >Friday and Saturday</td><td style= border: 1px solid black >Full Day (Morning 10AM - 6PM)</td> </tr> </table>" + "<br>" + "Best Wishes," + "<br>" + "BridgeLabz LLP" + "<br>" +
            "Live Practical Experience and Job with Tech Companies" + "<br>" + "<a href= https://www.google.com/maps/place/BridgeLabz+Solutions+LLP/@19.050264,72.9154953,17z/data=!3m1!4b1!4m5!3m4!1s0x3be7c60c3f703e35:0x434d5c50ce19bcd4!8m2!3d19.050264!4d72.917684?hl=en> BridgeLabz Solutions LLP, #801, Sai Samarth Business Park, Near Govandi Station East, Mumbai - 400088</a>" + "<br>" + "<a href= http://bridgelabz.com >http://bridgelabz.com/ </a>" +
            "<p style= font-size:15px;white-space:pre-wrap;color:rgb(75,75,75);font-family:roboto, sans-serif; >Warm Regards</p>" +
            "<p style= font-size:15px;white-space:pre-wrap;color:rgb(75,75,75);font-family:roboto, sans-serif; >Tel: Veejay Basottia</p>" +
            "<p style= font-size:15px;white-space:pre-wrap;color:rgb(75,75,75);font-family:roboto, sans-serif; >Tel: +917045948949</p>"
        };
     
        transporter.sendMail(mailOption, function (error, response) {  //callback
            if (error) {
                return console.log('error', error);
            } else {

                console.log("Message Sent");
            }
            // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
            transporter.close();
        });
        res.json(data);
        //Use connect method to connect to the server
        MongoClient.connect(url, function (err, db) {
            // Insert some documents
            db.collection('doc1').insert({ name: req.body.name, email: req.body.email, subject: req.body.subject, profile: req.body.profile, message: req.body.message },
                function (err, saved) { // Query in MongoDB via Mongo JS Module
                    if (err || !saved) res.end("User not saved");
                    else res.end("User saved");
                });
            //db close
            db.close();
        });
    }//end of else


});//end of POST
app.listen(port, function () {
    console.log("server running");
});




