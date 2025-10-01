import React from 'react'
import '../styles/Register.scss'

const Register = () => {
  return (
    <div className='register' >
      <div className='register_content' >
        <form action="">
         <div className='inputfields' >
           <input type="text" placeholder="Firtname" required name='firstname' />
          <input type="text" placeholder="Lastname" required name='lastname' />
          <input type="email" placeholder="Email" required name='email' />
          <input type="password" placeholder="Password" required name='password' />
          <input type="password" placeholder="Confirm Password" required name='confirmpassword' />
          <input id='image' type="file" name='profileImage' accept='image' required style={{ display: 'none' }} />
         </div>
         <div className='upload' >
           <label htmlFor="image">
            <img src='assets/addImage.png' alt="add profile pic" />
            <p>upload your photo</p>
          </label>
          <button type="submit">REGISTER</button> 
         </div>
        </form>
        <a href="/login">Already have an account? Login in Here </a>
      </div>
    </div>
  )
}

export default Register
