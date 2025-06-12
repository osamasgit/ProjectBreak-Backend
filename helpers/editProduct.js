function editProductForm(product, categories, sizes) {
    return `
        <div class="form">
        <h1>Editar producto</h1>
        <form action="/dashboard/${product._id}?_method=PUT" method="POST">
            <label>Nombre</label>
            <input type="text" name="name" value="${product.name}" required>

            <label>Descripción</label>
            <textarea name="description" required>${product.description}</textarea>

            <label>URL Imagen</label>
            <input type="url" name="image" value="${product.image}" required>

            <label>Categoría</label>
            <select name="category" required>
                ${categories}
            </select>

            <label>Precio</label>
            <input type="number" name="price" value="${product.price}" step="0.01" required>

            <button type="submit">Actualizar</button>
        </form>
        <form action="/dashboard/${product._id}?_method=DELETE" method="POST">
        <div class="btns">
            <button type="submit">Eliminar</button>
            <a href="/dashboard">Volver al inicio</a>
        </div>
        </form>
        </div>`
}

module.exports = editProductForm