import { agent } from 'superagent'

export function createQrCode(uuid) {
  const qrApi = 'https://qrcode-monkey.p.rapidapi.com/qr/custom'
  return agent
    .post(qrApi)
    .set('x-rapidapi-host', 'qrcode-monkey.p.rapidapi.com')
    .set('x-rapidapi-key', process.env.RAPID_API_KEY)
    .send({
      data: uuid,
      size: 300,
      config: {
        body: 'dot',
        eye: 'frame13',
        eyeBall: 'ball5',
        bodyColor: '#1F218B',
        bgColor: '#FFFFFF',
        eye1Color: '#1F218B',
        eye2Color: '#1F218B',
        eye3Color: '#1F218B',
        eyeBall1Color: '#1F218B',
        eyeBall2Color: '#1F218B',
        eyeBall3Color: '#1F218B',
        logo: 'http://icelandathletics-membership.herokuapp.com//logo.3c8a482b.png'
      },
      file: 'png'
    })
    .then(res => res.body)
}
