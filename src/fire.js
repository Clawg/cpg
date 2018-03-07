import firebase from 'firebase'
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAdJQlbrV0ARQrR44Rt2YcXairiGALH4fw",
    authDomain: "app-management-8602a.firebaseapp.com",
    databaseURL: "https://app-management-8602a.firebaseio.com",
    projectId: "app-management-8602a",
    storageBucket: "app-management-8602a.appspot.com",
    messagingSenderId: "905556194021"
};
var fire = firebase.initializeApp(config);
export default fire;
