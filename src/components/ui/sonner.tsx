import * as React from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToasterContextValue {
  toast: (message: string, type?: ToastType, duration?: number) => void;
  dismiss: (id: string) => void;
}

const ToasterContext = React.createContext<ToasterContextValue>({
  toast: () => {},
  dismiss: () => {},
});

export const useToast = () => React.useContext(ToasterContext);

const ToastItem: React.FC<{
  toast: Toast;
  onDismiss: () => void;
}> = ({ toast, onDismiss }) => {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(-100)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      dismissToast();
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, []);

  const dismissToast = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onDismiss());
  };

  const getBackgroundColor = () => {
    switch (toast.type) {
      case "success":
        return "#10b981";
      case "error":
        return "#ef4444";
      case "warning":
        return "#f59e0b";
      case "info":
      default:
        return "#3b82f6";
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return "check-circle";
      case "error":
        return "error";
      case "warning":
        return "warning";
      case "info":
      default:
        return "info";
    }
  };

  return (
    <Animated.View
      style={[
        styles.toastItem,
        {
          backgroundColor: getBackgroundColor(),
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <MaterialIcons name={getIcon()} size={20} color="#fff" />
      <Text style={styles.toastText}>{toast.message}</Text>
      <TouchableOpacity onPress={dismissToast}>
        <MaterialIcons name="close" size={18} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export const Toaster: React.FC<{ style?: ViewStyle }> = ({ style }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const toast = React.useCallback(
    (message: string, type: ToastType = "info", duration = 3000) => {
      const id = Date.now().toString();
      const newToast: Toast = { id, message, type, duration };
      setToasts((prev) => [...prev, newToast]);
    },
    []
  );

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToasterContext.Provider value={{ toast, dismiss }}>
      <View style={[styles.container, style]} pointerEvents="box-none">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </View>
    </ToasterContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 9999,
  },
  toastItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
    minWidth: 300,
    maxWidth: Dimensions.get("window").width - 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toastText: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});



