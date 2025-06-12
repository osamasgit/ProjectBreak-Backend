function loginForm(){
    return `
    <div class="form">
    <h2>Iniciar sesión</h2>
    <form method="POST" action="/login">
        <input name="username" placeholder="Usuario" required/><br/>
        <input name="password" type="password" placeholder="Contraseña" required/><br/>
        <div class="btns">
            <button type="submit">Entrar</button>
            <a href="/products">Volver al inicio</a>
        </div>
    </form>
    </div>
    `
}
module.exports = loginForm