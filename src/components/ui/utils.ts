import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

/**
 * Utility function to merge multiple styles
 * Replaces the web-based `cn()` function that used clsx and tailwind-merge
 * 
 * In React Native, we use StyleSheet.flatten() to merge styles
 * Pass an array of styles and they will be merged in order (later styles override earlier ones)
 */
export function cn(
  ...styles: Array<ViewStyle | TextStyle | ImageStyle | false | undefined | null>
): ViewStyle | TextStyle | ImageStyle {
  // Filter out falsy values and flatten the style array
  const validStyles = styles.filter(Boolean) as Array<ViewStyle | TextStyle | ImageStyle>;
  return StyleSheet.flatten(validStyles);
}

/**
 * Alternative utility if you need to work with style arrays directly
 * This is useful when you want to pass styles to components that accept style arrays
 */
export function mergeStyles(
  ...styles: Array<ViewStyle | TextStyle | ImageStyle | false | undefined | null>
): Array<ViewStyle | TextStyle | ImageStyle> {
  return styles.filter(Boolean) as Array<ViewStyle | TextStyle | ImageStyle>;
}

/**
 * Removed web-specific utilities:
 * - clsx (className concatenation)
 * - tailwind-merge (Tailwind CSS class merging)
 * 
 * React Native uses StyleSheet and inline style objects instead of class names.
 * Use the cn() function above for style merging, or use StyleSheet.compose() for simple merges.
 */
