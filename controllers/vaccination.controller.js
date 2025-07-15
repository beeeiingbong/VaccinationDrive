const Immunisation = require('../models/vaccination_model');

// Renders the immunisation form page
exports.getForm = (req, res) => {
    res.render('vaccinationForm',{message:""})
    console.log("inside the rendering page")
};

// Handles the form submission for immunisation data
exports.createRecord = async (req, res) => {
    console.log("Inside the create records")
    try {
        // This is the updated object with the new key-value pairs
        const immunisationData = {
            address: req.body.address,
            age: req.body.age,
            batchNo: req.body.batchNo,
            date: req.body.date,
            gender: req.body.gender,
            immunisationId: req.body.immunisationId,
            manufacturer: req.body.manufacturer,
            mobile: req.body.mobile,
            name: req.body.name,
            nextDueMonth: req.body.nextDueMonth,
            vaccinationCenter: req.body.vaccinationCenter,
            vaccinationDate: req.body.vaccinationDate,
            vaccineName: req.body.vaccineName,
            vaccineType: req.body.vaccineType
        };

        const newRecord = new Immunisation(immunisationData);
        await newRecord.save();

console.log("ImmunisationRecord inside")

        // Instead of rendering, redirect to the new success URL
        res.redirect('/immunisation/success');

    } catch (error) {
        res.status(400).render('vaccinationForm', { message: `Error saving record: ${error.message}` });
    }
}


// Displays the success page
exports.showSuccessPage = (req, res) => {
    res.render('success');
};


// Finds and displays all records with pagination, search, sort, and filter
exports.findAllRecords = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10; // Records per page
        const search = req.query.search || '';
        const sortBy = req.query.sortBy || 'vaccinationDate'; // Default sort
        const order = req.query.order || 'desc'; // Default order
        
        // --- Build Query and Filter Objects ---
        const query = {};
        
        // Add search functionality (case-insensitive)
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        // Add filter functionality
        if (req.query.gender && req.query.gender !== 'all') {
            query.gender = req.query.gender;
        }
        if (req.query.vaccineType && req.query.vaccineType !== 'all') {
            query.vaccineType = req.query.vaccineType;
        }

        // --- Build Sort Object ---
        const sortOptions = { [sortBy]: order === 'asc' ? 1 : -1 };

        // --- Execute Database Queries ---
        // 1. Get the records for the current page
        const records = await Immunisation.find(query)
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(limit);
            
        // 2. Get the total count of records matching the query
        const totalRecords = await Immunisation.countDocuments(query);
        const totalPages = Math.ceil(totalRecords / limit);

        // --- Render the View ---
        res.render('records', {
            records,
            totalPages,
            currentPage: page,
            totalRecords,
            currentSearch: search,
            currentSort: { sortBy, order },
            // Pass current filters to the view to keep them selected
            currentFilters: {
                gender: req.query.gender || 'all',
                vaccineType: req.query.vaccineType || 'all'
            },
        });

    } catch (error) {
        res.status(500).send("Error retrieving records: " + error.message);
    }
};