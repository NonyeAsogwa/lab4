import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import firebase from 'firebase/app';
import 'firebase/firestore';
import { db }  from '../App';


export const TransactionsDetailScreen = ({route, navigation}) => {
    const[name, setName] = React.useState('');
    const[address, setAddress] = React.useState('');
    const[price, setPrice] = React.useState(0);
    const[date, setDate] = React.useState('');

    const handleSubmit = () => {
        const newtransaction = {
            name: name,
            address: address,
            price: parseFloat(price),
            date: date
        };
        addTransaction(newtransaction);
        navigation.goBack();
    };
    const { transaction } = route.params;
    console.log("detail", transaction)
    return (
        <View>
            <View style={styles.col}>
                <Text>${transaction.price}</Text>
                <Text>{transaction.name}</Text>
                <Text>{transaction.address}</Text>
            </View>
            <View style={styles.row}>
                <Text>Transaction Date:</Text>
                <Text>{transaction.date}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    col: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#61dafb'
    },
    row: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between'
    }
});

const addTransaction = async (transaction) => {
    try {
        await db.collection('transactions').add(transaction);
        console.log("Transaction added successfully");
    } catch (error) {
        console.error("Error adding transaction: ", error);
    }
};

const getTransactions = async () => {
    try {
        const querySnapshot = await db.collection('transactions').get();
        const transactions = [];
        querySnapshot.forEach((doc) => {
            transactions.push(doc.data());
        })  
        console.log("Transactions retrieved successfully");
        return transactions;
    } catch (error) {
        console.error("Error getting transactions: ", error);
    }
};