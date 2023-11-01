import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Home() {
const navigate = useNavigate()
  return (
    
    
    
    <>
    <div>
      Home
    </div>
    <Button onClick={()=> navigate('/movie-list')} >Go to movie list</Button>
    </>
  )
}

export default Home


