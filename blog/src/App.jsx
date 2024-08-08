import { useState , useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {AuthService} from './appwrite/auth'
import { login , logout } from './store/authSlice'
import './App.css'

function App() {
 const [loading , setLoading] = useState(false)
 const dispatch = useDispatch()


useEffect(()=> {
   authService.getCurrentUser()
   .then((userData)=> {
       if (userData) {
           dispatch(login({userData}))
       } else {
           dispatch(logout())
       }
   })
   .catch((error)=> {
       console.log("auth error",error)
   })
   .finally(()=> {
       setLoading(false)
   })
      },[])
   
     
  return !loading ? <h1>Loading....</h1> : null



  return (
    <>
      <div> <h1>A blog app with appwrite</h1></div>
    </>
  )
}

export default App
