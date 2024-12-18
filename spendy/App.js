import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AddExpense from './components/AddExpense';
import AllTimeExpenses from './components/AllTimeExpenses';
import Login from './components/Login';
import RecentExpenses from './components/RecentExpenses';
import Register from './components/Register';


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();

const ExpenseOverview = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='RecentExpenses' component={RecentExpenses}/>
      <Tab.Screen name='AllTimeExpenses' component={AllTimeExpenses}/>
    </Tab.Navigator>
  )
}




export default function App() {
  return (
    <>
    <StatusBar style="auto" />
    <NavigationContainer>
      <Stack.Navigator
       screenOptions={{
        headerStyle: {backgroundColor: 'purple'},
        headerTintColor: 'white',
      }}
      >
        <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='ExpenseOverview' component={ExpenseOverview} options={{headerShown: false}}/>
        <Stack.Screen name='AddExpense' component={AddExpense}/>
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

