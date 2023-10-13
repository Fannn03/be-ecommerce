import 'dotenv/config'

export default (keyId: string) => {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #383434;
            color: white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          p {
            font-size: 18px;
          }
          .button {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Verifikasi Akun</h1>
          <p>Harap verifikasi akun dengan menekan tombol di bawah ini.</p>
          <a class="button" href="${process.env.VERIF_EMAIL_URL}?key=${keyId}">Verifikasi Akun</a>
        </div>
      </body>
    </html>
  `
}