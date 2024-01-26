const createUsers = require("./1_create_users");
const createContacts = require("./2_create_contacts");

const mongoose = require("mongoose");

const createData = async() => {
    await createUsers();
    await createContacts();
}

//createData();

const User = require("../src/models/User");

const test = async () => {
    const a = await User.find({}).populate("contacts");
    console.log(a);
    console.log(a[0].contacts);

    mongoose.disconnect();
}

test();
