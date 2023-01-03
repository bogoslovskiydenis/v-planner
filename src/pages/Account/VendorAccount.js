import { useEffect } from "react"
import { useParams } from "react-router-dom"
import VendorUpdateAboutCompanyForm from "../../components/Forms/Vendor/VendorUpdateAboutCompanyForm"
import VendorUpdateCompanyInformationForm from "../../components/Forms/Vendor/VendorUpdateCompanyInformationForm"
import VendorUpdatePersonalInfarmationForm from "../../components/Forms/Vendor/VendorUpdatePersonalInfarmationForm"
import VendorUpdatePhotoAndVideoForm from "../../components/Forms/Vendor/VendorUpdatePhotoAndVideoForm"
import VendorUpdateServiceDetailsForm from "../../components/Forms/Vendor/VendorUpdateServiceDetailsForm"
import VendorUpdateSocialNetvorksForm from "../../components/Forms/Vendor/VendorUpdateSocialNetvorksForm"
import Security from "../../components/Security"

export default function VendorAccount() {

  const { id } = useParams()

  useEffect(() => {
    const selector = document.querySelector(`[data-to="${id}"]`)
    if(!selector) return

    const { offsetTop } = selector

    window.scrollTo({
      top: offsetTop - 80,
      behavior: "smooth"
    })
  }, [id])

  return (
    <section className="account">
      <VendorUpdatePersonalInfarmationForm />
      <VendorUpdateCompanyInformationForm />
      <VendorUpdateServiceDetailsForm />
      <VendorUpdateAboutCompanyForm />
      <VendorUpdatePhotoAndVideoForm />
      <VendorUpdateSocialNetvorksForm />
      <Security />
    </section>
  )
}