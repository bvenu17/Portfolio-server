const express = require('express');
const bodyParser = require('body-parser');
// const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

// // View engine setup
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({extended:false}));
// app.use(express.multipart());


app.get('/', (req, res) => {
  res.send("HELLOOO")
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: NAMEE</li>
      <li>Company:COMPANNY</li>
      <li>Email: EMAKILIDDDD</li>
      <li>Phone: PHNUMBER/li>
    </ul>
    <h3>Message</h3>
    <p>MESSAGE</p>
  `;

 

  // setup email data with unicode symbols
  let mailOptions = {
      // from: '"Venugopal Balaji" <venugopalportfolio@gmail.com>', // sender address
      // from:"venugopalportfolio@gmail.com",
      from:"venugopalportfolio@gmail.com",
      to: 'venugopalportfolio@gmail.com', // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.message, // plain text body
      html: 'Message from: ' + req.body.name + '<br></br> Email: ' +  req.body.email + '<br></br> Message: ' + req.body.message // html body
  };

 // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      // service :"gmail",
      // port: 587,
      port:465,
      secure:true,
      // secure: false, // true for 465, false for other ports
      auth: {
      type: 'oauth2',
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD,  // generated ethereal password
      // user:"venugopalportfolio@gmail.com",
      // pass:"Gunners12#",
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      // clientId: '931610096152-lqc33sev10o6o97g5i7ajt1k9uefr793.apps.googleusercontent.com',
      // clientSecret: '8ICiInnq6YHSSkTShKY4eq0Q',
      // refreshToken: '1//04gZY-STq2AK2CgYIARAAGAQSNwF-L9IrBoIRrJPW7iM_wke7n4Yo3ukeWDoWWMmgvZmDeLrYj9Az9IQoaTP5siTloj5WdWMVcLI',
    },
    tls:{
    rejectUnauthorized:false
    }
    });
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.send('Email has been sent');
  });
  });



app.listen(6006, () => console.log('Server started...'));