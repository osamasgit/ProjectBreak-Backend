function allProductsTemplate(productsByCategory) {
    let html = `
        <h1>Todos los productos</h1>`
        for (const category in productsByCategory) {
            html += `<h2>${category}</h2><ul>`
            productsByCategory[category].forEach(product => {
                html += `<li>
                    <strong>${product.name}</strong> - ${product.description}
                    <img src="${product.image}" alt="${product.name}" style="width: 100px;">
                    <br>Precio: €${product.price}
                    <br><a href="/products/${product._id}">Ver detalles</a>
                </li>`
            })
            html += `</ul>`
        }
    return html;
}

function productByIdTemplate(product) {
    return `
        <h1>${product.name}</h1>
        <img src="${product.image}" alt="${product.name}" style="width: 200px;">
        <p>${product.description}</p>
        <p>Categoria: ${product.category}</p>
        <p>Tallas: XS, S, M, L, XL</p>
        <p>Precio: €${product.price}</p>
        <p><a href="/products">← Volver al incicio</a></p>`
}

function allProductsDashboard(productsByCategory) {
    let html = `
        <h1>Todos los productos</h1>
        <p><a href="/dashboard/new">Crear nuevo producto</a></p>`
        for (const category in productsByCategory) {
            html += `<h2>${category}</h2><ul>`
            productsByCategory[category].forEach(product => {
                html += `<li>
                    <strong>${product.name}</strong> - ${product.description}
                    <img src="${product.image}" alt="${product.name}" style="width: 100px;">
                    <br>Precio: €${product.price}
                    <br><a href="/dashboard/${product._id}">Ver detalles</a>
                </li>`
            })
            html += `</ul>`
        }
    return html;
}

function productByIdDashboard(product) {
    return `
        <h1>${product.name}</h1>
        <img src="${product.image}" alt="${product.name}" style="width: 200px;">
        <p>${product.description}</p>
        <p>Categoria: ${product.category}</p>
        <p>Tallas: XS, S, M, L, XL</p>
        <p>Precio: €${product.price}</p>
        <p><a href="/dashboard/${product._id}/edit">← Editar</a></p>
        <p><a href="/dashboard">← Volver al incicio</a></p>`
}

function newProductTemplate(categories, sizes) {
    return `
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
            ${categories}
        </select>

        <label for="price">Precio (€)</label>
        <input type="number" id="price" name="price" min="0" step="0.01" required>

        <button type="submit">Guardar</button>
        </form>

        <p><a href="/dashboard">← Volver al inicio</a></p>`
}

function editProductTemplate(product, categories, sizes) {
    return `
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

            <label>Talla</label>
            <select name="size" required>
                ${sizes}
            </select>

            <label>Precio</label>
            <input type="number" name="price" value="${product.price}" step="0.01" required>
            
            <button type="submit">Actualizar</button>
        </form>
        <form action="/dashboard/${product._id}?_method=DELETE" method="POST">
            <button type="submit">Eliminar</button>
        </form>
        <p><a href="/dashboard">← Volver al inicio</a></p>`
}

module.exports = {
    allProductsTemplate,
    productByIdTemplate,
    allProductsDashboard,
    productByIdDashboard,
    newProductTemplate,
    editProductTemplate
}