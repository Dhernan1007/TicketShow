const { Artist } = require("../../db");
const Mailer = require("../userControllers/Mailer"); // Ajusta la ruta según la ubicación de Mailer.js
//const { uploadImage } = require("../../cloudinary/uploadImage");

const newArtist = async (data) => {
  const {
    firstName,
    lastName,
    nameBand,
    yearCreation,
    nameArtist,
    nickname,
    email,
    password,
    phone,
    description, // Corrige el nombre del campo aquí
    twitter,
    instagram,
    spotify,
    image,
    google,
    state,
    confirmed,
  } = data;

  // Carga la imagen en Cloudinary y obtiene la URL de la imagen de perfil
  // let profileImageURL = null;
  // if (image) {
  //   profileImageURL = await uploadImage(image); // Ajusta la forma en que se pasa la imagen a la función si es necesario
  //  }
  // let whereClause = { email }; // Búsqueda predeterminada solo por email
  // if (nameBand !== null) {
  //   whereClause.nameBand = nameBand;
  // }
  const [artist, created] = await Artist.findOrCreate({
    where: {
      email,
      nameBand,
      nameArtist,
      yearCreation,
      image,
    },
    defaults: {
      firstName,
      lastName,
      nameBand,
      yearCreation,
      nameArtist,
      nickname,
      email,
      password,
      phone,
      description, // Corrige el nombre del campo aquí
      twitter,
      instagram,
      spotify,
      image,
      google,
      state,
      confirmed,
      // profileImageURL, // Agrega profileImageURL como parámetro del controlador
    },
  });

  await artist.save();

  if (created) {
    const subject = "Registro Exitoso";

    const content = "¡Bienvenido! Tu registro ha sido exitoso.";

    Mailer.sendEmail(subject, email, firstName, content);

    // Mostrar un mensaje al usuario (puedes adaptarlo según tu frontend)
    console.log("Artista creado con éxito");
  }

  return artist;
};

module.exports = newArtist;
//profileImageURL // Agrega profileImageURL como parámetro del controlador
