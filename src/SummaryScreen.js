import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import firebase from 'firebase/app';
import 'firebase/firestore';

export const SummaryScreen = ({navigator, route}) => {
    const { staticData } = route.params;
    console.log(staticData)
    const [balance, setBalance] = React.useState(0)
    const [high, setHigh] = React.useState(staticData[0])
    const [low, setLow] = React.useState(staticData[0])
    React.useEffect(() => {
        let tempBalance = 0;
        let tempHigh = staticData[0]
        let tempLow = staticData[0]
        for (x of staticData) {
            tempBalance += x.price
            if (x.price > tempHigh.price) {
                tempHigh = x
            }
            if (x.price < tempLow.price) {
                tempLow = x
            }
        }
        setBalance(tempBalance)
        setHigh(tempHigh)
        setLow(tempLow)
    }, [staticData])
    return (
        <View>
            <View style={styles.row}>
                <Text> Transactions </Text>
                <Text> {staticData.length}</Text>
            </View>
            <View style={{borderWidth: 0.5, borderColor:'black', margin:10,}} />
            <View style={styles.row}>
                <Text> Balance </Text>
                <Text> {balance}</Text>
            </View>
            <View style={{borderWidth: 0.5, borderColor:'black', margin:10,}} />
            <View>
                <Text style={styles.blue}>High Spending</Text>
                <View style={styles.row}>
                    <Text>{high.name}</Text>
                    <Text>{high.price}</Text>
                </View>
            </View>
            <View style={{borderWidth: 0.5, borderColor:'black', margin:10,}} />
            <View>
                <Text style={styles.blue}>Low Spending</Text>
                <View style={styles.row}>
                    <Text>{low.name}</Text>
                    <Text>{low.price}</Text>
                </View>
            </View>
            <View style={{borderWidth: 0.5, borderColor:'black', margin:10,}} />
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    blue: {
        color: '#508EBD'
    }
})