const express = require('express');
const router = express.Router();
const Batch = require('../models/batchModel');
const User = require('../models/userModel');
const Payment = require('../models/paymentModel');
const ExcelJS = require('exceljs');



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
     
      const b = await Batch.findOne({ batchId });
      if (!b) {
        return res.status(404).json({ message: 'Batch not found' });
      }
      
      b.news[0] = latestNews;
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
      
      b.link[0] = link
      await b.save()
      
      res.json({ message: 'Link added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/students/batch/:batchId', async (req, res) => {
    try {
      const batchId = req.params.batchId;
      
  
      // Find the batch with matching batch ID and populate the studentList field
      const batch = await Batch.findOne({ batchId }).populate('studentList');

  
   
      if (!batch) {
        return res.status(404).json({ error: 'Batch not found' });
      }
  
      // Extract the usersub values from the studentList
      const studentList = batch.studentList;

      
  
          // Fetch student names from the user schema using studentList
    const studentNames = await User.find({ usersub: { $in: studentList } })
    .select('name');

  // Extract only the names from the retrieved user objects
  const names = studentNames.map(student => student.name);

  console.log(names)

  res.json({ names });
    } catch (error) {
      console.error('Error fetching student names:', error);
      res.status(500).json({ error: 'An error occurred while fetching student names' });
    }
  });

  router.post('/deletebatch', async (req, res) => {
    try {
      const { batchId } = req.body;
      console.log(req.body)
      const b = await Batch.findOne({ batchId });
      if (!b) {
        return res.status(404).json({ message: 'Batch not found' });
      }
      
     
      await b.deleteOne()
      
      res.json({ message: 'Link added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  router.post('/download-batch-report', async (req, res) => {
    try {
      const batchId = req.body.batchId;
      // Retrieve the batch ID from the request body
  
      // Find the batch by ID and populate the studentList field
      const batch = await Batch.findOne({ batchId }).populate('studentList');
    
  
      if (!batch) {
        return res.status(404).json({ error: 'Batch not found' });
      }
  
      // Extract the student IDs from the batch
      const studentIds = batch.studentList
      
  
      // Find the users with matching student IDs
      const users = await User.find({ usersub: { $in: studentIds } });
      
      // Create a new workbook
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Batch Report');
  
      // Define the column headers
      worksheet.columns = [
      
        { header: 'Name', key: 'name' },


        { header: 'Email', key: 'email',width:30 },
        { header: 'country', key: 'country' },
        { header: 'State', key: 'state' },
        { header: 'Pincode', key: 'pincode' },
        { header: 'mobileno', key: 'mobileno' },
        { header: 'message', key: 'message',width:30 },
        // Add more columns as needed
      ];
  
      // Add data rows
      users.forEach(user => {
        worksheet.addRow({
         
          name: user.name,
          email: user.email,
          country: user.country,
          state: user.state,
          pincode:user.pincode,

          mobileno: user.mobileno,
          message: user.message,
          
          // Add more columns' data as needed
        });
      });
  
      // Auto-fit the columns
      worksheet.columns.forEach(column => {
        column.width = Math.max(15, column.width);
      });
  
      // Generate the Excel file
      const buffer = await workbook.xlsx.writeBuffer();
  
      res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.set('Content-Disposition', 'attachment; filename=batch-report.xlsx');
      res.send(buffer);
    } catch (error) {
      console.error('Error generating batch report:', error);
      res.status(500).json({ error: 'An error occurred while generating the batch report' });
    }
  });
  
  router.post('/download-plan-report', async (req, res) => {
    try {
      const planName = req.body.plan;
      // Retrieve the plan name from the request body
  
      // Find the payment(s) by plan name
      const payments = await Payment.find({ plan: planName });
  
      if (!payments || payments.length === 0) {
        return res.status(404).json({ error: 'Plan not found' });
      }
  
      // Extract the usersubs from the payments
      const usersubs = payments.map(payment => payment.usersub);
  
    // Log the usersubs value for debugging
  
      // Find the users with matching usersubs
      const users = await User.find({ usersub: { $in: usersubs } });
   // Log the users array for debugging
  
      // Create a new workbook
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Plan Report');
  
      // Define the column headers
      worksheet.columns = [
        { header: 'Name', key: 'name' },


        { header: 'Email', key: 'email',width:30 },
        { header: 'country', key: 'country' },
        { header: 'State', key: 'state' },
        { header: 'Pincode', key: 'pincode' },
        { header: 'mobileno', key: 'mobileno' },
        { header: 'message', key: 'message',width:30 },
        // Add more columns as needed
      ];
  
      // Add data rows
      users.forEach(user => {
        worksheet.addRow({
          name: user.name,
          email: user.email,
          country: user.country,
          state: user.state,
          pincode:user.pincode,

          mobileno: user.mobileno,
          message: user.message,
          // Add more columns' data as needed
        });
      });
  
      // Generate the Excel file
      const buffer = await workbook.xlsx.writeBuffer();
  
      res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.set('Content-Disposition', 'attachment; filename=plan-report.xlsx');
      res.send(buffer);
    } catch (error) {
      console.error('Error generating plan report:', error);
      res.status(500).json({ error: 'An error occurred while generating the plan report' });
    }
  });
  
  


  module.exports = router;