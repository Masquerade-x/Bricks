import React, { useState, useEffect } from 'react'
import {SafeAreaView,View,StyleSheet} from 'react-native'
import { Button,TextInput,Text,Avatar} from 'react-native-paper';
import * as firebase from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

export default function HomeScreen({navigation}){

    const[name,setName]=useState('');
    const[email,SetEmail]=useState('');

    // useEffect(()=>{
    //     const[email,name]= firebase.auth().currentUser;
    //     setName(name)
    //     SetEmail(email)
    // })

    // const signOutUser =()=>{
    //     navigation.navigate('Login')
    // }


    return(
        <View style={styles.container} >
            <Text>Hi {name}</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                <Text>Log Out</Text>
            </TouchableOpacity>
        </View>
        
    )
}

const styles = StyleSheet.create({}) 