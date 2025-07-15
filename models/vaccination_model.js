const mongoose = require('mongoose');

const VaccinationSchema = new mongoose.Schema({
    address: {
        type: String,
        required: 'Address is required',
        trim: true
    },
    age: {
        type: String,
        required: 'Age is required',
        trim: true
    },
    batchNo: {
        type: String,
        required: 'BatchNo is required'
    },
    gender: { 
        type: String,
        required: 'Gender is required',
        trim: true
    },
    immunisationId: { 
        type: String,
        required: 'ImmunisationId is required',
        trim: true
    },
    manufacturer: { 
        type: String,
        required: 'Manufacturer is required',
        trim: true
    },
    mobile: { 
        type: String,
        required: 'Mobile is required',
        trim: true
    },
    name: { 
        type: String,
        required: 'Name is required',
        trim: true
    },
    nextDueMonth: { 
        type: String,
        required: 'nextDueMonth is required',
        trim: true
    },
    vaccinationCenter: { 
        type: String,
        required: 'VaccinationCenter is required',
        trim: true
    },
    vaccinationDate: { 
        type: String,
        required: 'VaccinationDate is required',
        trim: true
    },
    vaccineName: { 
        type: String,
        required: 'VaccineName is required',
        trim: true
    },
    vaccineType: {
        type: String,
        required: 'VaccineType is required',
        trim: true
    }
},
{timestamps:true},
{
    // Add this options object to specify the exact collection name
    collection: 'VaccinationData'
});

module.exports = mongoose.model('VaccinationData', VaccinationSchema);