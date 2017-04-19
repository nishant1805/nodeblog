var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

router.get('/add', function(req, res, next) {
  res.render('addcategory',{
    "title": "Add category"
  });
});

router.post('/add', function(req, res, next){
  //Get form value
  var title     = req.body.title;

  // Form Validation
  req.checkBody('title','Title field is required').notEmpty();

  //check errors
  var error = req.validationErrors();

  if(error){
    res.render('addcategory',{
      "errors": errors,
      "title": title
    });
  }else {
    var categories =db.get('categories');

    //submit to db
    categories.insert({
      "title" : title
    }, function(err, category){
      if(err){
        res.send('There was an issue submitting the category');
      }else {
        req.flash('success', 'category Submitted');
        res.location('/');
        res.redirect('/');
      }
    });
  }
});

module.exports = router;
