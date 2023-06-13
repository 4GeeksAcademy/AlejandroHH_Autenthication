import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/login&register.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';



export const Signup = () => {
  const navigate = useNavigate()

  const [data, setData] = useState({})

  const handleChange = (e) => {
    setData({...data, [e.target.name] : e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)

    const postConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }

    }

    fetch(process.env.BACKEND_URL + 'api/signup', postConfig)
    .then(response => response.json())
    .then((response) => {
      navigate("/login")
      Swal.fire(
        'Good job!',
        "You've been registered!",
        'success'
      )
    })
    .catch(error => {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: '400',
        text: 'Complete the fields!',
      });
    });
    
  
  }



  return (
        <div className='body'>
          <form onSubmit={handleSubmit} method='POST'>
            <div className='containerr regBox'>
              <h2 className='mb-3'>Register</h2>

                <div className='register-box'>
                  <div className='input-box'>
                  <input type='text' placeholder='Name' name='name' onChange={handleChange} />
                  <label htmlFor=''><FontAwesomeIcon icon={faUser} style={{color: "#000000",}} />Name</label>
                  </div>
                </div>

                <div className='register-box'>
                  <div className='input-box'>
                  <input type='email' placeholder='Email' name='email' onChange={handleChange} />
                  <label htmlFor=""><FontAwesomeIcon icon={faEnvelope} style={{color: "#000000",}} />Email</label>
                  </div>
                </div>

                <div className='input-box'>
                  <input type='password' placeholder='Password' name='password' onChange={handleChange} />
                  <label htmlFor=""><FontAwesomeIcon icon={faLock} style={{color: "#000000",}} />Password</label>
                </div>

                <button className='btn btn-info' type='submit'>Sign Up</button>
            </div>
          </form>
          
        </div>
    



  )

  
}
