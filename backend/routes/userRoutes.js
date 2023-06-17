const express = require('express');
const router = express.Router();
const User = require('../models/paymentModel');

router.get('/getallusers', async (req, res) => {
    try {
        // Fetch all objects from the collection
        const user = await User.find({}).exec();
    
        // Send the fetched objects as the API response
        res.json(user);
      } catch (error) {
        console.error('Error fetching objects:', error);
        res.status(500).json({ error: 'Failed to fetch objects from the database' });
      }
});



module.exports = router;