import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  AsyncStorage
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import {Feather} from '@expo/vector-icons'
import axios from 'axios';
import {SafeAreaView} from 'react-navigation'

const NotificationScreen = () => {
     const [term,setTerm] = useState('')
     const [userId,setUserId] = useState(null)
     const [data,setData] = useState([])
     
     console.log('user',userId)
     console.log('set data',data.followers)
    
   
     useEffect(() => {
       userData()
    
   }, [])

     userData = async () => {
      const id = await AsyncStorage.getItem('id')
      const result = await axios.get(`http://localhost:3000/users/${id}`)
      setData(result.data)
     }


     const mapFollowers = () =>{
       if ( data && data.followers !== undefined) {
        return data.followers.map((followers)=>{
            return <Text style={styles.content}>You have been followed by: {followers.name}</Text>
          })
       }     
       else {
         console.log('something wrong')
       } 
     }
     const mapFollowings = () =>{
      if ( data && data.followees !== undefined) {
       return data.followees.map((followee)=>{
           return <Text style={styles.content}>You have followed: {followee.name}</Text>
         })
      }     
      else {
        console.log('something wrong')
      } 
    }


    const fillterFollowers = ()  =>{

    }

      return (
        <SafeAreaView forceInset={{ top: 'never'}}>
        {/* <View style={{marginTop:60,marginLeft:15,marginRight:15}}> */}
          {/* <SearchBar inputStyle={{color:'white'}}
          placeholder="Type Here..."
          onChangeText={(newTerm)=>setTerm(newTerm)}
          value={term}/> */}
        {/* </View> */}
        {/* <View  style={styles.searchContainer}>
        <Feather style={styles.iconStyle} name='search' size={30}/>
        <TextInput style={styles.inputStyle} 
                   autoCapitalize="none"
                   autoCorrect={false}
                   placeholder='Search'
                   value={term}
                   onChangeText={(newTerm)=> setTerm(newTerm)}
                   onEndEditing={()=>onTermSubmit}
        /> */}
    
         <View>
          {mapFollowers()}
          {mapFollowings()}
         </View>
         </SafeAreaView>
        
      )
}
    
  
  
  const styles = StyleSheet.create({
    searchContainer:{
      backgroundColor: 'grey',
      height:50,
      // marginTop:70,
      borderRadius:5,
      marginHorizontal:5,
      flexDirection:'row',
      marginBottom:10,
  },
  inputStyle:{
    flex:1,
    borderRadius:5,
    margin:10,
  },

  
    content: {
      fontSize:22,
      textAlign:'center',
      margin:10,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#194052',
      height:50,
      color:'white',
      borderRadius:4,
      marginHorizontal:15,
    },

  });  

export default NotificationScreen
