import React, { useState } from 'react'
import axios from 'axios'

const configGetToken = {
  method: 'get',
  url: `${process.env.VITE_APP_API_URL}auth/v1/api/get-token`,
  headers: {
    accept: 'application/json',
    publicKey: `$j01R8&$di$#ca@${process.env.VITE_GET_TOKEN_PUBLIC_KEY}`,
  },
}

const CSRFContext = React.createContext({})

function CSRFProvider({ children }: any) {
  let [csrfProvided, setCsrfProvided] = useState(localStorage.getItem('accessToken'))

  if (!csrfProvided) {
    ;(async () => {
      try {
        const response = await axios(configGetToken)
        const accessToken = response.data.result.access_token
        setCsrfProvided(accessToken)
      } catch (err) {
        console.log(err)
      }
    })()
  }
 
  if (!!csrfProvided) {
    axios.defaults.headers.common['authorization'] = `bearer ${csrfProvided}`
    window.localStorage.setItem('accessToken', csrfProvided)
  }
 
  return (
    <CSRFContext.Provider value={{}}>
      {csrfProvided && children}
    </CSRFContext.Provider>
  )
}

export { CSRFProvider, CSRFContext }
