import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/form.module.css';
import Input from './Input';
import useSpinner from '../spinner/useSpinner';

function Login() {

  const [email, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState({ email, password, deviceToken: null })

  const [spinner, showSpinner, hideSpinner] = useSpinner()

  useEffect(() => {
    setUser({ email, password, deviceToken: null })
  }, [email, password])

  const handleChange = e => {
    const { name, value } = e.target
    name === 'mail' ? setMail(value) : setPassword(value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    showSpinner()
    fetch("https://devcore.prospectsmb.com/v1/login", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(hideSpinner)
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.header}>Giriş</h2>
        <label className={styles.label}>Email ünvanı</label>
        <Input
          name="mail"
          value={email}
          type="email"
          placeholder="E-mail ünvanı"
          onChange={handleChange}
        />
        <label className={styles.label}>Şifrə</label>

        <Input
          name="password"
          value={password}
          type="password"
          placeholder="Şifrə"
          onChange={handleChange}
        />

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