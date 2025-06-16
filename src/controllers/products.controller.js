// Importa el modelo Producto y la función para generar tokens
import Producto from "../models/products.model.js";
import { createAccessToken } from "../libs/jwt.js";


// ==============================
// Crear nuevo producto
// ==============================
export const producto = async (req, res) => {
  const { proveedor, nombre, descripcion, stock, precio } = req.body;

  try {
    // Verifica si ya existe un producto con el mismo nombre y proveedor
    const productoFound = await Producto.findOne({ nombre, proveedor });

    if (productoFound)
      return res.status(400).json(["El producto ya está en uso"]);

    // Crea una nueva instancia del producto
    const newProducto = new Producto({
      proveedor,
      nombre,
      descripcion,
      stock,
      precio,
    });

    // Guarda el producto en la base de datos
    const productoSaved = await newProducto.save();

    // Genera un token (aunque en productos no es habitual usar JWT)
    const token = await createAccessToken({ id: productoSaved._id });

    // Envía el token por cookie y retorna el producto creado
    res.cookie("token", token);
    res.json(productoSaved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ==============================
// Obtener todos los productos
// ==============================
export const products = async (req, res) => {
  try {
    const products = await Producto.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};


// ==============================
// Obtener un producto por ID
// ==============================
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


// ==============================
// Eliminar producto por ID
// ==============================
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


// ==============================
// Actualizar producto por ID
// ==============================
export const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { proveedor, nombre, descripcion, stock, precio, umbral } = req.body; // incluye umbral

  try {
    // Actualiza el producto y devuelve el nuevo documento
    const updatedProducto = await Producto.findByIdAndUpdate(
      id,
      { proveedor, nombre, descripcion, stock, precio, umbral },
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


// ==============================
// Actualizar solo el umbral de stock de un producto
// ==============================
export const actualizarUmbral = async (req, res) => {
  const { id } = req.params;
  const { umbral } = req.body;

  // Valida que el umbral sea un número
  if (typeof umbral !== "number") {
    return res.status(400).json({ message: "El umbral debe ser un número" });
  }

  try {
    // Actualiza solo el campo 'umbral'
    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      { umbral },
      { new: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({
      message: "Umbral actualizado correctamente",
      producto: productoActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar umbral:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


// ==============================
// Verificar productos con stock bajo (<= umbral)
// ==============================
export const verificarAlertas = async (req, res) => {
  try {
    const productos = await Producto.find();

    // Filtra productos cuyo stock esté igual o por debajo del umbral.
    // Si el producto no tiene umbral definido, usa 10 como valor por defecto.
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
