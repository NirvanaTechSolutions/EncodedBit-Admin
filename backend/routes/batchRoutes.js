const express = require('express');
const router = express.Router();
const Batch = require('../models/batchModel');



router.post('/createbatch', (req, res) => {
    const { batchId, studentIds,latestNews, nextClass, messagingAppGroupLink } = req.body;
    console.log(res)
  
    const newBatch = new Batch({
      batchId: batchId,
      studentList: studentIds,  
      latestNews: latestNews || '', // Set to empty string if not provided
      nextClass: nextClass || {}, // Set to empty object if not provided
      messagingAppGroupLink: messagingAppGroupLink || '' // Set to empty string if not provided
    });
  
    newBatch.save()
      .then(() => {
        console.log('Batch saved to database');
        res.json({ success: true });
      })
      .catch(err => {
        console.error('Failed to save Batch to database:', err);
        res.status(500).json({ success: false });
      });
  });
  
  router.get('/getbatches', async (req, res) => {
    try {
        // Fetch all objects from the collection
        const user = await Batch.find({}).exec();
    
        // Send the fetched objects as the API response
        res.json(user);
      } catch (error) {
        console.error('Error fetching objects:', error);
        res.status(500).json({ error: 'Failed to fetch objects from the database' });
      }
});

router.post('/sendnews', async (req, res) => {
    try {
      const { batchId, latestNews } = req.body;
      console.log(req.body)
      const b = await Batch.findOne({ batchId });
      if (!b) {
        return res.status(404).json({ message: 'Batch not found' });
      }
      
      b.news.push(latestNews)
      await b.save()
      
      res.json({ message: 'News added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  router.post('/sendschedule', async(req, res) => {
    const { batchId, topic, date, timing, joinLink } = req.body;

  Batch.findOne({ batchId })
    .then((batch) => {
      if (!batch) {
        return res.status(404).json({ error: 'Batch not found' });
      }

      // Update the batch's nextClass schedule
      batch.nextClass = {
        topic,
        date,
        timing,
        joinLink
      };

      return batch.save();
    })
    .then(() => {
      res.status(200).json({ message: 'Class scheduled successfully' });
    })
    .catch((error) => {
      console.error('Error scheduling class:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  });

  router.post('/sendlink', async (req, res) => {
    try {
      const { batchId, link } = req.body;
      console.log(req.body)
      const b = await Batch.findOne({ batchId });
      if (!b) {
        return res.status(404).json({ message: 'Batch not found' });
      }
      
      b.link.push(link)
      await b.save()
      
      res.json({ message: 'Link added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  module.exports = router;