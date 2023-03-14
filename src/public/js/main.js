const socket = io();
const chatButton = document.getElementById("chatButton");
const messageList = document.getElementById("messageList");
const chatInput = document.getElementById("chatInput");

let email;

const rederMessage = (newMessageList) => {
  messageList.innerHTML = "";
  newMessageList.forEach(({ message, user }) => {
    messageList.innerHTML += `<p class="${user === email ? "userMessage" : "otherUser"}"><b>${user}</b>: ${message} </p>`;
  });
}

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
  fetch('http://localhost:8080/message')
  .then(async response => {
    const messageList = await response.json();
    rederMessage(messageList);
  })
  .catch(error => console.log(error));
});

chatButton.addEventListener("click", () => {
  if(chatInput.value.trim().length > 0) {
    socket.emit("message", { user: email, message: chatInput.value })
    chatInput.value = ""
  }
});

socket.on("message", messageList => rederMessage(messageList));
