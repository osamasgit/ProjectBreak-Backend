// Formulario para crear un nuevo producto
function newProductTemplate(categories, sizes) {
    const categoryOptions = categories.map(category => `<option value="${category}">${category}</option>`).join('')
    const sizeOptions = sizes.map(size => `<option value="${size}">${size}</option>`).join('')
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Nuevo producto</title>
        </head>
        <body>
            <h1>Nuevo producto</h1>

            <form action="/dashboard" method="POST">
            <label for="name">Nombre</label>
            <input type="text" id="name" name="name" required>

            <label for="description">Descripción</label>
            <textarea id="description" name="description" required></textarea>

            <label for="image">URL de la imagen</label>
            <input type="url" id="image" name="image" required>

            <label for="category">Categoría</label>
            <select id="category" name="category" required>
                <option value="">— Selecciona —</option>
                ${categoryOptions}
            </select>

            <label for="size">Talla</label>
            <select id="size" name="size" required>
                <option value="">— Selecciona —</option>
                ${sizeOptions}
            </select>

            <label for="price">Precio (€)</label>
            <input type="number" id="price" name="price" min="0" step="0.01" required>

            <button type="submit">Guardar</button>
            </form>

            <p><a href="/dashboard">← Volver al dashboard</a></p>
        </body>
        </html>`
}

// Template para mostrar el dashboard con todos los productos
function dashboardTemplate(productsByCategory) {
    let html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Dashboard</title>
        </head>
        <body>
            <h1>Todos los productos</h1>
            <p><a href="/dashboard/new">Crear nuevo producto</a></p>`
        for (const category in productsByCategory) {
            html += `<h2>${category}</h2><ul>`
            productsByCategory[category].forEach(product => {
                html += `<li>
                    <strong>${product.name}</strong> - ${product.description}
                    <img src="${product.image}" alt="${product.name}" style="width: 100px;">
                    <br>Precio: €${product.price}
                    <br><a href="/dashboard/${product._id}">Ver</a>
                </li>`
            })
            html += `</ul>`
        }
        `</body>
        </html>`
    return html;
}

// Template para mostrar un producto por ID
function productByIdTemplate(product) {
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>${product.name}</title>
        </head>
        <body>
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="${product.name}" style="width: 200px;">
            <p>${product.description}</p>
            <p>Categoria: ${product.category}</p>
            <p>Tallas: XS, S, M, L, XL</p>
            <p>Precio: €${product.price}</p>
            <p><a href="/dashboard/:productId/edit">← Editar</a></p>
            <p><a href="/dashboard">← Volver al dashboard</a></p>
        </body>
        </html>`
}

module.exports = {
    newProductTemplate,
    dashboardTemplate,
    productByIdTemplate
}