import React,{useContext,useEffect} from 'react'
import {View,StyleSheet} from 'react-native'
import {Context as AuthContect} from '../context/AuthContext'

const ResolveAuthScreen = () =>{
    const {tryLocalSignin} = useContext(AuthContect)

    useEffect(() => {
       tryLocalSignin()
    }, [])


    return  null 
}

export default ResolveAuthScreen