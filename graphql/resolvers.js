const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const validateForm = require("../validation/validationHelper");

module.exports = {
  Query: {
    getUsers: async (_, args) => {
      const { size, page } = args;
      const docs = await User.find({}, null, {
        skip: size * (page - 1),
        limit: size,
      }).exec();

      const count = await User.countDocuments({}).exec();

      return {
        totalCount: count,
        currentPage: page,
        size: size,
        content: docs,
      };
    },
  },
  Mutation: {
    signUp: async (_, args) => {
      const { email, name, password } = args;
      try {
        const { isValid } = validateForm(args);

        if (!isValid) {
          return { error: "Data is not valid" };
        }

        const user = await User.findOne({ $or: [{ email: email }] });
        if (user) {
          if (user.email === email) {
            return { error: `Email ${email} already exists` };
          }
        } else {
          const cryptPassword = await bcrypt.hash(password, 10);
          const newUser = new User({
            name,
            email,
            password: cryptPassword,
            role: "USER",
          });

          const user = await newUser.save();
          return {
            user,
            message: "Account successfully created",
            status: "success",
          };
        }
      } catch (e) {
        return e.message;
      }
    },
    signIn: async (_, args) => {
      const { email, password } = args;
      try {
        const { isValid } = validateForm(args);

        if (!isValid) {
          return { error: "Data is not valid" };
        }

        const user = await User.findOne({ $or: [{ email: email }] });

        if (!user) {
          return { error: "User not found" };
        }

        if (!user.enabled) {
          return { error: "User is blocked" };
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
            role: user.role,
          };

          const token = await jwt.sign(payload, keys.secretOrKey, {
            expiresIn: 86400,
          });

          return {
            user,
            token,
          };
        } else {
          return { error: "Password incorrect" };
        }
      } catch (e) {
        return e.message;
      }
    },
    // addMovie: async (_, args) => {
    //   try {
    //     const newMovie = new Movie({
    //       name: args.name,
    //       url: args.url,
    //     });
    //     await newMovie.save();
    //     return { message: "Movie successfully added", status: "success" };
    //   } catch (e) {
    //     return { message: e.message };
    //   }
    // },
    // updateMovie: async (_, args) => {
    //   try {
    //     await Movie.findByIdAndUpdate(
    //       args.id,
    //       { $set: { startPoint: args.startPoint } },
    //       { new: true }
    //     );
    //     return { message: "Movie successfully updated", status: "success" };
    //   } catch (e) {
    //     return { message: e.message };
    //   }
    // },
    // playMovie: async (_, args) => {
    //   try {
    //     const user = await User.findOne({ $or: [{ isWatching: true }] });
    //
    //     if (user) {
    //       if (user._id.toString() === args.id) {
    //         await User.findByIdAndUpdate(
    //           args.id,
    //           { $set: { isWatching: true } },
    //           { new: true }
    //         );
    //         console.log("YES again");
    //         return { message: "You can watch movie", status: "success" };
    //       } else {
    //         return {
    //           message: "Somebody is watching. Try again later",
    //           status: "fail",
    //         };
    //       }
    //     } else {
    //       await User.findByIdAndUpdate(
    //         args.id,
    //         { $set: { isWatching: true } },
    //         { new: true }
    //       );
    //       console.log("YES");
    //       return { message: "You can watch movie", status: "success" };
    //     }
    //   } catch (e) {
    //     return { message: e.message };
    //   }
    // },
    // stopMovie: async (_, args) => {
    //   try {
    //     console.log("NO");
    //     await User.findByIdAndUpdate(
    //       args.id,
    //       { $set: { isWatching: false } },
    //       { new: true }
    //     );
    //     return { message: "You are not active", status: "success" };
    //   } catch (e) {
    //     return { message: e.message };
    //   }
    // },
  },
};
