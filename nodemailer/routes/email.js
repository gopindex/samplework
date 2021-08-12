const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const keys = require("../config/keys");
const template = require("./emailTemplate");

router.get("/", function (req, res) {
  res.send({ newData: "nisha" });
});
router.post("/email", async function (req, res) {
  const email = req.body.email;
  const username = req.body.username;
  const message = req.body.message;
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: keys.emailUser,
        pass: keys.emailPass,
      },
    });
    let info = await transporter.sendMail({
      from: "pshresth@pranishshresth.com",
      subject: "Subject",
      to: email,
      html: template(username, email, message),
    });
    res.status(200).send("Done!");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
