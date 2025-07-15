const express = require('express');
const router = express.Router();
const immunisationController = require('../controllers/vaccination.controller');

// Route to display the immunisation form
router.get('/', immunisationController.getForm);

// Route to display the success page
router.get('/success', immunisationController.showSuccessPage);

// Route to handle the form submission
router.post('/', immunisationController.createRecord);

//To display all immunisation records in a table
router.get('/records', immunisationController.findAllRecords);

module.exports = router;