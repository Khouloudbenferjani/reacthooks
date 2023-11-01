import React, { useState } from 'react'

function PrivateRouter({children,user}) {
  return (
    user?children:
    <h1>
        Try To Connect
    </h1>
    
  )
}

export default PrivateRouter


