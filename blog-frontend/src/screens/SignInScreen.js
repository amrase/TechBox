import React,{useContext,useEffect, useState} from 'react'
import { View, Text ,StyleSheet} from 'react-native'
import AuthFormSignIn from '../components/AuthFormSignIn'
import Spacer from '../components/Spacer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {Context as AuthContext} from '../context/AuthContext'
import {NavigationEvents} from 'react-navigation'
import Modal from 'react-native-modal';
import SignUpScreen from './SignUpScreen'


const SignInScreen = ({navigation}) => {
    const {state,signin,errorMessage,clearErrorMessage,tryLocalSignin} = useContext(AuthContext)
    const [isVisible,setIsVisible] = useState(false)
    // useEffect(() => {
    //     tryLocalSignin()
    // },[])

    const openModal = () =>{
        setIsVisible({
            isVisible: true
        })
    }

    const toggleModal = () =>{
       setIsVisible({
        isVisible:!isVisible
        })
     }

     const closeModal = () =>{
        setIsVisible({
        isVisible:false
        })
    }

    return (
        <View style={styles.container}>
            <NavigationEvents onWillBlur={clearErrorMessage}/>
            <AuthFormSignIn errorMessage={state.errorMessage}
                      onSubmit={signin}
                      headerText='SignInScreen'
                      buttonTitle='Sign In'
            />
            <Spacer>
            <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
                <Text style={styles.link}>Dont have an account Sign Up Here !</Text>    
            </TouchableOpacity>
            </Spacer>
            <Spacer>
            <TouchableOpacity onPress={()=>openModal()}>
                 <Text style={styles.link}>Click to open the modal</Text>
                 
            </TouchableOpacity>
   
            <Modal animationIn="slideInUp" animationOut="slideOutDown" 
            onBackdropPress={()=>closeModal()} 
            onSwipeComplete={()=>closeModal()} 
            swipeDirection="right" 
            isVisible={isVisible} 
            style={{backgroundColor:'white'}}>
                <SignUpScreen/>
            </Modal>
            </Spacer>
            
    
        </View>
    )
}

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

SignInScreen.navigationOptions =({
    headerShown : false
})
export default SignInScreen
