/* eslint-disable react/prop-types */
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getComment } from "../../redux/actions";

const Reviews = () => {
  const comment = useSelector((state) => state.comment);
  console.log(comment, "este es el estado comment");

  const comentario = {
    name: comment.name,
    body: comment.body,
    email: comment.email,
    stars: comment.stars,
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComment());
  }, [dispatch]);

  console.log(comentario);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 2,
    speed: 500,
    slidesToScroll: 2,
    initialSlide: 1,
    prevArrow: <FiArrowLeftCircle color="#ed4690" />,
    nextArrow: <FiArrowRightCircle color="#ed4690" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
        },
      },
    ],
  };


  return (
    <div className="flex flex-col items-center justify-center w-full h-92 mt-8 mb-6 max-w-6xl">
      {/* <p>{comment.name}</p> */}
      <span className="mt-2 mb-7 font-bold text-3xl text-DarkTextPurple">
        Reseñas de los clientes que confían en nosotros{" "}
      </span>
      <Slider {...settings} className="w-4/5 ">
        {comment.map((element, index) => (
          <section key={index} className=" md:w-full md:h-92 overflow-hidden ">
            <div className="relative items-center w-full py-4 mx-auto px-4 max-w-7xl ">
              <div className="grid grid-cols-1">
                <div className="w-full max-w-lg mx-auto my-4 bg-white shadow-xl rounded-xl h-72">
                  <div className="p-6 lg:text-center">
                    <div className="mb-4 text-xs font-semibold tracking-widest text-blue-600 uppercase">
                      {Array.from({ length: element.stars }, (_, index) => (
                        <span
                          key={index}
                          className="text-yellow-500 text-xl cursor-pointer"
                        >
                          ⭐️
                        </span>
                      ))}
                    </div>
                    <h4 className="mt-4 text-2xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-3xl">
                      {element.name}
                    </h4>
                    <p className="mt-3 text-base leading-relaxed text-gray-500">
                      {element.body}
                    </p>
                    <span className="absolute inset-x-4 bottom-8 rounded-b-lg h-2 bg-gradient-to-r from-secondaryColor to-ChryslerBlue"></span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </Slider>
    </div>
  );
};

export default Reviews;