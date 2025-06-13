import Producto from "../models/products.model.js";
import { createAccessToken } from "../libs/jwt.js";

// Crear Producto
export const producto = async (req, res) => {
  const { proveedor, nombre, descripcion, stock, precio,  } = req.body;

  try {
    const productoFound = await Producto.findOne({ nombre, proveedor });

    if (productoFound) return res.status(400).json(["El producto ya está en uso"]);

    const newProducto = new Producto({
      proveedor,
      nombre,
      descripcion,
      stock,
      precio,
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
  const { proveedor, nombre, descripcion, stock, precio, umbral } = req.body; // agregar umbral

  try {
    const updatedProducto = await Producto.findByIdAndUpdate(
      id,
      { proveedor, nombre, descripcion, stock, precio, umbral }, // incluir umbral
      { new: true }
    );

    if (!updatedProducto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({
      message: "Producto actualizado correctamente",
      data: updatedProducto,
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};



// Actualizar umbral stock de un producto por ID
export const actualizarUmbral = async (req, res) => {
  const { id } = req.params;
  const { umbral } = req.body;

  if (typeof umbral !== "number") {
    return res.status(400).json({ message: "El umbral debe ser un número" });
  }

  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      { umbral },
      { new: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Umbral actualizado correctamente", producto: productoActualizado });
  } catch (error) {
    console.error("Error al actualizar umbral:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener productos con stock menor o igual a su umbral
export const verificarAlertas = async (req, res) => {
  try {
    const productos = await Producto.find();

    // Filtrar productos con stock <= umbral (si no tiene umbral, usar 10 por defecto)
    const alertas = productos.filter((p) => {
      const umbral = p.umbral ?? 10;
      return p.stock <= umbral;
    });

    res.json({ alertas });
  } catch (error) {
    console.error("Error al verificar alertas:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};