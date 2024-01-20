import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: "default Title",
    },
    author: {
      type: String,
      required: true,
      default: "def Author",
    },
    publishYear: {
      type: Number,
      required: true,
      default: 10,
    },

    info: {
      type: String,
      default: "lorem ipsum",
    },

    link: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book", schema);
