import React from 'react';
import { Button, View } from 'react-native';
import {Text, IconButton, Colors } from 'react-native-paper';
import { createDrawerNavigator,DrawerActions } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';


const Drawer = createDrawerNavigator();


export default function DrawerButton({navigation}) {

return (
      <>
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} >
          <Drawer.Screen name="Home" component={HomeScreen} />              
          <Drawer.Screen name="Chat" component={ChatScreen} />
      </Drawer.Navigator>
      </>
  );
}