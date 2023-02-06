import Mailgun from 'mailgun.js'
import * as formData from 'form-data'

function makeSendMail (apiKey, domain) {
  const mailgun = new Mailgun(formData)
  const client = mailgun.client({
    username: 'api',
    key: apiKey
  })

  return function sendMail (subject, html) {
    const data = {
      from: 'skraningarnefnd@fri.is',
      to: 'iris@fri.is;bergurhallgrims@gmail.com',
      subject,
      html
    }

    return client.messages.create(domain, data)
  }
}

module.exports = makeSendMail
