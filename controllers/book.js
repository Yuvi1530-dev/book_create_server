const {
    bookList, bookListFind
} = require('../models/book');
var moment = require('moment');
var utilities = require('../helper/utilities');
var mongoose = require('mongoose');
var appData = {
    "status": 0,
    "message": "",
    "data": [],
    "error": []
}
function overAllTotal(cb){
    bookListFind.find({
        n_Status:1,
        n_Deleted:1
    }, function (err, result) { 
        return cb(result);
    })
}
//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test!');
};

exports.bookUpdate = function (req, res) {
    const data = req.body;
    const errors = {};
    if (data.title == null || data.title == '') {
        errors.title = ['Name is required'];
    } else if (data.title && !(/^(?=.*[A-Za-z]).{3,}$/).test(String(data.title).trim())) {
        errors.title = ['Name is not valid'];
    }
    if (data.author == null || data.author == '') {
        errors.author = ['Author Name is required'];
    }
    if (data.description == null || data.description == '') {
        errors.description = ['Book description is required'];
    }
    if (data.publication_year == null || data.publication_year == '') {
        errors.publication_year = ['Book Publication Year is required'];
    }
    if (Object.keys(errors).length > 0) {
        appData["status"] = 0
        appData["message"] = []
        appData["data"] = []
        appData["error"] = errors
        res.send(appData)
    } else {
        try {
            bookListFind.findOneAndUpdate({
                isbn: Number(data.isbn),
                n_Status: 1,
                n_Deleted :1
            }, {
                $set: {
                    title: data.title,
                    author: data.author,
                    description: data.description,
                    publication_year: Number(data.publication_year),
                    dt_UpdatedOn: new Date()
                }
            }, function (errr, _alreadyupdate) {

                if (_alreadyupdate) {
                    appData["status"] = 1
                    appData["message"] = "Book Data Updated Successfully"
                    appData["data"] = []
                    appData["error"] = []
                    res.send(appData)
                } else {
                    appData["status"] = 0
                    appData["message"] = "Something went wrong try again later!."
                    appData["data"] = []
                    appData["error"] = []
                    res.send(appData)
                }

            })

        } catch (err) {
            appData["status"] = 0
            appData["message"] = ["Getting an error"]
            appData["data"] = []
            appData["error"] = [err]
            res.send(appData)
        }
    }
};
exports.addBookDetail = function (req, res) {
    const data = req.body;
    const errors = {};
    if (data.title == null || data.title == '') {
        errors.title = ['Name is required'];
    } else if (data.title && !(/^(?=.*[A-Za-z]).{3,}$/).test(String(data.title).trim())) {
        errors.title = ['Name is not valid'];
    }
    if (data.author == null || data.author == '') {
        errors.author = ['Author Name is required'];
    }
    if (data.description == null || data.description == '') {
        errors.description = ['Book description is required'];
    }
    if (data.publication_year == null || data.publication_year == '') {
        errors.publication_year = ['Book Publication Year is required'];
    }
    if (Object.keys(errors).length > 0) {
        appData["status"] = 0
        appData["message"] = []
        appData["data"] = []
        appData["error"] = errors
        return res.send(appData);
    }
    else {
        bookListFind.findOne({
            title: data.title,
            author: data.author,
            n_Status: 1,
            n_Deleted: 1
        }, {
            isbn: 1
        }, function (err, result) {
            if (err) {
                appData["status"] = 0
                appData["message"] = [];
                appData["data"] = []
                appData["error"] = ["Getting an error."]
                return res.send(appData);
            } else {
                if (result != '' && result != null) {
                    appData["status"] = 0
                    appData["message"] = "This Book already exists";
                    appData["data"] = []
                    appData["error"] = []
                    return res.send(appData);
                } else {
                    let isbn=utilities.randomNumber(10)
                    let insData = {
                        title: data.title,
                        author: data.author,
                        description: data.description,
                        publication_year: Number(data.publication_year),
                        isbn: isbn,
                        dt_CreatedOn: new Date()
                    }
                    var insertBook = new bookList(insData);
                    insertBook.save(function (err, next) {
                        if (err) {
                            appData["status"] = 0
                            appData["message"] = ""
                            appData["data"] = []
                            appData["error"] = err
                            return res.send(appData);
                        } else {
                            console.log(next,"next")
                            if (next !=null&&next !='') {
                                appData["status"] = 1
                                appData["message"] = "Book added successfully"
                                appData["data"] = []
                                appData["error"] = []
                                return res.send(appData);
                            } else {
                                appData["status"] = 0
                                appData["message"] = ""
                                appData["error"] = [];
                                appData["data"] = []
                                res.send(appData)
                                return
                            }

                        }
                    });
                }
            }
        });
    }

};
exports.bookGet = function (req, res) {
    const data = req.body;
    console.log(req.body,"req")
    const errors = {};
    if (data.isbn == null || data.isbn == '') {
        errors.isbn = ['Book description is required'];
    }
    if (Object.keys(errors).length > 0) {
        appData["status"] = 0
        appData["message"] = []
        appData["data"] = []
        appData["error"] = errors
        res.send(appData)
    } else {
        try {
            bookListFind.findOne({
                isbn: Number(data.isbn),
                n_Status:1,
                n_Deleted:1
            }, function (err, result) {
                if (result) {
                    appData["status"] = 1
                    appData["message"] = "Data Found"
                    appData["data"] = result
                    appData["error"] = []
                    res.send(appData)
                } else {
                    appData["status"] = 0
                    appData["message"] = "No Data Found"
                    appData["data"] = []
                    appData["error"] =
                        res.send(appData)
                }
            })
        } catch (err) {
            appData["status"] = 0
            appData["message"] = "Getting an error"
            appData["data"] = []
            appData["error"] = [err]
            res.send(appData)
        }
    }
};
exports.bookList = function (req, res) {
    const data = req.body;
    const errors = {};
    if (data.n_Skip == null || data.n_Skip == '') {
        errors.n_Skip = ['Skip is required'];
    }
    if (data.n_Limit == null || data.n_Limit == '') {
        errors.n_Limit = ['Limit is required'];
    }
    if (Object.keys(errors).length > 0) {
        appData["status"] = 0
        appData["message"] = []
        appData["data"] = []
        appData["error"] = errors
        res.send(appData)
    } else {
        try {
            bookListFind.find({
                n_Status:1,
                n_Deleted:1
            }, function (err, result) {
                // let verallLength = 
                overAllTotal(function(len){
          
                if (result) {
                    appData["status"] = 1
                    appData["message"] = "Data Found"
                    appData["data"] = result
                    appData["skip"] = data.n_Skip
                    appData["limit"] = data.n_Limit
                    appData["total"] = len.length
                    appData["error"] = []
                    res.send(appData)
                } else {
                    appData["status"] = 0
                    appData["message"] = "No Data Found"
                    appData["data"] = []
                    appData["error"] =
                        res.send(appData)
                }
            })
            }).skip(Number(data.n_Skip)).limit(Number(data.n_Limit))
        } catch (err) {
            appData["status"] = 0
            appData["message"] = "Getting an error"
            appData["data"] = []
            appData["error"] = [err]
            res.send(appData)
        }
    }
};
exports.bookDelete = function (req, res) {
    const data = req.body;
    const errors = {};
    if (data.isbn == null || data.isbn == '') {
        errors.isbn = ['Name is required'];
    } 
    if (Object.keys(errors).length > 0) {
        appData["status"] = 0
        appData["message"] = []
        appData["data"] = []
        appData["error"] = errors
        res.send(appData)
    } else {
        try {
            bookListFind.findOneAndUpdate({
                isbn: Number(data.isbn),
                n_Status: 1,
                n_Deleted :1
            }, {
                $set: {
                    n_Status: 2,
                    n_Deleted :2,
                    dt_UpdatedOn: new Date()
                }
            }, function (errr, _alreadyupdate) {

                if (_alreadyupdate) {
                    appData["status"] = 1
                    appData["message"] = "Book Data Deleted Successfully"
                    appData["data"] = []
                    appData["error"] = []
                    res.send(appData)
                } else {
                    appData["status"] = 0
                    appData["message"] = "Something went wrong try again later!."
                    appData["data"] = []
                    appData["error"] = []
                    res.send(appData)
                }

            })

        } catch (err) {
            appData["status"] = 0
            appData["message"] = ["Getting an error"]
            appData["data"] = []
            appData["error"] = [err]
            res.send(appData)
        }
    }
};