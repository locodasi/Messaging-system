const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../src/models/User");
const Contact = require("../src/models/Contact");

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("error connection to MongoDB:", error.message);
    });

const createUserContacts = async (user, [contactObj1, contactObj2]) => {
    const contact1 = await (new Contact({ name:contactObj1.name, user:user._id, userContact: contactObj1.id })).save();

    const contact2 = await (new Contact({ name:contactObj2.name, user:user._id, userContact: contactObj2.id })).save();

    user.contacts = [contact1._id, contact2._id];
    await user.save();
};

const createContacts = async () => {
    const [Lucas, Martina, Juan] = await User.find({});

    await Contact.deleteMany({});

    let contacts = null;
    //craete contact Lucas
    contacts = [{ name: "Martina", id: Martina._id },{ name: "Juan", id: Juan._id }];
    await createUserContacts(Lucas, contacts);

    //craete contact Martina
    contacts = [{ name: "Lucas", id: Lucas._id },{ name: "Juan", id: Juan._id }];
    await createUserContacts(Martina, contacts);

    //craete contact Juan
    contacts = [{ name: "Martina", id: Martina._id },{ name: "Lucas", id: Lucas._id }];
    await createUserContacts(Juan, contacts);

    console.log("Exito al crear contactos");

    mongoose.disconnect();
};

module.exports = createContacts;


