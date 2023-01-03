import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { ModalContext } from "../../context/ModalContext"
import useStep from "../../hooks/useStep"
import VendorAboutCompanyForm from "../Forms/Vendor/VendorAboutCompanyForm"
import VendorCompanyInformationForm from "../Forms/Vendor/VendorCompanyInformationForm"
import VendorCreatePasswordForm from "../Forms/Vendor/VendorCreatePasswordForm"
import VendorPersonalInfarmationForm from "../Forms/Vendor/VendorPersonalInfarmationForm"
import VendorPhotoAndVideoForm from "../Forms/Vendor/VendorPhotoAndVideoForm"
import VendorServiceDetailsForm from "../Forms/Vendor/VendorServiceDetailsForm"
import VendorSocialNetvorksForm from "../Forms/Vendor/VendorSocialNetvorksForm"
import Logo from "../UI/Logo"
import ModalMiddleContent from "../UI/Modal/ModalMiddleContent"
import { Step, StepProgress, StepContent, StepTab } from "../UI/Step"
import SignInVendorModal from "./SignInVendorModal"
import SignUpUserModal from "./SignUpUserModal"

const SignUpVendorModal = () => {

  const auth = useContext(AuthContext)
  const modal = useContext(ModalContext)

  const step = useStep()

  const signInVendor = () => modal.setContent(<SignInVendorModal />)
  const signUpUser = () => modal.setContent(<SignUpUserModal />)

  const nextStep = number => {
    step.nextStep(number)
  }

  const signIn = data => {
    auth.login(data.email, data.password, process.env.REACT_APP_ROLE_VENDOR)
    modal.destroy()
  }

  const titleList = [
    "Personal Information",
    "Company",
    "Service Details",
    "About Company",
    "Photo And Video",
    "Social Networks",
    "Create Password"
  ] 

  const subTitleList = [
    "All fields are required",
    "All fields are required",
    "You can fill in these fields later",
    "You can fill in these fields later",
    "You can fill in these fields later",
    "You can fill in these fields later",
    "All fields are required"
  ]

  return (
    <ModalMiddleContent>
      <div className="middle-modal__header">
        <Logo className="middle-modal__logo"/>
        <h4 className="middle-modal__title">{ titleList[step.currentStep] }</h4>
      </div>
      <div className="middle-modal__body">
        <Step>
          <StepProgress
            stepCount={7}
            currentStep={step.currentStep}
            text={subTitleList[step.currentStep]}
          />
          <StepContent stepCount={7} currentStep={step.currentStep}>
            <StepTab stepNumber={0} currentStep={step.currentStep}>
              <VendorPersonalInfarmationForm onCallback={data => nextStep(1)} />
            </StepTab>
            <StepTab stepNumber={1} currentStep={step.currentStep}>
              <VendorCompanyInformationForm onCallback={data => nextStep(2)} onBack={() => nextStep(0)} />
            </StepTab>
            <StepTab stepNumber={2} currentStep={step.currentStep}>
              <VendorServiceDetailsForm onCallback={data => nextStep(3)} onBack={() => nextStep(1)} />
            </StepTab>
            <StepTab stepNumber={3} currentStep={step.currentStep}>
              <VendorAboutCompanyForm onCallback={data => nextStep(4)} onBack={() => nextStep(2)} />
            </StepTab>
            <StepTab stepNumber={4} currentStep={step.currentStep}>
              <VendorPhotoAndVideoForm onCallback={data => nextStep(5)} onBack={() => nextStep(3)} />
            </StepTab>
            <StepTab stepNumber={5} currentStep={step.currentStep}>
              <VendorSocialNetvorksForm onCallback={data => nextStep(6)} onBack={() => nextStep(4)} />
            </StepTab>
            <StepTab stepNumber={6} currentStep={step.currentStep}>
              <VendorCreatePasswordForm onCallback={signIn} onBack={() => nextStep(5)} />
            </StepTab>
          </StepContent>
        </Step>
      </div>
      {step.currentStep === 0 && (
        <div className="middle-modal__footer">
          <div>Already a member? <span className="middle-modal__link" onClick={signInVendor}>Sign In</span></div>
          <div>Sign up as <span className="middle-modal__link" onClick={signUpUser}>User</span></div>
        </div>
      )}
    </ModalMiddleContent>
  )
}

export default SignUpVendorModal