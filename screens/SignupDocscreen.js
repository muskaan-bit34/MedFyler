import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    Image,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { Component } from "react";
const SignupDocscreen = ({ navigation }, {app}) => {
    // variables
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cnfPassword, setCnfpassword] = useState("");
    const [aadhar, setAadhar] = useState("");
    const [phone, setPhone] = useState("");
    const [dciNmc, setDciNmc] = useState("");
    const [degree, setDegree] = useState("");
    // create user
    const submit = (email, password, cnfPassword) => {
        if (password === cnfPassword) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    const db = getFirestore(app);
                    try {
                        await setDoc(doc(db, "doctors", email), {
                        userName: name,
                        userEmail: email,
                        userAadhar: aadhar,
                        userPhone: phone,
                        userDegree: degree,
                        dciNmc: dciNmc,
                        });
                        await setDoc(doc(db, "docHistory", dciNmc), {
                            title: [],
                            byLine: [],
                        });
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }
                    if (user) {
                        navigation.navigate("login");
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode + ": " + errorMessage);
                    Alert.alert(
                        "Error",
                        "We're having troubles adding you. Please check the information that you have entered."
                    );
                });
        } else {
            Alert.alert("Error", "Passwords do not match.");
        }
    };
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ alignItems: "center" }}
        >
            
            <Image style={{height: 200, width:200}} source= {require("../assets/logo.png")}/>
            <Text style={styles.header}>Welcome Doctor!
            </Text>
            <View style={styles.card}>
                <Text style={styles.inputtext}>Enter Name</Text>
                <TextInput
                    maxLength={100}
                    style={styles.inputanswer}
                    placeholder="Enter full name"
                    onChangeText={(name) => setName(name)}
                    value={name}
                />
                <Text style={styles.inputtext2}>Enter email</Text>
                <TextInput
                    maxLength={100}
                    style={styles.inputanswer}
                    placeholder="Enter your email address"
                    onChangeText={(email) => setEmail(email.toLowerCase())}
                    value={email}
                />
                <Text style={styles.inputtext2}>Enter Phone Number</Text>
                <TextInput
                    maxLength={100}
                    style={styles.inputanswer}
                    placeholder="Enter phone number"
                    onChangeText={(phone) => setPhone(phone)}
                    value={phone}
                />
                <Text style={styles.inputtext2}>Enter Aadhaar number</Text>
                <TextInput
                    maxLength={100}
                    style={styles.inputanswer}
                    placeholder="xxxx xxxx xxxx "
                    onChangeText={(aadhar) => setAadhar(aadhar)}
                    value={aadhar}
                />
                <Text style={styles.inputtext2}>Enter your DCI/NMC Registeration Code</Text>
                <TextInput
                    maxLength={100}
                    style={styles.inputanswer}
                    placeholder="99A9999A"
                    onChangeText={(degree) => setDegree(degree)}
                    value={degree}
                />
                <Text style={styles.inputtext2}>Enter Qualifications</Text>
                <TextInput
                    maxLength={100}
                    style={styles.inputanswer}
                    placeholder="Eg- Physician, MBBS"
                    onChangeText={(dciNmc) => setDciNmc(dciNmc)}
                    value={dciNmc}
                />
                <Text style={styles.inputtext2}>Enter Password</Text>
                <TextInput
                    maxLength={100}
                    style={styles.inputanswer}
                    placeholder="minimum 8 characters*"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                />
                <Text style={styles.inputtext2}>Confirm Password *</Text>
                <TextInput
                    maxLength={100}
                    style={styles.inputanswer}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    onChangeText={(cnfPassword) => setCnfpassword(cnfPassword)}
                    value={cnfPassword}
                />
                <TouchableOpacity
                    style={styles.signup}
                    onPress={() => submit(email, password, cnfPassword)}
                >
                    <Text style={{ fontSize: 16, textAlign: "center" }}>
                        Sign Up!
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.backsies}
                    onPress={() => navigation.navigate("login")}
                >
                    <Text>
                        Already a Member?
                        <Text style={{ color: "#1CA190" }}> Sign In</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};
export default SignupDocscreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, //means flexible true
        backgroundColor: "#ffffff",
    },
    card: {
        flex: 1, //means flexible true
        //alignItems: "center",
        backgroundColor: "#A9E6DE",
        marginTop: 20,
        width: 340,
        borderRadius: 15,
        marginBottom: 30,
        paddingBottom: 20,
        paddingLeft: 8,
    },
    header: {
        fontSize: 20,
        marginTop: -20,
    },
    inputtext: {
        marginTop: 40,
        marginLeft: 15,
    },
    inputtext2: {
        marginLeft: 15,
        marginTop: 20,
    },
    inputanswer: {
        textAlign: "left",
        marginTop: 5,
        borderRadius: 15,
        padding: 5,
        borderWidth: 1,
        marginLeft: 10,
        width: 300,
        paddingLeft: 15,
    },
    signup: {
        borderRadius: 15,
        padding: 5,
        width: 150,
        marginTop: 30,
        backgroundColor: "#5EDACA",
        alignSelf: "center",
    },
    backsies: {
        alignSelf: "center",
        paddingTop: 20,
    },
});
