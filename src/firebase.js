import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBSpYj2HOSBPoU4IaSdzCbLYWmgswq2ItA",
    authDomain: "react-mc-franco.firebaseapp.com",
    databaseURL: "https://react-mc-franco.firebaseio.com",
    projectId: "react-mc-franco",
    storageBucket: "react-mc-franco.appspot.com",
    messagingSenderId: "237448758454",
    appId: "1:237448758454:web:0bb4f19032112729f01217"
};

export const firebaseConnector = firebase.initializeApp(firebaseConfig);
