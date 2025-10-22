import * as React from "react";
import { View, Image, Text, StyleSheet, ViewStyle, ImageStyle, TextStyle, ViewProps, ImageProps, TextProps } from "react-native";

interface AvatarProps extends ViewProps {
  style?: ViewStyle;
}

interface AvatarImageProps extends ImageProps {
  style?: ImageStyle;
}

interface AvatarFallbackProps extends ViewProps {
  style?: ViewStyle;
}

const Avatar = React.forwardRef<View, AvatarProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.avatar, style]}
        {...props}
      >
        {children}
      </View>
    );
  }
);

Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<Image, AvatarImageProps>(
  ({ style, ...props }, ref) => {
    return (
      <Image
        ref={ref}
        style={[styles.image, style]}
        {...props}
      />
    );
  }
);

AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<View, AvatarFallbackProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.fallback, style]}
        {...props}
      >
        {typeof children === 'string' ? (
          <Text style={styles.fallbackText}>{children}</Text>
        ) : (
          children
        )}
      </View>
    );
  }
);

AvatarFallback.displayName = "AvatarFallback";

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  fallbackText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
  },
});

export { Avatar, AvatarImage, AvatarFallback };
