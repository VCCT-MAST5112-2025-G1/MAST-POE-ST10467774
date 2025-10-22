import * as React from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// Context
// ============================================================================

interface CarouselContextValue {
  scrollToIndex: (index: number) => void;
  currentIndex: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  orientation: 'horizontal' | 'vertical';
}

const CarouselContext = React.createContext<CarouselContextValue | undefined>(undefined);

const useCarousel = () => {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error('Carousel components must be used within a Carousel');
  }
  return context;
};

// ============================================================================
// Carousel (Root)
// ============================================================================

interface CarouselProps {
  orientation?: 'horizontal' | 'vertical';
  style?: ViewStyle;
  children: React.ReactNode;
}

const Carousel = React.forwardRef<View, CarouselProps>(
  ({ orientation = 'horizontal', style, children }, ref) => {
    const scrollViewRef = React.useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [itemCount, setItemCount] = React.useState(0);

    // Count children
    React.useEffect(() => {
      const count = React.Children.toArray(children).reduce<number>((acc, child) => {
        if (React.isValidElement(child) && child.type === CarouselContent) {
          const childElement = child as React.ReactElement<CarouselContentProps>;
          return acc + React.Children.count(childElement.props.children);
        }
        return acc;
      }, 0);
      setItemCount(count);
    }, [children]);

    const scrollToIndex = React.useCallback(
      (index: number) => {
        if (scrollViewRef.current) {
          const offset = index * SCREEN_WIDTH;
          scrollViewRef.current.scrollTo({
            x: orientation === 'horizontal' ? offset : 0,
            y: orientation === 'vertical' ? offset : 0,
            animated: true,
          });
          setCurrentIndex(index);
        }
      },
      [orientation]
    );

    const scrollPrev = React.useCallback(() => {
      if (currentIndex > 0) {
        scrollToIndex(currentIndex - 1);
      }
    }, [currentIndex, scrollToIndex]);

    const scrollNext = React.useCallback(() => {
      if (currentIndex < itemCount - 1) {
        scrollToIndex(currentIndex + 1);
      }
    }, [currentIndex, itemCount, scrollToIndex]);

    const canScrollPrev = currentIndex > 0;
    const canScrollNext = currentIndex < itemCount - 1;

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const contentOffset =
        orientation === 'horizontal'
          ? event.nativeEvent.contentOffset.x
          : event.nativeEvent.contentOffset.y;
      const index = Math.round(contentOffset / SCREEN_WIDTH);
      setCurrentIndex(index);
    };

    const contextValue: CarouselContextValue = React.useMemo(
      () => ({
        scrollToIndex,
        currentIndex,
        canScrollPrev,
        canScrollNext,
        scrollPrev,
        scrollNext,
        orientation,
      }),
      [scrollToIndex, currentIndex, canScrollPrev, canScrollNext, scrollPrev, scrollNext, orientation]
    );

    return (
      <CarouselContext.Provider value={contextValue}>
        <View ref={ref} style={[styles.carousel, style]}>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === CarouselContent) {
              return React.cloneElement(child as React.ReactElement<any>, {
                scrollViewRef,
                onScroll: handleScroll,
              });
            }
            return child;
          })}
        </View>
      </CarouselContext.Provider>
    );
  }
);

Carousel.displayName = 'Carousel';

// ============================================================================
// CarouselContent
// ============================================================================

interface CarouselContentProps {
  style?: ViewStyle;
  children: React.ReactNode;
  scrollViewRef?: React.RefObject<ScrollView>;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const CarouselContent = React.forwardRef<View, CarouselContentProps>(
  ({ style, children, scrollViewRef, onScroll }, ref) => {
    const { orientation } = useCarousel();

    return (
      <ScrollView
        ref={scrollViewRef}
        horizontal={orientation === 'horizontal'}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={[styles.content, style]}
      >
        {children}
      </ScrollView>
    );
  }
);

CarouselContent.displayName = 'CarouselContent';

// ============================================================================
// CarouselItem
// ============================================================================

interface CarouselItemProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const CarouselItem = React.forwardRef<View, CarouselItemProps>(({ style, children }, ref) => {
  const { orientation } = useCarousel();

  return (
    <View
      ref={ref}
      style={[
        styles.item,
        orientation === 'horizontal' ? styles.itemHorizontal : styles.itemVertical,
        style,
      ]}
    >
      {children}
    </View>
  );
});

CarouselItem.displayName = 'CarouselItem';

// ============================================================================
// CarouselPrevious
// ============================================================================

interface CarouselPreviousProps {
  style?: ViewStyle;
}

const CarouselPrevious = React.forwardRef<View, CarouselPreviousProps>(({ style }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <TouchableOpacity
      onPress={scrollPrev}
      disabled={!canScrollPrev}
      style={[styles.prevButton, !canScrollPrev && styles.navButtonDisabled, style]}
    >
      <Icon name="chevron-left" size={24} color={canScrollPrev ? '#000' : '#d1d5db'} />
    </TouchableOpacity>
  );
});

CarouselPrevious.displayName = 'CarouselPrevious';

// ============================================================================
// CarouselNext
// ============================================================================

interface CarouselNextProps {
  style?: ViewStyle;
}

const CarouselNext = React.forwardRef<View, CarouselNextProps>(({ style }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <TouchableOpacity
      onPress={scrollNext}
      disabled={!canScrollNext}
      style={[styles.nextButton, !canScrollNext && styles.navButtonDisabled, style]}
    >
      <Icon name="chevron-right" size={24} color={canScrollNext ? '#000' : '#d1d5db'} />
    </TouchableOpacity>
  );
});

CarouselNext.displayName = 'CarouselNext';

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  carousel: {
    position: 'relative',
  },
  content: {
    flex: 1,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemHorizontal: {
    width: SCREEN_WIDTH,
  },
  itemVertical: {
    height: SCREEN_WIDTH,
  },
  prevButton: {
    position: 'absolute',
    left: 8,
    top: '50%',
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nextButton: {
    position: 'absolute',
    right: 8,
    top: '50%',
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
});

// ============================================================================
// Exports
// ============================================================================

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, useCarousel };
