import React,{useState} from 'react'
import { View,StyleSheet, CameraRoll} from 'react-native'
import {Text,Button,Input}from 'react-native-elements'
import Spacer from './Spacer'
import {Foundation} from '@expo/vector-icons'



const AuthFormSignUp = ({headerText,errorMessage,onSubmit,buttonTitle}) => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [firstname,setFirstName] = useState('')
    const [lastname,setLastName] = useState('')
    const [dob,setDob] = useState('')
    const [location,setLocation] = useState('')




    return (
        <View>

                <View   style={{marginLeft:100,marginTop:150}}>
                 <Foundation size={300} name='social-blogger' color='#194052' style/>
                  </View>

            <Input label='Username'
                   value={username}
                   onChangeText={setUsername}
                   autoCapitalize="none"
                   autoCorrect={false}
            />
            <Input label="Password"
                   value={password}
                   onChangeText={setPassword}
                   autoCapitalize="none"
                   autoCorrect={false}
                   secureTextEntry
            />
            <Input label="Email"
                   value={email}
                   onChangeText={setEmail}
                   autoCapitalize="none"
                   autoCorrect={false}
            />
            <Input label="Date of Birth"
                   value={dob}
                   onChangeText={setDob}
                   autoCapitalize="none"
                   autoCorrect={false} 
            />

            <Input label="First Name"
                   value={firstname}
                   onChangeText={setFirstName}
                   autoCapitalize="none"
                   autoCorrect={false}
            />
            <Input label="Last Name"
                   value={lastname}
                   onChangeText={setLastName}
                   autoCapitalize="none"
                   autoCorrect={false}
            />

            <Input label="State"
                   value={location}
                   onChangeText={setLocation}
                   autoCapitalize="none"
                   autoCorrect={false}
            />
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            <Spacer>
        
            <Button title={buttonTitle}
                    onPress={()=>onSubmit({username,password,firstname,lastname,dob,location,email})}
            />
            
            </Spacer>
          
        </View>
    )
}

const styles = StyleSheet.create({
    errorMessage:{
        fontSize:18,
        color:'blue',
        margin:5,
    },
})

export default AuthFormSignUp
