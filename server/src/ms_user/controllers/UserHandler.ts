import { Request, Response } from "express";
import { validateSignupUser } from "../../common/functions/ValidateSignup";
import { validateSignupCompany } from "./../../common/functions/ValidateSignup";
import UserSchema from "../schemas/UserSchema";
import { getPassword } from "./../../common/functions/PasswordSalting";
import Log from "./../../common/classes/Log";

export const setUser = (req: Request, response: Response) => {
  let newUser = req.body;

  let result: any;

  if (newUser.type === 0) {
    result = validateSignupUser(
      newUser.firstName,
      newUser.lastName,
      newUser.userName,
      newUser.email,
      newUser.password
    );
  } else {
    result = validateSignupCompany(
      newUser.firstName,
      newUser.lastName,
      newUser.userName,
      newUser.email,
      newUser.password
    );
  }

  if (!result.error) {
    UserSchema.findOne({ email: newUser.email })
      .then(res => {
        if (res) {
          return response.json({
            error: true,
            data: { message: "A user with same email already exists" }
          });
        } else {
          UserSchema.findOne({ userName: newUser.userName })
            .then(async resu => {
              if (resu) {
                return response.json({
                  error: true,
                  data: {
                    message: "A user with same username already exists"
                  }
                });
              } else {
                //hashing the password
                let hashedPassword = await getPassword(newUser.password);

                let user = new UserSchema({
                  userName: newUser.userName,
                  firstName: newUser.firstName,
                  lastName: newUser.lastName,
                  email: newUser.email,
                  type: newUser.type,
                  password: hashedPassword
                });

                user
                  .save()
                  .then(res => {
                    response.json({ error: false, data: res });
                  })
                  .catch(err => {
                    Log.addError(err);
                    return response.json({
                      error: true,
                      data: { message: "Internal server error" }
                    });
                  });
              }
            })
            .catch(err => {
              Log.addError(err);
              return response.json({
                error: true,
                data: { message: "Internal server error" }
              });
            });
        }
      })
      .catch(err => {
        Log.addError(err);
        return response.json({
          error: true,
          data: { message: "Internal server error" }
        });
      });
  } else {
    Log.addError(new Error(result.data.message));
    return response.json(result);
  }
};

export const isUserExists = async (req: Request, res: Response) => {
  let id = req.body.id;

  if (id) {
    try {
      let user = await UserSchema.findById(id);
      res.send({ error: false, data: user });
    } catch (err) {
      Log.addError(err);
      res.json({ error: true, data: { message: "Internal server error" } });
    }
  } else {
    res.json({ error: true, data: { message: "Username is empty" } });
  }
};

export const getUser = async (req: Request, res: Response) => {
  let data = req.body;

  if (data) {
    if (data.userName != "" || data.email != "") {
      if (data.userName.length > 0 && data.password.length > 5) {
        try {
          const user = await UserSchema.findOne({ userName: data.userName });
          return res.json({ error: false, data: { user } });
        } catch (err) {
          Log.addError(err);
          return res.json({
            error: true,
            data: { message: "Internal server error" }
          });
        }
      } else if (data.email.length > 0 && data.password.length > 5) {
        try {
          const user = await UserSchema.findOne({ email: data.email });
          return res.json({ error: false, data: { user } });
        } catch (err) {
          Log.addError(err);
          return res.json({
            error: true,
            data: { message: "Internal server error" }
          });
        }
      } else {
        res.json({
          error: true,
          data: {
            message: "Email / userName both empty or password short/empty"
          }
        });
      }
    }
  } else {
    res.json({
      error: true,
      data: {
        message: "Bad request"
      }
    });
  }
};

export const addProfilePicture = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    let user = await UserSchema.findById(data.userId);
    user.profilePicture = data;
    user.save();
    return res.status(200).send();
  } catch (err) {
    Log.addError(err);
  }
};

export const searchUser = async (req: Request, res: Response) => {
  try {
    const users = await UserSchema.find({
      $or: [
        { userName: { $regex: req.body.searchTerm, $options: "i" } },
        { email: { $regex: req.body.searchTerm, $options: "i" } }
      ]
    });

    res.json({ error: false, payload: users || [] });
  } catch (err) {
    Log.addError(err);
    res.json({ error: false, payload: [] });
  }
};

export const addFollower = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const followerId = req.body.followerId;

    const user = await UserSchema.findById(userId);
    const follower = await UserSchema.findById(followerId);

    if (user.following.includes(follower.id)) {
      user.following;
      follower.followers = [...follower.followers, user.id];

      user.following = user.following.filter(e => e !== follower.id);
      follower.followers = follower.followers.filter(e => e !== user.id);

      await user.save();
      await follower.save();

      res.json({ error: false, payload: false });
    } else {
      user.following = [...user.following, follower.id];
      follower.followers = [...follower.followers, user.id];

      await user.save();
      await follower.save();

      res.json({ error: false, payload: true });
    }
  } catch (err) {
    Log.addError(err);
    res.json({ error: true });
  }
};

export const getUserbyUsername = async (req: Request, res: Response) => {
  try {
    const user = await UserSchema.findOne({ userName: req.body.userName });
    res.json({ error: false, payload: user });
  } catch (err) {
    Log.addError(err);
    res.json({ error: true, payload: null });
  }
};
