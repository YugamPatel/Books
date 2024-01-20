import express from "express";
import { Book } from "../model/bookModel.js";

const route = express.Router();

// POST route to create a new book
route.post("/", async (req, res) => {
  try {
    // Validate request body
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear ||
      !req.body.info
    ) {
      return res.status(400).send({ message: "Invalid request data" });
    }

    // Initialize newBook object with required fields
    let newBookData = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
      info: req.body.info
    };

    // Conditionally add link if it exists
    if (req.body.link) {
      newBookData.link = req.body.link;
    }

    // Create a new book object
    const newBook = await Book.create(newBookData);

    // Send the created book as a response
    return res.status(200).send(newBook);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


// GET route to retrieve all books
route.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({
      count: books.length,
      books: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// GET route to retrieve a single book by id
route.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).send("No book found");
    }

    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// PUT route to update a book by id
route.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate request body
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear ||
      !req.body.info
    ) {
      return res.status(400).send({ message: "Invalid request data" });
    }

    const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
    // console.log(result);

    if (!result) {
      return res.status(404).send("Book not found");
    }

    res.status(200).send("Updated successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// DELETE route to remove a book by id
route.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send("Book not found");
    }

    res.status(200).send("Deleted successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

route.delete("/", async (req, res) => {
  try {
    // Deletes all documents in the Book collection
    await Book.deleteMany({});
    res.status(200).send("All books deleted successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default route;
