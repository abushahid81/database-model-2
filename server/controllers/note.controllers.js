import Note from "../models/note.models.js";
import asyncHandler from "express-async-handler";


const createNote = asyncHandler(async (req, res) => {
  try {
    const { title, description, price, variant } = req.body;

    if (title && description && price && variant) {
      const newNote = new Note({
        title: title,
        description: description,
        price: price,
        variant: variant,
      });

      const createdNote = await newNote.save();

      res.json({
        code: 200,
        remark: "note created",
      });
    } else {
      res.status(400);
      res.json({
        code: 400,
        remark: "title or description missing",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      code: 500,
      remark: "failed",
    });
  }
});


const getNotes = asyncHandler(async (req, res) => {
  try {

    let filterObject = {
      isArchived: req.query.isArchived === undefined ? false : req.query.isArchived
    }

    if (req.query.search) {
      filterObject.title = {
        $regex: req.query.search,
        $options: "i"
      }
    }

    const notes = await Note.find(filterObject);

    res.json({
      code: 200,
      remark: "success",
      data: notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      code: 500,
      remark: "failed",
    });
  }
});


const updateNote = asyncHandler(async (req, res) => {
  try {
    const noteId = req.params.noteId;

    const note = await Note.findById(noteId);

    if (note) {
      const { title, description, price, variant, archivedToggle } = req.body;

      note.title = title || note.title;
      note.description = description || note.description;
      note.price = price || note.price;
      note.variant = variant || note.variant;
      // note.name = name || note.name;
      // note.email = email || note.email;
      // note.message = message || note.message;
      note.isArchived = archivedToggle === undefined ? note.isArchived : archivedToggle;

      await note.save();

      res.json({
        code: 200,
        remarl: "note updated",
      });
    } else {
      console.log(error);
      res.status(404);
      res.json({
        code: 404,
        remark: "Note not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      code: 500,
      remark: "failed",
    });
  }
});


const deleteNote = asyncHandler(async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.noteId);

    res.json({
      code: 200,
      remark: "note deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      code: 500,
      remark: "Something went wrong",
    });
  }
});

export { createNote, getNotes, updateNote, deleteNote };
