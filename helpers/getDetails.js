function getDetails (req, product) {
    const isDashboard = req.path.startsWith('/dashboard')
    const basePath = isDashboard ? '/dashboard' : '/products'   
    const productCard = `
        <h1>${product.name}</h1>
        <img src="${product.image}" alt="${product.name}" style="width: 200px;">
        <p>${product.description}</p>
        <p>Categoria: ${product.category}</p>
        <p>Tallas: XS, S, M, L, XL</p>
        <p>Precio: €${product.price}</p>
        <p><a href="/dashboard">← Volver al inicio</a></p>`
                
    const edit = isDashboard ? 
        `<br><a href="${basePath}/${product._id}/edit">Editar</a>` : ''

    return `<li>
                ${productCard}
                ${edit}
            </li>`
}
module.exports =  getDetails