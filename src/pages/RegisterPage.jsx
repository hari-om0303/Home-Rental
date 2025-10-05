// import React, { useState } from 'react'
// import '../styles/Register.scss'
// import  {useNavigate} from "react-router-dom"
// import { useEffect } from 'react'

// const RegisterPage = () => { 

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmpassword: '',
//     profileImage: null
//   })

//   const handleChange = (e) => {
//   const {name ,value , files } = e.target;
//   setFormData({
//     ...formData, 
//     [name]: value,
//     [name]: name === 'profileImage' ? files[0] : value
//   })
// }
//   console.log(formData);


//   const [passwordMatch , setPasswordMatch] = useState(true)

//   useEffect(()=>{
//     setPasswordMatch(formData.password === formData.confirmpassword || formData.confirmpassword ==="" )
//   })

//   const navigate = useNavigate()

//   const handleSubmit = async (e) =>{
//     e.preventDefault()

//     try{
//       const register_form = new FormData()
//       for(var key in formData){
//         register_form.append(key , formData[key])
//       }

//       const response = await fetch("http://localhost:3001/auth/register", {
//         method:"POST",
//         body: register_form
//       })

//       if(response.ok){
//         navigate("/login")
//       }

//     }catch(err){
//       console.log("registration failed", err.message)
//     }
//   }


//   return (
//     <div className='register' >
//       <div className='register_content' >
//         <form action="" className='register_content_form' onSubmit={handleSubmit} >
//           <div className='inputfields' >
//             <input value={formData.firstName} onChange={handleChange} type="text" placeholder="First Name" required name='firstName' />
//             <input value={formData.lastName} onChange={handleChange} type="text" placeholder="Last Name" required name='lastName' />
//             <input value={formData.email} onChange={handleChange} type="email" placeholder="Email" required name='email' />
//             <input value={formData.password} onChange={handleChange} type="password" placeholder="Password" required name='password' />
//             <input value={formData.confirmpassword} onChange={handleChange} type="password" placeholder="Confirm Password" required name='confirmpassword' />

//             {
//               !passwordMatch && (
//                <p style={{color:"red"}} >password not matched</p>
//               )
//             }

//             <input id='image' onChange={handleChange} type="file" name='profileImage' accept='image' required style={{ display: 'none' }} />
//           </div>
//           <div className='upload' >
//             <label htmlFor="image">
//               <img src='assets/addImage.png' alt="add profile pic" />
//               <p>Upload Your Photo</p>
//             </label>
//             {
//               formData.profileImage && (
//                 <img src={URL.createObjectURL(formData.profileImage)} alt="Profile Preview" style={{ width: '100px', height: '100px'  }}/>
//               )
//             }
//             <button type="submit" disabled={!passwordMatch} >REGISTER</button>
//           </div>
//         </form>
//         <a href="/login">Already have an account? Log In Here </a>
//       </div>
//     </div>
//   )
// }

// export default RegisterPage

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import "../styles/Register.scss";


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const [passwordMatch, setPasswordMatch] = useState(true)

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
  }, [formData.password, formData.confirmPassword])

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Submit clicked!");

    try {
      const register_form = new FormData()

      for (var key in formData) {
        register_form.append(key, formData[key])
      }

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: register_form,
        headers: {
          "Content-Type": "application/json"
        },
        // body: JSON.stringify(data)
      })

      if (response.ok) {
        navigate("/login")
      }
    } catch (err) {
      console.log("Registration failed", err.message)
    }
  }

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            required
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile pic" />
            <p>Upload Your Photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile pic"
              style={{ maxWidth: "80px" }}
            />
          )}
          <button type="submit" disabled={!passwordMatch}>REGISTER</button>
        </form>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;