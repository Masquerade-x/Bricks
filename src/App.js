  
import 'react-native-gesture-handler';
import * as React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { firebase } from '@react-native-firebase/auth';

const firebaseConfig= {
  apiKey:'AIzaSyC6TTpQUP8gZVC-nR6AxCvRMs15-ParSwI',
  appId:'128020890766:android:d11240a7c7e00948a9b5df',
  databaseURL:'https://probricks-929e5.firebaseio.com/',
  projectId: "probricks-929e5",
  messagingSenderId: '128020890766',
  };
  firebase.initializeApp(firebaseConfig);

export default function App() {
  return <AppNavigator />;
}