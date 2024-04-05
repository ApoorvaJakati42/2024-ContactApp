const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define address sub-document schema
const addressSchema = new Schema({
    line1: { type: String, required: true, minlength: 8 },
    line2: { type: String },
    city: { type: String, required: true },
    country: { type: String, required: true, uppercase: true },
    zipCode: { type: String, required: true, maxlength: 10 }
});

// Define contact schema
const contactSchema = new Schema({
    id: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, match: /^[A-Za-z]+$/, minlength: 3 },
    lastName: { type: String, required: true, match: /^[A-Za-z]+$/, minlength: 3 },
    gender: { type: String, required: true, enum: ['MALE', 'FEMALE', 'OTHERS'] },
    address: { type: addressSchema, required: true },
    email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    phone: { type: String, required: true, match: /^[0-9]+$/, minlength: 10, maxlength: 10 }
});

// Create and export Contact model
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;