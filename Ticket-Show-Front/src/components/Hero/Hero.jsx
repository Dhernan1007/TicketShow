/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import taylorswift from "../../assets/image/taylor-swift.png";
import luismi from "../../assets/image/luis-miguel.png";
import roger from '../../assets/image/roger.png';

const Hero = () => {
  //- aca debe llegar el estado con las imágenes
  const images = [taylorswift, luismi, roger, 'https://www.tuentrada.com/concierto/ricardo-arjona/1920x710v2.webp', 'https://www.dfentertainment.com/wp-content/uploads/2023/05/1920x720-4-1536x576.png'];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const previous = () => {
    const condition = selectedIndex > 0;
    const nextIndex = condition ? selectedIndex - 1 : images.length - 1;
    setSelectedImage(images[nextIndex]);
    setSelectedIndex(nextIndex);
  };

  const next = () => {
    const condition = selectedIndex < images.length - 1;
    const nextIndex = condition ? selectedIndex + 1 : 0;
    setSelectedImage(images[nextIndex]);
    setSelectedIndex(nextIndex);
  };

  // useEffect para controlar el autoplay
  useEffect(() => {
    const intervalId = setInterval(next, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [selectedIndex]); // Actualizar el autoplay cuando cambia el índice seleccionado


  return (
    <div className="mt-3 mb-4 md:mb-10 w-full max-w-5xl mx-auto h-44 md:h-96 relative flex flex-col items-center justify-center md:px-6 lg:px-0">
      <img
        className="md:rounded-3xl object-cover w-full h-full md:h-96"
        src={selectedImage}
        alt="Imagen"
      />
      <div className="hidden absolute md:flex justify-between transform -translate-y-1/2 left-10 right-10 top-1/2">
        <button
          onClick={previous}
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 border border-transparent hover:border-secondaryColor">
            <svg
              className="w-4 h-4 text-secondaryColor dark:text-secondaryColor"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </span>
        </button>

        <button
          onClick={next}
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 border border-transparent hover:border-secondaryColor">
            <svg
              className="w-4 h-4 text-secondaryColor dark:text-secondaryColor"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Hero;
  



