import React from 'react'
import {Text,View,StyleSheet} from 'react-native'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

export default function ChatScreen(){
    return(
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={{fontSize:responsiveFontSize(5)}}>Chats</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    topBar:{
        justifyContent:'center',
        alignItems:"center",
        borderBottomColor:'grey',
        borderBottomWidth:StyleSheet.hairlineWidth,
        
    }
})