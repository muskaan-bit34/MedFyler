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
const HistoryScreen = ({ navigation, route }, {app}) => {
    const user = route.params.user;
    const history = route.params.history;
    
    const items = history;

    const userdata = []

    for (let i=0; i<items["byLine"].length; i++){
        const currentBl = items["byLine"][i]
        const currentTl = items["title"][i]
        const currentDc = items["dci"][i]
        userdata.push({BL: currentBl, TL: currentTl, DC: currentDc})
    }

    console.log(userdata)

    return (
        <View style={styles.container}>
            
            <Text style={{fontSize:25,paddingLeft:4}}>History of Documents</Text>
            
            <FlatList
                data={userdata}
                renderItem={({item})=>
                // item html here
                    <View style={styles.itemContainer}>
                    <Text>{item.TL}
                    {"\n"}
                    {item.BL}
                    {"\n"}
                    {item.DC}</Text>
                    </View>
                // item html ends
                }/>
        </View>
    );
};
export default HistoryScreen;
const styles = StyleSheet.create({
    container: {
        marginTop:100,
        
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
