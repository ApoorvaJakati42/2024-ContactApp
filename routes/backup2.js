const mongoose = require('mongoose');
const { Schema } = mongoose;
const express = require('express');
const router = express.Router();


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
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    firstName: { type: String, required: true, match: /^[A-Za-z]+$/, minlength: 3 },
    lastName: { type: String, required: true, match: /^[A-Za-z]+$/, minlength: 3 },
    gender: { type: String, required: true, enum: ['MALE', 'FEMALE', 'OTHERS'] },
    address: { type: addressSchema, required: true },
    email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    phone: { type: String, required: true, match: /^[0-9]+$/, minlength: 10, maxlength: 10 }
});

//Create and export Contact model
const Contact = mongoose.model('Contact', contactSchema);

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Retrieve the list of all contacts stored in the MongoDB.
 *     responses:
 *       '200':
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
router.get('/contacts', async (req, res) => {
    console.log("Get all contacts route exxecuted");
    try {
      const contacts = await Contact.find();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
 /**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Add a new contact
 *     description: Add a new contact entry to the MongoDB.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       '201':
 *         description: Contact added successfully
 *       '400':
 *         description: Bad request
 */

 router.post('/contacts', async (req, res) => {
    console.log("Add a new Contact route exxecuted");
    //0. Tweak code for auto id generation and fetch using the same ObjectId
    //1. First verify that db already has contact with same number 
    //2. If it matches then return duplicate error
    //3. If not matched add new contact to db.
    
   
    const { phone , email } = req.body;
    try {

      const existingContact = await Contact.findOne({ phone , email });
      if (existingContact) {
          return res.status(400).json({ message: 'Contact already exists in the database' });
      }

      const contact = new Contact(req.body);
      const newContact = await contact.save();
      console.log("Saved successfully");
      res.status(201).json(newContact);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  /**
   * @swagger
   * /contacts/{id}:
   *   put:
   *     summary: Update contact details
   *     description: Update the contact details of a particular contact entry.
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID of the contact to update
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Contact'
   *     responses:
   *       '200':
   *         description: Contact details updated successfully
   *       '404':
   *         description: Contact not found
   */
  router.put('/contacts/:id', async (req, res) => {
    console.log("Update existing Contact route executed");
   
    const { id } = req.params;

    console.log("Contact Id " , id);
    try {
      const updatedContact = await Contact.findOneAndUpdate({ _id : id }, req.body, { new: true });
      if (!updatedContact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.json(updatedContact);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  /**
   * @swagger
   * /contacts/{id}:
   *   delete:
   *     summary: Delete a contact
   *     description: Delete a contact entry from the MongoDB.
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID of the contact to delete
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       '204':
   *         description: Contact deleted successfully
   *       '404':
   *         description: Contact not found
   */
  router.delete('/contacts/:id', async (req, res) => {
    console.log("Delete existing Contact route executed");
    const { id } = req.params;
    console.log("Contact Id " , id);
    try {
      const deletedContact = await Contact.findOneAndDelete({ _id : id });
      if (!deletedContact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  module.exports = router
  
  