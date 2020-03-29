import React,{useContext,useState} from 'react'

import {View,Text,StyleSheet,TextInput,Button} from 'react-native'

import { Context as BlogContext } from '../context/BlogContext'

const BlogPostForm = ({onSubmit,initialValues}) =>{
    const {addBlogPost} = useContext(BlogContext)
    const [title,setTitle] = useState(initialValues.title)
    const [description,setDescription] = useState(initialValues.description)


    
    
    return <View style={styles.container}>
            <Text style={styles.label}>Enter Title</Text>
                <TextInput style={styles.input}
                    value={title} 
                    onChangeText={(title)=>setTitle(title)}
                />
                <Text style={styles.label} >Enter Description</Text>
                <TextInput style={styles.input}
                    value={description}
                    onChangeText={(description)=>setDescription(description)}
                />
                <Button  title='Add Blog'
                    onPress={()=> addBlogPost(title,description)}
        />
    </View>
}

BlogPostForm.defaultProps = {
    initialValues:{
    title:'',
    content:''
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop:100,
        justifyContent:'center',
        flex:1,
        
    },
    label:{
        fontSize: 18,

    },
    input:{
        height:50,
        borderWidth:3,
        borderColor:'grey'
    }
})

export default BlogPostForm