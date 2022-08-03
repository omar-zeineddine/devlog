exports.registerSesEmailParams = (email, token) => {
  // SES email params
  return {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [process.env.EMAIL_TO],
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: "Devlog - New Account Activation",
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
          <html>
            <h4>Please use the following link to activate your account and complete the registration process:</h4>
            <p>${process.env.CLIENT_URL}/auth/account/activate/${token}</p>
            <hr/>
            <p>This email may contain sensitive information</p>
          </html>
          `,
        },
      },
    },
  };
};

exports.forgotPass = (email, token) => {
  // SES email params
  return {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [process.env.EMAIL_TO],
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: "Devlog - Password Reset Link",
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
          <html>
            <h4>Please use the following link to reset your password:</h4>
            <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
            <hr/>
            <p>This email may contain sensitive information</p>
          </html>
          `,
        },
      },
    },
  };
};

exports.contactForm = (email, name, message) => {
  return {
    Source: email,
    Destination: {
      ToAddresses: [process.env.EMAIL_TO],
    },
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: "Devlog - Visitor Contact",
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
          <html>
            <h3>Email received from ${email}</h3>
            <h3>Name: ${name}</h3>
            <h3>Email: ${email}</h3>
            <p>Message:  ${message}</p>
            <hr/>
            <p>Email may contain sensitive information</p>
          </html>

          `,
        },
      },
    },
  };
};

exports.contactAuthorForm = (authorEmail, email, name, message) => {
  return {
    Source: email,
    Destination: {
      ToAddresses: [authorEmail],
    },
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: "Devlog - contact",
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
          <html>
              <h3>Message received from ${email}</h3>
              <h3>Name: ${name}</h3>
              <h3>Email: ${email}</h3>
              <div>
                <h3>Message:</h3> 
                <p>${message}</p>
              </div>
              <hr/>
            <p>Email may contain sensitive information</p>
          </html>

          `,
        },
      },
    },
  };
};
