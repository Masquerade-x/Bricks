import React from 'react';
import {SafeAreaView,Text,View} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen'
import { firebase } from '@react-native-firebase/auth';


const Stack = createStackNavigator();

const firebaseConfig= {
  apiKey:'AIzaSyC6TTpQUP8gZVC-nR6AxCvRMs15-ParSwI',
  
  };
  firebase.initializeApp(firebaseConfig);

;

export default function AppNavigator(){
  return(
   
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {/* <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Signup" component={SignupScreen}/> */}
            <Stack.Screen name="Home" component={HomeScreen}/>
        </Stack.Navigator>
  </NavigationContainer>
  )
}