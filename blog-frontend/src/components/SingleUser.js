import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,Image,Button, } from 'react-native'
import Axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context'
import Spacer from './Spacer'
import { FlatList ,TouchableOpacity} from 'react-native-gesture-handler'
import {Feather} from '@expo/vector-icons'

const SingleUser = ({navigation}) => {
    const [user,setUser] = useState([])

    useEffect(() => {
       getUser()
    }, [])

    console.log('single user',user)


    const getUser = async () =>{
        const response = await Axios.get(`http://localhost:3000/users/${navigation.getParam('id')}`)
        setUser(response.data)
    }




    console.log(navigation.getParam('id'))
    return (  <SafeAreaView forceInset={{top:'never'}}>
            { user && user.blogs !== undefined ? 
      
            <View >
            <Spacer>
                <View style={styles.userContainer}>
                    <View style={styles.userInfo}>
                         <Image style={styles.userImage} source={{uri: user.image}}/>
                         <Text style={{fontSize:18}}>{user.username}</Text>
                    </View>
                    <View style={styles.followersInfo}>
                        {/* <AntDesign name="user" size={60} color='black' /> */}
                        <Text style={{fontSize:26, textAlign:'center'}}>{user.blogs.length}</Text>
                        <Text style={{fontSize:18, textAlign:'center'}}>Blogs</Text>
                    </View>
                    <TouchableOpacity style={styles.followersInfo}>
                        {/* <AntDesign name="user" size={60} color='black' /> */}
                        <Text style={{fontSize:26 ,textAlign:'center'}}>{user.followers.length}</Text>
                        <Text style={{fontSize:18, textAlign:'center'}}>Followers</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.followingInfo}>
                    {/* <AntDesign name="user" size={60} color='black' /> */}

                     <Text style={{fontSize:26 ,textAlign:'center'}}>{user.followees.length}</Text>
                        <Text style={{fontSize:18, textAlign:'center'}}>Following</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Button style={styles.followButton}title = 'Follow'/>
                    {/* <Button title='Sign Out' onPress={signout}/> */}
                </View>

                <View style={styles.blogContainer}>
                <FlatList 
                        data={user.blogs}
                        // key={id}
                        keyExtractor={(blogPost)=> blogPost.id}
                        renderItem = {({item})=>{
                              return  (
                                <TouchableOpacity onPress={()=> navigation.navigate('BlogView',{id: item.id})}>
                                <View style={styles.titleDescriptionContainer}>
                                    <View style={styles.firstItem}>
                                        <Text  style={styles.title}>{item.title}</Text>
                                        <Text numberOfLines={5} style={styles.description}>{item.description}</Text>
                                    </View>
                
                                <View style={styles.imageContainer}>
                                    <Image style={styles.image}
                                        source={{uri: item.image}}/>
                                </View>
                               <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                    <Feather style={styles.iconStyle} name="trash"/>
                                </TouchableOpacity>
                                </View>
                      </TouchableOpacity>     
                              )
                        }}/>
                </View>
                
            
            </Spacer>   
            </View>
            
         : 
 null}
        </SafeAreaView>
        
    )
}

const styles =StyleSheet.create({ 
    userContainer:{
        flexDirection:'row',
        borderRadius:10,
        borderWidth:3,
        borderColor:'#194052'
       },
       blogContainer:{
          marginTop:10,
          flexDirection: 'row',
          alignItems: 'flex-start'
       },
       userInfo:{
           alignContent:'flex-start',
           alignSelf:'center',
           justifyContent:'center',
           marginTop:50,
           marginLeft:40,
    
       
       },
          secondItem:{
            flexDirection:'row',
            alignItems:'center',
            marginLeft:20,
         },  
    
    
        followersInfo:{
            marginTop:20,
            // width:'25%',
            // alignContent:'center',
            // alignSelf:'center',
             justifyContent:'center',
             flexDirection:'column',
             marginLeft:20,
    
       },
       followingInfo:{
        marginLeft:20,
        marginTop:20,
        //    width:'25%'
        // width:'25%',
        // alignContent:'center',
        // alignSelf:'center',
     
        justifyContent:'center',
    
         alignSelf:'center',
         justifyContent:'center',
         flexDirection:'column'
           
       },
       
       titleDescriptionContainer:{
        flex:1,
        flexDirection:'row',
        marginBottom:3,
        backgroundColor:'#194052',
        borderRadius:2,
        },
        title:{
            fontSize:20,
            color:'white',
            textAlign:'center'
        },
        description:{
            fontWeight:'100',
            fontSize:18,
            textAlign:'center',
            color:'white'
        },
        firstItem:{
            width:'70%',
        },
        imageContainer:{
            width:'30%'
        },
        image:{
            width:100,
            height:200
        },
        followButton:{
            backgroundColor:'black',
            justifyContent:'center',
            alignItems:'center',
            flex:1
        },
        iconStyle:{
            // color:'white',
        
    }})

export default SingleUser
