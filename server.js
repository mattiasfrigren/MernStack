const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();

//bodyparser middleware
app.use(express.json());

// DB config
const db = config.get('mongoURI');


//connect to Mongo
mongoose.connect(db, {useNewUrlparser: true}).then(() => console.log('MongoDB connected....')).catch( err => console.log(err));

//use Routes
app.use('/api/items',require('./routes/api/items'));
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));

if(process.env.NODE_ENV){
    app.use(express.static('client/build'));
    
    app.get('*', (req,res) =>{
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
