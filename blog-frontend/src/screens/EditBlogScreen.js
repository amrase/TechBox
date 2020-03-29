import React,{useContext} from 'react'
import {StyleSheet} from 'react-native'

import { Context as BlogContext} from '../context/BlogContext'
import { Context as UserContext} from '../context/UserContext'
import BlogPostForm from '../components/BlogPostForm'

const EditScreen = ({navigation}) =>{
    const id = navigation.getParam('id')
    console.log('edit',id)
    const {state,editBlogPost} = useContext(BlogContext)
    //check if its the right Id
    
    console.log('state',state)


    const blogPost = state.find((blogPost) => blogPost.id === id)

    return (
        <BlogPostForm 
            initialValues={{title: blogPost.title,description: blogPost.description}}
            onSubmit={(title,description)=>editBlogPost(id,title,description)}
        />
    )
}

const styles = StyleSheet.create({})

export default EditScreen