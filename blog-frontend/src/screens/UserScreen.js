import React,{useContext,useEffect,useState} from 'react'
import { View, Text,StyleSheet,Button,Image,ScrollView} from 'react-native'
import {Context as AuthContext} from '../context/AuthContext'
import {Context as UserContext} from '../context/UserContext'
import {Context as BlogContext} from '../context/BlogContext'
import Spacer from '../components/Spacer'
import{ SafeAreaView} from 'react-navigation'
import {Feather} from '@expo/vector-icons'
import { FlatList ,TouchableOpacity} from 'react-native-gesture-handler'
// import axios from 'axios-on-rails'


const UserScreen = ({navigation}) => {
    const {signout} = useContext(AuthContext)
    const {state,getUser} = useContext(UserContext)
    const {deleteBlogPost} = useContext(BlogContext)



    console.log(state)

    // console.log(navigation.getParam('id'))
  

    useEffect(()=>{
            getUser();
    }, [])




   
    return (
        <SafeAreaView forceInset={{top:'always'}}>
            {state.user && state.user.blogs !== undefined ? 
        <View >
            <View style={{marginTop:10}}>
            <Spacer>
                <View style={styles.userContainer}>
                    <View style={styles.userInfo}>
                         <Image style={styles.userImage} source={{uri: state.user.image}}/>
                         <Text style={{fontSize:18}}>{state.user.username}</Text>
                    </View>
                    <View style={styles.followersInfo}>
                        {/* <AntDesign name="user" size={60} color='black' /> */}
                        <Text style={{fontSize:26, textAlign:'center'}}>{state.user.blogs.length}</Text>
                        <Text style={{fontSize:18, textAlign:'center'}}>Blogs</Text>
                    </View>
                    <TouchableOpacity style={styles.followersInfo}>
                        {/* <AntDesign name="user" size={60} color='black' /> */}
                        <Text style={{fontSize:26 ,textAlign:'center'}}>{state.user.followers.length}</Text>
                        <Text style={{fontSize:18, textAlign:'center'}}>Followers</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.followingInfo}>
                    {/* <AntDesign name="user" size={60} color='black' /> */}

                     <Text style={{fontSize:26 ,textAlign:'center'}}>{state.user.followees.length}</Text>
                        <Text style={{fontSize:18, textAlign:'center'}}>Following</Text>
                    </TouchableOpacity>
                   
                </View>
                <View>
                <TouchableOpacity style={styles.logOut}onPress={signout}>
                        <Text style={{alignItems:'center',color:'white',fontSize:17}}>Sign out</Text>
                    </TouchableOpacity>
                </View>
        

                <View style={styles.blogContainer}>
                <FlatList 
                        data={state.user.blogs}
                        // key={id}
                        keyExtractor={(blogPost)=> blogPost.id}
                        renderItem = {({item})=>{
                              return  (
                                <TouchableOpacity onPress={()=>navigation.navigate('BlogView',{id: item.id})}>
                                <View style={styles.titleDescriptionContainer}>
                                    <View style={styles.firstItem}>
                                        <Text  style={styles.title}>{item.title}</Text>
                                        <Text numberOfLines={5} style={styles.description}>{item.description}</Text>
                                        <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                            <Feather color="white" name="trash" size={25}/>
                                        </TouchableOpacity>
                                    </View>
                
                                <View style={styles.imageContainer}>
                                    <Image style={styles.image}
                                        source={{uri: item.image}}/>
                                </View>
                          
                                </View>
                      </TouchableOpacity>     
                              )
                        }}/>
                </View>
                
            
            </Spacer>   
            </View>
            
        </View> : 
 null}
        </SafeAreaView>
        
    )
}
// UserScreen.navigationOptions = ({navigation}) =>{
//     return{
//         headerRight : () =>
//         <View>
//             <TouchableOpacity onPress={()=>navigation.navigate('Edit')}>
//                  <AntDesign name="logout" size={30}/>
//             </TouchableOpacity>
//         </View>
  
//     }
// }

const styles=StyleSheet.create({
   userContainer:{
    flexDirection:'row',
    borderRadius:10,
    borderWidth:3,
    borderColor:'#194052',
    justifyContent:'center',
    paddingBottom:15
   },
   blogContainer:{
      marginTop:10,
      flexDirection: 'row',
      alignItems: 'flex-start'
   },
   userInfo:{
       alignContent:'flex-start',
    //    width:'25%',
       alignSelf:'center',
       justifyContent:'center',
       marginTop:50,
    //    marginLeft:40,

   
   },
      secondItem:{
        flexDirection:'row',
        // width:'25%',
        alignItems:'center',
        // marginLeft:20,
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
    },
    logOut:{
        height:30,
        marginTop:10,
        borderRadius:7,
        borderWidth:2,
        backgroundColor:'#194052',
        borderColor:'white',
    }
  
})

export default UserScreen
