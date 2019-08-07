import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/form.module.css';
import Input from './Input';
import useSpinner from '../spinner/useSpinner';

function PassReset() {

  const [email, setMail] = useState('')

  const [spinner, showSpinner, hideSpinner] = useSpinner()


  const handleChange = e => {
    const { name, value } = e.target
    name === 'mail' && setMail(value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    showSpinner()
    fetch("https://devcore.prospectsmb.com/v1/password/recovery", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(email)
    })
      .then(res => res.json())
      .then(hideSpinner)
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.header}>Şifrənin bərpası</h2>
        <label className={styles.label}>Email ünvanı</label>
        <Input
          name="mail"
          value={email}
          type="email"
          placeholder="E-mail ünvanı"
          onChange={handleChange}
        />

        <button className={styles.button} onClick={handleSubmit}>Şifrə yeniləmə sorğusu göndər</button>

        <div className={styles.registerSection}>
          <Link to="/signup" className={styles.registerLink}>Qeydiyyatdan keçin</Link>
          <Link to="/login" className={styles.recoveryLoginLink}>Giriş</Link>
        </div>
        {spinner}

      </form>
    </div>
  )
}

export default PassReset