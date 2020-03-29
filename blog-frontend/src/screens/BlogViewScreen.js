import React,{useContext,useState,useEffect} from 'react'

import {View,Text,StyleSheet,Image, AsyncStorage} from 'react-native'
import { Context } from '../context/BlogContext'
import {  TextInput, ScrollView,TouchableOpacity } from 'react-native-gesture-handler'
import {Foundation} from '@expo/vector-icons'
import railsServer from '../api/railsServer'

const BlogViewScreen = ({navigation}) =>{

    const {state} = useContext(Context)
    const [comment,setComment] = useState('')
    const [blogId,setBlogId] = useState(null)
    const [userId,setUserId] = useState(null)


    useEffect(() => {
     getId()

    }, [])

    const blogPost = state.find((blogPost)=> blogPost.id === navigation.getParam('id'))

    const mapComments = () => { 
        let  blogs = state.find((blog)=> blog.id)
        if ( blogs && blogs.comments !== undefined) {
         return blogPost.comments.map((data)=>{
             return <View>
                    <Text style={{color:'white',fontSize:20}}>Comments:{data.comment},user:{data.user}</Text>
                    </View>        
           })
        } 
        else {
          console.log('something wrong')
        } 
    }

    const getId = async () => { 
        const userid = await AsyncStorage.getItem('id')
        const result = await railsServer.get(`http://localhost:3000/users/${userid}}`)
        // console.log(result.data.blogs)
        setUserId(result.data.id)
        setBlogId(navigation.getParam('id'))
      }


    const commentBlogs = async (comment,blogId,userId,callback) =>{
        const blog_id = navigation.getParam('id')
        const response  = await railsServer.post(`http://localhost:3000/comments`,{
            comment : comment,
            blog_id: blog_id,
            user_id :userId,
        },()=>{
          if(callback){
            callback()
          }
        }) 
      }
    
    


    return <ScrollView style={styles.row} >
        <Text style={styles.title}>{blogPost.title}</Text>
        <View style={styles.imageContainer}>
        <Image   style={styles.imageStyle}
                source={{uri: blogPost.image}}/>
         </View>  
        
         <Text style={styles.description}>{blogPost.description}</Text> 
         {/* <Text style={{fontSize:20,color:'white',textAlign:'cente'}}>Comment</Text> */}
         <View style={{flexDirection:'row'}}>
         <TextInput style={styles.commentsInput}
            placeholder='Comment here'
            value={comment}
            onChangeText={(newComment)=>setComment(newComment)}
         />
         
         <TouchableOpacity style={styles.submitOption}
            onPress={()=>commentBlogs(comment,blogId,userId,()=>console.log('something happend'))}
         >
                <Text style={{fontSize:20,color:'white'}}>Submit</Text>
         </TouchableOpacity>
         </View>
         <View style={styles.commentsContainer}>
                {mapComments()}
         </View>
    
       

    </ScrollView>
}

BlogViewScreen.navigationOptions = ({navigation}) =>{
    return{
        headerShown: false
    }
}

const styles = StyleSheet.create({
    row:{   
        flex:1,
        backgroundColor:'#194052'
    },
    title:{
        marginTop:70,
        textAlign:'center',
        fontSize: 24, 
        color:'white',
   },
   description:{
       fontSize:20,
        margin:20,
        color:'white'
   },
   imageStyle:{
       justifyContent:'center',
       alignItems:'center',
       alignContent:'center',
       marginTop:30,
       marginLeft:20,
    //    height:'20%',
       height:200,
       width:380,
    // position:'absolute'
    },
    commentsContainer:{
        margin:20,
    },
    commentsInput:{
        width:'65%',
        borderRadius:6,
        marginTop:25,
        margin:20,
        backgroundColor:'white',
        height:50,
    },
    submitOption:{
        // width:'25%',
        borderRadius:6,
        marginTop:40,
        // backgroundColor:'white'
    }
})

export default BlogViewScreen