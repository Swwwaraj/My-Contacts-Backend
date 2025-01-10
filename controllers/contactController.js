const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@Desc Get all contacts
//@Roure GET /api/contacts
//@Access Public
const getContact = asyncHandler(async(req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@Desc Create New contact
//@Roure POST /api/contacts
//@Access Public
const createContact = asyncHandler(async(req, res) => {
    console.log("The request body is :", req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error ("All fields are mandatory !")
    };

    const contact = await Contact.create({
        name,
        email,
        phone,
    });
    res.status(201).json(contact);
});

//@Desc Get contact
//@Roure GET /api/contacts/:id
//@Access Public
const getContacts = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error ("Contact not found");
    }
    res.status(200).json({ message: `Get contact for ${req.params.id}` }); // Use template literal and req.params.id
});

//@Desc update the contact
//@Roure UPDATE /api/contacts/:id
//@Access Public
const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error ("Contact not found");
    };
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new : true}
        
    );
    res.status(200).json(updateContact); // Corrected template literal
});

//@Desc Delete the contact
//@Roure DELETE /api/contacts/:id
//@Access Public
const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error ("Contact not found");
    }
    await contact.remove();
    res.status(200).json(contact); // Corrected template literal
});

module.exports = { 
    getContacts,
    createContact,
    getContact,
    updateContact, 
    deleteContact,
};
