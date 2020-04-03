import React, { useState, useEffect, useCallback } from 'react'
import {SafeAreaView,View,StyleSheet, AsyncStorage,RefreshControl,ScrollView} from 'react-native'
import {Text} from 'react-native-paper';
import  {firebase} from '@react-native-firebase/auth';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import DrawerButton from '../components/DrawerButton';
import Person from '../components/Person';
import database from '@react-native-firebase/database';

export default function HomeScreen({navigation,user}){

    const[name,setName]=useState('');
    const[email,SetEmail]=useState('');
    const[initializing,setInitializing] = useState(true);
    const[userName,setUserName]=useState('');
    const[refreshing, setRefreshing] =useState(false);
    const[users,setUsers]=useState([]);
    

    async function onSignIn() {
        // Get the users ID
        const uid = auth().currentUser.uid;
       
        // Create a reference
        const ref = database().ref(`/users/${uid}`);
       
        // Fetch the data snapshot
        const snapshot = await ref.once('value');
        
        uName = snapshot.child('name').val();
        setUserName(uName);
        console.log(uName,'ye waala');

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
    
    function onAuthStateChanged(user) {
        setName(user);
        console.log(user)
      
        if (initializing) setInitializing(false);
      }

    useEffect(()=>{
        const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);
        console.log(unsubscribe,'unsubscribe h ye');
        onSignIn();
        return unsubscribe;
        
      },[])

    const signOutUser =()=>{
        navigation.navigate('Login')
    }
        

     
    
    return(               
          <View style={styles.body}>
              {/* <FlatList 
              data={users}
              renderItem={renderRow}
              keyExtractor={item=>item.email}/> */}
          </View>
         )
    }
        
const styles = StyleSheet.create({
    scrollView:{
      flex:1
    },
    topArea:{
        justifyContent:"space-evenly",
        height:50,
        borderBottomColor:'grey',
        borderBottomWidth:StyleSheet.hairlineWidth,
        flex:1
    },
    topBar:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:30,
    },
    body:{
      flex:15,
    }
})