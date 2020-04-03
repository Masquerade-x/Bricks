
import React, { useState, useEffect, useCallback } from 'react';
import {SafeAreaView,View,StyleSheet,RefreshControl,ScrollView} from 'react-native'
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
import LinearGradient from 'react-native-linear-gradient';

export default function LoginScreen({navigation}){
  const[password,setPassword]=useState('');
  const[email,setEmail]=useState('');
  const[errorMessage,setErrorMessage]=useState('');
  const[refreshing, setRefreshing] =useState(false);

  async function onSignIn() {

    // Get the users ID
    const uid = auth().currentUser.uid;
   
    // Create a reference
    const ref = database().ref(`/users/${uid}`);
    // Fetch the data snapshot
    const snapshot = await ref.once('value');
    // setUserName(snapshot.child('name').val());
     console.log(snapshot.child('displayName').val());  
  }

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
    setRefreshing(false)
  },[refreshing])

 function handleLogin(AsyncStorage){
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(()=>{
     onSignIn()
      navigation.navigate('Home')    
              }
    )
    .catch(error=>setErrorMessage(error))   
  
  }
  
  return(
      <ScrollView contentContainerStyle={styles.scrollView} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
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
          <View styles={styles.owner}>
            <Text style={{alignSelf:'flex-end'}}>
              &#xA9;Masquerade
             </Text>
          </View>
        </ScrollView>
  
  )
    
}

const styles = StyleSheet.create({
    scrollView:{
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
  },
 
})