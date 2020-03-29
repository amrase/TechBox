
import createDataContext from './createDataContext'
import railsServer from '../api/railsServer'
import { AsyncStorage } from 'react-native'

//Child of BlogProvider
// const BlogContext = React.createContext()
//Reducer 


const blogReducer = (state,action) =>{
    switch(action.type){
        case 'get_blogs':
            return action.payload
        case 'filter_blogs':
            return {...state,payload: action.payload}
        case 'delete_blogpost':
            return state.filter((blogPost) => blogPost.id != action.payload)
        case 'add_blogpost':
            return [...state,{ 
                user_id: action.payload.user_id,
                title: action.payload.title,
                description: action.payload.description
            }] 
        case 'edit_blogpost':
            return state.map((blogPost)=> 
             blogPost.id === action.payload.id ? action.payload : blogPost
        )
        default :
            return [...state]    
    }
}

const getBlogPost = (dispatch) =>{
    return async () =>{
       const response = await railsServer.get('/blogs')
       dispatch({type: 'get_blogs',payload: response.data})
    }
}

const addBlogPost =(dispatch) =>{ 
   return async (title,description,image,user_id,callback) =>{ 
        await railsServer.post('/blogs',{title,description,image,user_id})
        .then((response) =>{
            console.log(response)
        })

        if(callback){
            callback()
        }
        dispatch({type: 'add_blogpost',payload:{title,description,image,user_id}})
   }
}

const deleteBlogPost = (dispatch) =>{
    return async (id) =>{ 
        await railsServer.delete(`blogs/${id}`)
        dispatch({type: 'delete_blogpost',payload: id})
    }
}

const editBlogPost = (dispatch) =>{ async (id,title,description,callback) =>{
        await railsServer.put(`/blogs/${id}`,{title,description,image})
       dispatch({type:'edit_blogpost',payload:{id,title,description,image}})

      if(callback){
          callback()
      }
    }
}

const filterBlogs  = (dispatch) => { async (term)=>{
    const response = await railsServer.get('blogs')
    dispatch({type:'filter_blogs',payload:response.data})
}}





export const { Context,Provider } = createDataContext(
    blogReducer,
    {getBlogPost,deleteBlogPost,editBlogPost,filterBlogs},
    []
)



