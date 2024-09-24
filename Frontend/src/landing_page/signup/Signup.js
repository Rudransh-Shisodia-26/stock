import React, { useState } from 'react' ;
import axios from 'axios';
import{Button, Form} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';

import"./signup.css";
// import server  from '../../Environment';



const Signup = () => {

  const navigate = useNavigate();

  const[formData,setformData] = useState({
    email:'',
    name:'',
    password:'',
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

      // console.log("email : ", formData.email);
      // console.log("name : ", formData.name);
      // console.log("password : ", formData.password);

      const res = await fetch( `https://stock-backend-v9q3.onrender.com`,{

         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(formData),
          
          })

          const result = await res.json();
          console.log(result);
          navigate("/login");  
      
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
        <h1>signup</h1>
        <Form.Group  controlId="FormBaicEmail">
          <Form.Label >Email address</Form.Label>
          <Form.Control type="email" name ="email" placeholder="Enter email" 
            value={formData.email} onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group  controlId="FormBaicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" name ="name" placeholder="Enter name" 
           value={formData.name} onChange={handleInputChange}
        
           />
        </Form.Group>

        <Form.Group  controlId="FormBaicPassword">
          <Form.Label> password</Form.Label>
          <Form.Control type="password" name ="password" placeholder="Enter password" 
           value={formData.password} onChange={handleInputChange}
           />
        </Form.Group>

        <Button variant='dark' type='submit' className='w-100'> signup </Button> 
        

      </Form>

      </div> 

       
    );
};

export default Signup;

