const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const connectDB = require('./config/connectDB');

const userModel = require('./models/user.model');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();

app.post('/api/register', async (req, res) => {
  const { fullName, email, password } = req.body;
  const newUser = await userModel.create({
    fullName,
    email,
    password,
  });
  return res.status(201).json({
    message: 'Đăng ký thành công',
    metadata: newUser,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
