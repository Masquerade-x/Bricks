import React, { useLayoutEffect,useState } from 'react'
import {Text,View,TextInput,StyleSheet,FlatList,Dimensions} from 'react-native'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { useRoute } from '@react-navigation/native'
import {  IconButton,Colors } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import database from '@react-native-firebase/database';
import LinearGradient from 'react-native-linear-gradient'
import User from '../User';

export default function ChatScreen({navigation,route}){
    const[textMessage,setTextMessage]=useState('')
    const[messageList,setMessageList]=useState([])

   useLayoutEffect(()=>{
       navigation.setOptions({
           headerTitle:route.params.name,
        })
   })

   async function sendMessage(){
        if(textMessage.length>0){
            let msgId=database().ref('messaages').child(route.params.name).push().key;
            let updates ={};
            let message ={
                message:textMessage,
                time:database.ServerValue.TIMESTAMP,
                from:route.params.name
            }
            updates['messages/'+route.params.name+'/'+msgId]=message;
            console.log(updates)
            database().ref().update(updates);
            setTextMessage('')

        }
   }

   renderRow =({item})=>{
       return(
           <View  style={{
               flexDirection:'row',
               width:'60%',
               alignSelf:item.from===route.params.name ? 'flex-end':"flex-start",
               backgroundColor:item.from===route.params.name ? '#00897b':'#7cb342',
               borderRadius:5,
               marginBottom:10
           }}>
               <Text style={{color:'#fff',padding:7,fontSize:16}}>
                   {item.message}
               </Text>
               <Text style={{color:'#eee',padding:3,fontSize:12}}>{item.time}</Text>
           </View>
       )
   }

   let {height,width}=Dimensions.get('window');

    return(
        <LinearGradient colors={['#2ecc71', '#27ae60']} style={styles.linearGradient}>
            <View style={styles.body}>
                <FlatList 
                style={{padding:10,height:height+0.8}}
                data={messageList}
                renderItem={renderRow}
                keyExtractor={(item,index)=>index.toString()}
                />
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