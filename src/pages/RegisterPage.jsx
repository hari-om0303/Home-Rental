import React, { useState } from 'react'
import '../styles/Register.scss'

const Register = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmpassword: '',
    profileImage: null
  })

  const handleChange = (e) => {
  const {name ,value , files } = e.target;
  setFormData({
    ...formData, 
    [name]: value,
    [name]: name === 'profileImage' ? files[0] : value
  })
}
  console.log(formData);


  return (
    <div className='register' >
      <div className='register_content' >
        <form action="" className='register_content_form' >
          <div className='inputfields' >
            <input value={formData.firstName} onChange={handleChange} type="text" placeholder="First Name" required name='firstName' />
            <input value={formData.lastName} onChange={handleChange} type="text" placeholder="Last Name" required name='lastName' />
            <input value={formData.email} onChange={handleChange} type="email" placeholder="Email" required name='email' />
            <input value={formData.password} onChange={handleChange} type="password" placeholder="Password" required name='password' />
            <input value={formData.confirmpassword} onChange={handleChange} type="password" placeholder="Confirm Password" required name='confirmpassword' />
            <input id='image' onChange={handleChange} type="file" name='profileImage' accept='image' required style={{ display: 'none' }} />
          </div>
          <div className='upload' >
            <label htmlFor="image">
              <img src='assets/addImage.png' alt="add profile pic" />
              <p>Upload Your Photo</p>
            </label>
            {
              formData.profileImage && (
                <img src={URL.createObjectURL(formData.profileImage)} alt="Profile Preview" style={{ width: '100px', height: '100px'  }}/>
              )
            }
            <button type="submit">REGISTER</button>
          </div>
        </form>
        <a href="/login">Already have an account? Login in Here </a>
      </div>
    </div>
  )
}

export default Register
