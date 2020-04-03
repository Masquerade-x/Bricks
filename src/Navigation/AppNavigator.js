import React from 'react';
import {SafeAreaView,Text,View,useEffect} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, Title } from 'react-native-paper';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import EnterProperty from '../screens/EnterProperty';
import { firebase } from '@react-native-firebase/auth';
import ChatScreen from '../screens/ChatScreen';
import RNBootSplash from "react-native-bootsplash";



const Stack = createStackNavigator();

const firebaseConfig= {
  apiKey:'AIzaSyC6TTpQUP8gZVC-nR6AxCvRMs15-ParSwI',
  appId:'128020890766:android:d11240a7c7e00948a9b5df',
  databaseURL:'https://probricks-929e5.firebaseio.com/'
  };
  firebase.initializeApp(firebaseConfig);

 

export default function AppNavigator(){



  return(
   
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen}  options={{headerShown:false}}/>
            <Stack.Screen name="Signup" component={SignupScreen}  options={{headerShown:false}}/>
            <Stack.Screen name="Home" component={HomeScreen}
             options={{title:'Chats',
             headerTitleAlign:'center'
             }} />
            <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
  </NavigationContainer>
  )
}