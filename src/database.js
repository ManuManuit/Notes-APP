const mongoose = require('mongoose');

const MONGOBD_URI = 'mongodb://localhost/crudMogoose';

mongoose.connect(MONGOBD_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));