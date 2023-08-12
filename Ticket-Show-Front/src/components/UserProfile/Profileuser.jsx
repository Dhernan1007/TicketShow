import React from "react";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { NavLink } from "react-router-dom";
import MyShopping from "./Shoppinguser";
import { useSelector } from "react-redux";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import {
  MdMap,
  MdLocationOn,
  MdDateRange,
  MdWatch,
  MdMusicVideo,
} from "react-icons/md";
import { BiSolidPlusSquare } from "react-icons/bi";

export default function UserProfile() {
  const navigate = useNavigate();
  //const auth = useAuth();
  const { user, updateUserDisplayName, updateUserPhotoURL } = useAuth();
  const [newDisplayName, setNewDisplayName] = useState("");
  const [error, setError] = useState(null);
  const datosbanda = useSelector((state) => state?.user);
  const datosartist = datosbanda?.find((date) => date.email === user?.email);
  const users = useSelector((state) => state?.user);
  const usersFinder = users?.length
    ? users?.find((rol) => rol.email === user?.email)
    : null;
  const userImageURL =
    usersFinder?.image ||
    "https://res.cloudinary.com/dhickjcbz/image/upload/v1690770100/user_r20d1h.png";
  const [imageFile, setImageFile] = useState(null);
  //const RolesUsers= useSelector((state)=> state?.user)

  const [preview, setPreview] = useState(null);
  

  const handleImageChange = (e) => {
    
    const file = e.target.files[0];
    if (!file) {
      // El usuario canceló la selección de la imagen, así que borramos la URL temporal
      setNewImageUrl(null);
      return;
    }
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    
  };


  function upperLetter(inputString) {
    if (!inputString) {
      return "";
    }

    const wordsArray = inputString.split(" ");
    const formattedArray = wordsArray.map((word) => {
      const firstLetter = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1);
      return firstLetter + restOfWord;
    });

    return formattedArray.join(" ");
  }

  const handleSAVEe = async () => {
    setError(null);

    if (!user) {
      setError("Usuario no autenticado.");
      return;
    }

    try {
      if (imageFile) {
        const storageRef = ref(
          getStorage(),
          "imagenesUsuarios/" + imageFile.name
        );
        await uploadBytes(storageRef, imageFile);

        const url = await getDownloadURL(storageRef);

        try {
          await updateUserPhotoURL(url);
        } catch (error) {
          console.error(
            "Error al actualizar la imagen de perfil en Firebase Auth:",
            error
          );
          setError(
            "Error al actualizar la imagen de perfil. Por favor, inténtelo de nuevo más tarde."
          );
          return;
        }

        if (newDisplayName.trim() !== "") {
          await updateProfile(user, { displayName: newDisplayName });
          updateUserDisplayName(newDisplayName);
        }

        
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Imagen de perfil actualizada correctamente!",
          showConfirmButton: false,
          timer: 2500,
        });
      } else if (newDisplayName.trim() !== "") {
        await updateProfile(user, { displayName: newDisplayName });
        updateUserDisplayName(newDisplayName);

        
      } else {
        setError("No se realizaron cambios.");
      }
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      setError(
        "Error al guardar los cambios. Por favor, inténtelo de nuevo más tarde."
      );
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
    <>
    <section className="max-w-7xl  mx-auto mt-10 ">
      <div className="bg-white relative shadow rounded-lg rounded-b-none w-full md:w-5/2 lg:w-4/6 xl:w-3/2 mx-auto">
        <div className="flex justify-center">
          <img
            id="imagenPrevia"
            src={
              preview ||
              user?.photoURL ||
              "https://res.cloudinary.com/dhickjcbz/image/upload/v1690770100/user_r20d1h.png"
            }
            className="rounded-full mx-auto absolute -top-10 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
            alt=""
          />
        </div>
        <div className="flex flex-col justify-between text-xs md:flex-row md:justify-between">
          {usersFinder?.role === "artista" && (
            <div className="md:ml-10 mt-2 md:mt-0">
              <p className="font-bold">Nombre Artístico :</p>
              <p className="text-gray-400 font-medium">{upperLetter(datosartist?.nameBand)}</p>
            </div>
          )}
          {usersFinder?.role === "artista" && (
            <div className="mt-2">
              <p className="font-bold">Año de Creación:</p>
              <p className="text-gray-400 font-medium">{datosartist?.yearCreation}</p>
            </div>
          )}
        </div>
        <div className="h-50 mt-10 py-14 md:w-1/8">
          <div className="flex text-center justify-center">
            <button
              data-te-toggle="tooltip"
              title="Cambiar foto de Perfil"
              onClick={() => document.querySelector('input[type="file"]').click()}
              className="ml-2 flex hover:bg-secondaryColor text-white font-bold rounded text-xs"
            >
              <BiSolidPlusSquare size="20" color="#242565" />
            </button>
            <input type="file" onChange={handleImageChange} className="hidden" />
          </div>
          {error && <p className="text-red-600 text-base">Error: {error}</p>}
          <h1 className="font-bold text-center text-3xl text-gray-900">{upperLetter(user?.displayName)}</h1>
          <h1 className="text-center text-sm text-gray-400 font-medium">{user?.email}</h1>
          <span className="mt-15 text-white"> holis </span>
          <p className="flex text-center justify-center text-xs text-gray-400 font-medium">
            <MdLocationOn size="15" color="#ed4690" /> Rosario
          </p>
        </div>
        <div className="flex flex-col text-sm items-center">
          <p className="mb-2">Cambiar Nombre:</p>
          {user?.displayName ? (
            <div className="flex flex-col items-center">
              <input
                placeholder="nuevo nombre"
                type="text"
                className="placeholder-indigo-400 text-center text-sm border-b border-primaryColor focus:outline-none focus:border-black"
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
              />
              <button
                onClick={handleSAVEe}
                className="mt-1 mb-2 bg-primaryColor hover:bg-secondaryColor text-white font-bold py-2 px-4 rounded text-xs"
              >
                Guardar Cambios
              </button>
            </div>
          ) : (
            <p>Cargando...</p>
          )}
          {error && <p className="text-red-600 text-base">Error: {error}</p>}
        </div>
      </div>
      <div>
        <div className="flex  justify-center items-center">
          <div className="py-10 w-full md:w-2/4 border-t border-blueGray-200 bg-white text-center">
            <div className="flex flex-wrap justify-center">
              <div className="justify-center items-center">
                <div className="flex-1 px-4">
                  <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                    {<MyShopping user_id={user} />}
                  </p>
                  <a href="#pablo" className="font-normal text-pink-500"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
  );
}

