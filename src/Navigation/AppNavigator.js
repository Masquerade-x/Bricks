import React ,{useState} from 'react';
import {SafeAreaView,Text,View,useEffect} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import { firebase } from '@react-native-firebase/auth';
import ChatScreen from '../screens/ChatScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
// import IconButton from 'react-native-vector-icons/FontAwesome';
import { IconButton ,Colors, Button} from 'react-native-paper';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const Stack = createStackNavigator();

const firebaseConfig= {
  apiKey:'AIzaSyC6TTpQUP8gZVC-nR6AxCvRMs15-ParSwI',
  appId:'128020890766:android:d11240a7c7e00948a9b5df',
  databaseURL:'https://probricks-929e5.firebaseio.com/'
  };
  firebase.initializeApp(firebaseConfig);

const Drawer = createDrawerNavigator();


export default function AppNavigator({navigation}){
  const [userToken, setUser] = useState({});


  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <Button mode="text" onPress={() => auth().signOut()}>
          Logout
        </Button>
      </DrawerContentScrollView>
    );
  }

  function Main(){
    return(
      <Stack.Navigator screenOptions={({navigation})=>({
          headerLeftContainerStyle: {
            paddingLeft: 10,
          },
        headerLeft:()=>(
          <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
            <Icon name="menu" size={30} color="black" />
          </TouchableOpacity>
        )
      })}>
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    )
  }

  return(
    <NavigationContainer>
        <Stack.Navigator>
         <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="SignUp" component={SignupScreen} />

        </Stack.Navigator>
      
        <Drawer.Navigator  drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="Home" component={HomeScreen} options={{title:"Chats"}}/>
        </Drawer.Navigator>
   
  </NavigationContainer>
  )
}