import React,{useState} from 'react'
import { View,StyleSheet} from 'react-native'
import {Text,Button,Input}from 'react-native-elements'
import Spacer from './Spacer'
import {Foundation} from '@expo/vector-icons'


const AuthFormSignIn = ({headerText,errorMessage,onSubmit,buttonTitle}) => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')


    return (
        <View>
             <Spacer >
                <View   style={{marginLeft:80,marginTop:25}}>
                 <Foundation size={300} name='social-blogger' color='#194052' style/>
                  </View>
            </Spacer>
            <Spacer>
            <Input label='Username'
                   value={username}
                   onChangeText={setUsername}
                   autoCapitalize="none"
                   autoCorrect={false}
            />
            </Spacer>
            <Spacer>
            <Input label="Password"
                   value={password}
                   onChangeText={setPassword}
                   autoCapitalize="none"
                   autoCorrect={false}
                   secureTextEntry
            />
            </Spacer>
           
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            <Spacer>
            <Button title={buttonTitle}
                    onPress={()=>onSubmit({username,password})}
            />
            </Spacer>
          
        </View>
    )
}

const styles = StyleSheet.create({
    errorMessage:{
        fontSize:18,
        color:'blue',
        margin:20,
    },
})

export default AuthFormSignIn
