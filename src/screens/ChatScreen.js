import React, { useLayoutEffect,useState } from 'react'
import {Text,View,TextInput,StyleSheet} from 'react-native'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { useRoute } from '@react-navigation/native'
import {  IconButton,Colors } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import database from '@react-native-firebase/database';
import LinearGradient from 'react-native-linear-gradient'
import User from '../User';

export default function ChatScreen({navigation,route}){
    const[textMessage,setTextMessage]=useState('')
    const[email,setEmail]=useState('')

   useLayoutEffect(()=>{
       navigation.setOptions({
           headerTitle:route.params.name,
        })
   })

   async function sendMessage(){
        if(textMessage.length>0){
            let msgId=database().ref('messaages').child(User.email).child().push().key;
            let updates ={};
            let message ={
                message:textMessage,
                time:database.ServerValue.TIMESTAMP,
                from:User.email
            }
            updates['messages/'+User.email+'/'+email+'/'+msgId]=message;
            updates['messages/'+email+'/'+User.email+'/'+msgId]=message;
            database().ref().update(updates);
            setTextMessage('')

        }
   }
    return(
        <LinearGradient colors={['#2ecc71', '#27ae60']} style={styles.linearGradient}>
            <View style={styles.body}>
                <TextInput style={styles.input} 
                           value={textMessage}
                           placeholder='   Enter Message'
                           onChangeText={e=>setTextMessage(e)} 
                />
                <IconButton
                    style={styles.sendBtn}
                    icon="send-circle"
                    color='white'
                    size={40}
                    onPress={sendMessage}
                />
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    linearGradient:{
        flex:1
    },
    body:{
        flex:1,
        flexDirection:"row",
    },
    input:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        marginLeft:10,
        width:responsiveWidth(80),
        height:40,
        backgroundColor:'white',
        borderRadius:50,
        borderWidth:StyleSheet.hairlineWidth
    },
    sendBtn:{
        alignItems:'center',
    }
})