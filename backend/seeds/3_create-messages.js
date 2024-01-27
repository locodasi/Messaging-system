const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../src/models/User");
const Message = require("../src/models/Message");

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("error connection to MongoDB:", error.message);
    });

const createMessageUser = async(user, text, read) => {
    const contacts = user.contacts.map(contact => contact.userContact);
    const messages = [];
    for (const contact of contacts) {
        messages.push(new Message({
            text,
            read,
            to: contact,
            from: user._id,
            date: new Date()
        }));
    }

    await Message.insertMany(messages);
};

const createMessages = async() => {
    await Message.deleteMany({});

    const [Lucas, Martina, Juan] = await User.find({}).populate("contacts");

    await createMessageUser(Lucas, "Hola", true);
    await createMessageUser(Martina, "Holaaaaa", true);
    await createMessageUser(Juan, "¿Como va?", false);

    console.log("Exito al crear mensajes");

    mongoose.disconnect();
};

module.exports = createMessages;