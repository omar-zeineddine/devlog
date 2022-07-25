const sendgridMail = require("@sendgrid/mail");
sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.contactForm = (req, res) => {
  //   res.send("contact endpoint");
  const { email, name, message } = req.body;
  // console.log(req.body);

  const emailData = {
    to: process.env.EMAIL_TO,
    from: req.body.email,
    subject: `Contact form - DevLog`,
    text: `Email received from 
        Sender name: ${name}
        Sender email: ${email}
        Sender message: ${message}
    `,
    // html email on supported clients
    html: `
        <h3>Email received from ${email}</h3>
        <h3>Name: ${name}</h3>
        <h3>Email: ${email}</h3>
        <p>Message:  ${message}</p>
        <hr/>
        <p>Email may contain sensitive information</p>
    `,
  };
  sendgridMail.send(emailData).then((sent) => {
    return res.json({
      success: true,
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
