import React, { cloneElement, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
} from "react-native";
import { Component } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import * as Font from "expo-font";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const Loginscreen = ({ navigation }, {app}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = (email, password, method) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                if (user) {
                    if (method === "doctor") {
                        const db = getFirestore(app);
                        const docRef = doc(db, "doctors", email);
                        const docSnap = await getDoc(docRef);

                        const userData = docSnap.data()

                        try {
                            console.log(userData.type);
                            navigation.navigate("doctor", { user: userData })
                        } catch(e){
                            console.log(e);
                            Alert.alert("Error", "Invalid Email or Password. Please check your login role if you believe you entered the correct password.");
                        }

                        
                    } else {    const db = getFirestore(app);
                        const docRef = doc(db, "users", email);
                        const docSnap = await getDoc(docRef);

                        const userData = docSnap.data()

                        try {
                            console.log(userData.userAadhar);
                            navigation.navigate("home", { user: userData })
                        } catch(e){
                            console.log(e);
                            Alert.alert("Error", "Invalid Email or Password. Please check your login role if you believe you entered the correct password.");
                        }

                        };
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + ": " + errorMessage);
                Alert.alert("Error", "Invalid Email or Password. Please check your login role if you believe you entered the correct password.");
            });
    };

    return (
        //html  goes here !
        <View style={styles.container}>
            <Image style={styles.logo} source= {require("../assets/logo.png")}/>
            <View style={styles.card}>
                <Text style={{ marginTop: "18%", fontSize: 20 }}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Email"
                    onChangeText={(email) => setEmail(email.toLowerCase())}
                    value={email}
                />
                <Text style={{ marginTop: 20, fontSize: 20 }}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Password"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                />
                <TouchableOpacity
                    style={styles.login}
                    secureTextEntry={true}
                    onPress={() => submit(email, password, "patient")}
                >
                    <Text>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signup}
                    onPress={() => navigation.navigate("signup")}
                >
                    <Text style= {{fontSize:15}}>
                        If you're new here,{" "}
                        <Text style={{ color: "#1CA190" }}>Sign Up!</Text>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.doctor}
                    onPress={() => submit(email, password, "doctor")}
                >
                    <Text style={{ fontSize: 17, textAlign: "center" }}>
                        Sign In as a{" "}
                        <Text style={{ color: "#1CA190" }}>Doctor </Text>
                        <Text>instead!</Text>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.new}
                    onPress={() => navigation.navigate("newdoctor")}
                >
                    <Text style={{ fontSize: 17, textAlign: "center" }}>
                    Set up a new profile as a,{" "}
                        <Text style={{ color: "#1CA190" }}>Doctor!</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default Loginscreen;

//css goes here :(body)
const styles = StyleSheet.create({
    //body is container
    container: {
        flex: 1, //means flexible true
        alignItems: "center",
        backgroundColor: "#ffffff",
    },

    card: {
        flex: 1, //means flexible true
        alignItems: "center",
        backgroundColor: "#A9E6DE",
        //marginTop: "10%",
        width: 340,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    logo: {
        height: "30%",
        width: "60%",
        marginTop: 14,
    },
    input: {
        marginTop: 5,
        borderWidth: 1,
        width: 300,
        borderRadius: 15,
        padding: 5,
        paddingLeft: 15,
    },
    login: {
        marginTop: "10%",
        height: 50,
        width: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5EDACA",
        borderRadius: 15,
    },
    signup: {
        marginTop: 20,
    },
    doctor: {
        marginTop: "10%",
        height: 60,
        width: "82%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5EDACA",
        borderRadius: 15,
    },
    new : {
        marginTop: "5%",
        height: 60,
        width: "82%",
        alignItems: "center",
        
    }
});
