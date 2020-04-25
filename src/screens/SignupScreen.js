
import React,{useState, useEffect} from 'react';
import {SafeAreaView,View,StyleSheet,TextInput} from 'react-native'
import { Button,Text,Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import Person from '../components/Person';
import database from '@react-native-firebase/database';

const getErrorMessage = () => {
  if (!email && !password && !name) {
    return 'Fields are mandatory';
  }
  if (!name) {
    return 'Name is missing';
  }
  if (!email) {
    return 'Email is missing';
  }
  if (!password) {
    return 'Password is missing';
  }
};

export default function Signup({navigation}){
  const[password,setPassword]=useState('');
  const[email,setEmail]=useState('');
  const[name,setName]=useState('');
  const[errorMessage,setErrorMessage]=useState('');


  async function onCreateAccount() {
    // console.log('pressed')
    // const uid = auth().currentUser.uid;
    // const ref = database().ref(`/users/${uid}`);
    // console.log(ref,'create ref')
    
    if (!email || !password || !name) {
      const error = getErrorMessage();
      setErrorMessage(error)
      return;
    }

    try{
      await AsyncStorage.setItem('@name',name);
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(()=>{onCreateAccount()
      navigation.navigate('Login')
    })}catch(error){
        setErrorMessage(error.message)
    }
  }
    
    
  //   await ref.set({
  //     uid,
  //     name,
  //     role: 'admin',
  //   });
  // }

  return(
    <View style={styles.container}>
        <View style={styles.form}> 
        <View style={[styles.name,styles.class]}>
                <TextInput  placeholder='Enter Full Name' style={styles.textInput} autoCapitalize="none" onChangeText={e=>setName(e)} value={name}></TextInput>
            </View>
            <View style={[styles.email,styles.class]}>
                <TextInput  placeholder='Enter Email' style={styles.textInput} autoCapitalize="none" onChangeText={e=>setEmail(e)} value={email}></TextInput>
            </View>
            <View style={[styles.class,styles.password]}>
                <TextInput placeholder='Enter Password'  style={styles.textInput} autoCapitalize="none" onChangeText={e=>setPassword(e)} value={password}></TextInput>
            </View>
            <View style={[styles.btnText,styles.class]}>
                  <Button  mode="contained" onPress={onCreateAccount} style={styles.btn}>
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
    backgroundColor:'white'
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
    width:responsiveWidth(80),
    borderBottomColor:'#6310e3',
    borderBottomWidth:StyleSheet.hairlineWidth,
    color:'#6310e3'
  },
  btnText:{
    alignItems:'center',
  },
  btn:{
    width:responsiveWidth(50),

  }
})