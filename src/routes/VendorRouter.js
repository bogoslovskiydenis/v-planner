import React  from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import AccountPageLayout from "../components/Layouts/AccountPageLayout"
import CabinetLayout from "../components/Layouts/CabinetLayout"
import MainPageLayout from "../components/Layouts/MainPageLayout"
import About from "../pages/About"
import VendorAccount from "../pages/Account/VendorAccount"
import Faq from "../pages/Faq"
import Help from "../pages/Help"
import VendorHistory from "../pages/History/VendorHistory"
import VendorOrders from "../pages/Orders/VendorOrders"
import Policy from "../pages/Policy"
import VendorQuotes from "../pages/Quotes/VendorQuotes"
import Reports from "../pages/Reports"
import Rules from "../pages/Rules"
import VendorChat from "../pages/Chat/VendorChat"

export default function VendorRouter() {
  return (
    <Routes>
      <Route path="/" element={<CabinetLayout />}>
        <Route path="/" element={<MainPageLayout />}>
          <Route path="/" element={<Navigate to="/chat" />} />
          <Route path="/about" element={<About />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/help" element={<Help />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/orders" element={<VendorOrders />} />
          <Route path="/quotes" element={<VendorQuotes />} />
          <Route path="/history" element={<VendorHistory />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/chat" element={<VendorChat />} />
          <Route path="/chat/:id" element={<VendorChat />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
        <Route path="/account" element={<AccountPageLayout />}>
          <Route path="/account" element={<VendorAccount />} />
          <Route path="/account/:id" element={<VendorAccount />} />
          <Route path="*" element={<Navigate to="/account" />} />
        </Route>
      </Route>
    </Routes>
  )
}