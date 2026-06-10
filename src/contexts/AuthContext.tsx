import { createContext, useContext, useEffect, useReducer } from 'react'
import { dynamicRoutes } from '../routes/DynamicRoutes'
import axios, { getServerError } from '../utils/axios'
import { setSession } from '../utils/jwt'
import baseUrl from '../utils/Util'
import { toast } from 'react-toastify'

const INITIALIZE = 'INITIALIZE'
const SIGN_IN = 'SIGN_IN'
const SIGN_OUT = 'SIGN_OUT'
const SIGN_UP = 'SIGN_UP'
const EDIT_PROFILE = 'EDIT_PROFILE'

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  menus: [],
}

function decodeUserInfo(user: any) {
  if (user && user.pd) {
    try {
      const info = JSON.parse(atob(user.pd.substring(5)))
      const _user = { ...user, ...info }
      return _user;
    } catch (error) {
      console.error(`Could not load user's information`);
    }
  }
  return user;
}


const AuthReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'GETMENUS':
      return {
        ...state,
        menus: action.payload.menus,
      }
    case INITIALIZE:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: decodeUserInfo(action.payload.user),
      }

    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: decodeUserInfo(action.payload.user),
      }
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }

    case SIGN_UP:
      return {
        ...state,
        isAuthenticated: false,
        user: decodeUserInfo(action.payload.user),
      }
    case EDIT_PROFILE:
      return {
        ...state,
        user: decodeUserInfo(action.payload.user)
      }

    default:
      return state
  }
}

const AuthContext = createContext(null)

function AuthProvider({ children }: any) {
  const [state, dispatch] = useReducer(AuthReducer, initialState)
  const token = window.localStorage.getItem('accessToken')
  var UserId = window.localStorage.getItem('user');
  const getDynamicmenus = async () => {
    try {
      //console.log('UserId',JSON.parse(UserId)?.id)
      if (token) {
        const parsedUserId = JSON.parse(UserId as any);
        const entityToSave = parsedUserId ? { UserId: parsedUserId.id } : {};
        const response = await axios.post('base/v1/api/system/inquiry2',entityToSave, {
          headers: { authorization: `bearer ${token}` },
        })
        console.log('response',response.data)
        const { result } = response.data

        dispatch({
          type: 'GETMENUS',
          payload: {
            menus: dynamicRoutes(result),
          },
        })
      }
    } catch (error:any) {
      console.log('error login ',error )

    }
  }
  useEffect(() => {
    const initialize = async () => {
      try {
        if (token) {
          setSession(token)
          await axios.get('auth/v1/api/check-login-status', {
            headers: { authorization: `bearer ${token}` },
          })
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              user: JSON.parse(localStorage.getItem('user')!),
            },
          })
        
        } 
      } catch (error: any) {
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        })
      }
    }

     getDynamicmenus().then(()=>initialize()) 
  }, [])

  const signIn = async (props: any) => {
    const { userName, password } = props
    try {
      const response1 = await axios.post(
        'auth/v1/api/login',
        {
          userName,
          password,
        },
        { headers: { authorization: `bearer ${token}` } },
      )
      const { result } = response1.data
      localStorage.setItem('user', JSON.stringify(result))
      setSession(token)
      dispatch({
        type: SIGN_IN,
        payload: {
          isAuthenticated: true,
          user: result,
        },
      })
      getDynamicmenus()
    }catch (error: any) {
      console.log('error.response ',error.response)
      if (error && error.response.status === 401) {
        let errors;
        errors = error.response.data.result.message
        toast.error(errors);
      }
      toast.error(getServerError(error));
    }
  }

  const signOut = async () => {
    //@ts-ignore
    try {
      await axios.post('auth/v1/api/logout', {
        headers: { authorization: `bearer ${token}` },
      })
      dispatch({
        type: SIGN_OUT,
      })
      history.pushState(null, '', baseUrl)
    }catch (error: any) {
      if (error && error.response.status=== 401) {
        let errors;
        errors = error.response.data.result.message
        toast.error(errors);
      }
      toast.error(getServerError(error));
    }
  }

  const signUp = async (props: any) => {
    const {
      email,
      password,
      firstName,
      lastName,
      userName,
      rePassword,
      cellPhoneNumber,
      UnitId
    } = props
    try {
      const response = await axios.post('/user/v1/api/register', {
        email,
        password,
        firstName,
        lastName,
        userName,
        rePassword,
        cellPhoneNumber,
        isActive: true,
        UnitId
      })
      const { user } = response.data
      dispatch({
        type: SIGN_UP,
        payload: {
          user,
        },
      })
    } catch (error: any) {
      console.log('error',error)
      if (error && error.response.status === 500) {
        let errors;
        errors = error.response.data.result.message
        toast.error(errors);
      }
      else
      toast.error(getServerError(error));
    }
  }

 
  const editProfile = (props: { firstName: string, lastName: string, pd: string }) => {
    const updateUser = { ...state.user, ...props }
    dispatch({
      type: EDIT_PROFILE,
      payload: {
        user: updateUser
      }
    })
    localStorage.setItem('user', JSON.stringify(updateUser))
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        signIn,
        signOut,
        signUp,
        editProfile
        // resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context)
    throw new Error('AuthContext must be placed within AuthProvider')

  return context
}
