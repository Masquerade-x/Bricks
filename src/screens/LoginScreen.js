
import React, { useState, useEffect } from 'react';
import {SafeAreaView,View,StyleSheet,AsyncStorage} from 'react-native'
import { Button,TextInput,Text,Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import Person from '../components/Person';


  


export default function LoginScreen({navigation}){
  const[password,setPassword]=useState('');
  const[email,setEmail]=useState('');
  const[errorMessage,setErrorMessage]=useState('');


  async function onSignIn() {
    console.log('signin running')

    // Get the users ID
    const uid = auth().currentUser.uid;
   
    // Create a reference
    const ref = database().ref(`/users/${uid}`);
   
    // Fetch the data snapshot
    const snapshot = await ref.once('value');
  }

 function handleLogin(AsyncStorage){
   console.log('hello');
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(()=>{
     onSignIn()
      navigation.navigate('Home')    
              }
    )
    .catch(error=>setErrorMessage(error))   
  
  }

 

 
  return(
    <View style={styles.container}>
     
        <View style={styles.welcomemsg}>
        <Icon name="login" size={90} color="#6a0dad" />
        </View>
        <View style={styles.errorMsg}>
            <Text style={styles.error}>{errorMessage}</Text>
        </View>
        <View style={styles.form}> 
            <View style={styles.email}>
                <TextInput label='Email' mode='outlined'style={styles.textInput}
                onChangeText={e=>setEmail(e)} 
                autoCapitalize="none"
                value={email}></TextInput>
            </View>
            <View style={styles.password}>
                <TextInput label='Password' mode='outlined' style={styles.textInput}
                 secureTextEntry 
                 onChangeText={pass=>setPassword(pass)} 
                 autoCapitalize="none"
                 value={password}></TextInput>
            </View>
            <View style={styles.btnText}>
                  <Button  mode="contained" onPress={handleLogin} style={styles.btn}>
                        Sign In
                  </Button>
                  <Text style={{marginTop:10}}>New to it ?<Text onPress={()=>navigation.navigate('Signup')} style={{color:'#6a0dad'}}> Signup</Text></Text>
            </View>
            
        </View>
      </View>
  )
    
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    },
  welcomemsg:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  errorMsg:{
    alignItems:'center',
    justifyContent:'center'
  },
  error:{
    fontSize:30
  },
  form:{
    flex:2,
   justifyContent:'center',
  },
  email:{
    alignItems:'center',
    marginBottom:25,
  },
  password:{
    alignItems:'center',
    marginBottom:40,
  },
  textInput:{
    width:responsiveWidth(80)
  },
  btnText:{
    alignItems:'center',
  },
  btn:{
    width:responsiveWidth(50),

  }
})