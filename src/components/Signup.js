import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/form.module.css';
import Input from './Input';
import useSpinner from '../spinner/useSpinner'

function Signup() {

  const [email, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [mailConflict, setMailConflict] = useState(false)
  const [validation, setValidation] = useState(true)
  const [user, setUser] = useState({ email, password, passwordRepeat })

  const [spinner, showSpinner, hideSpinner] = useSpinner()

  useEffect(() => {
    mailConflict ?
      document.getElementById('emailConflictError').style.display = 'block' :
      document.getElementById('emailConflictError').style.display = 'none'
  }, [mailConflict])

  useEffect(() => {
    !validation ?
      document.getElementById('emailFormatError').style.display = 'block' :
      document.getElementById('emailFormatError').style.display = 'none'
  }, [validation])

  useEffect(() => {
    setUser({ email, password, passwordRepeat })
  }, [email, password, passwordRepeat])

  const handleChange = e => {
    const { name, value } = e.target
    name === 'mail' && setMail(value)
    name === 'password' && setPassword(value)
    name === 'passwordRepeat' && setPasswordRepeat(value)
  }

  const checkFields = () => {
    !email ?
      document.getElementById('emailError').style.display = 'block' :
      document.getElementById('emailError').style.display = 'none'
    !password ?
      document.getElementById('passwordError').style.display = 'block' :
      document.getElementById('passwordError').style.display = 'none'
    !passwordRepeat ?
      document.getElementById('passwordRepeatError').style.display = 'block' :
      document.getElementById('passwordRepeatError').style.display = 'none'
    passwordRepeat && password !== passwordRepeat ?
      document.getElementById('passwordMatchError').style.display = 'block' :
      document.getElementById('passwordMatchError').style.display = 'none'
    password && password.length < 6 ?
      document.getElementById('lengthError').style.display = 'block' :
      document.getElementById('lengthError').style.display = 'none'
  }

  const handleSubmit = e => {
    e.preventDefault()
    checkFields()
    if (email && password && password.length >= 6 && passwordRepeat && password === passwordRepeat) {
      showSpinner()
      fetch("https://devcore.prospectsmb.com/v1/register", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => {
          res.status === 409 ? setMailConflict(true) : setMailConflict(false)
          res.status === 422 ? setValidation(false) : setValidation(true)
        })
        .then(hideSpinner)
    }
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
        <p className={styles.error} id='emailFormatError'>Bu dəyər düzgün e-poçt adresi deyildir</p>
        <p className={styles.error} id='emailConflictError'>Bu e-mail artıq istifadə olunmuşdur</p>
        <p className={styles.error} id='emailError'>Bu dəyər boş olmamalıdır</p>


        <label className={styles.label}>Şifrə</label>
        <Input
          name="password"
          value={password}
          type="password"
          placeholder="Şifrə"
          onChange={handleChange}
        />
        <p className={styles.error} id='passwordError'>Bu dəyər boş olmamalıdır</p>
        <p id='lengthError' className={styles.error}>Şifrə ən az 6 simvol olmalıdır</p>


        <label className={styles.label}>Şifrənin təkrarı</label>
        <Input
          name="passwordRepeat"
          value={passwordRepeat}
          type="password"
          placeholder="Şifrənin təkrarı"
          onChange={handleChange}
        />
        <p className={styles.error} id='passwordMatchError'>Təkrar şifrə düzgün deyil</p>
        <p className={styles.error} id='passwordRepeatError'>Bu dəyər boş olmamalıdır</p>


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