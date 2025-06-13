import axios from "axios";
const API = "http://localhost:4000/api";

export const obtenerNotificacionesRequest = () => axios.get(`${API}/notificaciones`);
export const marcarNotificacionLeidaRequest = (id) => axios.put(`${API}/notificaciones/${id}/leida`);
