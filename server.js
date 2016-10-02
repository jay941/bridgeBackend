var express = require('express'),
    multer	=	require('multer');
    fs = require("fs");
    app = express(),

    bodyParser = require('body-parser'),
    nodemailer = require('nodemailer'),
    multiparty = require('multiparty');
port = process.env.PORT || 8077;
cors = require('cors');

var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
	callback(null, file.originalname );
  }
});
var upload = multer({ storage : storage}).single('myfile');

//configuration

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser());
app.use(cors());


//mongo connection
var MongoClient = require('mongodb').MongoClient;
// Connection URL
var url = 'mongodb://demo:demo007@ds023694.mlab.com:23694/heroku_0k7kk5fx';
//post
var fname;
app.post('/setData', function (req, res) {
    console.log("POST: ");
    res.header("Access-Control-Allow-Origin", " *");
    res.header("Access-Control-Allow-Headers", " Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "http://bridgelabz.in");
    res.header("Access-Control-Allow-Origin", "http://bridgelabz.com");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    // The above 4 lines are required for Cross Domain Communication(Allowing the methods that come as  
    // Cross Domain Request
    upload(req,res,function(err) {
		if(err) {
		  res.end("Error uploading file.");
		}
		res.end("File is uploaded successfully!");

      });


    //data- from post
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        console.log('files', files);
        console.log('fields', fields.name);

        //data- from post
        var data = fields;
        var name = data.name[0];
        var email = data.email[0];
        var mobile = data.mobile[0];
        var message = data.mobile[0];
        var fname=files.myfile[0].originalFilename;
        var fpath=files.myfile[0].path;
        console.log(name, email, mobile)
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
            to: email,
            subject: 'BridgeLabz LLP',
            html: "<p>Dear" + " " + name + ",</p><br>" + "<p>" + "Thanks for applying." + "</p>" + " BridgeLabz gives aspiring engineers " +
            "<b>Live Practical Experience </b>" + "and a chance to develop in-depth knowledge in a well defined Tech Stack by developing real-world Apps and a  " +
            "and a chance to develop in-depth knowledge in a well defined Tech Stack by developing real-world Apps and " +
            "<b> a Job with Tech Companies</b>" + ".Please visit our website " + "<a href= http://www.bridgelabz.com > bridgelabz.com</a>" +
            " and read the attached FAQ for more details." + "<br>" +
            "<a href= https://docs.google.com/document/d/1qC5ZTHOSFjSRMYzvHJuNwc2jnv3iEZ3YVEl9D8FUVMo/edit > BridgeLabz Writeup and FAQ</a>" +
            "<br>" + "Please note you are expected to know Coding and have Engineering Degree. So engineers comfortable with coding only come for walk-in interview. The Walk-In Interview timings are:" + "<br>" + "<br" +
            "<br>" + "<table border= 1><tr><th>Days</th><th>Time</th></tr><tr><td>Tuesday, Wednesday and Thursday</td><td>(1PM - 6PM)</td></tr><tr><td>Friday and Saturday</td><td>Full Day (Morning 10AM - 6PM)</td></tr></table>" + "<br>" + "Best Wishes," + "<br>" + "BridgeLabz LLP" + "<br>" +
            "Live Practical Experience and Job with Tech Companies" + "<br>" + "<a href= https://www.google.com/maps/place/BridgeLabz+Solutions+LLP/@19.050264,72.9154953,17z/data=!3m1!4b1!4m5!3m4!1s0x3be7c60c3f703e35:0x434d5c50ce19bcd4!8m2!3d19.050264!4d72.917684?hl=en> BridgeLabz Solutions LLP, #801, Sai Samarth Business Park, Near Govandi Station East, Mumbai - 400088</a>" + "<br>" + "<a href= http://bridgelabz.com >http://bridgelabz.com/ </a>" +
            "<p style= font-size:15px;white-space:pre-wrap;color:rgb(75,75,75);font-family:roboto, sans-serif; >Warm Regards</p>" +
            "<p style= font-size:15px;white-space:pre-wrap;color:rgb(75,75,75);font-family:roboto, sans-serif; >Tel: Veejay Basottia</p>" +
            "<p style= font-size:15px;white-space:pre-wrap;color:rgb(75,75,75);font-family:roboto, sans-serif; >Tel: +917045948949</p>"
        };
        var em = { email: 'noreply@bridgelabz.com' };
        var mailOptionCompany = {
            from: email,
            to: em.email,
            subject: 'Meaasage From' + " " + name,
            html: "<table border= 1><tr><td>Name</td><td>" + name + "</td></tr> <tr><td>Email</td><td>" + email + "</td></tr><tr><td>Mobile</td><td>" + mobile + "</td></tr><tr><td>Message</td><td>" + message + "</td></tr></table>"
             , attachments: [{ filename: fname,path:'./uploads/'+fname}]
        };
        transporter.sendMail(mailOptionCompany, function (error, response) {  //callback
            if (error) {
                return console.log('error', error);
            } else {

                console.log("Message Sent to the company");
                console.log("Going to delete an existing file");
                fs.unlink('./uploads/' + fname, function (err) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        console.log("File deleted successfully!");
   }
  
});
            }
            // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
            transporter.close();
        });

  
        transporter.sendMail(mailOption, function (error, response) {  //callback
            if (error) {
                return console.log('error', error);
            } else {

                console.log("Message Sent");
            }
            // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
            transporter.close();
        });
        // res.send('success');
        //Use connect method to connect to the server
        MongoClient.connect(url, function (err, db) {
            // Insert some documents
            db.collection('doc1').insert({ name: name, email: email, mobile: mobile, message: message },
                function (err, saved) { // Query in MongoDB via Mongo JS Module
                    if (err || !saved) res.end("User not saved");
                    else res.end("User saved");
                });
            //db close
            db.close();
        });
  

    });
  
});//end of POST
 
app.listen(port, function () {
    console.log(port, "server running");
})

