import axios from "axios";

const API = "http://localhost:4000/api";

export const proveedorRequest = (proveedor) => axios.post(`${API}/proveedor`, proveedor)

export const proveedoresRequest = (proveedor) => axios.get(`${API}/proveedors`, proveedor)

export const deleteProveedor = (_id) => axios.delete(`${API}/deleteProveedors/${_id}`);   

export const obtenerProveedorPorId = (id) => axios.get(`${API}/proveedors/${id}`);