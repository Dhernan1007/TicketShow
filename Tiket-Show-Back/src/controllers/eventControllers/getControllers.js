const { Event, Artist, Genre, City } = require("../../db.js");
const {
  filterAllEvents,
} = require("../../handlers/filterEvents/filterAllEvents");

const { Op } = require("sequelize");

const getEvents = async (req, res = response) => {
  const filter = req.query.filter || "";
  // const options = req.query.options git co|| '';
  try {
    const events = await filterAllEvents(filter);

    if (events.length === 0) {
      return res.status(404).json({
        msg: "No se encontraron eventos",
        events,
      });
    }

    return res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Por favor hable con el administrador",
    });
  }
};

const getEvent = async (req, res = response) => {
  const { id } = req.params;
  try {
    const event = await Event.findByPk(id);

    if (!event || !event.state) {
      return res.status(404).json({
        msg: "No se encontro evento con ese Id",
      });
    }

    res.status(200).json({
      msg: "Evento encontrado",
      event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Por favor hable con el administrador",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const { id } = req.params;
  const { quotas } = req.body;

  try {
    if (isNaN(quotas) || quotas < 0) {
      return res.status(400).json({
        ok: false,
        msg: "La cuota debe ser un número positivo.",
      });
    }

    const event = await Event.findByPk(id);

    if (!event || !event.state) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontró el evento con ese ID.",
      });
    }

    await event.update({ quotas });

    res.status(200).json({
      ok: true,
      msg: "Evento modificado exitosamente.",
    });
  } catch (error) {
    console.error("Error al actualizar el evento:", error);
    res.status(500).json({
      ok: false,
      msg: "Ocurrió un error al intentar actualizar el evento. Por favor, hable con el administrador.",
    });
  }
};

const getEventByName = async (req, res) => {
  const { name } = req.params;
  const event = await Event.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });

  if (event.length > 0) {
    res.status(200).json(event);
  } else {
    res.status(404).send("Evento no encontrado");
  }
};


const createEvent = async (req, res) => {
  const {
    name,
    description,
    date,
    start,
    end,
    price,
    quotas,
    artistName,
    genre, // El campo debe ser 'genre', no 'genres'
    image,
    city,
    address,
  } = req.body;


    try {
        let eventExis = await Event.findOne({
            where: { name },
        });

        if (eventExis) {
            return res.status(400).json({
                msg: 'El evento ya existe con ese nombre',
            });
        }

        const artist = await Artist.findOne({
            where: artistName , // Usar la propiedad 'name'
        });

        const genresDb = await Genre.findAll({
            where: { name: genre }, // Usar 'genre' directamente sin map
        });

        let cityDb = await City.findOne({
            where: { name: city },
        });

        if (!genresDb || genresDb.length === 0) {
            return res.status(400).json({
                msg: 'El genero no existe',
            });
        }

        if (!artist) {
            return res.status(404).json({
                msg: 'No se encontro artista con ese nombre',
            });
        }
        
        if (!cityDb) {
            cityDb = await City.create({ name: city });
        }

        const event = await Event.create({
            name,
            description,
            date,
            start,
            end,
            price,
            quotas,
            genre,
            image,
            address,
            city,
        });

        await event.addArtist(artist);
        await event.addGenres(genresDb); // Asegúrate de que la relación se llame 'addGenres'

        res.status(201).json({
            msg: 'Evento creado',
            event,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor hable con el administrador',

        });
    }


  const deleteEvent = async (req, res = response) => {
  const { id } = req.params;
  const { disabled } = req.body;

  try {
    const event = await Event.findByPk(id);

    if (!event || !event.state) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontró evento con ese Id",
      });
    }

    // Verifica si la propiedad 'disabled' existe en req.body y actualiza el evento si es necesario
    if (disabled !== undefined) {
      event.disabled = disabled;
    }

    // Guarda los cambios en la base de datos
    await event.save();

    res.status(200).json({
      ok: true,
      msg: "Evento actualizado",
      event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const restoreEvent = async (req, res = response) => {
  const { id } = req.params;
  try {
    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontró evento con ese Id",
      });
    }

    // Verifica si la propiedad 'disabled' existe en req.body y actualiza el evento si es necesario
    if ("disabled" in req.body) {
      event.disabled = req.body.disabled;
    }

    // Guarda los cambios en la base de datos
    await event.save();

    res.status(200).json({
      ok: true,
      msg: "Evento restaurado",
      event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const updateEventdatos = async (req, res = response) => {
  const { id } = req.params;
  const {
    name,
    description,
    start,
    end,
    price,
    quotas,
    image,
    address,
    city,
    time,
    genre,
  } = req.body;

  try {
    const event = await Event.findByPk(id);

    if (!event || !event.state) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontró el evento con ese ID.",
      });
    }

    // Verifica si alguna de las propiedades existe en req.body y actualiza el evento si es necesario
    if (name) {
      event.name = name;
    }
    if (description) {
      event.description = description;
    }
    // if (date !== undefined) {
    //   event.date = date;
    // }
    if (start) {
      event.start = start;
    }
    if (end) {
      event.end = end;
    }
    if (price) {
      event.price = price;
    }
    if (quotas) {
      event.quotas = quotas;
    }
    if (image) {
      event.image = image;
    }
    if (address) {
      event.address = address;
    }
    if (city) {
      event.city = city;
    }
    if (time) {
      event.time = time;
    }
    if (genre) {
      event.genre = genre;
    }

    // Guarda los cambios en la base de datos
    await event.save();

    res.status(200).json({
      ok: true,
      msg: "Evento actualizado exitosamente.",
      event,
    });
  } catch (error) {
    console.error("Error al actualizar el evento:", error);
    res.status(500).json({
      ok: false,
      msg: "Ocurrió un error al intentar actualizar el evento. Por favor, hable con el administrador.",
    });
  }
};

module.exports = {
  getEvents,
  getEvent,
  getEventByName,
  createEvent,
  deleteEvent,
  restoreEvent,
  updateEventdatos,
  updateEvent,
};
