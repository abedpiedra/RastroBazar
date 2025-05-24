import Producto from "../models/products.model.js";
import { createAccessToken } from "../libs/jwt.js";

// Crear Producto
export const producto = async (req, res) => {
  const { nombre, descripcion, stock, precio, proveedor } = req.body;

  try {
    const productoFound = await Producto.findOne({ nombre, proveedor });

    if (productoFound) return res.status(400).json(["El producto ya está en uso"]);

    const newProducto = new Producto({
      nombre,
      descripcion,
      stock,
      precio,
      proveedor,
    });
    const productoSaved = await newProducto.save();
    const token = await createAccessToken({ id: productoSaved._id });

    res.cookie("token", token);
    res.json(productoSaved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los products
export const products = async (req, res) => {
  try {
    const products = await Producto.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Obtener un Producto por ID
export const obtenerProductoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Eliminar Producto por ID
export const deleteProducts = async (req, res) => {
  const { _id } = req.params;

  try {
    const result = await Producto.deleteOne({ _id });

    if (!result.deletedCount)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};



// Actualizar Producto por ID
export const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, stock, precio, proveedor } = req.body;

  try {
    const updatedProducto = await Producto.findByIdAndUpdate(
      id,
      { nombre, descripcion, stock, precio, proveedor},
      { new: true } // Esto devuelve el Producto actualizado
    );

    if (!updatedProducto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({
      message: "Producto actualizado correctamente",
      data: updatedProducto,
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
