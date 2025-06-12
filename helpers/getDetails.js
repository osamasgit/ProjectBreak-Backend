function getDetails (req, product) {
    const isDashboard = req.path.startsWith('/dashboard')
    const basePath = isDashboard ? '/dashboard' : '/products'   
    const productCard = `
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="${product.name}" style="width: 200px;">
            <p>${product.description}</p>
            <p>Categoria: ${product.category}</p>
            <p>Tallas: XS, S, M, L, XL</p>
            <p>Precio: €${product.price}</p>`
                
    const edit = isDashboard ? 
        `<div class="btns"><a href="${basePath}">Volver al inicio</a><a href="${basePath}/${product._id}/edit">Editar</a></div>` : `<a href="${basePath}">Volver al inicio</a>`

    return `<div class="productDetail">
                ${productCard}
                ${edit}
            </div>`
}
module.exports =  getDetails