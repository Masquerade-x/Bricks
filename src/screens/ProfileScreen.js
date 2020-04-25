import React, { useState } from 'react';
import {Text, View,StyleSheet} from 'react-native'
import {Card} from 'react-native-elements'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import {Button } from 'react-native-paper';
import {Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert } from 'react-native';
import database from '@react-native-firebase/database';


export default function ProfileScreen({navigation,route}){
    const[uname,setUname]=useState('')


    console.log(uname)
    async function changeName(){
        if(uname.length<3){
            Alert.alert('Error','Please enter valid name');
        }else if(route.params.name!==uname){
            database().ref('users').child(route.params.uid).set({name:uname});
            route.params.name=uname;
            Alert.alert('Success',"Name changed successful");
        }
    }

    return(
        <View style={styles.container}>
        <View style={[styles.cardBox ,styles.center]}>
            <View style={styles.cardInitial}>
                <Text style={{fontSize:25}}>{route.params.name.charAt(0).toUpperCase()}</Text>
            </View>
            <Card titleStyle={styles.title} 
                title={route.params.name}
                containerStyle={styles.card}>
                    <View style={styles.cardText}>
                        <Input
                            placeholder='Enter New Name'
                            leftIcon={
                                <Icon
                                name='user-circle'
                                size={24}
                                color='black'
                                />
                            }
                            value={uname}
                            onChangeText={val=>setUname(val)}
                        />
                        <Button  mode="contained" onPress={changeName}  style={styles.btn}>
                            change
                        </Button>
                    </View>
            </Card>
        </View>
    </View>
    )
}
const styles= StyleSheet.create({
    container:{
        flex:1
    },
    card:{
        width:responsiveWidth(90),
        height:responsiveHeight(40)
    },
    cardText:{
        justifyContent:'center',
        alignItems:'center',
    },
    cardBox:{
        position: 'relative',
        width: '90%',
        alignSelf: 'center',
        marginTop: 50,

    },
    input:{
        width:responsiveWidth(60),
        borderBottomColor:'white',
        borderBottomWidth:StyleSheet.hairlineWidth,
        color:'white',
        paddingBottom:30
    },
    title:{
        height:responsiveHeight(7),
        fontSize:25,
        marginTop:30
    },
    center:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardInitial:{
        borderRadius:50,
        width:40,
        height:40,
        backgroundColor:'orange',
        alignItems:'center',
        justifyContent:"center",
    },
    btn:{
        width:responsiveWidth(50),
        marginTop:30
      },
     

})