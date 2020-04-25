
import React, { useState, useEffect, useCallback } from 'react';
import {SafeAreaView,Text,View,StyleSheet,RefreshControl,ScrollView,Image,TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import {  Button} from "react-native-paper";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import LinearGradient from 'react-native-linear-gradient';

export default function LoginScreen({navigation}){
  const[password,setPassword]=useState('');
  const[email,setEmail]=useState('');
  const[errorMessage,setErrorMessage]=useState('');
  const[refreshing, setRefreshing] =useState(false);

  const getErrorMessage = () => {
    if (!email && !password) {
      return 'Fields are mandatory';
    }
    if (!email) {
      return 'Email is missing';
    }
    if (!password) {
      return 'Password is missing';
    }
  };
  
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus',()=>{
      onRefresh()
    });
    return unsubscribe;
  },[navigation])

  const onRefresh = useCallback(()=>{
    setRefreshing(true)
    setEmail('')
    setPassword('')
    setErrorMessage('')
    setRefreshing(false)
  },[refreshing])

 async function handleLogin(){
   if(!email||!password){
     const error = getErrorMessage();
       setErrorMessage(error)
     return;
   }

    try{
      await firebase.auth().signInWithEmailAndPassword(email,password).then(()=>navigation.navigate('Home'))
    }catch(error){
        setErrorMessage(error.message)
    }
  }
  
  return(
      <ScrollView contentContainerStyle={styles.scrollView} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>

        <View style={styles.welcomemsg}>
        <Image source={require('../assets/icon.png')} style={styles.img}/>
        </View>
        <View style={styles.errorMsg}>
            <Text style={styles.error}>{errorMessage}</Text>
        </View>
        <View style={styles.form}> 
            <View style={styles.email}>
                <TextInput label='Email' style={styles.textInput}
                onChangeText={e=>setEmail(e)} 
                placeholder='Enter Email'
                 autoCapitalize="none"
                value={email}></TextInput>
            </View>
            <View style={styles.password}>
                <TextInput label='Password' style={styles.textInput}
                 secureTextEntry 
                 placeholder='Enter Password'
                 onChangeText={pass=>setPassword(pass)} 
                 autoCapitalize="none"
                 value={password}></TextInput>
            </View>
            <View style={styles.btnText}>
                  <Button  mode="contained" onPress={handleLogin} style={styles.btn}>
                        Sign In
                  </Button>
                  <Text style={{marginTop:10}}>New to it ?<Text onPress={()=>navigation.navigate('Signup')} style={{color:'#6310e3'}}> Signup</Text></Text>
            </View>
          </View>
          <View styles={styles.owner}>
            <Text style={{alignSelf:'flex-end',color:'#6310e3',marginEnd:10}}>
              &#xA9;Masquerade
             </Text>
          </View>
        </ScrollView>
  )
    
}

const styles = StyleSheet.create({
    scrollView:{
      flex:1,
      backgroundColor:'white'
    },
    img:{
      width:responsiveWidth(26),
      height:responsiveHeight(15),
      marginTop:90
    },
  welcomemsg:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  errorMsg:{
    alignItems:'center',
    justifyContent:'center',
  },
  error:{
    fontSize:15
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
  },
 
})