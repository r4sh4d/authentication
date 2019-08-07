import React, { useState } from 'react'
import SpinnerIcon from './SpinnerIcon';

const useSpinner = (props) => {
  const [visible, setVisible] = useState(false)

  const showSpinner = () => setVisible(true);
  const hideSpinner = () => setVisible(false)
  const spinner = visible ? <SpinnerIcon /> : null

  return [spinner, showSpinner, hideSpinner]
}


export default useSpinner