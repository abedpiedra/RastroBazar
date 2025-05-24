import axios from "axios";

const API = "http://localhost:4000/api";

export const productoRequest = (producto) => axios.post(`${API}/producto`, producto);

export const productsRequest = () => axios.get(`${API}/products`);

export const deleteProducto = (_id) => axios.delete(`${API}/deleteProducts/${_id}`);   

export const obtenerProductoPorId = (id) => axios.get(`${API}/products/${id}`);