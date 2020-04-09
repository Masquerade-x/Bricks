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




export default function HomeScreen({navigation,user}){

    const[name,setName]=useState('');
    const[email,SetEmail]=useState('');
    const[initializing,setInitializing] = useState(true);
    const[userName,setUserName]=useState('');
    const[refreshing, setRefreshing] =useState(false);
    const[users,setUsers]=useState([]);
    const[arr,setArr]=useState([]);
    

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
        dbRef.on('child_added',(val) => {
          let person = val.val();
          person.email=val.key;
          setUsers(prevState=> {
            return {
              ...prevState.users,person
            }
          })
        })

        const fbObject = snapshot.val();
        const newARR = Object.keys(fbObject).map((key)=>{
        fbObject[key].name = key;
        // return fbObject[key];
        console.log(fbObject[key],'fhjasdfkas')
      });

      console.log(newARR,'new arr')  
       
      }

    renderRow = ({item})=>{
      console.log(item,'here is item')
        return(  
            <TouchableOpacity onPress={()=>navigation.navigate('Chat')}>
              <Text>hello{item.name}</Text>
            </TouchableOpacity>              
        )
      }

      // const onRefresh = useCallback(()=>{
      //   setRefreshing(true)
        
      //   setRefreshing(false)
      // },[refreshing])
    

    useEffect(()=>{
       onSignIn();
      },[])
    
    
    return(         
      <LinearGradient colors={['#E91E63', '#9C27B0', '#673AB7']} style={styles.linearGradient}>
          <TouchableOpacity onPress={()=>navigation.navigate('Chat')}>
              <Text>{userName}</Text>
          </TouchableOpacity>
          {/* <FlatList
          data={newARR}
          renderItem={renderRow}
          keyExtractor={({item})=>console.log(item)}
           /> */}
      </LinearGradient>
         )
    }
        
const styles = StyleSheet.create({
    linearGradient:{
      flex:1,
      backgroundColor:'red'
    },
    
})