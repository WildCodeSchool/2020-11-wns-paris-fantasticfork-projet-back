const mongoose = require('mongoose');
const app = require('./app');

const start = async () => {
  try {
    // Database
    mongoose.connect('mongodb+srv://fantastic:fork@stud-connect.zfeul.mongodb.net/stud-connect?retryWrites=true&w=majority', {
      useCreateIndex: true,
      autoIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // eslint-disable-next-line no-console
    console.log('Connected to database !', new Date(Date.now()));

    // eslint-disable-next-line no-console
    app.listen(5000, () => console.log('Server started on 5000'));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

// Start Server
start();
