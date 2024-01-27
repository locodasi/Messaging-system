const bcrypt = require("bcrypt");

const User = require("../src/models/User");

const usersToInsert = [];

const imagesURLS = [
    "https://plus.unsplash.com/premium_photo-1687371769754-a20ffcc78db1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dW5hJTIwc29sYSUyMHBlcnNvbmF8ZW58MHx8MHx8fDA%3D",
    "https://previews.123rf.com/images/eakachaileesin/eakachaileesin1707/eakachaileesin170700367/82766960-mujer-asi%C3%A1tica-sentada-sola-en-la-casa-concepto-de-espacio-solitario-triste-sola-persona-sola-y.jpg",
    "https://img.freepik.com/vector-gratis/ilustracion-concepto-persona-caminando-sola_114360-13916.jpg"
];

const createUsers = async () => {

    await User.deleteMany({});

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash("password", saltRounds);

    imagesURLS.forEach(url => {
        usersToInsert.push({
            number : Math.floor(Math.random() * 1000000000).toString(),
            passwordHash,
            imageURL: url,
            contacts: []
        });
    });

    await User.insertMany(usersToInsert)
        .then((res) => console.log("Exito al insertar usuarios"))
        .catch((error) => console.log("Error al insertar usuarios", error));
};

module.exports = createUsers;


