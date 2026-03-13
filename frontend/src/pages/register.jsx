import { useState } from "react";
import {useNavigate} from "react-router-dom"
import api from '../api/api'

const Register = () =>{

    const [email,setEmail]= useState('')
    const [password,setPassword] = useState('')
    const [message,setMessage] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        
        e.preventDefault()
        
        try {
            const response = await api.post('/auth/register',{email,password})
            setMessage(response.data.message)
            navigate('/login')
        } catch (error) {
            
            setMessage(error.response.data.message)
        }

        }
        return(
            <div>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                    <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />

                    <button type="submit">Register</button>

                </form>

                <p>{message}</p>



            </div>


        )




}

export default Register