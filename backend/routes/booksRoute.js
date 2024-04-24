import express from "express";
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route to save a new Book, Usually post method is used to create a new resource

router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        // save new book into a new variable, send status code 200 for success
        
        const book = await Book.create(newBook);
        return response.status(201).send(book);
        
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
    // Finally saved the data in mongodb first time by using vscode
});

// Route for Get all Books from database, we will use "get method" for this
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books,
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for Get one book by id from database

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Update a book, it is a tricky because we need request.params and request.body at the same time
// request.params searches book and request.body will update it

router.put('/:id', async (request, response) => {
    try {
        if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publish year',
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);
        
        if (!result) {
            return response.status(404).json({ message: 'Book not found'});
        }

        return response.status(200).send({ message: 'Book updated successfully'});


    }catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to Delete a Book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found'});
        }
        return response.status(200).send({ message: 'Book deleted successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
