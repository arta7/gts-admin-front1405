import { Box, Grid, Typography } from '@mui/material'
import SignIn from '../../components/auth/SingIn'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import 'react-slideshow-image/dist/styles.css'
import { theme } from '../../contexts/ThemeContext'
import Slider from '../../components/auth/Slider'
import baseUrl from '../../utils/Util'
// import Logo from '../../components/Logo'
import SignUp from '../../components/auth/SignUp'
import { useState } from 'react'

export default function BasicLogin() {
    const [state, setState] = useState(false)
    return state ? (
        <SignUp setState={setState} />
    ) : (
        <Box
            component="main"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background:
                    'radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%) repeat',
            }}
        >
            <SignIn setState={setState} config={{} as any}/>
        </Box>
    )
}
