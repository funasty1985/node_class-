const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'tony.f.liang@gmail.com',
        subject: 'Thanks for joining in !',
        text: `Welcome to the app, ${name}.`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'tony.f.liang@gmail.com',
        subject: 'Your Account is cancelled !',
        text: `Bye Bye ${name} !`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}