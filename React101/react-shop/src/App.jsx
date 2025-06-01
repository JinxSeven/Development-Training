import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import TopNavigation from "./components/TopNavigation";
import Home from "./pages/Home";
import Products from "./pages/Products";

function App() {
  return (
    <>
    <Router>
      <TopNavigation></TopNavigation>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/products" element={<Products/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
