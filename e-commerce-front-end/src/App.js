import { Footer, Header, Blog } from "./containers";
import { CTA, Navbar } from "./components";
import "./App.css";

import AppProducts from "./external_Links/mainProducts/AppProducts";
import MonoProduct from "./external_Links/monoProducts/MonoProduct";
import MyLogIn from "./external_Links/authenticators/MyLogin";
import ForgotPassword from "./external_Links/forgotPassword/ForgotPassword";
import ProductRequest from "./external_Links/requestAsset/ProductRequest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartItems from "./components/cart/CartItems/CartItems";
import { CartProvider } from "./Context/CartContex";
import Delivery from "./components/deliver/Delivery";
import About from "./components/about/About";

const App = () => (
  <BrowserRouter>
    <div className="App">
      <div className="gradient__bg">
        <CartProvider>
          <Navbar />
          {/* Search functionality to be seen */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<MonoProduct />} />
            <Route path="/products" element={<AppProducts />} />
            <Route path="/products/electronics/:id" element={<MonoProduct />} />
            <Route path="/products/equipHome/:id" element={<MonoProduct />} />
            <Route path="/products/peopleFashion/:id" element={<MonoProduct />} />
            <Route path="/login" element={<MyLogIn />} />
            <Route path="/requests" element={<ProductRequest />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/cart" element={<CartItems />} />
            <Route path="/about" element={<About />} />
            <Route path="/delivery" element={<Delivery />} />
          </Routes>
        </CartProvider>
      </div>
    </div>
    <Footer />
  </BrowserRouter>
);

const Home = () => (
  <>
    <Header />
    <Blog />
    <CTA />
  </>
);

export default App;
