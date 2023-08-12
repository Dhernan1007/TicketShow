import "./App.css";
import { Route, Routes, /* useLocation */ } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Detail from "./Views/Detail/Detail";
import Home from "./Views/Home/Home";
import {CartPage} from "./components/Shoppingcart/Shoppingcart"
import LoginForm from "./components/FormFirebase/FormLogin";
import RegisterForm from "./components/FormFirebase/FormRegister";
import Artist from "./components/FormFirebase/FormArtist";
import About from "./Views/AboutUs/About";
import { AuthProvider } from "../src/context/AuthContext";
import CompraPaypal from "./components/Paypal/Paypal.compra.jsx";
import { ShoppingCartProvider } from "./components/Shoppingcart/shoppingCartContext";
import UserProfile from "./components/UserProfile/Profileuser";
import Dashboard from '../src/Dashboard/Dashboard'
import CreateEvent from "./components/CreateEvent/CreateEvent";

import EditEvent from "./components/CreateEvent/EdiEvent"
function App() {
  //const location = useLocation();
  return (
    <ShoppingCartProvider>
      <AuthProvider>
        <div className="App">
        <NavBar />
          <Routes>
            <Route path="/registerUser" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/registerArtist" element={<Artist />} />
            <Route path="/createEvent" element={<CreateEvent />} />
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/editEvent/:eventId" element={<EditEvent/>} />
            <Route path="/approved" element={<CompraPaypal/>}/>
            <Route path="/about" element={<About />} />
            <Route path="/PanelAdmin" element={<Dashboard/>} />
            <Route path="*" element={<CompraPaypal/>} />
          </Routes>
        </div>
      </AuthProvider>

    </ShoppingCartProvider>
  );
}
export default App;
