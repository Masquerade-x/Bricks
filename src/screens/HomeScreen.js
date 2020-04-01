import React, { useState, useEffect } from 'react'
import {SafeAreaView,View,StyleSheet, AsyncStorage} from 'react-native'
import {Text,Avatar,Searchbar,Card,Title,Paragraph} from 'react-native-paper';
import  {firebase} from '@react-native-firebase/auth';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import DrawerButton from '../components/DrawerButton';
import Person from '../components/Person';
import database from '@react-native-firebase/database';
import { Value } from 'react-native-reanimated';





export default function HomeScreen({navigation,user}){

    const[name,setName]=useState('');
    const[email,SetEmail]=useState('');
    const[initializing,setInitializing] = useState(true);
    const[userName,setUserName]=useState('first');
    

    async function onSignIn() {
        // Get the users ID
        const uid = auth().currentUser.uid;
       
        // Create a reference
        const ref = database().ref(`/users/${uid}`);
       
        // Fetch the data snapshot
        const snapshot = await ref.once('value');
       
        
        uName = snapshot.child('displayName').val();
        setUserName(uName);
        console.log(uName,'ye waala');
      }

    
    function onAuthStateChanged(user) {
        setName(user);
        console.log(user);
        if (initializing) setInitializing(false);
      }

    useEffect(()=>{
        const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);
        onSignIn();
        return unsubscribe;
        
      },[])

    const signOutUser =()=>{
        navigation.navigate('Login')
    }
        
     console.log(name,)
    
    return(
              <View style={styles.container} >
                  <View style={styles.topArea}>
                        <View style={styles.topBar}>
                        <Text style={{fontSize:20,color:'purple'}}>Welcome {userName}</Text>
                        <TouchableOpacity onPress={signOutUser}>
                            <Text style={{fontSize:20,color:'purple'}}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                   
                  </View>
              </View>
        
            )
    }
        
const styles = StyleSheet.create({
    topArea:{
        backgroundColor:'orange',
        justifyContent:"space-evenly",
        height:100
    },
    topBar:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:30
    }
})