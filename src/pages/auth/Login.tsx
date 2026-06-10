import { Box, Grid, Typography } from '@mui/material'
import SignIn from '../../components/auth/SingIn'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import 'react-slideshow-image/dist/styles.css'
import { theme } from '../../contexts/ThemeContext'
import Slider from '../../components/auth/Slider'
import baseUrl, { base64ToImage } from '../../utils/Util'
import SignUp from '../../components/auth/SignUp'
import { useState } from 'react'

export default function Login({config}:any) {
  const [state, setState] = useState(false);

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
      <Grid
        container
        component={Paper}
        square
        xs={10}
        sm={10}
        md={8}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '5px',
          background: 'no-repeat top left',
          backgroundImage: `url(${baseUrl}/images/iran2.png)`,
          backgroundColor: '#fff',
          backgroundSize: '160px 150px',
        }}
      >
        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              paddingX: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Grid
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Grid
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Grid
                  p={1}
                  style={{
                    marginTop: '2.5rem',
                    width: '100px',
                  }}
                >
                  <img
                    src={config.systemLogo}
                    style={{
                      maxWidth: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </Grid>
              </Grid>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                fontWeight="800"
                mb={1}
                color={theme.palette.text.primary}
              >
                {config.systemName}
              </Typography>
            </Grid>
            <SignIn setState={setState} config={config}/>
          </Box>
          <Grid
            item
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              marginBottom: '1rem',
            }}
          >
            <Link
              href={config.developerLink}
              variant="body2"
              target="_blank"
            >
              {`پدیدآورنده:${config.developerName}`}
            </Link>
          </Grid>
        </Grid>
        <Grid
          item
          sm={6}
          md={6}
          sx={{
            borderLeft: '1px solid #385170',
            marginTop: '3.5rem',
            [theme.breakpoints.down('sm')]: { display: 'none' },
          }}
        >
          <Slider images={config.S00_loginPageSlider}/>
        </Grid>
      </Grid>
    </Box>
  )
}
