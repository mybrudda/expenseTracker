import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import { Ionicons } from 'react-native-vector-icons';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Provider } from "react-redux";
import AddExpense from './components/AddExpense';
import AllTimeExpenses from './components/AllTimeExpenses';
import Login from './components/Login';
import RecentExpenses from './components/RecentExpenses';
import Register from './components/Register';
import { store } from './redux/Store';


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();

const ExpenseOverview = () => {

  

  return (
    <Tab.Navigator screenOptions={({navigation}) => ({
      headerStyle: {backgroundColor: 'purple'},
      headerTintColor: 'white',
      tabBarStyle:{ backgroundColor: 'purple', height: 70, paddingTop: 5},
      tabBarActiveTintColor: 'white',
      tabBarLabelStyle: { fontSize: 14 },
      headerRight: ({tintColor}) => (
        <Icon name="exit-to-app" size={30} color={tintColor} style={{marginRight: 20}} onPress={() => navigation.reset({
          index : 0, // Resetting the navigation stack so the user can't navigate back inside the app without logging in again.
          routes: [{name: 'Login'}] 
        })}/> 
      )
    })}>

      <Tab.Screen name='RecentExpenses' component={RecentExpenses}  options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({color, size}) => <Ionicons name="hourglass" size={size} color={color} />
      }}/>

      <Tab.Screen name='AllTimeExpenses' component={AllTimeExpenses} options={{
        title: 'All Expenses',
        tabBarLabel: 'All Time',
        tabBarIcon: ({color, size}) => <Ionicons name="calendar" size={size} color={color}/>
      }} />

    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <Provider store={store}>
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
        <Stack.Screen name='AddExpense' component={AddExpense} options={{title: 'Add Expense', presentation: 'modal'}}/>
      </Stack.Navigator>
    </NavigationContainer>
    <Toast/>
    </Provider>
  );
}

