import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransactionsScreen } from './src/TransactionsScreen';
import { SummaryScreen } from './src/SummaryScreen';
import { TransactionsDetailScreen } from './src/TransactionsDetailScreen';
import AddTransactionScreen from './src/FormComponent'; 
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import db from './src/configFirebase';
import { collection, getDocs } from 'firebase/firestore';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'transactions'));
        const transactions = querySnapshot.docs.map(doc => doc.data());
        setTransactionData(transactions);
        setIsLoading(false);
        console.log('Data fetched successfully', transactionData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  if (isLoading) {
    return null; // Render nothing while loading
  }

  const TransactionIcon = ({ color, size }) => (
    <Ionicons name="newspaper" size={size} color={color} />
  );

  const SummaryIcon = ({ color, size }) => (
    <MaterialCommunityIcons name="information" size={size} color={color} />
  );

  const AddTransactionIcon = ({ color, size }) => (
    <Ionicons name="add-circle-outline" size={size} color={color} />
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {() => (
            <Tab.Navigator>
              <Tab.Screen
                name="Transactions List"
                component={TransactionsScreen}
                initialParams={{ staticData: transactionData }}
                options={{ tabBarIcon: TransactionIcon }}
              />
              <Tab.Screen
                name="Add Transaction"
                component={AddTransactionScreen}
                options={{ tabBarIcon: AddTransactionIcon }}
              />
              <Tab.Screen
                name="Summary"
                component={SummaryScreen}
                initialParams={{ staticData: transactionData }}
                options={{ tabBarIcon: SummaryIcon }}
              />
            </Tab.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen name="Transaction Detail" component={TransactionsDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
