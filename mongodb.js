import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
  useFindAndModify: false,
  bufferCommands: false,
  poolSize: 5,
  family: 4,
});
mongoose.set('debug', process.env.NODE_ENV === 'development');
mongoose.set('useCreateIndex', true);

mongoosePaginate.paginate.options = { lean: true };

mongoose.connection.on('connected', () => {
  let uri = process.env.MONGO_URI;
  uri = uri.substring(uri.indexOf('@') + 1, uri.lastIndexOf('/'));

  console.log(
    '\x1b[32m',
    `::: Database: Connected to mongo at ${uri} :::`,
    '\x1b[32m'
  );
});
mongoose.connection.on('error', () => {
  console.log('error');
});
mongoose.connection.on('disconnected', () => {
  console.log('::: Database: Disconnected from mongo :::');
});

export default mongoose;
