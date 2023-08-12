/* eslint-disable react/prop-types */
const Paginate = ({
  eventsPerPage,
  allEvents,
  paginate,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allEvents / eventsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  const totalPages = Math.ceil(allEvents / eventsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="flex mb-6 md:gap-2 h-9">
      <button
        className=" px-3 py-1.5 text-sm text-primaryColor cursor-pointer" 
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Atrás
      </button>
      {pageNumbers?.map((number) => (
        <button
          className={`px-3 py-1.5 text-sm font-medium 
          text-primary-700 transition-all duration-300 ${
            number === currentPage
              ? "text-secondaryColor border-2 rounded-full border-secondaryColor"
              : "text-primary-700"
          }`}
          key={number}
          onClick={() => paginate(number)}
        >
          {number}
        </button>
      ))
      }
      <button
        className="px-3 py-1.5 text-sm text-primaryColor cursor-pointer"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Paginate;
