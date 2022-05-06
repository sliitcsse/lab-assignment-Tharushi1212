import { BrowserRouter as Router, Route, Routes , Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import All from "./components/Display";
import CustomerLogin from "./components/CustomerLogin";
import RegisterCustomer from "./components/RegisterCustomer";
import ViewCustomer from "./components/ViewCustomer";
import ViewWishList from "./components/ViewWishList";
import VPromo from "./components/ViewPromotion";
import SellerRegister from "./components/SellerRegister";
import AddPromotion from "./components/addPromotion";
import AddItem from "./components/AddItem"
import AddTocart from "./components/AddToCart";
import AddWList from "./components/AddWishList";
import viewItm from "./components/viewItm";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<Navigate to={"login"} />} />
          <Route path="/add" element={<RegisterCustomer />} />
          <Route path="/login" element={<CustomerLogin />} />
          <Route path="/products" element={<All />} />
          <Route path="/addseller" element={<SellerRegister />} />
          <Route path="/AddItem" element={<AddItem />} />
          <Route path="/viewList" element={<ViewWishList />} />
          <Route path="/AllCustomer" element={<ViewCustomer />} />
          <Route path="/Addpromo" element={<AddPromotion />} />
          <Route path="/viewPromotion" element={<VPromo />} />
          <Route path="/viewItems" element={<viewItm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
