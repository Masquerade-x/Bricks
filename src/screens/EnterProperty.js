import React, { useEffect } from 'react'
import {View,StyleSheet} from 'react-native'
import { Button,TextInput,Text,Avatar, Card,Title} from 'react-native-paper';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import auth from '@react-native-firebase/auth';



export default function EnterProperty(){


    return(
       <View style={styles.container}>
           <View style={styles.topBar}>
                <Text style={{fontSize:25}}>Enter your property</Text>
           </View>
           <View style={styles.cardArea}>
               <Card style={styles.card}>
                  <Card.Title left={(props)=><Avatar.Icon {...props} icon="camera" />} />
                  <Card.Cover style={styles.cardCover} />
                  <View style={{}}>
                      <Text>Hello</Text>
                  </View>
               </Card>
           </View>
       </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'pink'
    },
    topBar:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:StyleSheet.hairlineWidth,
        backgroundColor:'orange'
    },
    cardArea:{
        flex:8,
        alignItems:'center'         
    },
    card:{
        marginTop:20,
        width:responsiveWidth(70),
        height:responsiveHeight(45),
        borderRadius:30,
        alignItems:'center',
    },
    cardCover:{
        width:responsiveWidth(50),
        height:responsiveHeight(20),
        marginTop:10
    },
    cardContent:{
        borderBottomWidth:StyleSheet.hairlineWidth,
        backgroundColor:'red'
        
    }
})