import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/form.module.css';
import Input from './Input';
import useSpinner from '../spinner/useSpinner'

function Signup() {

  const [email, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [user, setUser] = useState({ email, password, passwordRepeat })

  const [spinner, showSpinner, hideSpinner] = useSpinner()

  useEffect(() => {
    setUser({ email, password, passwordRepeat })
  }, [email, password, passwordRepeat])

  const handleChange = e => {
    const { name, value } = e.target
    name === 'mail' && setMail(value)
    name === 'password' && setPassword(value)
    name === 'passwordRepeat' && setPasswordRepeat(value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    showSpinner()
    fetch("https://devcore.prospectsmb.com/v1/register", {
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
        <h2 className={styles.headerSignup}>DAXİL OLUN, YARARLANIN, İŞİNİZİ ASANLAŞDIRIN!</h2>
        <p className={styles.headerText}>Bank kartı tələb olunmur</p>

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

        <label className={styles.label}>Şifrənin təkrarı</label>
        <Input
          name="passwordRepeat"
          value={passwordRepeat}
          type="password"
          placeholder="Şifrənin təkrarı"
          onChange={handleChange}
        />

        <button onClick={handleSubmit} className={styles.button}>Davam et</button>

        <div className={styles.registerSection}>
          <p className={styles.loginText}>Qeydiyyatdan keçmisiniz?
           <Link to="/login" className={styles.loginLink}>Giriş</Link>
          </p>
          <p className={styles.termsText}>“Davam et” düyməsinə klikləməklə Prospect SMB-nin Xidmət Şərtləri və Məxfilik Siyasəti ilə razılaşıram</p>
        </div>
        {spinner}
      </form>
    </div>
  )
}

export default Signup