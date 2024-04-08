import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firebase from 'firebase/app';
import {collection,addDoc} from 'firebase/firestore';
import db from './configFirebase';

const TransactionForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async () => {
    try {
      const newTransaction = {
        name: name,
        address: address,
        price: parseFloat(price),
        date: date
      };
  
      const transactionsRef = collection(db, 'transactions'); // Get a reference to the 'transactions' collection
      await addDoc(transactionsRef, newTransaction); // Add a new document to the 'transactions' collection
  
      console.log('Transaction added successfully');
      // Reset form fields after submission
      setName('');
      setAddress('');
      setPrice('');
      setDate('');
    } catch (error) {
      console.error('Error adding transaction: ', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter address"
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Enter price"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Enter date"
        keyboardType="numeric"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 5
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10
  }
});

export default TransactionForm;
