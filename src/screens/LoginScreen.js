
import React, { useState, useEffect } from 'react';
import {SafeAreaView,View,StyleSheet} from 'react-native'
import { Button,TextInput,Text,Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';


export default function LoginScreen({navigation}){
  const[initializing,setInitializing] = useState(true);
  const[password,setPassword]=useState(' ');
  const[email,setEmail]=useState(' ');

 function handleLogin(){
   console.log('hello');
    // firebase.auth().signInWithEmailAndPassword(email,password).then(()=>navigation.navigate('Login')).catch(error=>setErrorMessage(error))
 }
  console.log(email,password);

  // function onAuthStatusChanged(user){
  //   setUser(user);
  //   if(initializing)setInitializing(false);
  // }

  // useEffect(()=>{
  //   const unsubscribe = auth.onAuthStatusChanged(onAuthStatusChanged);
  //   return unsubscribe;
  // },[])

  // if(initializing)return null;

  //   if(!user){7
  //     return(
  //     <Text>Login</Text>
  //     )
  //   }
  return(
    <View style={styles.container}>
     
        <View style={styles.welcomemsg}>
        <Icon name="login" size={90} color="#6a0dad" />
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