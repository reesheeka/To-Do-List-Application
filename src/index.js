const express = require('express');
const mongoose = require('mongoose');

const app = express();

//mongodb connection
mongoose.connect("mongodb+srv://rishika9306781119:h8wQLB4CzfNmNxdX@cluster0.znpkfb4.mongodb.net/To-Do-List")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err.message))

app.use(express.json());

app.use('/api/v1', require('./routes/route.js'));

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})
