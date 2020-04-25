
import React, { useState, useEffect, useCallback } from 'react';
import {SafeAreaView,Text,View,StyleSheet,RefreshControl,ScrollView,ImageBackground,TextInput} from 'react-native'
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
      <ImageBackground source={require('../assets/sky.jpg')}
                style={styles.img}>

        <View style={styles.welcomemsg}>
        <Icon name="login" size={90} color="#6a0dad" />
        </View>
        <View style={styles.errorMsg}>
            <Text style={styles.error}>{errorMessage}</Text>
        </View>
        <View style={styles.form}> 
            <View style={styles.email}>
                <TextInput label='Email' style={styles.textInput}
                onChangeText={e=>setEmail(e)} 
                 autoCapitalize="none"
                value={email}></TextInput>
            </View>
            <View style={styles.password}>
                <TextInput label='Password' style={styles.textInput}
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
          <View styles={styles.owner}>
            <Text style={{alignSelf:'flex-end',color:'white'}}>
              &#xA9;Masquerade
             </Text>
          </View>
          </ImageBackground>
        </ScrollView>
  )
    
}

const styles = StyleSheet.create({
    scrollView:{
      flex:1,
    },
    img:{
      flex:1
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
    borderBottomColor:'white',
    borderBottomWidth:StyleSheet.hairlineWidth,
    color:'white'
  },
  btnText:{
    alignItems:'center',
  },
  btn:{
    width:responsiveWidth(50),
  },
 
})