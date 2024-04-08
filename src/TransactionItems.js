import * as React from 'react'
import { Card } from 'react-native-paper'
import { TransactionsScreen } from './TransactionsScreen'
import {View, Text} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/app';
import 'firebase/firestore';

export const TransactionItems = ({Transaction}) => {
    const navigation = useNavigation();
    const right=()=>{
        return (
            <View>
                <Text>${Transaction.price}</Text>
            </View>
        )
    }
    const onPress = () => {
        // Navigate to TransactionsDetailScreen
        navigation.navigate('Transaction Detail', { transaction: Transaction });
    }

    return (
        <Card onPress={onPress}>
            <Card.Title title={Transaction.name} right={right} />
        </Card>
    );
}