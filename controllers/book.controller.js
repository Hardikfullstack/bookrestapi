const books = require('../Book/books');

// List all books
const listBooks = (req, res) => {
    res.json(books);
};

// Get book by ID
const getBookById = (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));
    if (book) {
        return res.json(book);
    } else {
        return res.status(404).json({ message: 'Book not found' });
    }
};

// Add a new book
const addBook = (req, res) => {
    const newBook = req.body;

    // Check if a book with the same name and author already exists
    const existingBook = books.find(book => ((book?.title || '').toLowerCase() === (newBook?.title || '').toLowerCase()) && ((book?.author || '').toLowerCase() === (newBook?.author || '').toLowerCase()));
    if (existingBook) {
        return res.status(400).json({ error: 'Book with the same name and author already exists.' });
    }

    books.push({ id: Number(books[books.length - 1]?.id + 1) || 1, ...newBook });
    return res.status(201).json(newBook);
};

// Update a book by ID
const updateBookById = (req, res) => {
    const { id } = req.params;
    const updatedBook = req.body;

    const index = books.findIndex(b => b.id === Number(id));
    if (index == -1) {
        return res.status(404).json({ message: 'Book not found' });
    }

    // Check if the provided author and id combination already exists for another book
    const existingBook = books.find(book => (book.title).toLowerCase() === (updatedBook.title).toLowerCase() && (book.author).toLowerCase() === (updatedBook.author).toLowerCase() && book.id !== Number(id));
    if (existingBook) {
        return res.status(400).json({ error: 'Book with the same author and name combination already exists.' });
    }

    books[index] = { id: Number(id), ...updatedBook };
    return res.status(200).json(updatedBook);
};

// Delete a book by ID
const deleteBookById = (req, res) => {
    const { id } = req.params;
    const index = books.findIndex(b => b.id === Number(id));

    if (index !== -1) {
        books.splice(index, 1);
        res.json({ message: `Book with id ${id} has been successfully deleted.` });
    }

    return res.status(404).json({ message: 'Book not found' });
};

// Filter, sorting and pagination
const bookList = (req, res) => {
    let filteredBooks = [...books];  // Create a copy of books array

    // Sorting
    const { sortField } = req.query;
    if (sortField) {
        filteredBooks.sort((a, b) => (a[sortField] > b[sortField] ? 1 : -1));
    }

    // Searching
    const { searchField, searchValue } = req.query;
    if (searchField && searchValue) {
        filteredBooks = filteredBooks.filter(book => (book[searchField] || '').toLowerCase() === (searchValue).toLowerCase());
    }

    // Pagination
    const { page = 1, pageSize = 10 } = req.query;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + parseInt(pageSize);
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    return res.json({
        totalBooks: filteredBooks.length,
        totalPages: Math.ceil(filteredBooks.length / pageSize),
        currentPage: parseInt(page),
        pageSize: parseInt(pageSize),
        books: paginatedBooks
    });
};

module.exports = {
    listBooks,
    getBookById,
    addBook,
    updateBookById,
    deleteBookById,
    bookList
}