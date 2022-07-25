const sendgridMail = require("@sendgrid/mail");
sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.contactForm = (req, res) => {
  //   res.send("contact endpoint");
  const { email, name, message } = req.body;
  // console.log(req.body);

  const emailData = {
    to: process.env.EMAIL_TO,
    from: req.body.email,
    subject: `Contact form - devlog`,
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
