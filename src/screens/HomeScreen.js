import React, { useState, useEffect } from 'react'
import {SafeAreaView,View,StyleSheet} from 'react-native'
import { Button,TextInput,Text,Avatar,Searchbar,List,Drawer} from 'react-native-paper';
import  {firebase} from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";

export default function HomeScreen({navigation,user}){

    const[name,setName]=useState('');
    const[email,SetEmail]=useState('');
    const[initializing,setInitializing] = useState(true);
    const[active,setActive]=useState('first');


    function onAuthStateChanged(user) {
        setName(user);
        if (initializing) setInitializing(false);
      }

    useEffect(()=>{
        const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);
        return unsubscribe;
      },[])
     

    const signOutUser =()=>{
        navigation.navigate('Login')
    }
        

    
    return(
        <View style={styles.container} >
            <View style={styles.topBar}>
                <Text style={{fontSize:30,color:'purple'}}>Welcome</Text>
                <TouchableOpacity onPress={signOutUser}>
                    <Text style={{fontSize:30,color:'purple'}}>Log Out</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.screen}>
                <Searchbar
                style={{borderRadius:40,width:responsiveHeight(50)}}
                    placeholder="Search"
                    iconColor='red'
                />
            </View>
            <View>
           
            </View>           

         
        </View>
        
    )

}

const styles = StyleSheet.create({
    topBar:{
        flexDirection:'row',
        backgroundColor:'red',
        justifyContent:'space-between'
    },
    screen:{
        alignItems:'flex-end',
        backgroundColor:'green'
        }
}) 