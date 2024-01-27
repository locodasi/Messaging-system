const createUsers = require("./1_create_users");
const createContacts = require("./2_create_contacts");
const createMessages = require("./3_create-messages");

// const mongoose = require("mongoose");

const createData = async() => {
    await createUsers();
    await createContacts();
    await createMessages();
};

createData();

// const User = require("../src/models/User");

// const test = async () => {
//     const a = await User.find({}).populate("contacts");
//     console.log(a);
//     console.log(a[0].contacts);

//     mongoose.disconnect();
// }

// test();
