import React from 'react'
import styles from '../spinner/spinner.module.css'
function SpinnerIcon() {
  return (
    <div className={styles.spinnerContainer}>
      <svg
        className={styles.spinner}
        width="100px"
        height="100px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        style={{ backgroundImage: "none", backgroundPosition: "initial", backgroundRepeat: "initial" }}>
        <circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke-width="{{config.width}}" ng-attr-stroke="{{config.stroke}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none" strokeLinecap="round" r="40" strokeWidth="4" stroke="#0fd6ab" strokeDasharray="62.83185307179586 62.83185307179586"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle>
      </svg>
    </div >


  )
}

export default SpinnerIcon