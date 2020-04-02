
import React,{useState, useEffect} from 'react';
import {SafeAreaView,View,StyleSheet, AsyncStorage} from 'react-native'
import { Button,TextInput,Text,Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import Person from '../components/Person';
import database from '@react-native-firebase/database';

export default function Signup({navigation}){
  const[password,setPassword]=useState('');
  const[email,setEmail]=useState('');
  const[name,setName]=useState('');
  const[errorMessage,setErrorMessage]=useState('');


  async function onCreateAccount() {
    console.log('pressed')
    const uid = auth().currentUser.uid;
    const ref = database().ref(`/users/${uid}`);
    console.log(ref,'create ref')
   
    await ref.set({
      uid,
      name,
      role: 'admin',
    });
  }

  return(
    <View style={styles.container}>
        <View style={styles.form}> 
        <View style={[styles.name,styles.class]}>
                <TextInput label='Name' mode='outlined' style={styles.textInput} autoCapitalize="none" onChangeText={e=>setName(e)} value={name}></TextInput>
            </View>
            <View style={[styles.email,styles.class]}>
                <TextInput label='Email' mode='outlined' style={styles.textInput} autoCapitalize="none" onChangeText={e=>setEmail(e)} value={email}></TextInput>
            </View>
            <View style={[styles.class,styles.password]}>
                <TextInput label='Password' mode='outlined' style={styles.textInput} autoCapitalize="none" onChangeText={e=>setPassword(e)} value={password}></TextInput>
            </View>
            <View style={[styles.btnText,styles.class]}>
                  <Button  mode="contained" onPress={()=>{
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(()=>{onCreateAccount()
                      navigation.navigate('Login')
                    })
                   
                    .catch(error=>{
                      var errorCode = error.code;
                      var errorMessage = error.message;
                    })
                  }} style={styles.btn}>
                        Sign Up
                  </Button>
                  
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
  class:{
    marginBottom:20,
    alignItems:'center'
  },
  form:{
    flex:2,
   justifyContent:'center',
  },
  password:{
    marginBottom:40,
  },
  textInput:{
    width:responsiveWidth(80),
  },
  btnText:{
    alignItems:'center',
  },
  btn:{
    width:responsiveWidth(50),

  }
})