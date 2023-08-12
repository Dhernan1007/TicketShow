import { useEffect, useState } from "react";
import { auth, database } from "../firebase/firebase.config";
import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  
} from "firebase/auth";
import { ref, set, get } from "firebase/database";
import axios from "axios";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.log("contexto no creado");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null); // Nuevo estado para los datos adicionales del usuario

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("No hay usuario suscrito");
        setUser(null);
        setUserData(null); // Reiniciar los datos adicionales del usuario al cerrar sesión
      } else {
        setUser(currentUser);
        loadUserData(currentUser.uid); // Cargar los datos adicionales del usuario al loquearse
        const userData = {
          email: currentUser.email,
          displayName: currentUser.displayName,
        
        };

        set(ref(database, "usuarios/" + currentUser.uid), userData)
          .then(() => {
            console.log("Datos del usuario guardados en la base de datos.");
          })
          .catch((error) => {
            console.error(
              "Error al guardar los datos del usuario en la base de datos:",
              error
            );
          });
      }
    });

    return () => unsubscribe();
  }, []);
   // Nueva función para actualizar el nombre del usuario
    const updateUserDisplayName = async (newDisplayName) => {
    setError(null);
    try {
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName
      });
      setUser({...user, displayName: newDisplayName});
      // Actualizar también los datos adicionales del usuario en la base de datos
      const userId = user.uid;
      const userData = {
        email: user.email,
        displayName: newDisplayName,
      };
      set(ref(database, "usuarios/" + userId), userData)
        .then(() => {
          console.log("Nombre del usuario actualizado en la base de datos.");
        })
        .catch((error) => {
          console.error(
            "Error al actualizar el nombre del usuario en la base de datos:",
            error
          );
        });
    } catch (error) {
      console.error("Error al actualizar el nombre del usuario:", error);
      setError("Error al actualizar el nombre del usuario.");
    }
  };


  const updateUserPhotoURL = async (newPhotoURL) => {
    setError(null);
    try {

   console.log(newPhotoURL, " QUIERO VER SI FUNCIONA LA URL")
    // Cambiar foto de perfil y guardar cambios localmente
      await updateProfile(auth.currentUser, {
      displayName: user.displayName, // Incluye el campo displayName en el objeto de configuración
      photoURL: newPhotoURL,

    });

    setUser({ ...user, photoURL: newPhotoURL });

    // Actualizar también la URL de la imagen en la base de datos
    const userId = user.uid;
    const userData = {
      email: user.email, // Incluye otros campos si es necesario
      displayName: user.displayName,
      image: newPhotoURL,
    };

    set(ref(database, "usuarios/" + userId), userData)
      .then(() => {
        console.log("URL de la imagen actualizada en la base de datos.");
      })
      .catch((error) => {
        console.error(
          "Error al actualizar la URL de la imagen en la base de datos:",
          error
        );
      });
  } catch (error) {
    console.error("Error al actualizar la imagen de perfil:", error);
    setError("Error al actualizar la imagen de perfil. Por favor, inténtelo de nuevo más tarde.");
  }
  };

   // Función para cargar los datos adicionales del usuario desde la base de datos
   const loadUserData = (userId) => {
    const userRef = ref(database, "usuarios/" + userId);

    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          console.log("Datos del usuario no encontrados en la base de datos.");
        }
      })
      .catch((error) => {
        console.error("Error al cargar los datos del usuario desde la base de datos:", error);
      });
  };

  const register = async (email, password, displayName, image) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
  
      // Establecer el displayName antes de almacenar los datos en Firebase
      await updateProfile(auth.currentUser, {
        displayName: displayName
      });
  
      // Actualizar el estado del usuario con la información del registro
      setUser({ ...response.user, displayName: displayName });
       // Crear el nodo "usuarios" en la base de datos y almacenar los datos iniciales
       const userId = response.user.uid;
       const userData = {
         email: response.user.email,
         displayName: displayName,
         image: image,
         // Agregar otros datos iniciales si es necesario
       };
  
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setError(error.message);
    }
  };
  
    const checkUserDisabled = async (email) => {
      try {
        const response = await axios.get(`/user/checkUserDisabled/${email}`);
        return response.data.disabled;
      } catch (error) {
        console.error("Error al verificar el estado del usuario:", error);
        return false;
      }
    };

  

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
  // Verificar el estado del usuario en las tablas "artists" y "users" en PostgreSQL antes de permitir el inicio de sesión
  const userDisabled = await checkUserDisabled(email);

  if (userDisabled) {
    // Si el usuario está deshabilitado en alguna de las tablas, manejarlo aquí
    console.log("Usuario deshabilitado. No se permite el inicio de sesión.");
    setError("Usuario deshabilitado. No se permite el inicio de sesión.");
    return false;
  }


      console.log(response);
      setUser(response.user);
      loadUserData(response.user.uid); // Cargar los datos adicionales del usuario al iniciar sesión
      return response.operationType === "signIn" ? true : false;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(error.message);
      return false;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      setUser(response.user);
      const userData = {
        email: response.user.email,
        displayName: response.user.displayName,
      };
      set(ref(database, "usuarios/" + response.user.uid), userData)
        .then(() => {
          console.log("Datos del usuario guardados en la base de datos.");
        })
        .catch((error) => {
          console.error(
            "Error al guardar los datos del usuario en la base de datos:",
            error
          );
        });
      return response;
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      setError(error.message);
      return null;
    }
  };


  

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setError(error.message);
    }
  };

  

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        loginWithGoogle,
        logout, // Agregamos la función logout al contexto
        user,
        error,
        updateUserDisplayName,
        updateUserPhotoURL,
        checkUserDisabled,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;