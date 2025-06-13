import axios from "axios";
const API = "http://localhost:4000/api";

export const crearAlertaRequest = (alerta) => axios.post(`${API}/alertas`, alerta);
export const verificarAlertasRequest = () => axios.get(`${API}/alertas/verificar`);
