import { createContext, useState, useContext } from "react";
import { registerRequest, loginRequest } from "../api/auth.js";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      setErrors([]); // Limpiar errores si el registro es exitoso
    } catch (error) {
      console.error("Detalles del error:", error.response); // Imprime el error en la consola

      // Verifica si el error tiene un array de mensajes y lo establece en el estado de errores
      if (Array.isArray(error.response?.data)) {
        setErrors(error.response.data);
      } else {
        // Mensaje de error alternativo
        setErrors(["Error desconocido"]);
      }
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true); // Esto debería evitar el bucle
      }
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      } else {
        setErrors([
          error.response?.data?.message || "Error en el inicio de sesión",
        ]);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
