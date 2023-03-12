const socket = io()
const botonChat = document.getElementById("botonChat")
const parrafosMensajes = document.getElementById("parrafosMensajes")
const chatBox = document.getElementById("chatBox")

const rederMessage = (messageList) => {
  parrafosMensajes.innerHTML = "";
  messageList.forEach(({ message, user }) => {
    parrafosMensajes.innerHTML += `<p><b>${message}</b>: ${user} </p>`;
  });
}

fetch('http://localhost:8080/message')
  .then(async response => {
    const messageList = await response.json();
    rederMessage(messageList);
  })
  .then(data => console.log(data));
let email
Swal.fire({
  title: "Identificación",
  text: "Por favor ingrese su correo de usuario",
  input: "text",
  inputValidator: (valor) => {
    return !valor && 'Ingrese un valor valido';
  },
  allowOutsideClick: false
}).then(resultado => {
  email = resultado.value;
  console.log(email);
})

botonChat.addEventListener("click", () => {
  if(chatBox.value.trim().length > 0) {
    socket.emit("message", { user: email, message: chatBox.value })
    chatBox.value = ""
  }
})

socket.on("message", messageList => {
  parrafosMensajes.innerHTML = "";
  messageList.forEach(({ message, user }) => {
    parrafosMensajes.innerHTML += `<p><b>${user}</b>: ${message} </p>`;
  });
})
