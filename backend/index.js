import express, { request, response } from "express";

// Adding config file by importing but not working
// Above error resolved as only file name was written but we have to write file name with extension

import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

// ?? why we are unsing word "booksRoute" in below line because there is no such variable
import booksRoute from './routes/booksRoute.js';

const app = express();

// Middleware for parsing request body
// we will use "express.json" as a middleware to allow "express" to read json data from the body

app.use(express.json());

// Middleware to resolve cors policy
// app.use(cors());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('BookStore project first route completed successfully')
});

// middleware to use for "/books" so if any request comes from this route handle it with that middleware
// this middleware takes this requests to booksRoute
// change all "/books" routes to "/" in booksRoute.js file

app.use('/books', booksRoute);

// Creating a database using mongoose
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });