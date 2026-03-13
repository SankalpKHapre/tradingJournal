
import { useState } from "react";
import api from '../api/api'
import {useNavigate} from "react-router-dom"




const Login = ()=>{

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [message,setMessage] = useState('')
    const navigate = useNavigate()

    const handleSubmit= async(e)=>{
        e.preventDefault()
        try {
            const response = await api.post('/auth/login',{email,password})
            localStorage.setItem('token',response.data.token)
            navigate('/dashboard')
            setMessage(response.data.message)
        } catch (error) {
            setMessage(error.response.data.message)
        }
    }
        return(

            <div>
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
                    <button type="submit">Submit</button>
                    <p>{message}</p>
                </form>


            </div>


        )


}

export default Login