const User = require("./../models/userModel");
// const jwt = require("jsonwebtoken");

// const login = async (req, res) => {
//   const user = req.body;

//   try {
//     let findUser = await User.findOne({ email: user.email });

//     if (findUser) {
//       const token = jwt.sign(
//         { email: user.email, userName: user.userName },
//         process.env.SECRET_TOKEN,
//         {
//           expiresIn: "20s",
//         }
//       );
//       console.log("token", token);

//       return res.status(200).send(token);
//     } else {
//       return res.status(201).send("duzgun email daxil edin");
//     }
//   } catch {
//     (err) => {
//       console.log(err);
//       return err;
//     };
//   }
// };

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  res.send(allUsers);
};

const postUser = async (req, res) => {
  const user = req.body;
  let found = await User.findOne({ email: user.email });
  if (found) {
    res.status(201).send("This id exist");
  } else {
    const newUser = new User(req.body);
    newUser.save();
    res.status(200).send({ message: "istifadeci ugurla qeydiyyatdan kecdi" });
  }
};

const getUserById = async (req, res) => {
  let found = await User.findOne({ _id: req.params.id });
  res.send(found);
};

const deleteUser = async (req, res) => {
  let found = await User.findOne({ _id: req.params.id });
  let _id = found._id;
  const deletedUser = await User.findByIdAndDelete(_id);
};

const updateUser = async (req, res) => {
  let updatedUser = await User.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  );
};

const putUser = async (req, res) => {
  let updatedUser = await User.replaceOne({ _id: req.params.id }, req.body);
};

module.exports = {
  getAllUsers,
  getUserById,
  postUser,
  deleteUser,
  updateUser,
  putUser,
  // login,
};
