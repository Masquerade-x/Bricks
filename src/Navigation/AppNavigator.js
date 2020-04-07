import React from 'react';
import {SafeAreaView,Text,View,useEffect,Icon} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import EnterProperty from '../screens/EnterProperty';
import { firebase } from '@react-native-firebase/auth';
import ChatScreen from '../screens/ChatScreen';
import RNBootSplash from "react-native-bootsplash";
import DrawerButton from '../components/DrawerButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
// import IconButton from 'react-native-vector-icons/FontAwesome';
import { IconButton ,Colors} from 'react-native-paper';



const Stack = createStackNavigator();

const firebaseConfig= {
  apiKey:'AIzaSyC6TTpQUP8gZVC-nR6AxCvRMs15-ParSwI',
  appId:'128020890766:android:d11240a7c7e00948a9b5df',
  databaseURL:'https://probricks-929e5.firebaseio.com/'
  };
  firebase.initializeApp(firebaseConfig);

 

export default function AppNavigator({navigation}){

  const signOutUser =()=>{
    navigation.navigate('Login')
}

  return(
   
    <NavigationContainer>
        <Stack.Navigator>
            {/* <Stack.Screen name="Login" component={LoginScreen}  options={{headerShown:false}}/>
            <Stack.Screen name="Signup" component={SignupScreen}  options={{headerShown:false}}/> */}
            <Stack.Screen name="Home" component={HomeScreen}
             options={{title:'Chats',
             headerTitleAlign:'center',
             headerRight:()=>(<TouchableOpacity onPress={signOutUser}>
               <Text style={{fontSize:responsiveFontSize(2.3),fontWeight:'600'}}>Log Out</Text>
             </TouchableOpacity>),
             headerLeft:()=>(
              <IconButton
              icon="camera"
              color={Colors.red500}
              size={20}
              onPress={() => navigation.openDrawer()}
            />             )
             }} />
            <Stack.Screen name="Drwaer" component={DrawerButton} />
            <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
  </NavigationContainer>
  )
}