
import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import { View, Text } from 'react-native';
import AppNavigator from './src/Navigation/AppNavigator';
import RNBootSplash from "react-native-bootsplash";


export default function App() {

  useEffect(() => {  
    RNBootSplash.hide();
 }, []);

  return (
    <AppNavigator />
  );
}

