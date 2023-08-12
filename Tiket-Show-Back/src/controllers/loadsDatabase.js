const { User } = require("../db");
const { Event } = require("../db");
const { Place } = require("../db");
const { Artist } = require("../db");
const { Genre } = require("../db");
const { City } = require("../db");
const { Date } = require ("../db");
const path = require("path");
const fs = require("fs");


//Cargamos usuarios de la db
const loadUsers = async () => {
  
    try {
      const users2 = await User.findAll();
      if (users2.length) {
        console.log("ya hay usuarios");
        return;
      }
  
      const users = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../database/Users.json"))
      );
      await User.bulkCreate(users);
      console.log("usuarios cargados");
    } catch (error) {
      console.log(error);
    }
};

//Cargamos los Eventos
const loadEvents = async () => {

  try {
    const events2 = await Event.findAll();
    if (events2.length) {
      console.log("ya hay eventos");
      return;
    }
    const events = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../database/Events.json"))
    );
    await Event.bulkCreate(events);
    console.log("eventos cargados");
  } catch (error) {
    console.log(error);
  }
};

//Cargamos los Lugares
const loadPlaces = async () => {

  try {
    const places2 = await Place.findAll();
    if (places2.length) {
      console.log("ya hay lugares");
      return;
    }

    const places = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../database/Places.json"))
    );
    await Place.bulkCreate(places);
    console.log("lugares cargados");
  } catch (error) {
    console.log(error);
  }
};

//Cargamos los Artistas
const loadArtists = async () => {

  try {
    const artists2 = await Artist.findAll();
    if (artists2.length) {
      console.log("ya hay artistas");
      return;
    }

    const artists = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../database/Artists.json"))
    );
    await Artist.bulkCreate(artists);
    console.log("artistas cargados");
  } catch (error) {
    console.log(error);
  }
};

//Cargamos los Generos
const loadGenres = async () => {

  try {
    const genres2 = await Genre.findAll();
    if (genres2.length) {
      console.log("ya hay generos");
      return;
    }
    const genres = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../database/Genres.json"))
    );
    await Genre.bulkCreate(genres);
    console.log("generos cargados");
  } catch (error) {
    console.log(error);
  }
};

//Cargamos las ciudades
const loadCitys = async () => {

  try {
    const city2 = await City.findAll();
    if (city2.length) {
      console.log("ya hay ciudades");
      return;
    }
    const city = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../database/City.json"))
    );
    await City.bulkCreate(city);
    console.log("ciudades cargadas");
  } catch (error) {
    console.log(error);
  }
};

const loadDate = async () => {

  try {
    const date2 = await Date.findAll();
    if (date2.length) {
      console.log("ya hay Date");
      return;
    }

    const date = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../database/Date.json"))
    );
    await Date.bulkCreate(date);
    console.log("Date cargados");
  } catch (error) {
    console.log(error);
  }
};

module.exports={
    loadUsers,
    loadEvents,
    loadPlaces,
    loadArtists,
    loadGenres,
    loadCitys,
    loadDate,
}