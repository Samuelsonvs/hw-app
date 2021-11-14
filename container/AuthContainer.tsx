import React from 'react'

interface P {
    children: JSX.Element
}

const AuthContainer = ({ children}: P) => {
    return (
        <div className="auth-container">
        <div className="auth-inner-container">
          <h1 className="auth-container-h1">Your Logo</h1>  
          <div className="auth-box-container">
            <div className="auth-box">
                {children}
            </div>
          </div>
        </div>
        </div>
    )
}

export default AuthContainer;