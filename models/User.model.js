const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    reviews: [
       {
        type: Schema.Types.ObjectId, 
        ref: 'Review'
       }
    ],
    favorites: [
      {
       type: Schema.Types.ObjectId, 
       ref: 'Game'
      }
   ],
    createdGames: [
      {
      type: Schema.Types.ObjectId, 
      ref: 'Game'
      }
    ],
    profileImage: String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;