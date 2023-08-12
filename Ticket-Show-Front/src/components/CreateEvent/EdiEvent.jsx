/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { editEvent, getUserById } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Suponiendo que el ícono FcGoogle proviene de react-icons
import registerPublic from "../../assets/image/registerPublic.jpg";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const EditEvent = ({ selectedEvent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { eventId } = useParams(); // Obtener el ID del evento de la URL
  const events = useSelector((state) => state.Events);
  const [eventData, setEventData] = useState(null);
  const [formData, setFormData] = useState(selectedEvent);

  useEffect(() => {
    // Aquí puedes buscar los datos del evento con el ID en la lista de eventos
    // y guardarlos en el estado local 'eventData'
    const event = events.find((event) => event.id === eventId);
    setEventData(event);
  }, [eventId, events]);
  // Si selectedEvent tiene datos, utiliza esos datos para el estado inicial de eventInfo.
  const [eventInfo, setEventInfo] = useState(
    selectedEvent || {
      id: eventId,
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
      genres: "",
    }
  );

  // Resto del código sin cambios...

  const handleChange = (e) => {
    setEventData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(eventInfo, "INFORMACIÓN DEL EVENTO POR PROPS");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEventInfo = {
      id: eventId,
      ...eventData,
    };

    try {
      await dispatch(editEvent(updatedEventInfo));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Evento editado Exitosamente!",
        showConfirmButton: false,
        timer: 2500,
      });
      navigate("/");
      dispatch(getUserById());
    } catch (error) {
      console.error("Error al editar el evento:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al editar el evento",
        text: "Hubo un problema al editar el evento. Inténtalo nuevamente.",
      });
    }
  };

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
    <div className="w-full flex justify-center items-center mt-2 mb-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg flex  w-full">
        {/* image section */}
        <section className="w-3/6">
          <img
            src={registerPublic}
            alt="Register image"
            className="rounded-l-2xl object-cover h-full"
          />
        </section>

        <section className="p-2 flex flex-col justify-center items-center w-full">
          <div className="my-4 text-base text-Color1000 flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-primaryColor text-left">
              Edita el Evento
            </h2>
            <p className="text-base text-Color1000 text-left">
              modifica los detalles del evento y publicalo en el Inicio.
            </p>
          </div>

          <form
            className="flex flex-col gap-4 w-full justify-center items-center"
            onSubmit={handleSubmit}
          >
            <div className="w-3/4">
              <label>Nombre del evento:</label>
              <input
                type="text"
                name="name"
                value={eventData?.name}
                onChange={(e) =>
                  setEventData({ ...eventData, name: e.target.value })
                }
                className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
              />
            </div>

            <div className="w-3/4">
              <label>Descripción:</label>
              <textarea
                name="description"
                value={eventData?.description}
                onChange={(e) =>
                  setEventData({ ...eventData, description: e.target.value })
                }
                className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
              />
            </div>

            <div className="w-3/4">
              <label>Imagen Evento:</label>
              <input
                type="text"
                name="image"
                value={eventData?.image}
                onChange={(e) =>
                  setEventData({ ...eventData, image: e.target.value })
                }
                className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
              />
            </div>

            <section className="w-full grid grid-cols-2 gap-3 place-items-center">
              <div className="w-3/4">
                <label>Fecha:</label>
                <input
                  type="text"
                  name="date"
                  value={eventData?.date}
                  onChange={(e) =>
                    setEventData({ ...eventData, date: e.target.value })
                  }
                  className="w-full text-center  rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
                />
              </div>

              <div className="w-3/4">
                <label>Horario de Inicio:</label>
                <input
                  type="time"
                  name="start"
                  value={eventData?.start}
                  onChange={(e) =>
                    setEventData({ ...eventData, start: e.target.value })
                  }
                  className="w-full text-center rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
                />
              </div>

              <div className="w-3/4">
                <label>Horario de Fin:</label>
                <input
                  type="time"
                  name="end"
                  value={eventData?.end}
                  onChange={(e) =>
                    setEventData({ ...eventData, end: e.target.value })
                  }
                  className="w-full text-center rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
                />
              </div>

              <div className="w-3/4">
                <label>Precio por Entrada:</label>
                <input
                  type="number"
                  name="price"
                  value={eventData?.price}
                  onChange={(e) =>
                    setEventData({ ...eventData, price: e.target.value })
                  }
                  className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
                />
              </div>

              <div className="w-3/4">
                <label>Stock de Entradas:</label>
                <input
                  type="number"
                  name="quotas"
                  value={eventData?.quotas}
                  onChange={(e) =>
                    setEventData({ ...eventData, quotas: e.target.value })
                  }
                  className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
                />
              </div>


              <div className="w-3/4">
                <label>Dirección de Lugar:</label>
                <input
                  type="text"
                  name="address"
                  value={eventData?.address}
                  onChange={(e) =>
                    setEventData({ ...eventData, address: e.target.value })
                  }
                  className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
                />
              </div>

              

              <div lassName="w-3/4">
              <label>Ciudad:</label>
              <select
                name="city"
                value={eventData?.city}
                onChange={(e) => setEventData({ ...eventData, city: e.target.value })}
                className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
              >
                <option value="">Selecciona una ciudad</option>
                <option value="Buenos Aires">Buenos Aires</option>
                <option value="Mendoza">Mendoza</option>
                <option value="Rosario">Rosario</option>
                <option value="San Juan">San Juan</option>
              </select>
            </div>

            <div className="w-3/4">
            <label>Género musical:</label>
            <select
              name="genres"
              value={eventData?.genre}
              onChange={(e) => setEventData({ ...eventData, genre: e.target.value })}
              className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            >
              <option value="">Selecciona un género</option>
              <option value="Rock">Rock</option>
              <option value="Pop">Pop</option>
              <option value="Reggae">Reggae</option>
              <option value="Reggaeton">Reggaeton</option>
              <option value="Cuarteto">Cuarteto</option>
              <option value="Cumbia">Cumbia</option>
              <option value="Trap">Trap</option>
              <option value="Rap">Rap</option>
              <option value="Heavy Metal">Heavy Metal</option>
              <option value="Hard Rock">Hard Rock</option>
              <option value="Indie">Indie</option>
              <option value="Alternativo">Alternativo</option>
            </select>
          </div>
            </section>

            <button
              type="submit"
              className="w-2/4 bg-primaryColor text-Color200 hover:bg-Color200 hover:text-primaryColor 
              border hover:border-secondaryColor focus:outline-none px-10 py-3.5 text-base font-medium 
          transition duration-500 ease-in-out transform shadow-md rounded-xl mb-4"
            >
              Aceptar
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EditEvent;