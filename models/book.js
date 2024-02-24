const {
    Number
} = require('mongoose');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
var validator = require("validator");

const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Book Title is Required'],
    },
    author: {
        type: String,
        required: [true, 'Author Name is Required'],
    },
    description: {
        type: String,
        required: [true, 'Book Description Is Required']
    },
    publication_year: {
        type: Number,
        required: [true, "Book Publication Year Is Required"]
    },
    isbn: {
        type: Number,
        required: [true, "Book ISBN Is Required"]
    },
    n_Status: { type: Number, default: 1 },
    n_Deleted: { type: Number, default: 1 },
    dt_CreatedOn: { type: Date, default: Date.now },
    dt_UpdatedOn: { type: Date, default: null }
}, { strict: false, versionKey: false });

//This For Select 
const  findBookList= new Schema({}, {
    strict: false,
    versionKey: false
});

//Database created
const bookListFind = mongoose.model('bookListFind', findBookList, 'tbl_book_list');
const bookList = mongoose.model('bookList', bookSchema, 'tbl_book_list');
module.exports = {bookList,bookListFind};