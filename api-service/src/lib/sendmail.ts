import Mailjet from 'node-mailjet'

export function makeSendMail (apiKey, apiSecret) {
  const mailjet = new Mailjet({
    apiKey,
    apiSecret
  })

  return function sendMail (subject, html) {
    return mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: 'skraning@fri.is',
              Name: 'Skráningarnefnd FRÍ'
            },
            To: [
              {
                Email: 'bergurhallgrims@gmail.com',
                Name: 'Bergur Hallgrímsson'
              },
              {
                Email: 'iris@fri.is',
                Name: 'Íris Berg Bryde'
              }
            ],
            Subject: subject,
            HTMLPart: html
          }
        ]
      })
  }
}
