const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@Desc Get all contacts
//@Roure GET /api/contacts
//@Access Private
const getContact = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({ user_id: req.user_id });
    res.status(200).json(contacts);
});

//@Desc Create New contact
//@Roure POST /api/contacts
//@Access Private
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
        user_id:req.user.id
    });
    res.status(201).json(contact);
});

//@Desc Get contact
//@Roure GET /api/contacts/:id
//@Access Private
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
//@Access Private
const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error ("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User can't have permission to update other user contacts");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new : true}
        
    );
    res.status(200).json(updateContact); // Corrected template literal
});

//@Desc Delete the contact
//@Roure DELETE /api/contacts/:id
//@Access Private
const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error ("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User can't have permission to update other user contacts");
    }

    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact); // Corrected template literal
});

module.exports = { 
    getContacts,
    createContact,
    getContact,
    updateContact, 
    deleteContact,
};
