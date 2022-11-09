import React, { cloneElement } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    BackHandler,
    ScrollView,
    FlatList,
} from "react-native";
import * as Linking from 'expo-linking';
import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
} from "firebase/storage";
import { Width, Height } from "../util/Dimensions";
import { Component } from "react";
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    arrayUnion,
    getDoc,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { ScreenStackHeaderRightView } from "react-native-screens";
const ShowDoc = ({navigation, route}, {app}) => {

    const aadhar = route.params.user;
    const items = route.params.files;

    const lols = []

    for (let i =0; i<items.length;i++) {
        lols.push({key: items[i]})
    }

    const getFile = async(aadhar, filename) => {
        const storage = getStorage();
        const url = await getDownloadURL(ref(storage, `${aadhar}/${filename}`))
        Linking.openURL(url);
        console.log(url)
    }

      return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerStyle}>Documents</Text>
            </View>
            <FlatList
                data={lols}
                renderItem={({item})=>
                // item html here
                <TouchableOpacity 
                    style={styles.itemContainer}
                    onPress={() => getFile(aadhar, item.key)}>
                    <Image source={require("../assets/doc-icon.png")} style={styles.itemIconStyle}/>
                    <Text style={styles.itemTextStyle}>{item.key}</Text>
                </TouchableOpacity>
                // item html ends
                }/>
            </View>
            <View style={styles.footer}> 
                <Text>These documents were verfied by certified doctors.</Text>
            </View>
        </View>
        );
}

export default ShowDoc;

const styles = StyleSheet.create({
    container : {
        flex: 1,
        marginTop: "10%",
    },
    contentContainer: {
        flex: 1,
    },
    itemContainer: {
        height: 70,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        flexDirection: "row",
        padding: 10,
        alignItems: 'center'
    },
    itemIconStyle: {
        height: 40,
        width: 40,
    },
    itemTextStyle: {
        marginLeft: 30,
        fontSize: 16,
    },
    headerContainer: {
        marginVertical: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerStyle: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    footer: {
        height: 30,
        backgroundColor: "#A9E6DE",
        alignItems: 'center',
        justifyContent: 'center',
    },
});
