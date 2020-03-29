import React,{useContext,useEffect, useState} from 'react'
import {View,Text,StyleSheet,Button,Image} from 'react-native'
import {Context as BlogContext} from '../context/BlogContext'
import { FlatList, TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import {Feather,AntDesign} from '@expo/vector-icons'
// import { SafeAreaView } from 'react-native-safe-area-context'
import {SafeAreaView} from 'react-navigation'
// import {CardList} from 'react-native-card-list'
// import { colors, SearchBar } from 'react-native-elements'


const HomeScreen = ({navigation}) =>{
    const {state,deleteBlogPost,getBlogPost} = useContext(BlogContext)
    const [term,setTerm]= useState('')



    useEffect(() => {
       getBlogPost()
    }, [])



    const filterBlogsBySeachTerm = () =>{
        if(state !== undefined){
             return state.filter( blog => {
                return blog.title.toLowerCase().includes(term.toLowerCase())
            })
        }
    }    


    return  <SafeAreaView forceInset={{ top: 'never'}}>
        <View style={styles.firstContainer}>
                    <Feather style={styles.iconStyle} name='search' size={30}/>
                    <TextInput style={styles.inputStyle} 
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder='Search'
                            value={term}
                            onChangeText = {(newTerm)=> setTerm(newTerm)}
                            onChangeText={(newTerm)=>setTerm(newTerm)}
                            onEndEditing={()=>filterBlogsBySeachTerm()}
                            
                            
                    />
            </View>
            <View>
          <FlatList
            data={filterBlogsBySeachTerm()}
            keyExtractor={(blogPost)=> blogPost.title}
            renderItem = {({item})=>{
                  return  <TouchableOpacity onPress={()=> navigation.navigate('BlogView',{id: item.id})}>
                                <View style={styles.mainContainer}>
                                <View style={styles.firstItem}>
                                    <Text style={styles.title}>{item.title}</Text>
                                </View>
                
                                <View style={styles.secondItem}>
                                <Image style={styles.image}
                                    source={{uri: item.image} ? {uri: item.image} : {uri: 'https://ih0.redbubble.net/image.523773899.2261/flat,550x550,075,f.u4.jpg'}}/>
                                </View>
                               <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                    {/* <Feather style={styles.iconStyle} name="trash"/> */}
                                </TouchableOpacity>
                                </View>
                      </TouchableOpacity>     
            }}
        /> 
        </View>
        </SafeAreaView>

}

HomeScreen.navigationOptions = ({navigation}) =>{
    return{
        headerRight : () =>
        <TouchableOpacity onPress={()=>navigation.navigate('Notification')}>
             <AntDesign name="notification" size={30}/>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        flexDirection:'row',
        margin:5,
        backgroundColor:'#194052',
        borderRadius:10
    
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
    firstContainer:{
        height:'10%',
        backgroundColor: '#194052',
        height:50,
        // marginTop:50,
        borderRadius:5,
        marginHorizontal:5,
        flexDirection:'row'
    },
    secondContainer:{
       height:'90%',
    },
    inputStyle:{
      flex:1,
      color:'white'
    },
    iconStyle:{
        color:'white',
        fontSize:35,
        alignSelf:'center',
        marginHorizontal:15
    }
})

export default HomeScreen