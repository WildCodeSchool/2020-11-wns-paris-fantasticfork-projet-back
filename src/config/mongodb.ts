import mongoose from 'mongoose';

const mongooseConnect = async (): Promise<void> => {
  try {
    // Database
    mongoose.connect(process.env.MONGODB_URI as string, {
      useCreateIndex: true,
      autoIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    // eslint-disable-next-line no-console
    console.log('Connected to database !', new Date(Date.now()));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export default mongooseConnect;
