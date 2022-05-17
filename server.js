//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override')
const mongoose = require ('mongoose');
const Staff = require('./models/staffDataSchema.js')
const seedData = require('./models/staffData.js')
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI 
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

// app.get('/staffs/seed', (req, res) =>{
//     Staff.create(seedData, (err, createdStaff) =>{
//       console.log('Added Staffs')
//       res.redirect('/staffs')
//     })
// })

//___________________
// Routes
//___________________

app.get('/', (req, res)=>{
  res.redirect('/staffs')
})

app.put('/staffs/:id', (req, res) => {
  Staff.findByIdAndUpdate(req.params.id, req.body, {new: true}, 
    (err, updatedModel) => {
      console.log(req.body)
    res.redirect('/staffs')
  })
})

app.get('/staffs/:id/edit', (req, res) =>{
  Staff.findById(req.params.id, (err, editStaff) => {
    res.render('edit.ejs', {staff: editStaff})
  })
})

app.delete('/staffs/:id', (req, res) =>{
  Staff.findByIdAndRemove(req.params.id, (err, removeStaff)=>{
    res.redirect('/staffs')
  })
})

app.get('/staffs/new', (req, res)=>{
  console.log('done')
  res.render('new.ejs')
})

app.post('/staffs', (req, res) => {
  Staff.create(req.body, (err, createdStaffs) => {
    res.redirect('/staffs')
  })
})

app.get('/staffs/:id', (req, res) => {
  Staff.findById(req.params.id, (err, foundInfo) =>{
    res.render('show.ejs', {staff: foundInfo})
  })
})

app.get('/staffs', (req, res) =>{
  Staff.find({}, (err, allStaff) => {
    //console.log(err)
    res.render('index.ejs', {staff: allStaff})
  })
})



//localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello World! come here ...');
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));