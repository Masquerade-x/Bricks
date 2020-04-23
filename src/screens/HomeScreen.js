import React, { useState, useEffect, useCallback } from 'react'
import {SafeAreaView,View,StyleSheet,RefreshControl,ScrollView} from 'react-native'
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
    
    useEffect(()=>{
      if(currentUser){
        getName().then(name=>{
          currentUser.updateProfile({
            displayName:name,
          })
        })
        setActiveUser(currentUser.displayName)

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
          setUsers(usersArray.filter(user => user.uid !== currentUser.uid)) // filter out current user before saving
        })
        return ()=>{
          unsubscribe && unsubscribe.off();
        };
      },[currentUser.uid]);
    
    renderRow = ({item})=>{
      console.log(item,'here is item')
        return(  
            <TouchableOpacity onPress={()=>navigation.navigate('Chat',{name:item.name,activeUser:activeUser,email:item.email})} style={styles.touch}>
              <Text style={{fontSize:20,marginTop:10,marginLeft:5,color:'white',fontFamily:'600'}}>
                {item.name}
              </Text>
            </TouchableOpacity>              
        )
      }
    
    return(    
      // <ScrollView contentContainerStyle={styles.scrollView} 
      // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      //>     
      <LinearGradient colors={['#957DAD','#D291BC']} style={styles.linearGradient}>
        <View styles={styles.header}>
          
          <TouchableOpacity style={{marginLeft:5}} onPress={()=>navigation.toggleDrawer()}>
            <Icon name="menu" size={30} color="black" />
          </TouchableOpacity>
         
          <Text>Hello</Text>
        </View>
          <FlatList
          style={styles.flat}
          data={users}
          renderItem={renderRow}
          keyExtractor={item=>item.uid}
           />
      </LinearGradient>
      // </ScrollView>

         )
    }
        
const styles = StyleSheet.create({
    linearGradient:{
      flex:1,
    },
    header:{
      backgroundColor:'red',
      flexDirection:'row'
    },
    flat:{
      marginTop:10,
      padding:10,
  },
    touch:{
      height:60,
    }
})