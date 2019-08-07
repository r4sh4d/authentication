import React from 'react'
import styles from '../styles/form.module.css'
function Input(props) {
  return (
    <input
      name={props.name}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      className={styles.input}
    />
  )
}

export default Input