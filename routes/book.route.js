const express = require('express');

const books = require('../controllers/book.controller');
const bookValidation = require('../validators/book.validator');
// validateUpdateBookPayload
const routes = express.Router();

// Add a new book
routes.post('',  bookValidation.validateBookPayload, books.addBook);

// Filter and patination
routes.get('', books.bookList);

// Get book by ID
routes.get('/:id', books.getBookById);

// Update a book by ID
routes.put('/:id', bookValidation.validateBookPayload, books.updateBookById);

// Delete a book by ID
routes.delete('/:id', books.deleteBookById);

module.exports = routes;