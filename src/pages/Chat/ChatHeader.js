import { useNavigate } from "react-router-dom"
import useDevice from "../../hooks/useDevice"

export default function ChatHeader({ user, children }) {

  const { isMobile, isLaptop } = useDevice()
  const navigate = useNavigate()

  return (
    <div className="body-chat__header header-body-chat">
      <div className="header-body-chat__user">
        {
          (isMobile || isLaptop) && <div className="header-body-chat__back" onClick={() => navigate("/chat")}><i className="icon-arrow"></i></div>
        }
        <div className="header-body-chat__avatar">
          <img src="/assets/images/vendor.png" alt="" />
        </div>
        <div className="header-body-chat__info">
          <div className="header-body-chat__name">Vendor</div>
          { user.description && <div className="header-body-chat__text">{ user.description }</div> }
        </div>
      </div>
      <div className="header-body-chat__actions">
        { children }
      </div>
    </div>
  )
}