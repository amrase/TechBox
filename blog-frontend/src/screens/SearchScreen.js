import React,{useContext,useState,useEffect} from 'react'
import {StyleSheet,View,Text, AsyncStorage,Image} from 'react-native'
// import { SearchBar } from 'react-native-elements';

import {Context as BlogContext} from '../context/BlogContext'
import Axios from 'axios';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import SearchBar from '../components/SearchBar'
 const SearchScreen = ({navigation}) => {
    // const {state,getUser} = useContext(UserContext)
    const [term,setTerm] = useState('')
    const [data,setData] = useState('')

    useEffect(() => {
        usersData()
    }, [])



      const usersData = async () => {
        const result = await Axios.get(`http://localhost:3000/users`)
        setData(result.data)
       }



    // const mapUsers = () =>{
    //     if ( data !== undefined) {
    //      return data.map((user)=>{
    //             return <TouchableOpacity  onPress={()=>navigation.navigate('User',{id: 1})}>
    //                 <Text >User:{user.username}</Text>
    //                 <Image style={styles.image}
    //                                 source={{uri: user.image}}/>
    //                 </TouchableOpacity>
    //        })
    //     }     
    //     else {
    //       console.log('something is wrong')
    //     } 
    // } 

    const mapUsers = () =>{
        if ( data !== undefined) {
            return (
        <FlatList
        data={data}
        keyExtractor={(user)=> user.username}
        renderItem = {({item})=>{
              return  <TouchableOpacity onPress={()=> navigation.navigate('SingleUser',{id: item.id})}>
                            <View style={styles.mainContainer}>
                            <View style={styles.firstItem}>
                                <Text style={styles.title}>User:{item.username}</Text>
                            </View>
            
                             <View style={styles.secondItem}>
                            <Image style={styles.image}
                                source={{uri: item.image}?{uri: item.image}:'https://ih0.redbubble.net/image.523773899.2261/flat,550x550,075,f.u4.jpg'}/>
                            </View>
                          
                            </View>
                  </TouchableOpacity>  
                
                 }
                }
        />
            )}
    }


        
    return (
        <View >
                {/* <SearchBar /> */}
        
        <View>
            {mapUsers()}
        </View>
        </View>

    )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        flexDirection:'row',
        marginBottom:5,
        // marginTop:10,
        backgroundColor:'#194052',
        borderRadius:15,
        marginHorizontal:18,
    
    },
    firstItem:{
        alignSelf:'center',
        flex:1,
        justifyContent:'center',
        flexDirection:'row',
        width:'70%',
    },
    secondItem:{
        flexDirection:'row',
        width:'30%',
        marginRight:10
    },
    image:{
        width:130,
        height:130,
        borderRadius:10,
    },
    title:{
        color:'white',
        fontSize:20,
        textAlign:'center'
        
    },
    // image:{
    //     height:100,
    //     width:100
    // }
})

export default SearchScreen