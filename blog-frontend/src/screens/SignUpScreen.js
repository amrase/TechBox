import React,{useContext,useEffect} from 'react'
import { View,StyleSheet} from 'react-native'
import {Text,Input,Button } from 'react-native-elements'
import Spacer from '../components/Spacer'
import {Context as AuthContext} from '../context/AuthContext'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {NavigationEvents} from 'react-navigation'
import AuthFormSignUp from '../components/AuthFormSignUp'

const SignUpScreen = ({navigation}) => {
    const {state,signup,errorMessage,clearErrorMessage} = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <NavigationEvents onWillBlur={clearErrorMessage}/>
            <AuthFormSignUp errorMessage={state.errorMessage}
                      onSubmit={signup}
                      headerText='SignUpScreen'
                      buttonTitle='Sign Up'
            />
            <Spacer>
      

            <TouchableOpacity onPress={()=>navigation.navigate('SignIn')}>
                <Text style={styles.link}>Have an account Sign In Here !</Text>
            </TouchableOpacity>
            </Spacer>
    
        </View>
    )
}

SignUpScreen.navigationOptions =({
    headerShown : false
})


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        marginBottom:150
    },
    link :{
        color:'red',
        fontSize: 16,
    }


})

export default SignUpScreen
