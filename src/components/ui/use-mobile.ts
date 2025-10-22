import * as React from 'react';
import { Dimensions, ScaledSize } from 'react-native';

const MOBILE_BREAKPOINT = 768;

/**
 * Hook to detect if the device is mobile based on screen width
 * In React Native, this is always true for phones, but can be false for tablets
 * 
 * @returns {boolean} true if screen width < 768px (mobile), false otherwise (tablet/desktop)
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    const { width } = Dimensions.get('window');
    return width < MOBILE_BREAKPOINT;
  });

  React.useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      setIsMobile(window.width < MOBILE_BREAKPOINT);
    };

    // Subscribe to dimension changes
    const subscription = Dimensions.addEventListener('change', onChange);

    // Cleanup subscription on unmount
    return () => {
      subscription?.remove();
    };
  }, []);

  return isMobile;
}


