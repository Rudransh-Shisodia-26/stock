
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import{Button, Form} from 'react-bootstrap';
import"./login.css";
// import server from '../../Environment';

const Login = () => {

  const navigate = useNavigate();

  const[formData,setformData] = useState({
    email:'',
    password:''
  })

  const handleInputChange = (e) =>{
    const {name,value} = e.target;

    setformData({
      ...formData,
      [name] : value 
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const res =  await fetch( `https://stock-backend-v9q3.onrender.com`,{

         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(formData),
          
          })

          const result = await res.json();
          
          localStorage.setItem("token", result.token);  
          console.log(result);
          navigate("/");
        } catch (err) {
          console.error(err.message);
        } finally{
             setformData({
              email:"",
              name:"",
              password:""
             })
        }
  };

    return ( 
        <div className='center-form'>
        <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Form.Group  controlId="FormBaicEmail">
          <Form.Label >Email address</Form.Label>
          <Form.Control type="email" name ="email" placeholder="Enter email" 
           value={formData.email} onChange={handleInputChange}
          />
        </Form.Group>


        <Form.Group  controlId="FormBaicPassword">
          <Form.Label> password</Form.Label>
          <Form.Control type="password" name ="password" placeholder="Enter password" 
          value={formData.password} onChange={handleInputChange}
           />
        </Form.Group>

        <Button variant='dark' type='submit' className='w-100'> Login </Button> 
        

      </Form>

      </div> 
       
    );
};
   export default Login;


