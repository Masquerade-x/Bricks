import React, { useState, useEffect, useCallback } from 'react'
import {SafeAreaView,View,StyleSheet,RefreshControl,ScrollView, ImageBackground} from 'react-native'
import {Text, IconButton, Colors } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import  {firebase} from '@react-native-firebase/auth';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import Person from '../components/Person';
import database from '@react-native-firebase/database';
import DrawerButton from '../components/DrawerButton';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatScreen from './ChatScreen';
import { useRoute } from '@react-navigation/native';


async function getName() {
  try {
    const name = await AsyncStorage.getItem('@name');
    if (name !== null) {
      return name;
    }
  } catch (e) {
    // error reading value
  }
}

export default function HomeScreen({navigation}){

    const[refreshing, setRefreshing] =useState(false);
    const[users,setUsers]=useState([]);
    const {currentUser}=auth();
    const[activeUser,setActiveUser]=useState('')
    const[activeUid,setActiveUid]=useState('')

    
    useEffect(()=>{
      if(currentUser){
        console.log(currentUser)
        getName().then(name=>{
          currentUser.updateProfile({
            displayName:name,
          })
        })
        setActiveUser(currentUser.displayName);
        setActiveUid(currentUser.uid)

      }
    },[currentUser]);

    // const onRefresh = useCallback(()=>{
    //   setRefreshing(true)
    //   onSignIn()
    //   setRefreshing(false)
    // },[refreshing])

      useEffect(()=>{
        const unsubscribe = auth().onAuthStateChanged(async user=>{
        if(user){
          database().ref(`/users/${user.uid}`)
          .set({
            uid:user.uid,
            name:user.displayName,
            email:user.email,
          });
        }
        });
        return () => {
          unsubscribe();
        };
      },[])

      useEffect(()=>{
        var unsubscribe = database().ref('users');
        unsubscribe.on('value',usersData =>{
          const usersArray=[];
          usersData.forEach(user=>{
            var userData = user.val();
            usersArray.push(userData);
          });
          setUsers(usersArray);
          //setUsers(usersArray.filter(user => user.uid !== currentUser.uid)) // filter out current user before saving
        })
        return ()=>{
          unsubscribe && unsubscribe.off();
        };
      },[]);
    
    renderRow = ({item})=>{
      console.log(item,'here is item')
        return(  
            <TouchableOpacity onPress={()=>navigation.navigate('Chat',{name:item.name,activeUser:activeUser,email:item.email})} style={styles.touch}>
              <Text style={{fontSize:25,marginTop:10,marginLeft:5,color:'black'}}>
                {item.name}
              </Text>
            </TouchableOpacity>              
        )
      }
    
    return(    
      // <ScrollView contentContainerStyle={styles.scrollView} 
      // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      //>    
      
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/grad.jpg')}
          style={styles.img}>
        <View styles={styles.header}>
          
          <TouchableOpacity style={{marginLeft:5}} onPress={()=>navigation.toggleDrawer()}>
            <Icon name="menu" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('Profile',{name:activeUser,uid:activeUid})} style={{marginRight:5,alignItems:'flex-end'}}>
                    <Icon name="account-circle" size={35} color="white" />
          </TouchableOpacity>

        </View>
          <FlatList
          style={styles.flat}
          data={users}
          renderItem={renderRow}
          keyExtractor={item=>item.uid}
           />
        </ImageBackground>
        </View>

         )
    }
        
const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    img:{
      flex:1
    },
    header:{
      backgroundColor:'red',
      flexDirection:'row',
      justifyContent:'space-between'
    },
    flat:{
      marginTop:10,
      padding:10,
      borderBottomColor:'grey',
      borderBottomWidth:StyleSheet.hairlineWidth
  },
    touch:{
      height:60,
      borderBottomColor:'black',
      borderBottomWidth:StyleSheet.hairlineWidth
    }
})