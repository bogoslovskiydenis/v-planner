import { Outlet } from "react-router-dom"
import { Footer } from "../Footer/Footer"
import CabinetHeader from "../Header/CabinetHeader"

const CabinetLayout = () => {
  return <>
    <CabinetHeader />
    <Outlet />
    <Footer />
  </>
}

export default CabinetLayout