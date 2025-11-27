import React from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [statoAccesso, setStatoAccesso] = useState("Accedi")

  return (
    <div className='login'>
      <Link to='/'>
      <img src={logo} className='login-logo' alt="Logo Netflix" />
      </Link>
      <div className="login-form">
        <h1>{statoAccesso}</h1>
        <form >
          {statoAccesso === "Registrati" ? <input type="text" placeholder='Il tuo nome' /> : <></>}
          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Password' />
          <button>{statoAccesso}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Ricordami</label>
            </div>
            <p>Serve aiuto?</p>
          </div>
        </form>
        <div className="form-switch">
          {statoAccesso === "Accedi" ? 
          <p>Nuovo su Netflix? <span onClick={()=>{setStatoAccesso("Registrati")}}>Registrati Ora</span></p> 
          : <p>Hai già un account? <span onClick={()=>{setStatoAccesso("Accedi")}}>Accedi Ora</span></p>  }
        </div>
      </div>
    </div>
  )
}

export default Login