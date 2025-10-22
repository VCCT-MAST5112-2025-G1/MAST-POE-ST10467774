import * as React from "react";
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ViewProps } from "react-native";

interface TabsContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue>({});

interface TabsProps extends ViewProps {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  style?: ViewStyle;
}

interface TabsListProps extends ViewProps {
  style?: ViewStyle;
}

interface TabsTriggerProps extends ViewProps {
  value: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

interface TabsContentProps extends ViewProps {
  value: string;
  style?: ViewStyle;
}

const Tabs = React.forwardRef<View, TabsProps>(
  ({ value, onValueChange, defaultValue, style, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value !== undefined ? value : internalValue;

    const handleValueChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
        <View ref={ref} style={[styles.tabs, style]} {...props}>
          {children}
        </View>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = "Tabs";

const TabsList = React.forwardRef<View, TabsListProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <View ref={ref} style={[styles.tabsList, style]} {...props}>
        {children}
      </View>
    );
  }
);

TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<View, TabsTriggerProps>(
  ({ value, style, textStyle, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    const isActive = context.value === value;

    return (
      <TouchableOpacity
        ref={ref}
        onPress={() => context.onValueChange?.(value)}
        style={[
          styles.tabsTrigger,
          isActive && styles.tabsTriggerActive,
          style,
        ]}
        {...props}
      >
        <Text
          style={[
            styles.tabsTriggerText,
            isActive && styles.tabsTriggerTextActive,
            textStyle,
          ]}
        >
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
);

TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<View, TabsContentProps>(
  ({ value, style, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    
    if (context.value !== value) {
      return null;
    }

    return (
      <View ref={ref} style={[styles.tabsContent, style]} {...props}>
        {children}
      </View>
    );
  }
);

TabsContent.displayName = "TabsContent";

const styles = StyleSheet.create({
  tabs: {
    gap: 8,
  },
  tabsList: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 3,
    alignSelf: 'flex-start',
  },
  tabsTrigger: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsTriggerActive: {
    backgroundColor: '#ffffff',
  },
  tabsTriggerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  tabsTriggerTextActive: {
    color: '#111827',
  },
  tabsContent: {
    flex: 1,
  },
});

export { Tabs, TabsList, TabsTrigger, TabsContent };
