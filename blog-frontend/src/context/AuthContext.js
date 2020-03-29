import createDataContext from '../context/createDataContext'
import railsServer from '../api/railsServer'
import {AsyncStorage} from 'react-native'
import { navigate } from '../navigationRef'

const authReducer = (state,action) =>{
    switch(action.type){
        case 'add_error':
            return {...state, errorMessage: action.payload}
        case 'userid':
            return {...state,token: action.payload}
        case 'signup':
            return {errorMessage:'',data: action.payload}
        case 'signin':
            return {errorMessage:'',data: action.payload}
        case 'clear_error_message':
            return {...state,errorMessage:''}
        case 'signout':
            return {data:null}    
        default:
            return state
    }
}

const signup = (dispatch) => async ({username,password,email,dob,firstname,lastname,state,location}) =>{
    try{
        const response = await railsServer.post('/users',{username,password,email,dob,firstname,lastname,state,location})
        console.log(response.data)
        // await AsyncStorage.setItem('',response.data.token)

        await AsyncStorage.multiSet([
            ['token',response.data.token],
            ['id',JSON.stringify(response.data.user.id)]
        ])
        
        dispatch({type: 'signup',payload: response.data})
        navigate('Blog')
    }
    catch(errors){
        dispatch({type:'add_error', payload: "Something went wrong while SignUp"})
    }


}
const clearErrorMessage = dispatch => () =>{
    dispatch({type:'clear_error_message'})
}

const signin = (dispatch) =>async ({username,password}) =>{
    try{
        const response = await railsServer.post('/login',{username,password})
        //console.log('line 50',response.data.user.id)

    
        await AsyncStorage.multiSet([
            ['id',JSON.stringify(response.data.user.id)],
            ['token',response.data.token]
            
        ], () => console.log('Yay it worked'))
        
        dispatch({type: 'signin',payload: response.data})
        navigate('Blog') 

    }
    catch(errors){
        dispatch({type:'add_error',payload: "Soemthing went wrong while Login In"})
    }
}

const tryLocalSignin = dispatch => async () =>{
    const token = await AsyncStorage.getItem('token')
    console.log('try local token',token)
    const data = ['id','token']
    if(token){
        AsyncStorage.multiGet(['id','token']).then(data=>{
            let id = data[0][1]
            let token = data[1][1]

            AsyncStorage.setItem('id',data[0][1])
        })

        dispatch({type:'signup',payload: data})
        navigate('Blog')
    }
    else{
        navigate('SignUp')
    }
    
}

const signout = dispatch => async () =>{
    await AsyncStorage.clear()
    dispatch({type:'signout'})
    navigate('SignIn')
}

export const {Provider,Context} = createDataContext(
    authReducer,
    {signup,signin,signout,clearErrorMessage,tryLocalSignin},
    {data:null,errorMessage:''}
)