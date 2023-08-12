/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, getUserById } from "../../redux/actions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Suponiendo que el ícono FcGoogle proviene de react-icons
import registerPublic from "../../assets/image/registerPublic.jpg";
import uploadImage from "../../utils/uploadImage";

const CreateEvent = () => {
  const dispatch = useDispatch();

  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [eventInfo, setEventInfo] = useState({
    name: "",
    description: "",
    date: "",
    start: "",
    end: "",
    price: "",
    quotas: "",
    image: "",
    address: "",
    city: "",
    genre: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    date: "",
    start: "",
    end: "",
    price: "",
    quotas: "",
    image: "",
    address: "",
    city: "",
    genre: "",
  });

   const validateForm = (eventInfo) => {
     let errors = {};

     if (!eventInfo.name || !eventInfo.name.trim()) {
       errors.name = 'El campo "Nombre del Evento" es obligatorio.';
     } else {
       const trimmedName = eventInfo.name.trim();

       if (/\d/.test(trimmedName)) {
         errors.name = 'El campo "Nombre del Evento" no puede contener números.';
       }

       if (trimmedName.length > 60) {
         errors.name =
           'El campo "Nombre del Evento" puede tener más de 60 caracteres.';
       }
     }

     if (!eventInfo.description) {
       errors.description = "Este campo es obligatorio";
     }

     if (!eventInfo.date) {
       errors.date = "Este campo es obligatorio.";
     }

     if (!eventInfo.start) {
       errors.start = "Este campo  es obligatorio";
     }

     if (!eventInfo.end) {
       errors.end = "Este campo  es obligatorio";
     }

     if (!eventInfo.price) {
       errors.price = 'El campo "Precio" debe ser un número.';
     }

     if (!eventInfo.quotas || !eventInfo.quotas.trim()) {
       errors.quotas = "Este campo  es obligatorio";
    //  } else {
    //    if (typeof eventInfo.quotas !== "number") {
    //      errors.quotas = "Solo puede ingresar un número.";
    //    } else if (eventInfo.quotas < 1 || eventInfo.quotas > 100) {
    //      errors.quotas = "Debe ser un número entre 1 y 100.";
    //    }
     }

     if (!eventInfo.image) {
       errors.image = "Este campo  es obligatorio";
     }

     if (!eventInfo.address) {
       errors.address = "Este campo  es obligatorio";
     }

     if (!eventInfo.city) {
       errors.city = "Este campo  es obligatorio";
     }

     if (!eventInfo.genre) {
       errors.genre = "Este campo  es obligatorio";
     }

     return errors;
   };

  const handleUploadImage = async (e) => {
    const file = await uploadImage(e);
    console.log(file.url);
    setEventInfo((prev) => ({
      ...prev,
      image: file.url,
    }));
  };
  console.log(eventInfo);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventInfo((prev) => ({
      ...prev,
      [name]: name === "genre" ? prev.genre.concat(value) : value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm(eventInfo);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      try {
        dispatch(createEvent(eventInfo));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Evento Creado Exitosamente!",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/");
      } catch (error) {
        console.error("No se pudo crear el evento:", error);
      }
    }
  }
  if (!user) {
    // Si el usuario no está autenticado, mostrar un mensaje o redireccionar a la página de inicio de sesión.

    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Tienes que estar autenticado",
      showConfirmButton: false,
      timer: 2500,
    });
    navigate("/");
  }
  return (
    <div className="w-full flex justify-center items-center mt-4 mb-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col-reverse md:flex-row w-full">
        {/* image section */}
        <section className="md:w-2/5">
          <img
            src={registerPublic}
            alt="Register image"
            className="rounded-l-2xl object-cover h-full"
          />
        </section>

        <section className="p-2 flex flex-col justify-center items-center md:w-3/5 text-center md:text-left">
          <div className="my-4 text-base text-Color1000 flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-primaryColor">
              Registra tu Evento
            </h2>
            <p className="text-base text-Color1000">
              Deja los detalles de tu evento y publicado en la aplicación.
            </p>
          </div>

          <form
            className="flex flex-col gap-4 w-full justify-center items-center"
            onSubmit={handleSubmit}
          >
            <input
              placeholder="Nombre del Cantante/s o Banda"
              type="text"
              value={eventInfo.name}
              onChange={handleChange}
              name={"name"}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />
             <p className=" text-red-600 text-xs">{errors.name}</p> 

            <input
              placeholder="Información del evento"
              onChange={handleChange}
              type="text"
              value={eventInfo.description}
              name={"description"}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />
             <p className="text-red-600 text-xs">{errors.description}</p> 

            <input
              placeholder="Fecha del Evento"
              type="date"
              value={eventInfo.date}
              name={"date"}
              onChange={handleChange}
              className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            />
             <p className="text-red-600 text-xs">{errors.date}</p> 

            <div className="relative">
              <label
                htmlFor="fileInput"
                className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Seleccionar una Foto
              </label>
              <input
                placeholder="Selecciona una foto"
                className="hidden"
                type="file"
                id="fileInput"
                onChange={handleUploadImage}
              />
            </div>

            <div className="md:flex space-x-11">
              <div className="w-full md:w-1/3">
                <input
                  placeholder="Horario de Inicio"
                  onChange={handleChange}
                  name={"start"}
                  type="time"
                  value={eventInfo.start}
                  className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
                />
                 <p className="text-red-600 text-xs">{errors.start}</p> 
              </div>
              <div className="w-full md:w-1/3">
                <input
                  placeholder="Horario de Finalización"
                  onChange={handleChange}
                  type="time"
                  value={eventInfo.end}
                  name={"end"}
                  className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
                />
                <p className="text-red-600 text-xs">{errors.end}</p> 
              </div>
              <div className="w-1/3">
              <select
              value={eventInfo.genre}
              name="genre"
              className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
              onChange={handleChange}
                  >
                  <option value="rock">Rock</option>
                  <option value="pop">Pop</option>
                  <option value="Reggae">Reggae</option>
                  <option value="Reggaeton">Reggaeton</option>
                  <option value="Cuarteto">Cuarteto</option>
                  <option value="Cumbia">Cumbia</option>
                  <option value="Trap">Trap</option>
                  <option value="Rap">Rap</option>
                  <option value="peavy Metal">Heavy Metal</option>
                  <option value="fodmap friendly">Hard Rock</option>
                  <option value="whole 30">Indie</option>
                  <option value="whole 30">Alternativo</option>
                </select>

                {/* <p className="text-red-600 text-xs">{errors.genre}</p> */}
                {eventInfo.genre.split(',').map((selectedGenre) => (
                 <div key={selectedGenre}>{selectedGenre}</div>
                    ))}

                 <p className="text-red-600 text-xs">{errors.genre}</p> 

              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <input
                  placeholder="Precio por Entrada"
                  onChange={handleChange}
                  type="text"
                  value={eventInfo.price}
                  name={"price"}
                  className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
                />
                 <p className="text-red-600 text-xs">{errors.price}</p> 
              </div>
              <div className="w-1/2">
                <input
                  placeholder="Stock de Entradas"
                  onChange={handleChange}
                  type="text"
                  value={eventInfo.quotas}
                  name={"quotas"}
                  className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
                />
             <p className="text-red-600 text-xs">{errors.quotas}</p> 
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
               <p className="text-red-600 text-xs">{errors.quotas}</p> 
                <input
                  placeholder="Dirección de Lugar"
                  onChange={handleChange}
                  type="text"
                  value={eventInfo.address}
                  name={"address"}
                  className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
                />
               <p className="text-red-600 text-xs">{errors.address}</p> 
              </div>
              <div className="w-1/2">
                <input
                  placeholder="Ciudad"
                  onChange={handleChange}
                  type="text"
                  value={eventInfo.city}
                  name={"city"}
                  className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
                />
                <p className="text-red-600 text-xs">{errors.city}</p> 
              </div>
            </div>

            <p className="text-base text-red-400 px-10 text-center">El costo de la publicación de tu evento tendrá un costo del 20% del total de la venta de cada entrada</p>
            <button
              type="submit"
              className="w-full md:w-3/4 bg-primaryColor text-Color200 hover:bg-Color200 hover:text-primaryColor 
            border hover:border-secondaryColor focus:outline-none px-10 py-3.5 text-base font-medium 
            transition duration-500 ease-in-out transform shadow-md rounded-xl mb-4"
            >
              Crear Evento
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default CreateEvent;