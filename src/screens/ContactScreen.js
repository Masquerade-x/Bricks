import React from 'react';
import {Text, View,StyleSheet} from 'react-native'
import {Card} from 'react-native-elements'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';

export default function ContactScreen({navigation,route}){
    console.log(route.params.email,'email')
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
                            <Text style={{fontSize:20}}>{route.params.email}</Text>
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
        alignItems:'center'
    },
    cardBox:{
        position: 'relative',
        width: '90%',
        alignSelf: 'center',
        marginTop: 50,

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
    }
})