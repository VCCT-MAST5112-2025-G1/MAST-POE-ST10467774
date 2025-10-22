import * as React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle, ViewProps, TextProps } from "react-native";

type AlertVariant = "default" | "destructive";

interface AlertProps extends ViewProps {
  variant?: AlertVariant;
  style?: ViewStyle;
}

interface AlertTitleProps extends TextProps {
  style?: TextStyle;
}

interface AlertDescriptionProps extends TextProps {
  style?: TextStyle;
}

const Alert = React.forwardRef<View, AlertProps>(
  ({ variant = "default", style, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[
          styles.alert,
          styles[`variant_${variant}`],
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }
);

Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<Text, AlertTitleProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        style={[styles.title, style]}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<Text, AlertDescriptionProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        style={[styles.description, style]}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

AlertDescription.displayName = "AlertDescription";

const styles = StyleSheet.create({
  alert: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 4,
  },
  variant_default: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
  },
  variant_destructive: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6b7280',
  },
});

export { Alert, AlertTitle, AlertDescription };
