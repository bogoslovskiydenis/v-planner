import { useState } from "react"
import { useParams } from "react-router-dom"
import useDevice from "../../hooks/useDevice"
import ChatForm from "./ChatForm"
import ChatHeader from "./ChatHeader"
import ChatHistory from "./ChatHistory"
import ChatMenu from "./ChatMenu"
import ChatUsers from "./ChatUsers"

export default function UserChat() {

  const [users, setUsers] = useState([
    {id: 1, avatar: "/assets/images/vendor.png", name: "Vendor", lastMessage: {message: "Lorem ipsum dolor sit sdfsdf", type: "text", time: "11:55pm"}, newMessages: 0},
    {id: 2, avatar: "/assets/images/vendor.png", name: "Vendor", lastMessage: {message: "Lorem ipsum dolor sit sdfsdf", type: "text", time: "01:45pm"}, newMessages: 0},
    {id: 3, avatar: "/assets/images/vendor.png", name: "Vendor", lastMessage: {message: "Lorem ipsum dolor sit sdfsdf", type: "text", time: "07:28pm"}, newMessages: 0},
    {id: 4, avatar: "/assets/images/vendor.png", name: "Vendor", lastMessage: {message: "Lorem ipsum dolor sit sdfsdf", type: "text", time: "12:15pm"}, newMessages: 0},
    {id: 5, avatar: "/assets/images/vendor.png", name: "Vendor", lastMessage: {message: "Lorem ipsum dolor sit sdfsdf", type: "text", time: "05:17pm"}, newMessages: 0},
  ])

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "serviceMessage",
      message: "15 Apr"
    },
    {
      id: 2,
      type: "textMessage",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
      time: "12:05pm",
      isRecipient: true
    },
    {
      id: 3,
      type: "textMessage",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
      time: "12:05pm",
      isRecipient: false
    },
    {
      id: 4,
      type: "serviceMessage",
      message: "System message"
    },
    {
      id: 5,
      type: "textMessage",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
      time: "12:05pm",
      isRecipient: true
    },
    {
      id: 6,
      type: "fileMessage",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
      file: {
        type: "image",
        src: "/assets/images/vendor-slider/slide-4.jpg"
      },
      time: "12:05pm",
      isRecipient: true
    },
    {
      id: 7,
      type: "fileMessage",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ",
      file: {
        type: "file",
        src: "/assets/video/483040_2.mp4"
      },
      time: "12:05pm",
      isRecipient: true
    },
  ])

  const [user, setUser] = useState({
    id: 8,
    avatar: "/assets/images/vendor.png",
    name: "Vendor",
    description: "Wedding Bakey"
  })

  const { id } = useParams()
  const { isMobile, isLaptop } = useDevice()

  const [menu, setMenu] = useState([
    {title: "All Chats", active: true},
    {title: "Archive", active: false}
  ])

  const addMessage = (message) => {
    setMessages([
      ...messages,
      message
    ])
  }

  return (
    <section className="chat shadow">
      <div className="chat__content">
        {
          (((isMobile || isLaptop) && !id) || (!isMobile && !isLaptop)) && (
            <div className="chat__sidebar sidebar-chat">
              <h3 className="sidebar-chat__title">Chat</h3>
              <ChatMenu menu={menu} />
              <ChatUsers users={users} />
            </div>
          )
        }
        {
          (((isMobile || isLaptop) && id) || (!isMobile && !isLaptop)) && (
            <div className="chat__body body-chat">
              <ChatHeader user={user}>
                <div className="header-body-chat__action quote">
                  <span>Request Quote</span>
                  <i className="icon-quote"></i>
                </div>
                <div className="header-body-chat__action quote btn-circle">
                  <i className="icon-trash-outline"></i>
                </div>
              </ChatHeader>
              <div>
                <ChatHistory messages={messages} user={user} />
                <ChatForm onCallback={addMessage} />
              </div>
            </div>
          )
        }
      </div>
    </section>
  )
}