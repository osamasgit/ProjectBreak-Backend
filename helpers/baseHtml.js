function baseHtml(bodyContent) {
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="styles.css">
            <title>The best shop</title>
        </head>
        <body>
            ${bodyContent}
        </body>
        </html>`
}

module.exports = baseHtml