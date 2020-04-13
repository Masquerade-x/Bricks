import React, { useState, useEffect, useCallback } from 'react'
import {SafeAreaView,View,StyleSheet, AsyncStorage,RefreshControl,ScrollView} from 'react-native'
import {Text, IconButton, Colors } from 'react-native-paper';
import  {firebase} from '@react-native-firebase/auth';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import Person from '../components/Person';
import database from '@react-native-firebase/database';
import DrawerButton from '../components/DrawerButton';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute } from '@react-navigation/native';




export default function HomeScreen({navigation,user}){

    const[initializing,setInitializing] = useState(true);
    const[userName,setUserName]=useState('');
    const[refreshing, setRefreshing] =useState(false);
    const[users,setUsers]=useState([]);
    const[arr,setArr]=useState([]);
    
    console.log(arr,'arr2')


    async function onSignIn() {
        // Get the users ID
        const uid = auth().currentUser.uid;
       
        // Create a reference
        const ref = database().ref(`/users/${uid}`);
       
        // Fetch the data snapshot
        const snapshot = await ref.once('value');
        
        uName = snapshot.child('name').val();
        setUserName(uName);

        let dbRef = database().ref('users');
        firebase.database().ref().child("users")
        .on('value', function (snapshot) {
            snapshot.forEach(function(childSnapshot) {
            var name=childSnapshot.val().name;
            // var uid=childSnapshot.val().uid;
            // console.log(uid);
            if(uName===name){
              uName=name
            }else{
            setArr(prevState=> [...prevState ,name])
                  }
           });
         });
      }


    renderRow = ({item})=>{
      console.log(item,'here is item')
        return(  
            <TouchableOpacity onPress={()=>navigation.navigate('Chat',{name:item})} style={styles.touch}>
              <Text style={{fontSize:20,marginTop:10,marginLeft:10,color:'white',fontFamily:'600'}}>
                {item}
              </Text>
            </TouchableOpacity>              
        )
      }

    useEffect(()=>{
       onSignIn();
      },[])
    
    
    return(         
      <LinearGradient colors={['#2ecc71', '#27ae60']} style={styles.linearGradient}>
          <FlatList
          data={arr}
          renderItem={renderRow}
          keyExtractor={item=>item}
           />
      </LinearGradient>
         )
    }
        
const styles = StyleSheet.create({
    linearGradient:{
      flex:1,
      backgroundColor:'red'
    },
    touch:{
      height:40,
    }
})