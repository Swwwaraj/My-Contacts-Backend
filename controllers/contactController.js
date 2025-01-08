//@Desc Get all contacts
//@Roure GET /api/contacts
//@Access Public
const getContact = (req, res) => {
    res.status(200).json({ message: "Get all contacts" });
};

//@Desc Create New contact
//@Roure POST /api/contacts
//@Access Public
const createContact = (req, res) => {
    console.log("The request body is :", req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error ("All fields are mandatory !")
    }
    res.status(201).json({ message: "Create contact" });
};

//@Desc Get contact
//@Roure GET /api/contacts/:id
//@Access Public
const getContacts = (req, res) => {
    res.status(200).json({ message: `Get contact for ${req.params.id}` }); // Use template literal and req.params.id
};

//@Desc update the contact
//@Roure UPDATE /api/contacts/:id
//@Access Public
const updateContact = (req, res) => {
    res.status(200).json({ message: `Update contact for ${req.params.id}` }); // Corrected template literal
};

//@Desc Delete the contact
//@Roure DELETE /api/contacts/:id
//@Access Public
const deleteContact = (req, res) => {
    res.status(200).json({ message: `Delete contact for ${req.params.id}` }); // Corrected template literal
};

module.exports = { 
    getContacts,
    createContact,
    getContact,
    updateContact, 
    deleteContact,
};
