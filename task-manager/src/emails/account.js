const sgMail = require('@sendgrid/mail')

const sendrigAPIKey = "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"

sgMail.setApiKey(sendrigAPIKey)

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