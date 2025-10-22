import * as React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Card = React.forwardRef<View, CardProps>(
  ({ children, style }, ref) => {
    return (
      <View ref={ref} style={[styles.card, style]}>
        {children}
      </View>
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<View, CardProps>(
  ({ children, style }, ref) => {
    return (
      <View ref={ref} style={[styles.cardHeader, style]}>
        {children}
      </View>
    );
  }
);
CardHeader.displayName = "CardHeader";

interface CardTextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const CardTitle = React.forwardRef<Text, CardTextProps>(
  ({ children, style }, ref) => {
    return (
      <Text ref={ref} style={[styles.cardTitle, style]}>
        {children}
      </Text>
    );
  }
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<Text, CardTextProps>(
  ({ children, style }, ref) => {
    return (
      <Text ref={ref} style={[styles.cardDescription, style]}>
        {children}
      </Text>
    );
  }
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<View, CardProps>(
  ({ children, style }, ref) => {
    return (
      <View ref={ref} style={[styles.cardContent, style]}>
        {children}
      </View>
    );
  }
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<View, CardProps>(
  ({ children, style }, ref) => {
    return (
      <View ref={ref} style={[styles.cardFooter, style]}>
        {children}
      </View>
    );
  }
);
CardFooter.displayName = "CardFooter";

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    padding: 16,
    paddingBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  cardContent: {
    padding: 16,
    paddingTop: 0,
  },
  cardFooter: {
    padding: 16,
    paddingTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
});

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
