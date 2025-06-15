function getNavbar (categories, req) {
    const isDashboard = req.path.startsWith('/dashboard')
    const basePath = isDashboard ? '/dashboard' : '/products'

    const categoryLink = categories.map(category => `<li><a href="#${category}">${category}</a></li>`).join('')
    const newProductLink = isDashboard ? `<li><a href="${basePath}/new">Nuevo producto</a></li><li><a href="/logout">Logout</a></li>` : `<li><a href="/login">Iniciar Sesion</a></li>`

    return `
        <nav>
            <div class="menu-button">☰</div>
            <ul>
                <li><a href="${basePath}">Inicio</a></li>
                ${categoryLink}
                ${newProductLink} 
            </ul>
        </nav>`
}
module.exports = getNavbar