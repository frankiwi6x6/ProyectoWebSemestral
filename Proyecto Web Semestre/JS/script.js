const nombre = document.getElementById("nombre")
const apellido = document.getElementById("apellido")
const email = document.getElementById("email")
const password = document.getElementById("password")
const form = document.getElementById("log-in")
const warning = document.getElementById("warning")


form.addEventListener("submit", e=>{
    e.preventDefault()
    let warning
    if(nombre.value.length<2){
        warning =+"Nombre muy corto <br>"
    }

})
