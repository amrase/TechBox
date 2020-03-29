import React,{useState,useEffect} from 'react'
import { StyleSheet,View,Button,TextInput, AsyncStorage,Text} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'

const WriteBlogScreen = ({navigation}) =>{
    const {image,setImage}  = useState('')
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [userId,setData] = useState(null)
 

    useEffect(() => {
       userData()
      //  getPermissionAsync()
    }, [])

    console.log(userId)

      const userData = async () => { 
        const id = await AsyncStorage.getItem('id')
        const result = await axios.get(`http://localhost:3000/users/${id}`)
        setData(result.data.id)
        
      }


      const postForm = async (title,description,userId,callback) =>{
        if(userId !== null){
          const response  = await axios.post(`http://localhost:3000/blogs`,{
              title : title ,
              description : description,
              user_id :userId,
              // image: image,
          },()=>{
            if(callback){
              callback()
            }
          }) 
        }
      else {
        console.log('Something is wrong')
      }
    }
  
    //  getPermissionAsync = async () => {
    //   if (Constants.platform.ios) {
    //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //     if (status !== 'granted') {
    //       alert('Sorry, we need camera roll permissions to make this work!');
    //     }
    //   }
    // }
  
    // _pickImage = async () => {
    //   let result = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.All,
    //     allowsEditing: true,
    //     aspect: [4, 3],
    //     quality: 1
    //   });
    //   if (!result.cancelled) {
    //     console.log('Image from result',result.uri)
    //     setImage({ image: result.uri });
    //   }
    // }
    
    return (
  
    <View style={styles.container}>
                <TextInput style={styles.titleInput} 
                    value={title} 
                    
                    onChangeText={(title)=>setTitle(title)}
                    placeholder="Enter Title"
                />
                     <View style={{ flex: 1, alignItems: 'center',marginBottom:2, justifyContent: 'center' }}>
                       <Text>Description:</Text>
                   </View>
                <TextInput style={styles.descriptionInput}
                    placeholder="Description"
                    value={description}
                    onChangeText={(description)=>setDescription(description)}
                />
                <Button title='Add Blog'
                      // onPress = {()=>navigation.navigate('Blog')}
                    onPress={()=>postForm(title,description,userId,()=>navigation.navigate('Blog'))}
        />
    </View>

    )
}
    
    

const styles = StyleSheet.create({
    container:{
    flex:1,
    justifyContent:'flex-start'
    },
    titleInput:{
      backgroundColor:'#194052',
      height:60,
      borderRadius:5,
      marginBottom:7,
      fontSize:20,
      color:'white'
    },
    descriptionInput:{
       height:'80%',
       backgroundColor:"#194052",
       fontSize:20,
       color:'white'

    }
    
})

export default WriteBlogScreen