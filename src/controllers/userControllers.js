const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const user = req.body;
  console.log(user);

  try {
    let findUser = await User.findOne({ username: user.username });

    if (findUser) {
      const token = jwt.sign(
        { password: user.password, username: user.username },
        process.env.SECRET_TOKEN,
        {
          expiresIn: "5s",
        }
      );
      console.log("token", token);

      return res.status(200).send(token);
    } else {
      return res.status(201).send("please enter correct info");
    }
  } catch {
    (err) => {
      console.log(err);
      return err;
    };
  }
};

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  res.send(allUsers);
};

const postUser = async (req, res) => {
  const user = req.body;
  try {
    // let findUserByName = await User.findOne({ username: user.username });
    let findUserByEmail = await User.findOne({ username: user.email });
    // if (findUserByName) {
    //   return res.status(201).send("this username is already taken");
    // }
    if (findUserByEmail) {
      return res.status(201).send("this email is already used");
    }
    {
      // console.log(req.body); //
      const newUser = new User(req.body);
      // console.log(newUser); //
      newUser.save();

      res.status(200).send({
        message: "succesfull registration",
      });
    }
  } catch {
    (err) => {
      console.log(err);
      return err;
    };
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
  res.send(deletedUser);
};

const updateUser = async (req, res) => {
  let updatedUser = await User.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.send(updatedUser);
};

const putUser = async (req, res) => {
  let updatedUser = await User.replaceOne({ _id: req.params.id }, req.body);
  res.send(updatedUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  postUser,
  deleteUser,
  updateUser,
  putUser,
  login,
};
