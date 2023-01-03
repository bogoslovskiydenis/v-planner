import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import GuestHeader from "../Header/GuestHeader";

const GuestLayout = () => {
  return (
    <>
      <GuestHeader />
      <Outlet />
      <Footer />
    </>
  )
}


export default GuestLayout;