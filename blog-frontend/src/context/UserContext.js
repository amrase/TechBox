import createDataContext from '../context/createDataContext'
import railsServer from '../api/railsServer'
import {AsyncStorage} from 'react-native'
import { navigate } from '../navigationRef'

const userReducer = (state,action) =>{
    switch(action.type){
        case 'oneuser':
            return {...state, user: action.payload }
        case 'userid':
            return {...state, id:action.payload}    
        default:
            return state 
    }
}



const getUser = (dispatch) => async () =>{
  const token  = await AsyncStorage.getItem('token')
  if (AsyncStorage.getItem("token")) {
    const id = await AsyncStorage.getItem('id')
    const response = await railsServer.get('/persist', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    },()=> console.log(response.data.user))
    .then( response => {
      console.log('Responsse',response.data.user)
      // const userId = AsyncStorage.setItem('id',response.data.user.id)
      if(response.data.user.id){
          dispatch({type:'oneuser',payload:response.data.user})
      }
      else{
          console.log('sompethings is wrong')
      }
   })       
  } 
}



const getOneUserBlog= (dispatch) => async () =>{
  if (AsyncStorage.getItem("token")) {
    const id = await AsyncStorage.getItem('token')
    const response = await railsServer.get('/blogs/${}', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then( response => {
      if(response.data.token){
        dispatch({type:'oneuser',payload:response.data.user})
      }
      else{
        console.log('sompethings is wrong')
      }
  })       
} 
}









export const {Provider,Context} = createDataContext(
    userReducer,
    {getUser},
    {}
)
