import React, { useLayoutEffect,useState, useEffect } from 'react'
import {Text,View,TextInput,StyleSheet,FlatList,Dimensions,ImageBackground,ScrollView} from 'react-native'
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import { useRoute } from '@react-navigation/native'
import {  IconButton,Colors } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import database from '@react-native-firebase/database';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function ChatScreen({navigation,route}){
    const[textMessage,setTextMessage]=useState('')
    const[messageList,setMessageList]=useState([])

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


   console.log(route.params.activeUser,'user h ye')
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
          <View style={{width:responsiveWidth(95)}}>
           <View  style={{
               flexDirection:'row',
               alignSelf:item.from===route.params.activeUser ? 'flex-end':'flex-start',
               backgroundColor:item.from===route.params.activeUser ? '#00897b':'#7cb342',
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
        <ImageBackground source={require('../assets/chats.jpeg')}
                style={styles.img}>  
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.toggleDrawer()} style={{marginLeft:5,alignItems:'flex-start',width:30}}>
                    <Icon name="menu" size={34} color="white" />
                </TouchableOpacity>
                
                    <Text style={{fontSize:25,color:'white'}}>{route.params.name}</Text>

                <TouchableOpacity onPress={()=>navigation.navigate('Contact',{name:route.params.name,email:route.params.email})} style={{marginRight:5,alignItems:'flex-end'}}>
                    <Icon name="account-circle" size={35} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView} > 
            <FlatList 
                style={styles.flat}
                data={messageList}
                renderItem={renderRow}
                keyExtractor={(item,index)=>index.toString()}
                />
            </ScrollView>
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

            </ImageBackground>
            
    )
}

const styles = StyleSheet.create({

    img:{
        flex:1,
        
    },
    body:{
        flex:1,
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:"#6310e3",
        height:responsiveHeight(7),
        borderRadius:4,
        paddingTop:5
    },
    flat:{
        marginTop:10,
        padding:10,
        flexDirection:'row',
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
        marginTop:9
    }
});