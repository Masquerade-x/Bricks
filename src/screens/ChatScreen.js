import React, { useLayoutEffect,useState, useEffect } from 'react'
import {Text,View,TextInput,StyleSheet,FlatList,Dimensions} from 'react-native'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { useRoute } from '@react-navigation/native'
import {  IconButton,Colors } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import database from '@react-native-firebase/database';
import LinearGradient from 'react-native-linear-gradient'

export default function ChatScreen({navigation,route}){
    const[textMessage,setTextMessage]=useState('')
    const[messageList,setMessageList]=useState([])

    console.log(messageList,'meessage')

   useLayoutEffect(()=>{
       navigation.setOptions({
           headerTitle:route.params.name,
        })
   })

   useEffect(()=>{
       database().ref('messages').child(route.params.name)
       .on("child_added",(value)=>{
           setMessageList(prevState=>[...prevState,value.val()])
       })
   },[route.params.name])


   async function sendMessage(){
        if(textMessage.length>0){
            console.log(route.params.activeUserName,'pareamsdf');
            console.log(route.params.name,'name h hfb');

            let msgId=database().ref('messaages').child(route.params.activeUser).push().key;
            let updates ={};
            let message ={
                message:textMessage,
                time:database.ServerValue.TIMESTAMP,
                from:route.params.activeUser
            }
            updates['messages/'+route.params.activeUser+'/'+msgId]=message;
            updates['messages/'+route.params.name+'/'+msgId]=message;

            console.log(updates)
            database().ref().update(updates);
            setTextMessage('')

        }
   }

   renderRow =({item})=>{
       return(
          <View >
           <View  style={{
               flexDirection:'row',
               alignSelf:route.params.activeUser===route.params.name ? 'flex-start':'flex-end',
               backgroundColor:route.params.activeUser===route.params.name ? '#00897b':'#7cb342',
               borderRadius:5,
               marginBottom:10,
           }}>
               <Text style={{color:'#fff',padding:7,fontSize:16}}>
                   {item.message}
               </Text>
               <Text style={{color:'#eee',padding:3,fontSize:12}}>{item.time}</Text>
           </View>
        </View>   
       )
   }

   let {height,width}=Dimensions.get('window');

    return(
        <LinearGradient colors={['#2ecc71', '#27ae60']} style={styles.linearGradient}>
               
            <View style={styles.body}>
            <FlatList 
                style={styles.flat}
                data={messageList}
                renderItem={renderRow}
                keyExtractor={(item,index)=>index.toString()}
                />
                <View style={styles.enterMsg}>
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
    },
    flat:{
        padding:10,
        flexDirection:'row'
    },
    enterMsg:{
        flexDirection:'row'
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
});