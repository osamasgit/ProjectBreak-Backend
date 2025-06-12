function newProductForm(categories, sizes) {
    return `
        <div class="form">
        <h1>Nuevo producto</h1>

        <form action="/dashboard" method="POST" enctype="multipart/form-data">
        <label for="name">Nombre</label>
        <input type="text" id="name" name="name" required>

        <label for="description">Descripción</label>
        <textarea id="description" name="description" cols="40" rows="5" required></textarea>

        <label for="category">Categoría</label>
        <select id="category" name="category" required>
            <option value="">— Selecciona —</option>
            ${categories}
        </select>

        <label for="price">Precio (€)</label>
        <input type="number" id="price" name="price" min="0" step="0.01" required>

        <label for="image">Imagen</label>
        <input type="file" id="image" name="image" accept="image/*" required>
        
        <div class="btns">
            <button type="submit">Guardar</button>
            <a href="/dashboard">Volver al inicio</a>
        </div>
        </form>

        </div>`
}

module.exports = newProductForm