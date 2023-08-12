/* eslint-disable no-unused-vars */

import {useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postComment } from "../../redux/actions";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate} from "react-router-dom";

const CompraPaypal = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState('');
  const [stars, setStars] = useState('');
  const dispatch = useDispatch();
  const { user } = useAuth();

  
  const userEmail = user && user.email ? user.email : ''; //mail
  const userName = user && user.displayName ? user.displayName : ""; //nombre
  
  

  const handlerInputChange = (e) => {
    e.preventDefault();
    setReviews(e.target.value); //el comentario
  };

    const handleReviews = (e) => {
    e.preventDefault();
    const payload = {
      email: userEmail,
      name: userName,
      body: reviews,
      stars: stars, // Puedes ajustar esto según lo necesario
      // email: user.email
    };

    //dispatch(postComment(payload)) // Llama a la función con el correo electrónico y el payload
    axios.post(`/comment/postComments`, payload)
      .then((response) => {
        // Hacer algo con la respuesta si es necesario
        Swal.fire({
          position: "center",
          icon: "success",
          title: " ¡Valoramos tu opinion, muchas gracias!",
          showConfirmButton: false,
          timer: 2500,
        });

          navigate("/");
      

      })
      .catch((err) => {
        // Manejar el error si ocurre
        alert('Please fill the reviews')
      });

    setReviews('');
    //setNameUser('')
  };

  const handlerStars = (e)=> {
    e.preventDefault
    setStars(e.target.value);
  }




  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-16 max-w-lg mx-auto">
        <div className=" flex flex-col items-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl text-primaryColor font-bold mb-4">Gracias por su compra</h2>
          <p className="text-DarkTextPurple mb-6">
            Hemos recibido su compra y estamos procesando su pedido. Le enviaremos una confirmación por correo electrónico en breve.
          </p>
          <label className="text-DarkTextPurple">
            Valoramos tu opinión sobre tu compra:
            <textarea
              className="w-full border-2 border-secondaryColor rounded-lg p-2 focus:outline-none focus:border-ChryslerBlue"
              name="postContent"
              rows={4}
              cols={40}
              value={reviews}
              onChange={handlerInputChange}
            />

          </label>

          <spam className="text-DarkTextBlack">Calificanos</spam>

          <input
            className="block text-center w-44 border"
            type="range"
            name="stars"
            id="stars"
            min="1"
            max="5"
            step="1"
            value={stars}
            onChange={handlerStars}
          />
          <div className="ml-2 flex">
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className={ `mr-3 text-xl ${value <= stars ? 'text-red-500' : 'text-gray-400'} ${
                value <= parseInt(stars, 10) ? 'visible' : 'invisible'
              } cursor-pointer`}
              onClick={() => handlerStars({ target: { value } })}
            >
              ⭐️
            </span>
          ))}
        </div>
          <NavLink to="/">
            <button
              onClick={handleReviews}
              className="mt-6 block text-center bg-ChryslerBlue text-white py-2 px-4 rounded-md hover:bg-primaryColor transition duration-500"
            >
              Comenta y vuelve al inicio
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CompraPaypal;