import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from './src/screens/HomeScreen'
import NotificationScreen from './src/screens/NotificationScreen'
import WriteBlogScreen from './src/screens/WriteBlogScreen'
import UserScreen from './src/screens/UserScreen'
import BlogViewScreen from './src/screens/BlogViewScreen'
import EditBlogScreen from './src/screens/EditBlogScreen'
import SingleUser from './src/components/SingleUser'

import SignInScreen from './src/screens/SignInScreen'
import SignUpScreen from './src/screens/SignUpScreen'

import ResolveAuthScreen from './src/screens/ResolveAuthScreen'

import {Icon} from '@expo/vector-icons'

import { Provider as AuthProvider} from './src/context/AuthContext'
import { Provider as UserProvider} from './src/context/UserContext'
import {Provider as BlogProvider} from './src/context/BlogContext'

import { setNavigator } from './src/navigationRef'
import SearchScreen from './src/screens/SearchScreen';


const switchNavigator = createSwitchNavigator({
     ResolveAuth : ResolveAuthScreen,
     loginFlow: createStackNavigator({
        SignUp : SignUpScreen,
        SignIn :SignInScreen,
    }),
    mainFlow: createBottomTabNavigator({
        Blog : createStackNavigator({
            Home: HomeScreen, 
            BlogView : BlogViewScreen,   
            Notification :NotificationScreen,
        }),
        Search : createStackNavigator({
            Search : SearchScreen,
            SingleUser : SingleUser,

        }),
        Write :createStackNavigator({
            Write:WriteBlogScreen,
            EditBlog : EditBlogScreen
        }),
        User : UserScreen,

    })

})

const App =  createAppContainer(switchNavigator)

export default () =>{
    return (
        <AuthProvider>
            <UserProvider>
                <BlogProvider>
                <App ref={(navigator)=> setNavigator(navigator)}/>
             </BlogProvider>
            </UserProvider>
        </AuthProvider>
    )
}