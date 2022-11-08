
const express = require('express');
const bodyParser = require("body-parser");

var path = require('path');
var indexRouter = require('./routes/index');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));


// view engine setup
app.use( '/static', express.static('public') );
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));

//static middleware

app.use("/images", express.static("images"));
app.use(express.json());
app.use('/', indexRouter);



/* ERROR HANDLERS */
/* 404 handler to catch undefined or non-existent route requests */
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    next(err);
  });

/* Global error handler */
app.use((err,req,res,next) => {
    if (err) {
        console.log('Global error handler called', err)
    }
    if(err.status === 404){
        res.status(404).render('not-found', {err});
    } else {
        err.message = err.message || `Oops! Looks like there was a problem.`
        res.status(err.status || 500).render('error', {err})
        
    }
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
  });
  
module.exports = app;