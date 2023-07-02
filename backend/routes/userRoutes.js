const express = require('express');
const router = express.Router();
const User = require('../models/paymentModel');
const Student = require('../models/userModel');
const XLSX = require('xlsx');
const fs = require('fs');


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


router.get('/getstudents', async (req, res) => {
  try {
    const query = req.query.query || ''; // Retrieve the search query from the query parameters
    const regex = new RegExp(query, 'i'); // Create a case-insensitive regular expression for the search

    // Search for students with matching names
    const students = await User.find({ name: regex });

    res.json(students);
  } catch (error) {
    console.error('Error searching students:', error);
    res.status(500).json({ error: 'An error occurred while searching students' });
  }
});


router.get('/allstudentsexcel', async (req, res) => {
  try {
    // Fetch selected columns from MongoDB
    const students = await Student.find({}, {_id:0, name: 1, email: 1,country:1,state:1,message:1,mobileno:1,pincode:1,issubscribed:1 }).lean();

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(students);

    // Adjust column width based on content
    const columnKeys = Object.keys(worksheet);
    const columnWidths = [];
    columnKeys.forEach((key) => {
      if (key.startsWith('!')) return; // Skip non-cell keys
      const cellValue = worksheet[key].v || '';
      const columnWidth = Math.max(cellValue.toString().length * 1.5, 10);
      columnWidths.push({ wch: columnWidth });
    });
    worksheet['!cols'] = columnWidths;

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

    // Convert workbook to Excel buffer
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Save Excel buffer to file
    fs.writeFileSync('students.xlsx', excelBuffer);

    // Set response headers for file download
    res.setHeader('Content-Disposition', 'attachment; filename=students.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Send the file to the client
    res.sendFile('students.xlsx', { root: '.' });
  } catch (error) {
    console.error('Error saving students to Excel:', error);
    res.status(500).json({ error: 'An error occurred while saving students to Excel' });
  }
});

module.exports = router;