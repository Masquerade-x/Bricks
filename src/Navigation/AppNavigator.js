import React ,{useState,useEffect} from 'react';
import {SafeAreaView,Text,View} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import ChatScreen from '../screens/ChatScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { IconButton ,Colors, Button} from 'react-native-paper';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {myName} from '../screens/ChatScreen';



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const firebaseConfig= {
  apiKey:'AIzaSyC6TTpQUP8gZVC-nR6AxCvRMs15-ParSwI',
  appId:'128020890766:android:d11240a7c7e00948a9b5df',
  databaseURL:'https://probricks-929e5.firebaseio.com/'
  };
  firebase.initializeApp(firebaseConfig);



export default function AppNavigator({navigation}){
  const [userToken, setUser] = useState({});


  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <Button mode="text" onPress={() => auth().signOut()}>
          Logout
        </Button>
        <Button mode="text" onPress={()=>navigation.navigate('Main')}>
          Home
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
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} 
       
        />
      </Stack.Navigator>
    )
  }

  async function onSignIn() {
    // Get the users ID
    const uid = auth().currentUser.uid;
   
    // Create a reference
    const ref = database().ref(`/users/${uid}`);
   
    // Fetch the data snapshot
    const snapshot = await ref.once('value');
    
    uName = snapshot.child('name').val();
    // setUserName(uName);
    console.log(uName);

    // let dbRef = database().ref('users');
    // dbRef.on('child_added',(val) => {
    //   let person = val.val();
    //   person.email=val.key;
    //   setUsers(prevState=> {
    //     return {
    //       ...prevState.users,person
    //     }
    //   })
    // })
  }


  useEffect(()=>{
    const unsubscribe = auth().onAuthStateChanged(user=>{
      setUser(user);
      onSignIn();
    })
    return () => {
      unsubscribe();
    };


  },[navigation])

  return(
    <NavigationContainer>
        {userToken === null ? (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
        ):(
        <Drawer.Navigator  drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Main" component={Main} options={{title:"Chats"}}/>
        </Drawer.Navigator>
        )}
  </NavigationContainer>
  );
}