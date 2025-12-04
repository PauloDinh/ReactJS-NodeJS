const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const { ConflictRequestError } = require('../core/error.response');
const { Created } = require('../core/error.response');

class UserController {
  async register(req, res) {
    const { fullName, email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    if (findUser) {
      throw new ConflictRequestError('Email đã tồn tại');
    }

    const saltRounds = 10;
    const hasPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await userModel.create({
      fullName,
      email,
      password: hasPassword,
    });

    new Created({
      message: 'Đăng ký thành công!',
      metadata: newUser,
    }).send(res);
  }
}

module.exports = new UserController();
