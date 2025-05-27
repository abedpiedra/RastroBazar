// Importamos axios para realizar peticiones HTTP
import axios from "axios";
// Definimos la URL base de la API
const API = "http://localhost:4000/api";
// Funciones para interactuar con la API de productos
export const productoRequest = (producto) => axios.post(`${API}/producto`, producto);
// Función para crear un nuevo producto
export const productsRequest = () => axios.get(`${API}/products`);
// Función para obtener todos los productos
export const deleteProducto = (_id) => axios.delete(`${API}/deleteProducts/${_id}`);   
// Función para eliminar un producto por su ID
export const obtenerProductoPorId = (id) => axios.get(`${API}/products/${id}`);