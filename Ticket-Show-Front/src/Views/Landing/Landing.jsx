
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="  bg-primaryColor/95 background-radial-gradient mb-10 w-full">
      <div className="w-full py-12 text-center md:px-12 lg:text-left ">
        <div className=" mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl ">
          <div className="grid items-center gap-12 lg:grid-cols-2 ">
            <div className="mt-12 lg:mt-0">
              <h1 className="mt-0 mb-2 text-5xl font-bold tracking-tight md:text-4xl xl:text-7xl text-secondaryColor">
                ¿Eres Artista?<br />
                <span className="text-white text-"></span>
              </h1>
              <h1 className="mt-0 mb-12 text-5xl tracking-tight md:text-4xl xl:text-5xl text-white">
                ¡Crea tu Evento!: Fácil, Rápido y Seguro. <br />
              </h1>
              <Link to="/registerArtist">
                <a
                  className="mb-2 inline-block rounded bg-neutral-50 px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] md:mr-2 md:mb-0"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  href="#!"
                  role="button"
                >
                  <strong>Ingresar</strong>
                </a>{" "}
              </Link>
            </div>
            <div className="mb-12 lg:mb-0">
              <img
                src="https://loopnewslive.blob.core.windows.net/liveimage/sites/default/files/2021-01/C87cAdPUCM.jpg"
                className="w-full rounded-lg shadow-lg dark:shadow-black/20"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
