import AppHeader from "./components/AppHeader";
import Showcase from "./components/Showcase";
import Home from "./components/Pages/Home/Home";
import ProductCard from "./components/Pages/ProductCard/ProductCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AppHeader title="nu3 App" />
      <Showcase>
        {/* Your components goes here... */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productName" element={<ProductCard />} />
        </Routes>
      </Showcase>
    </BrowserRouter>
  );
}

export default App;
