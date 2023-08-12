/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { CartContext } from "../Shoppingcart/shoppingCartContext";
import {
  LiaCartPlusSolid,
  LiaCartArrowDownSolid,
  LiaTicketAltSolid,
} from "react-icons/lia";
//import { addToCartBackend } from "../Shoppingcart/CartContext"

const Card = ({ id, image, name, date, price, genre, city, }) => {
  const { user } = useAuth(); // Obtén el usuario autenticado desde el contexto de autenticación

  const monthsMap = {
    "01": "ENE",
    "02": "FEB",
    "03": "MAR",
    "04": "ABR",
    "05": "MAY",
    "06": "JUN",
    "07": "JUL",
    "08": "AGO",
    "09": "SEP",
    10: "OCT",
    11: "NOV",
    12: "DIC",
  };

  const [year, month, day] = date.split("-"); // Dividimos la fecha en año, mes y día
  const formattedMonth = monthsMap[month];

  return (
    <div className="bg-white w-72 h-[350px] md:h-80 m-4 border shadow-md rounded-2xl flex-none lg:flex lg:flex-col transform transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className=" flex flex-col h-3/4 w-full justify-center items-center ">
        <img
          className="w-64 h-56 md:h-52 object-cover md:mt-3 rounded-lg"
          src={image}
          alt="imagen no encontrada"
        />
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-between md:p-2 mb-2 md:mb-0">
        <div className="w-full flex flex-col items-center h-full mx-2">
          <div className="w-full flex items-center justify-center h-1/4 truncate">
            <span className="font-semibold text-lg text-primaryColor ">
              {name}
            </span>
            {/* <span className="p-1 rounded-lg bg-DarkTextPurple text-Color200 text-sm font-extralight">
              $ {price}{" "}
            </span> */}
          </div>
          <div className="w-full text-black flex items-center justify-around md:justify-between md:mt-1">
            <div className="flex flex-col items-center justify-end">
              <p className="text-md text-ChryslerBlue">{formattedMonth}</p>
              <h2 className="text-2xl font-bold">{day}</h2>
            </div>
            {user && (
              <>
                <Link to={`/detail/${id}`}>
                  <button className="py-1.5 px-5 rounded-md bg-primaryColor/80 text-BackgroundLight hover:text-primaryColor hover:bg-white border hover:border-secondaryColor transition duration-500 ease-in-out transform">
                    {" "}
                    Compra tu ticket{" "}
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
