import React, { cloneElement } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    Image,
    BackHandler,
} from "react-native";
import { doc, getDoc, getFirestore } from "firebase/firestore"
const DocHistoryScreen = ({ navigation, route }, {app}) => {
    const history = route.params.history;
    
    const items = history;

    const userdata = []

    for (let i=0; i<items["byLine"].length; i++){
        const currentBl = items["byLine"][i]
        const currentTl = items["title"][i]
        userdata.push({BL: currentBl, TL: currentTl})
    }

    console.log(userdata)

    return (
        <View style={styles.container}>
            <Text style={{fontSize:25,paddingLeft:4}}>Documents Uploaded</Text>
            <FlatList
                data={userdata}
                renderItem={({item})=>
                // item html here
                <View 
                    style={styles.itemContainer}>
                    <Text>{item.TL}
                    {"\n"}
                    {item.BL}</Text>
                </View>
                // item html ends
                }/>
        </View>
    );
};
export default DocHistoryScreen;
const styles = StyleSheet.create({
    container: {marginTop:100,},
    button: {
        flexDirection: "row",
        
    },
    itemContainer: {
        height: 70,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        flexDirection: "row",
        marginTop:10,
        paddingBottom:-10,
        alignItems: "center",
        paddingLeft: 4,
    },
});
