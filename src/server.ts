import mongoose from 'mongoose';
import app from './app';

const port = process.env.NODE_PORT || 3000;

mongoose.connect(process.env.MONGO_URL, {
}, (err) => {
  if (err) {
    console.log('database connection error', err)
  }

  console.log('connected to mongodb')
});

app.listen(port, () => {
  console.log(`Server listen in ${port}`);
});

module.exports = app;
