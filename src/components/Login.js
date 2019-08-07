import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/form.module.css';
import Input from './Input';
import useSpinner from '../spinner/useSpinner';

function Login() {

  const [email, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [authorized, setAuthorized] = useState(true)
  const [validation, setValidation] = useState(true)
  const [user, setUser] = useState({ email, password, deviceToken: null })

  const [spinner, showSpinner, hideSpinner] = useSpinner()

  useEffect(() => {
    setUser({ email, password, deviceToken: null })
  }, [email, password])

  useEffect(() => {
    !validation ?
      document.getElementById('emailFormatError').style.display = 'block' :
      document.getElementById('emailFormatError').style.display = 'none'
  }, [validation])

  useEffect(() => {
    !authorized ?
      document.getElementById('unauthorizedError').style.display = 'block' :
      document.getElementById('unauthorizedError').style.display = 'none'
  }, [authorized])

  const handleChange = e => {
    const { name, value } = e.target
    name === 'mail' ? setMail(value) : setPassword(value)
  }

  const checkFields = () => {
    !email ?
      document.getElementById('emailError').style.display = 'block' :
      document.getElementById('emailError').style.display = 'none'
    !password ?
      document.getElementById('passwordError').style.display = 'block' :
      document.getElementById('passwordError').style.display = 'none'
    password && password.length < 6 ?
      document.getElementById('lengthError').style.display = 'block' :
      document.getElementById('lengthError').style.display = 'none'

  }

  const handleSubmit = e => {
    e.preventDefault()
    checkFields();
    if (email && password && password.length >= 6) {
      showSpinner()
      fetch("https://devcore.prospectsmb.com/v1/login", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => {
          res.status === 401 ? setAuthorized(false) : setAuthorized(true)
          res.status === 422 ? setValidation(false) : setValidation(true)
        })
        .then(hideSpinner)
    }
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.header}>Giriş</h2>

        <p className={styles.error} id='unauthorizedError'>Yanlış məlumat</p>
        <label className={styles.label}>Email ünvanı</label>
        <Input
          name="mail"
          value={email}
          type="email"
          placeholder="E-mail ünvanı"
          onChange={handleChange}
        />
        <p className={styles.error} id='emailError'>Bu dəyər boş olmamalıdır</p>
        <p className={styles.error} id='emailFormatError'>Bu dəyər düzgün e-poçt adresi deyildir</p>

        <label className={styles.label}>Şifrə</label>
        <Input
          name="password"
          value={password}
          type="password"
          placeholder="Şifrə"
          onChange={handleChange}
        />
        <p id='passwordError' className={styles.error}>Bu dəyər boş olmamalıdır</p>
        <p id='lengthError' className={styles.error}>Şifrə ən az 6 simvol olmalıdır</p>

        <Link to="/recovery" className={styles.forgetLink} >Şifrənİ unutmusunuz?</Link>

        <button className={styles.button} onClick={handleSubmit}>Təsdiq et</button>

        <div className={styles.registerSection}>
          <Link to="/signup" className={styles.registerLink}>Qeydiyyatdan keçin</Link>
        </div>
        {spinner}

      </form>
    </div>
  )
}

export default Login