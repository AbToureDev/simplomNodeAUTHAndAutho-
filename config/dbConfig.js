const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.LOCAL_CONNECT;


mongoose.connect(mongoUri).then(r  => {
    // console.log('connection a la base de donne.')
});
if (!mongoUri) {
    console.error("Erreur : La variable d'environnement LOCAL_CONNECT n'est pas définie.");
    process.exit(1); // Quitte l'application si la chaîne de connexion est indéfinie
}
// mongoose.connection.on('connected', ()=> {
//     console.log("connection a la base de donne.")
// });
// mongoose.connection.on('error', (error)=> {
//     console.log("connection error:", error)
// });
module.exports =mongoose;
