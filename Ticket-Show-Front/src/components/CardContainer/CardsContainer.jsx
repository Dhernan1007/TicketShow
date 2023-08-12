import { useSelector } from "react-redux";
import Card from "../Card/Card";
import { Link } from 'react-router-dom';
const CardsContainer = () => {
  
  const Events = useSelector((state) => state.Events);
  const activeEvents = Events.filter((event) => !event.deleted);
  console.log(Events);
  return (
    <div className=" mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 ">
      {activeEvents.map((evento) => {
        return (
          <Link key={evento.id} to={`/editEvent/${evento.id}`}>
          <Card
           // event={evento}
            key={evento.id}
            id={evento.id}
            name={evento.name}
            image={evento.image}
            summary={evento.description}
            date={evento.date}
            genre={evento.genres}
            lugar={evento.address}
            city={evento.city}
            cost={evento.price}
          />
          </Link>
        );
      })}
    </div>
  );
};



export default CardsContainer;