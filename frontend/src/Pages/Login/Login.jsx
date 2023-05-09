import { useRef } from "react";
import { useNavigate } from "react-router-dom";
export const Login = ({ loger }) => {
  const datForm = useRef();
  const navigate = useNavigate()
  const consultarForm = (e) => {
    //Consultar los datos del formulario
    e.preventDefault()
    const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
    const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
    debugger
    fetch('http://localhost:8080/api/session/login', {
      method: "POST",
      headers: {
        'Authorization': 'bearer ' + document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1],
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cliente)
    })
      .then(response => response.json())
      .then(data => {
        document.cookie = `token=${data.token};expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/`
        console.log(data.token)
        loger(true);
        navigate('/products')
      })
      .catch(error => console.error(error))
    e.target.reset()
  }
  return (
    <div className="container divForm" >
      <h3>Formulario de Inicio de Sesion</h3>
      <form onSubmit={consultarForm} ref={datForm}>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" name="email" />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" className="form-control" name="password" />
        </div>

        <button type="submit" className="btn btn-primary">Iniciar Sesion</button>
      </form>
    </div>
  )
}