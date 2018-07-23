
const bookRouter = require('express').Router();
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./../../db/mongoose');
var {Book} = require('./../../models/book');
var {User} =  require('./../../models/user');
var {Review} = require('./../../models/review');
var {authenticate} =  require('./../../middleware/authenticate');

bookRouter.post('/', (req, res) => {
    var book = new Book({
      name: req.body.name,
      description: req.body.description
    });
  
    book.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  });
  
  bookRouter.get('/', (req, res) => {
    Book.find().then((books) => {
      res.send({books});
    }, (e) => {
      res.status(400).send(e);
    });
  });
  
  bookRouter.get('/:id', (req, res) => {
    var id = req.params.id;
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    Book.findById(id).then((book) => {
      if (!book) {
        return res.status(404).send();
      }
  
      res.send({book});
    }).catch((e) => {
      res.status(400).send();
    });
  });
  
  bookRouter.get('/:id/reviews',(req,res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    Review.find({bookId:id}).then((reviews) => {
      res.send({reviews});
    }, (e) => {
      res.status(400).send(e);
    });
  });
  
  bookRouter.post('/:id/reviews',(req,res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    Book.findById(id).then((book) => {
      if (!book) {
        return res.status(404).send();
      }
      var text = req.body.review;
      var rev = new Review();
      rev.bookId = id;
      rev.review = text;
  
      rev.save().then((doc) => {
        res.send(doc);
      }, (e) => {
        res.status(400).send(e);
      }).then(() => done());
    })
  });
  

module.exports = bookRouter;
