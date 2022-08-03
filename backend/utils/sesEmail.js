exports.registerSesEmailParams = (email, token) => {
  // SES email params
  return {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [process.env.EMAIL_TO],
    Message: {
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
      Subject: {
        Charset: "UTF-8",
        Data: "Devlog - New Account Activation",
      },
    },
  };
};
