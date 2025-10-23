import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
const createAdmin = async () => {
  const findAdmin = await userModel.find({ email: process.env.ADMIN_EMAIL });

  if (findAdmin.length == 0) {
    const HashedPassword = await bcrypt.hash(process.env.ADMIN_EMAIL, 2);

    const adminUser = new userModel({
      email: process.env.ADMIN_EMAIL,
      username: process.env.ADMIN_EMAIL,
      password: HashedPassword,
      role: "admin",
    });

    await adminUser.save();
  }
};

export default createAdmin;

