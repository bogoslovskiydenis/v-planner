import { useState } from "react"
import AuthService from "../services/AuthService"
import UserService from "../services/UserService"
import VendorService from "../services/VendorService"

const useAuth = () => {

  const [isAuth, setAuth] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [user, setUser] = useState({})

  const login = async (email, password, role) => {
    try{
      const response = role === process.env.REACT_APP_ROLE_USER ? await UserService.login(email, password) : await VendorService.login(email, password)
      localStorage.setItem("token", response.data.accessToken)
      setAuth(true)
      setUser(response.data.user)
    }catch(e){
      console.log(e.response?.data?.message)
    }
  }

  const logout = async () => {
    try{
      await AuthService.logout()
      localStorage.removeItem("token")
      setAuth(false)
      setUser({})
    }catch(e){
      console.log(e.response?.data?.message)
    }
  }

  const check = async () => {
    setLoading(true)
    try{
      const response = await AuthService.check()
      localStorage.setItem("token", response.data.accessToken)
      setAuth(true)
      setUser(response.data.user)
    }catch(e){
      console.log(e.response?.data?.message )
    }finally{
      setLoading(false)
    }
  }

  return { login, logout, check, setUser, isAuth, isLoading, user }
}

export default useAuth