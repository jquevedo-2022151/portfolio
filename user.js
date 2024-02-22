//
//ASYNC / AWAIT
const getUserWithAsync = async () => {
    try {
        const response = await fetch('https://randomuser.me/api/?results=10')
        const { results } = await response.json()
        const usuarios = document.getElementById('usuarios')
        for (const usuario of results) {
            usuarios.innerHTML += `
                <tr>
                    <td>${usuario.name.first}</td>
                    <td>${usuario.name.last}</td>
                    <td>${usuario.phone}</td>
                </tr>
            `
        }
    } catch (error) {
        console.error(error)
    }
}

getUserWithAsync()
