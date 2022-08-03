const AWS = require("aws-sdk");
const { contactForm } = require("../utils/sesEmail");

// AWS SES
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

exports.contactForm = (req, res) => {
  //   res.send("contact endpoint");
  const { email, name, message } = req.body;

  // console.log(req.body);

  const params = contactForm(email, name, message);
  const sendEmailOnContact = ses.sendEmail(params).promise();

  sendEmailOnContact
    .then((data) => {
      console.log("email submitted to SES", data);
      // res.send("email sent");
      res.json({
        success: true,
      });
    })
    .catch((err) => {
      console.log("ses contact email", err);
      res.json({
        err: "Email could not be sent.",
      });
    });
};

// contact blog poster
exports.contactBlogAuthorForm = (req, res) => {
  // authorEmail: used to send to author
  const { authorEmail, name, email, message } = req.body;
  // send to author and admin
  let mailList = [authorEmail, process.env.EMAIL_TO];

  const emailData = {
    to: mailList,
    from: email,
    subject: `Someone has messaged you from DevLog`,
    text: `Email received from 
        Sender name: ${name}
        Sender email: ${email}
        Sender message: ${message}
    `,
    html: `
        <h3>Message received from ${email}</h3>
        <h3>Name: ${name}</h3>
        <h3>Email: ${email}</h3>
        <div>
          <h3>Message:</h3> 
          <p>${message}</p>
        </div>
        
        <hr/>
    `,
  };
  sendgridMail.send(emailData).then((send) => res.json({ success: true }));
};
