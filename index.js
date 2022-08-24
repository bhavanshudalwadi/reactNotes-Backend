require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express');
const app = express();
var cors = require('cors');

// Connect to mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, ()=>{
            console.log('reactNotes backend connected to db & listening on port ', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

// To Allow CORS Access
app.use(cors());
// To use json as request
app.use(express.json());

//  All Requests
app.use('/api/auth', require("./routes/auth")); 
app.use('/api/notes', require("./routes/notes")); 