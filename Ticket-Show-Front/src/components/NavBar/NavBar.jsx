/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import logoTicketShow from "../../assets/logos/logoTicketShow.svg";
import { useAuth } from "../../context/AuthContext"; // Importa el useAuth del contexto
import { CartContext } from "../Shoppingcart/shoppingCartContext";
import { useSelector } from "react-redux";
//import CreateEvent from "../CreateEvent/CreateEvent";
import { LiaShoppingCartSolid, LiaUserSolid } from "react-icons/lia";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";


const NavBar = () => {
  //const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [ open, setOpen ] = useState(false);
  const { user, logout } = useAuth(); // Extrae el usuario y la función de logout del contexto
  const users = useSelector((state) => state?.user);
  const userEmail = user && user.email ? user.email : ''; //mail
  
  const usersFinder = users?.length
    ? users?.find((rol) => rol.email?.toLowerCase() === userEmail?.toLowerCase())
    : null;
  const activeStyle = "underline-offset-5 border-b-2 border-secondaryColor";
 
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const [cart, setCart] = useContext(CartContext);
  const quantity = cart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);


  return (
    <nav className="md:flex md:justify-between md:items-center md:bg-transparent w-full py-5 md:px-6 lg:px-0 text-md font-light max-w-5xl md:mx-auto">
      <ul>
        <NavLink to="/" className="ml-6 md:ml-0 flex md:items-center gap-3">
          <li>
            <img className="w-8" src={logoTicketShow} alt="logo" />
          </li>
          <li className="font-bold text-2xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-secondaryColor to-ChryslerBlue">
            TicketShow
          </li>
        </NavLink>
      </ul>
      <div 
        className="absolute cursor-pointer right-8 top-7 md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <AiOutlineClose size={26} /> : <AiOutlineMenu size={26} />}
      </div>

      <ul className={`flex flex-col pl-4 md:ml-0 py-5 md:py-0 mt-4 md:mt-0 md:flex md:flex-row md:items-center md:justify-between gap-4 md:gap-0 absolute md:static bg-BackgroundLight md:z-auto z-10 w-full md:w-auto transition-all duration-500 ease-in ${open ? 'top-10 opacity-100' : 'top-[-400px]'} md:opacity-100 opacity-0 `}>
        <li className="ml-4">
          <NavLink
            to="/"
            onClick={closeDropdown}
            className={({ isActive }) => (isActive ? activeStyle : "")}
          >
            Home
          </NavLink>
        </li>
        <li className="ml-4">
          <NavLink
            to="/about"
            onClick={closeDropdown}
            className={({ isActive }) => (isActive ? activeStyle : "")}
          >
            Acerca de
          </NavLink>
        </li>
        {/* <li className="ml-4">
          <NavLink
            to="/approved"
            onClick={closeDropdown}
            className={({ isActive }) => (isActive ? activeStyle : "")}
          >
            Calificanos
          </NavLink>
        </li> */}

        {/* //- Botón de carrito (solo se muestra si el usuario está autenticado) */}
        {/* Enlace del carrito */}
        {user && (
          <li className="ml-3 w-9">
            <NavLink to="/cart" className="flex items-center">
              <LiaShoppingCartSolid size={26} />
              {quantity}
            </NavLink>
          </li>
        )}

        {/* //- Si el usuario no está autenticado, muestra botón de "Regístrate" */}
        {!user && (
          <li className="relative ml-3">
            <div className="w-fit items-center overflow-hidden rounded-md border-solid border-2 border-secondaryColor hover:text-primaryColor hover:bg-Color300 hover:border-primaryColor duration-500">
              <button
                className="py-1 px-2 flex items-center"
                onClick={toggleDropdown}
              >
                Regístrate
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {/* //-Menu desplegable Registro -------- */}
            {isDropdownOpen && (
              <div
                className="absolute z-10 mt-2 w-36 divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                role="menu"
              >
                <div className="p-2">
                  <NavLink
                    to="/registerUser"
                    className="block rounded-lg px-4 py-2 text-sm hover:text-secondaryColor hover:bg-BackgroundLight"
                    role="menuitem"
                    onClick={closeDropdown}
                  >
                    Publico
                  </NavLink>

                  <NavLink
                    to="/registerArtist"
                    className="block rounded-lg px-4 py-2 text-sm hover:text-secondaryColor hover:bg-BackgroundLight"
                    role="menuitem"
                    onClick={closeDropdown}
                  >
                    Artista
                  </NavLink>
                </div>
              </div>
            )}
          </li>
        )}

        {/* //- Si el usuario está autenticado, muestra su nombre en la navbar */}
        {user && (
          <div className="relative w-fit md:ml-2">
            <li className="w-fit flex items-center overflow-hidden rounded-md border-solid border-2 border-secondaryColor hover:text-primaryColor hover:bg-Color300 hover:border-primaryColor ml-3 transition duration-500 ease-in-out transform">
              <button
                className="flex items-center py-1 px-2"
                onClick={toggleDropdown}
              >
                <span className="text-primaryColor font-semibold mr-1 ">
                  {user.displayName}
                </span>
                <LiaUserSolid size={24} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>

            {/* //- Si el usuario está autenticado, muestra el botón desplegable */}
            {user && (
              <div className="absolute right-0 md:mt-0 z-10 md:end-0">
                {/* //-Menu desplegable Usuario autenticado -------- */}
                {isDropdownOpen && (
                  <div
                    className="mt-2 w-36 divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                    role="menu"
                  >
                    <div className="p-2">
                      <NavLink
                        to="/profile"
                        className="block rounded-lg px-4 py-2 text-sm hover:text-secondaryColor hover:bg-BackgroundLight"
                        role="menuitem"
                        onClick={closeDropdown}
                      >
                        Perfil
                      </NavLink>
                      {usersFinder?.role === "artista" ? (
                        <NavLink
                          to="/createEvent"
                          className="block rounded-lg px-4 py-2 text-sm hover:text-secondaryColor hover:bg-BackgroundLight"
                          role="menuitem"
                          onClick={closeDropdown}
                        >
                          Crear Evento
                        </NavLink>
                      ) : null

                       }
                      {usersFinder?.role === "admin" ? (

                        <NavLink
                          to="/PanelAdmin"
                          className="block rounded-lg px-4 py-2 text-sm hover:text-secondaryColor hover:bg-BackgroundLight"
                          role="menuitem"
                          onClick={closeDropdown}
                        >
                          Panel admin
                        </NavLink>
                      ) : null}

                      <button
                        className="block rounded-lg px-4 py-2 text-sm hover:text-secondaryColor hover:bg-BackgroundLight"
                        role="menuitem"
                        onClick={() => {
                          logout();
                          closeDropdown();
                        }}
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* //- Botón de ingresar siempre visible */}
        {!user && (
          <li className="ml-3">
            <NavLink to="/login">
              <button className="py-1.5 px-3 rounded-md bg-primaryColor text-Color200 hover:text-black hover:bg-white border-2 hover:border-primaryColor">
                Ingresa
              </button>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;