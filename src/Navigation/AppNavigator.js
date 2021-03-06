import React ,{useState,useEffect} from 'react';
import {SafeAreaView,Text,View} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import ChatScreen from '../screens/ChatScreen';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconButton ,Colors, Button} from 'react-native-paper';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import ContactScreen from '../screens/ContactScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigator({navigation}){
  const [userToken, setUser] = useState({});


  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  async function logOut() {
    await AsyncStorage.removeItem('@name');
    await auth().signOut()
  }

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <Button mode="text" onPress={logOut}>
          Logout
        </Button>
        <Button mode="text" onPress={()=>navigation.navigate('Home')}>
          Home
        </Button>
      </DrawerContentScrollView>
    );
  }

  function Main(){
    return(
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />

      </Stack.Navigator>
    )
  }



  return(
    <NavigationContainer>
        {userToken === null ? (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={LoginScreen}  />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
        ):(
        <Drawer.Navigator  drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Main" component={Main}/>
        </Drawer.Navigator>
        )}
  </NavigationContainer>
  );
}