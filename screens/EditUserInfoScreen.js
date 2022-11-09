import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    BackHandler,
    ScrollView,
} from "react-native";
import { Width, Height } from "../util/Dimensions";
import { Component } from "react";
import { useNavigation } from "@react-navigation/native";

import {
    getFirestore,
    collection,
    doc,
    setDoc,
    getDoc,
    query,
    where,
    docSnap,
} from "firebase/firestore";

const EditUserInfoScreen = ({ navigation, route }, { app }) => {
    const currentUser = route.params.user;

    const nameofUser = currentUser.userName;
    const ageofUser = currentUser.age;
    const bloodGroupUser = currentUser.bloodGroup;
    const phoneUser = currentUser.userPhone;
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <View style={styles.card}>
                <Image
                    style={styles.logo1}
                    source={require("../assets/user.png")}
                />
                <View style={styles.userinfo}>
                    <Text
                        style={{
                            textAlign: "auto",
                            paddingLeft: 10,
                            paddingTop: 10,
                            width: 300,
                            paddingBottom: 10,
                            fontSize: 16,
                            lineHeight: 24,
                        }}
                    >
                        Name: {nameofUser}
                        {"\n"}Age: {ageofUser}
                        {"\n"}Blood Group: {bloodGroupUser}
                        {"\n"}Phone No. : {phoneUser}
                    </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.button}
                    >
                        <Text style={{ fontSize: 17 }}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ fontSize: 17 }}>Reload</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default EditUserInfoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
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
    logo1: {
        height: 90,
        width: 90,
        marginTop: 30,
    },
    userinfo: {
        backgroundColor: "#fff",
        borderRadius: 15,
        textAlign: "left",
        marginTop: 35,
        height: "45%",
    },
    button: {
        borderRadius: 15,
        marginTop: "15%",
        height: 50,
        width: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5EDACA",
        borderRadius: 15,
        marginRight: "3%",
        marginLeft: "3%",
    },
});
