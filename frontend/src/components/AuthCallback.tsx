import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const AuthCallback = () => {
  const navigate = useNavigate()
  const { setUser } = useAuth() // Add setUser to your AuthContext

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get("token")
    const name = urlParams.get("name")
    const email = urlParams.get("email")
    const image = urlParams.get("image")
    const id = urlParams.get("id")

    console.log("Received auth callback params:", {
      token,
      name,
      email,
      image,
      id,
    })

    if (token && name && email && image && id) {
      // Save token
      localStorage.setItem("token", token)

      // Save user data
      const userData = {
        name,
        email,
        picture: image,
        id,
      }
      localStorage.setItem("user", JSON.stringify(userData))

      // Update context
      setUser(userData)

      // Navigate to home
      navigate("/home")
    } else {
      console.error("Missing required auth parameters")
      navigate("/")
    }
  }, [navigate, setUser])

  return <div>Authenticating...</div>
}

export default AuthCallback
