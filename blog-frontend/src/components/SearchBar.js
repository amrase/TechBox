import React from 'react'
import {View,Text,StyleSheet,TextInput} from 'react-native'
import {Feather} from '@expo/vector-icons'

const SearchBar = ({term,onTermChange,onTermSubmit}) =>{
    

    return  <View style={styles.container}>
        <Feather style={styles.iconStyle} name='search' size={30}/>
        <TextInput style={styles.inputStyle} 
                   autoCapitalize="none"
                   autoCorrect={false}
                   placeholder='Search'
                   value={term}
                   onChangeText={(newTerm)=> onTermChange(newTerm)}
                   onEndEditing={()=>onTermSubmit}
        />
    </View>
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#194052',
        height:50,
        marginTop:20,
        marginLeft:20,
        borderRadius:5,
        marginHorizontal:15,
        flexDirection:'row'
    },
    inputStyle:{
      flex:1,
    },
    iconStyle:{
        fontSize:35,
        alignSelf:'center',
        marginHorizontal:15
    }

})

export default SearchBar