const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
uri=  'mongodb+srv://nirvanatechsolutions:XzAWqQaiQAAgsacn@encodedbits.npwoljq.mongodb.net/'
const app = express();


const cors=require("cors");
const corsOptions ={
   origin:'http://localhost:60920', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

// const authRoutes = require('./routes/authRoutes');
// const paymentRoutes  = require('./routes/paymentRoutes')
// const newsRoutes  = require('./routes/newsRoutes')
// const scheduleRoutes  = require('./routes/scheduleroute')

const userRoutes  = require('./routes/userRoutes')
const batchRoutes  = require('./routes/batchRoutes')


 // Use this after the variable declaration

// Create an Express application

app.use(cors(corsOptions))

app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:60920']; // Replace with the URL of your Angular app

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    return res.status(403).send('Unauthorized access');
  }

  next();
});


// Parse incoming JSON requests
app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });


  //define the routes of apis
  // app.use('/auth', authRoutes);
  // app.use('/payment', paymentRoutes);
  // app.use('/news', newsRoutes);
  app.use('/user', userRoutes);
  app.use('/b', batchRoutes);




    // Start the server
    app.listen(1020, () => {
    console.log('Server is running on port 1020');
    });