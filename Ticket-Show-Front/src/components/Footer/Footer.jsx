const Footer = () => {
  return (
    <footer className="relative bg-blueGray-500 pt-8 pb-6 w-full my-14 max-w-5xl">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap text-left lg:text-left">
        <div className="w-full lg:w-6/12 px-4 inline-block">
          <h4 className="text-3xl font-semibold text-blueGray-700">¡Sigamos en contacto!</h4>
          <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
            Encuentranos en  estas plataformas, respondemos en el día.
          </h5>
          <div className="flex items-center">
          <div className="inline-block mr-4"> 
              <img src="https://freelogopng.com/images/all_img/1690643591twitter-x-logo-png.png" alt="Logo" className="w-6 h-6" />
              <div className="text-sm font-medium"></div>
            </div>
            <div className="inline-block mr-4"> 
              <img src="https://w7.pngwing.com/pngs/477/609/png-transparent-logo-computer-icons-instagram-logo-instagram-logo-miscellaneous-text-trademark.png" alt="Logo" className="w-6 h-6" />
              <div className="text-sm font-medium"></div>
              </div>
              <div className="inline-block mr-4"> 
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png" alt="Logo" className="w-6 h-6" />
              <div className="text-sm font-medium"></div>
              </div>
              <div className="inline-block mr-4"> 
              <img src="https://png.pngtree.com/png-clipart/20191120/original/pngtree-email-icon-png-image_5065641.jpg" alt="Logo" className="w-6 h-6" />
              <div className="text-sm font-medium"></div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;