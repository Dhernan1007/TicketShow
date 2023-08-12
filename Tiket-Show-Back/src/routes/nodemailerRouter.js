const { Router } = require("express");
const nodemailer = require("nodemailer");

const router = Router();

router.post("/mail", async (req, res) => {
 const { send } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: "prueba34032@yopmail.com",

    subject: "Comprobante de compra",
    html: `<h1>Gracias por confiar en TiketShow</h1>`
            // <h3>Total: ${send.totalPrice + send.totalPrice * 0.18}</h3>
            // <h3>Cantidad: ${send.quantity}</h3>
            // <h3>Fecha del Evento: ${send.date}</h3>,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado:", info.response);
  } catch (error) {
    console.log("Error al enviar el correo electrónico:", error);
  }
});

module.exports = router;
