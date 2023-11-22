const User = require("../../entities/users/User");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  "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"
);

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    console.log(userExist);
    if (userExist) {
      userExist.resetCode = Math.floor(100000 + Math.random() * 900000);
      const updateUser = await userExist.save();
      console.log(updateUser);
      // const to = email;
      const to = "eduardoburko@gmail.com";
      const from = "eduardoburko@gmail.com";
      const subject = "Código de Segurança PROJETO X";
      const text = "Teste de envio de texto";
      const html = `Segue o código que você precisa copiar e colocar no APP <b>${userExist.resetCode}</b>`;
      const msg = { to, from, subject, text, html };
      await sgMail.send(msg);
      res.send({ message: "E-mail enviado com código!" });
    } else {
      res.send({ message: "E-mail não existe na base!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send({ message: "Erro no banco!" });
  }
}

module.exports = forgotPassword;
