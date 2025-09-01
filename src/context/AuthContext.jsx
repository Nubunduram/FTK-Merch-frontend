import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // Charger utilisateur depuis localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  const login = (email) => {
    // Check avec le backend
    const fakeUser = { email }
    setUser(fakeUser)
    localStorage.setItem("user", JSON.stringify(fakeUser))
  }

  const signup = (email) => {
    // Similaire à login pour la démo
    const fakeUser = { email }
    setUser(fakeUser)
    localStorage.setItem("user", JSON.stringify(fakeUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
