import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { ThemeProvider, useThemeContext } from './styles/ThemeContext';
import { colors } from './styles/colors';
import { HomeScreen } from './src/components/HomeScreen';
import { AddMenuItem } from './src/components/AddMenuItems';
import { MenuItemDetails } from './src/components/MenuDetails';
import { FavoritesScreen } from './src/components/FavoritesScreen';
import { FilterMenu } from './src/components/FilterMenu';
import { SearchScreen } from './src/components/SearchScreen';
import { SettingsScreen } from './src/components/SettingsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: number;
  image: string;
  prepTime: string;
  servings: number;
  allergens: string[];
  nutritionalInfo: {
    calories: number | string;
    protein: string | number;
    carbs: string | number;
    fat: string | number;
  };
  winePairing?: string;
}

type NavScreen = 'Home' | 'Add' | 'Details' | 'Filter' | 'Search' | 'Favorites' | 'Settings';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Main = () => {
  const { colorScheme } = useThemeContext();
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [settings, setSettings] = useState({ currency: 'ZAR', notifications: true, dietaryPreferences: [] as string[] });

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      dishName: 'Pan-Seared Kingklip',
      description: 'Delicate kingklip fillet with lemon butter sauce, seasonal vegetables, and herb-roasted potatoes',
      course: 'Mains',
      price: 385,
      image: 'https://images.unsplash.com/photo-1758384077218-fa3c83d112e8?auto=format&fit=crop&w=1080&q=80',
      prepTime: '35 min',
      servings: 1,
      allergens: ['Fish', 'Dairy'],
      nutritionalInfo: { calories: 420, protein: '38g', carbs: '22g', fat: '18g' },
      winePairing: 'Chardonnay or Sauvignon Blanc',
    },
    {
      id: '2',
      dishName: 'Cape Malay Bobotie',
      description: 'Spiced minced beef baked with an egg-based topping, served with yellow rice and chutney',
      course: 'Mains',
      price: 145,
      image: 'https://images.unsplash.com/photo-1604908177522-8f3b5f6d6f8a?auto=format&fit=crop&w=1080&q=80',
      prepTime: '45 min',
      servings: 2,
      allergens: ['Eggs', 'Dairy'],
      nutritionalInfo: { calories: 650, protein: '28g', carbs: '60g', fat: '30g' },
    },
    {
      id: '3',
      dishName: 'Samoosa Trio',
      description: 'Crispy sampler of vegetarian, chicken and lamb samoosas with minted yogurt',
      course: 'Starters',
      price: 75,
      image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=1080&q=80',
      prepTime: '20 min',
      servings: 1,
      allergens: ['Gluten'],
      nutritionalInfo: { calories: 320, protein: '8g', carbs: '28g', fat: '18g' },
    },
    {
      id: '4',
      dishName: 'Malva Pudding',
      description: 'Classic Cape dessert served with warm custard',
      course: 'Dessert',
      price: 55,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1080&q=80',
      prepTime: '60 min',
      servings: 2,
      allergens: ['Eggs', 'Dairy', 'Gluten'],
      nutritionalInfo: { calories: 520, protein: '6g', carbs: '75g', fat: '22g' },
    },
    {
      id: '5',
      dishName: 'Grilled Snoek with Apricot Glaze',
      description: 'Traditional snoek fillet brushed with sweet apricot glaze, served with lemon and greens',
      course: 'Mains',
      price: 160,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1080&q=80',
      prepTime: '30 min',
      servings: 1,
      allergens: ['Fish'],
      nutritionalInfo: { calories: 410, protein: '34g', carbs: '10g', fat: '24g' },
    },
    {
      id: '6',
      dishName: 'Bobotie Spring Rolls',
      description: 'Fusion bites: bobotie-spiced filling wrapped and fried, served with mango chutney',
      course: 'Starters',
      price: 95,
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1080&q=80',
      prepTime: '25 min',
      servings: 2,
      allergens: ['Gluten', 'Eggs'],
      nutritionalInfo: { calories: 350, protein: '12g', carbs: '30g', fat: '18g' },
    },
  ]);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = { ...item, id: Date.now().toString() };
    setMenuItems((s) => [...s, newItem]);
    // when adding via stack, navigate back is handled by the navigator
  };

  const removeMenuItem = (id: string) => {
    setMenuItems((s) => s.filter((it) => it.id !== id));
    if (selectedMenuItem?.id === id) {
      setSelectedMenuItem(null);
    }
  };

  const viewDetails = (item: any) => {
    setSelectedMenuItem(item as MenuItem);
    // navigation to details handled in rendering below
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  };

  const styles = getStyles(colorScheme);

  // Tab navigator that shows main app screens
  const MainTabs = () => (
    <Tab.Navigator
      // satisfy typing in this project environment
      id={undefined}
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'circle';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Search') iconName = 'search';
          else if (route.name === 'Favorites') iconName = 'heart';
          else if (route.name === 'Settings') iconName = 'settings';
          else if (route.name === 'Filter') iconName = 'sliders';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors[colorScheme].primary,
      })}
    >
      <Tab.Screen name="Home">
        {({ navigation }) => (
          <HomeScreen
            menuItems={menuItems}
            favorites={favorites}
            onAddNew={() => navigation.navigate('Add')}
            onViewDetails={(item) => { viewDetails(item); navigation.navigate('Details'); }}
            onToggleFavorite={toggleFavorite}
            onFilter={() => navigation.navigate('Filter')}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Search">
        {() => (
          <SearchScreen
            menuItems={menuItems}
            favorites={favorites}
            onViewDetails={(item) => { viewDetails(item); /* navigate via stack below when needed */ }}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Favorites">
        {() => (
          <FavoritesScreen
            menuItems={menuItems.filter(item => favorites.has(item.id))}
            favorites={favorites}
            onViewDetails={(item) => { viewDetails(item); }}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Filter">
        {({ navigation }) => (
          <FilterMenu
            menuItems={menuItems}
            favorites={favorites}
            onBack={() => navigation.navigate('Home')}
            onViewDetails={(item) => { viewDetails(item); navigation.navigate('Details'); }}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Settings">
        {() => (
          <SettingsScreen settings={settings} onUpdateSettings={setSettings} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        // satisfy typing in this project environment
        id={undefined}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Add">
          {({ navigation }) => (
            <AddMenuItem
              onAdd={(item) => { addMenuItem(item); navigation.goBack(); }}
              onCancel={() => navigation.goBack()}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Details">
          {() => selectedMenuItem ? (
            <MenuItemDetails
              item={selectedMenuItem}
              isFavorite={selectedMenuItem ? favorites.has(selectedMenuItem.id) : false}
              onBack={() => { /* pop to tabs */ }}
              onToggleFavorite={toggleFavorite}
              onRemove={removeMenuItem}
            />
          ) : null}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

const getStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  appContainer: { flex: 1, backgroundColor: colors[colorScheme].background },
  screen: { flex: 1 },
  header: { padding: 12, backgroundColor: colors[colorScheme].primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: colors[colorScheme].text },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: Platform.OS === 'web' ? undefined : 8 },
  headerButton: { padding: 8, backgroundColor: colors[colorScheme].card, borderRadius: 6, marginLeft: 8 },
  addButton: { backgroundColor: colors[colorScheme].primary, paddingHorizontal: 12 },
  bottomNav: { height: 56, borderTopWidth: 1, borderTopColor: colors[colorScheme].border, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: colors[colorScheme].card },
  navItem: { padding: 8 },
  navItemActive: { fontWeight: '700', color: colors[colorScheme].primary },
  card: { flexDirection: 'row', padding: 12, marginVertical: 6, backgroundColor: colors[colorScheme].card, borderRadius: 8, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '600', color: colors[colorScheme].text },
  cardMeta: { color: '#6b7280' },
  cardActions: { marginLeft: 12, alignItems: 'center', justifyContent: 'center' },
  iconButton: { padding: 8, borderRadius: 6, backgroundColor: colors[colorScheme].card },
  formGroup: { marginBottom: 12 },
  label: { marginBottom: 6, fontSize: 12, color: '#374151' },
  input: { borderWidth: 1, borderColor: colors[colorScheme].border, borderRadius: 8, padding: 10, backgroundColor: colors[colorScheme].card, color: colors[colorScheme].text },
  primaryButton: { backgroundColor: colors[colorScheme].primary, padding: 12, alignItems: 'center', borderRadius: 8 },
  outlineButton: { borderWidth: 1, borderColor: colors[colorScheme].border, padding: 12, alignItems: 'center', borderRadius: 8 },
  footerClose: { padding: 12, alignItems: 'center' },
});

            
