const express = require('express');
const router = express.Router();
const { projects } = require('../data/data.json');


/* GET home page. */
router.get('/',(req,res,next) => {
    res.render("index",{ projects })
});

/* GET about page. */
router.get('/about', (req,res,next) => {
    res.render("about")
});

/* GET generated error route - create and throw 500 server error */
router.get('/error', (req, res, next) => {

    // Log out custom error handler indication
    console.log('Custom error route called');
  
    const err = new Error();
    err.message = `Custom 500 error thrown`
    err.status = 500;
    throw err;
  });

/* GET projects page. */
router.get('/projects/:id', (req,res,next) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    
    if(project) {
        res.render('project', { project });
    } else {
        next();
    }
});





module.exports = router;