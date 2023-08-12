/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  updateUser,
  getUserByEmail,
  getUserById,
} from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Suponiendo que el ícono FcGoogle proviene de react-icons
import registerPublic from "../../assets/image/registerPublic.jpg";
import Swal from "sweetalert2";
//import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const validate = (form) => {
  let errors = {};
  if (!form.name) {
    errors.name = "Debes colocar tu nombre";
  } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
    errors.name = "El nombre solo puede tener letras y espacios";
  }
  if (!form.emailRegister) {
    errors.emailRegister = "Debes colocar un email";
  } else if (
    !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(form.emailRegister)
  ) {
    errors.emailRegister = "Debes colocar un email valido";
  }
  if (!form.passwordRegister) {
    errors.passwordRegister = "Debes colocar una contraseña";
  } else if (!/^(?=.*\d)(?=.*[a-zA-Z])(.{7,})$/.test(form.passwordRegister)) {
    errors.passwordRegister =
      "Debe tener un Numero, una letra y ser mayor de 6 caracteres";
  }
  return errors;
};

const FormFirebase = () => {
  const [imageFile, setImageFile] = useState(null);
  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = auth.user;
  const usuario = useSelector((state) => state.user);
  const oneUserCreated = useSelector((state) => state.user);

  const [nombreToDB, setNombreToDB] = useState("");
  const [emailToDB, setEmailToDB] = useState("");

  /* const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [name, setName] = useState(""); */

  const [form, setForm] = useState({
    name: "",
    emailRegister: "",
    passwordRegister: "",
  });

  // errores en el formularios
  const [errors, setErrors] = useState({
    name: true,
    emailRegister: true,
    passwordRegister: true,
  });

  const handlerInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  };



  const validRegister = Array.isArray(usuario)
    ? usuario.filter((usr) => usr.email === form.emailRegister)
    : [];
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const validLogin = usuario?.filter(usr => usr.email === email);// NO DESCOMENTAR

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    image: "",
    verified: true,
    role: "customer",
  });

  useEffect(() => {
    setNombreToDB(user?.displayName);
    setEmailToDB(user?.email);
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      name: nombreToDB || prevUserInfo.name,
      email: emailToDB || form.emailRegister || prevUserInfo.email,
      image: null,
    }));
  }, [
    user?.displayName,
    user?.email,
    emailToDB,
    nombreToDB,
    form.emailRegister,
    dispatch,
  ]);

  const clearState = () => {
    setNombreToDB("");
    setEmailToDB("");

    // setForm.emailRegister("");
    // setForm.passwordRegister("");

    setEmail("");
    setPassword("");
    setUserInfo({
      name: "",
      email: "",
      password: "",
      address: "",
      verified: true,
      role: "customer",
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    // Agregar la imagen al estado userInfo
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      image: file,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validRegister?.length > 0) {
      return Swal.fire({
        position: "center",
        icon: "warning",
        title: "Correo en uso!, Si pruebas con otro?",
        showConfirmButton: false,
        timer: 2500,
      });
    }

    try {
      // Establecer la imagen predeterminada (puedes cambiar esta URL por la que desees)
      const defaultImageUrl =
        "https://res.cloudinary.com/dhickjcbz/image/upload/v1690770100/user_r20d1h.png";

      // Asignar la URL de la imagen predeterminada al objeto userInfo
      const userInfoWithImage = {
        ...userInfo,
        image: defaultImageUrl,
      };

      // Crear el usuario en Firebase (asumiendo que esto funciona correctamente)
      await auth.register(form.emailRegister, form.passwordRegister, form.name);
      dispatch(createUser(userInfoWithImage));
      clearState();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usuario registrado correctamente!",
        showConfirmButton: false,
        timer: 2500,
      });

      dispatch(getUserById());
      console.log(getUserById, "users de la db");
      navigate("/"); // Redireccionar al usuario a la página de inicio
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      // Manejar el error aquí
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    try {
      const respGoogle = await auth.loginWithGoogle();
      if (respGoogle.operationType === "signIn") {
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          name: respGoogle.user.displayName,
          email: respGoogle.user.email,
        }));
        clearState(); // Limpiar el estado
        dispatch(getUserById());
        redirectLogin(respGoogle.user);
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      // Manejar el error aquí
    }
  };

  const redirectLogin = (userGoogle) => {
    const matchGoogleEmail = usuario?.find(
      (usr) => usr.email === userGoogle.email
    );
    if (matchGoogleEmail?.email) {
      navigate("/"); // Redireccionar al usuario a la página de inicio
    } else {
      dispatch(
        createUser({
          ...userInfo,
          name: userGoogle.displayName,
          email: userGoogle.email,
        })
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usuario registrado correctamente!",
        showConfirmButton: false,
        timer: 2500,
      });

      if (oneUserCreated) {
        dispatch(getUserById());
        navigate("/"); // Redireccionar al usuario a la página de inicio
      }
    }
  };

  

  return (
    <div className="w-full flex justify-center items-center mt-10 max-w-4xl md:mx-auto md:mb-6">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col-reverse md:flex-row w-full justify-center mx-10 md:mx-0">
        {/* image section */}
        <section className="w-2/4">
          <img
            src={registerPublic}
            alt="Register image"
            className="rounded-l-2xl hidden md:flex md:object-cover h-full"
          />
        </section>

        <section className="p-6 flex flex-col justify-center items-center w-full md:w-2/4 text-left">
          <div className="my-4 text-base text-Color1000 flex flex-col gap-3">
            <h2 className="text-4xl font-bold text-primaryColor text-left">
              Regístrate
            </h2>
            <p className="text-base text-Color1000 text-left">
              Regístrate con nosotros y entérate de nuevos eventos.
            </p>
          </div>

          <form
            className="flex flex-col gap-6 w-full justify-center items-center px-3"
            onSubmit={handleRegister}
          >
            <section className="w-full">
              <input
                placeholder="Nombre completo"
                type="text"
                name="name"
                onChange={handlerInputChange}
                value={form.name}
                className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name}</p>
              )}
            </section>
            <section className="w-full">
              <input
                placeholder="Correo electrónico"
                type="email"
                name="emailRegister"
                value={form.emailRegister}
                onChange={handlerInputChange}
                className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
              />
              {errors.emailRegister && (
                <p className="text-xs text-red-500">{errors.emailRegister}</p>
              )}
            </section>

            <section className="w-full">

  <div className="relative">
    <input
      placeholder="Contraseña"
      type={showPassword ? "text" : "password"}
      name="passwordRegister"
      onChange={handlerInputChange}
      value={form.passwordRegister}
      className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor pr-12"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute top-1/2 right-2 transform -translate-y-1/2 text-secondaryColor focus:outline-none"
    >
      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
    </button>
  </div>
</section>

            {/* <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-3/4 rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
        /> */}
            <button
              type="submit"
              className="w-4/5 bg-primaryColor text-Color200 hover:bg-Color200 hover:text-primaryColor border hover:border-secondaryColor focus:outline-none px-10 py-3.5 text-base font-medium 
            transition duration-500 ease-in-out transform shadow-md rounded-xl"
            >
              Registrarse
            </button>
          </form>

          <span className="m-4 text-sm text-secondaryColor">ó</span>
          <button
            onClick={handleGoogle}
            type="submit"
            className="flex justify-center items-center gap-2 md:gap-3 md:w-3/4 bg-Color200 text-primaryColor hover:bg-white hover:text-primaryColor border hover:border-secondaryColor focus:outline-none px-3 md:px-10 py-3.5 font-medium 
            transition duration-500 ease-in-out transform shadow-md rounded-xl mb-4"
          >
            <FcGoogle /> Regístrate con Google
          </button>
        </section>
      </div>
    </div>
  );
};

export default FormFirebase;
