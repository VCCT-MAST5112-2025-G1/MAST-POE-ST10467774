# Changelog

All notable changes to the MAST POE project will be documented in this file.

## Version 2.0.0 (October 22, 2025) - Complete React Native Migration

### 🎉 Major Release: Full React Native Conversion

This release represents a complete architectural transformation from web-based React to **pure React Native for mobile applications**.

### Changed - Complete Platform Migration

#### ✅ UI Components Converted (47 components)
All UI components migrated from web libraries to React Native:

**Removed Web Dependencies:**
- ❌ `@radix-ui/*` (all packages)
- ❌ `class-variance-authority`
- ❌ `react-dom`
- ❌ `lucide-react`
- ❌ `next-themes`
- ❌ `sonner`
- ❌ `vaul`
- ❌ `cmdk`
- ❌ `react-day-picker`
- ❌ `embla-carousel-react`
- ❌ `react-resizable-panels`
- ❌ `clsx`
- ❌ `tailwind-merge`
- ❌ `recharts`
- ❌ `input-otp`

**Added React Native Implementations:**
- ✅ `accordion.tsx` - Animated collapsible component
- ✅ `alert.tsx` - Native View-based alerts with variants
- ✅ `alert-dialog.tsx` - Modal-based dialog with Context API
- ✅ `aspect-ratio.tsx` - Calculated dimension component
- ✅ `avatar.tsx` - Image with fallback support
- ✅ `badge.tsx` - View-based badge component
- ✅ `breadcrumb.tsx` - Horizontal ScrollView navigation
- ✅ `button.tsx` - TouchableOpacity with variants (default, outline, ghost, destructive, link)
- ✅ `calendar.tsx` - Custom calendar implementation
- ✅ `card.tsx` - View-based card components (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- ✅ `carousel.tsx` - Horizontal ScrollView carousel
- ✅ `chart.tsx` - Custom chart rendering
- ✅ `checkbox.tsx` - TouchableOpacity with check state
- ✅ `collapsible.tsx` - Animated collapse component
- ✅ `command.tsx` - Command palette with Modal
- ✅ `context-menu.tsx` - Long-press context menu
- ✅ `dialog.tsx` - Modal-based dialog
- ✅ `drawer.tsx` - Bottom sheet drawer Modal
- ✅ `dropdown-menu.tsx` - Modal-based dropdown picker
- ✅ `form.tsx` - React Native compatible form wrapper
- ✅ `hover-card.tsx` - Pressable tooltip component
- ✅ `input.tsx` - TextInput component
- ✅ `input-otp.tsx` - Custom OTP input
- ✅ `label.tsx` - Text label component
- ✅ `menubar.tsx` - Horizontal menu bar
- ✅ `navigation-menu.tsx` - Navigation structure
- ✅ `pagination.tsx` - TouchableOpacity pagination buttons
- ✅ `popover.tsx` - Modal-based popover
- ✅ `progress.tsx` - Animated progress bar
- ✅ `radio-group.tsx` - TouchableOpacity radio group
- ✅ `resizable.tsx` - PanResponder resizable panels
- ✅ `scroll-area.tsx` - ScrollView wrapper
- ✅ `select.tsx` - Native Picker/Modal select
- ✅ `separator.tsx` - View divider
- ✅ `sheet.tsx` - Side drawer Modal
- ✅ `sidebar.tsx` - Drawer layout component
- ✅ `skeleton.tsx` - Animated skeleton loader
- ✅ `slider.tsx` - Native Slider component
- ✅ `sonner.tsx` - Custom toast notification
- ✅ `switch.tsx` - Native Switch component
- ✅ `table.tsx` - ScrollView with View-based table
- ✅ `tabs.tsx` - Native tab implementation
- ✅ `textarea.tsx` - Multiline TextInput
- ✅ `toast.tsx` - Animated toast notifications
- ✅ `toggle.tsx` - TouchableOpacity toggle
- ✅ `toggle-group.tsx` - Button group component
- ✅ `tooltip.tsx` - Animated tooltip
- ✅ `use-mobile.ts` - Dimensions API hook
- ✅ `utils.ts` - StyleSheet utility functions

#### ✅ Screen Components Verified (8 screens)
All screen components confirmed to be React Native compatible:
- ✅ `HomeScreen.tsx` - Dashboard with menu items
- ✅ `AddMenuItems.tsx` - Add/edit menu form
- ✅ `MenuDetails.tsx` - Dish details view
- ✅ `FavoritesScreen.tsx` - Saved dishes list
- ✅ `FilterMenu.tsx` - Advanced filtering
- ✅ `SearchScreen.tsx` - Search functionality
- ✅ `SettingsScreen.tsx` - App settings
- ✅ `BottomNavigation.tsx` - Tab navigation

#### ✅ Styles Converted (4 files)
- ✅ `styles/globals.ts` - Converted from CSS to React Native theme objects
  - Removed `:root` and `.dark` CSS selectors
  - Converted `oklch()` colors to hex/rgba format
  - Added `fonts` object (sizes, weights)
  - Added `spacing` object (xs to 3xl)
  - Added `borderRadius` object
  - Added `themeColors` object (light & dark themes)
  - Added `typography` presets (h1-h4, p, label, button, input, small)
  - Added `getThemeColors()` helper function
- ✅ `styles/colors.ts` - Already React Native compatible
- ✅ `styles/ThemeContext.tsx` - Already React Native compatible
- ✅ `styles/useTheme.ts` - Already using Appearance API

### Added
- **react-native-vector-icons** - Icon library (MaterialIcons, Feather)
- **@react-native-community/slider** - Native slider component
- **@react-native-picker/picker** - Native picker component
- **Context API** implementations for complex components
- **Animated API** for smooth animations
- **StyleSheet.create()** for all component styling
- **TypeScript interfaces** for all component props

### Technical Changes

#### API Pattern Changes
- `className` → `style` (StyleSheet objects)
- `onClick` → `onPress`
- `onChange` → `onChangeText` (for TextInput)
- HTML elements → React Native components:
  - `<div>` → `<View>`
  - `<span>` → `<Text>`
  - `<button>` → `<TouchableOpacity>`
  - `<input>` → `<TextInput>`
  - `<img>` → `<Image>`

#### Styling Changes
- CSS classes → StyleSheet objects
- CSS animations → Animated API
- CSS variables → JavaScript objects
- Tailwind classes → React Native flexbox
- Media queries → Dimensions API
- Hover states → Pressable handlers

### Quality Assurance
- ✅ **0 TypeScript errors** across entire codebase
- ✅ All components use pure React Native APIs
- ✅ No web-specific code remaining
- ✅ Proper TypeScript interfaces for all components
- ✅ Consistent styling patterns
- ✅ Theme support (light/dark mode) functional

### Breaking Changes
⚠️ This is a major version upgrade with breaking changes:

1. **Component APIs** - All props changed from web to React Native patterns
2. **Event Handlers** - Use React Native event types (onPress, onChangeText, etc.)
3. **Styling** - Must use StyleSheet objects instead of className strings
4. **Platform** - Now mobile-only (iOS/Android via Expo)
5. **Dependencies** - All web libraries removed

### Migration Guide
If updating from v1.x:
1. Replace `className` props with `style` props
2. Replace `onClick` with `onPress`
3. Update event handlers to React Native patterns
4. Convert any custom CSS to StyleSheet.create()
5. Test on physical device or emulator

---

## Version 1 (October 2025)

#### Added
- Initial project setup and repository creation
- Complete menu management system for Chef Christoffel's Food App
- Home screen dashboard with featured dishes display
- Add menu item functionality with form validation
- Menu item details view with full dish information
- Search functionality for dishes by name or keyword
- Favorites system allowing users to save preferred dishes
- Filter menu by course type (Starters, Mains, Desserts)
- Advanced filtering by price range and dietary preferences
- Settings screen with currency, theme, and notification preferences
- Bottom navigation for easy screen switching
- UI component library integration (custom components in `/src/components/ui/`)
- TypeScript support for type safety
- React Native StyleSheet for cross-platform styling

#### Fixed
- OTA (Over-The-Air) updates disabled in app.json for local development
- ScrollArea component made cross-platform (web div + native ScrollView)
- Type declarations added for Radix ScrollArea components
- Form validation errors for required fields
- Terminal and console error handling

#### Changed
- Updated folder structure for better organization
- Improved CSS/styling implementation with global styles
- Refactored package.json dependencies
- Updated tsconfig.json to include proper type declarations
- Enhanced UI components for better user experience

#### Technical Improvements
- Installed and configured npm packages for UI components
- Added local Radix ScrollArea type declarations
- Implemented AsyncStorage for data persistence
- Created modular component architecture
- Set up GitHub repository with proper documentation

---

## References

### Official Documentation

#### Core Technologies
1. **React Native Documentation**  
   React Native · Learn once, write anywhere  
   https://reactnative.dev/docs/getting-started  
   Accessed: October 2025

2. **TypeScript Documentation**  
   TypeScript: JavaScript With Syntax For Types  
   https://www.typescriptlang.org/docs/  
   Accessed: October 2025

3. **Expo Documentation**  
   Expo Documentation  
   https://docs.expo.dev/  
   Accessed: October 2025

4. **React Documentation**  
   React – A JavaScript library for building user interfaces  
   https://react.dev/  
   Accessed: October 2025

#### Navigation & UI Libraries
5. **React Navigation**  
   React Navigation · Routing and navigation for React Native apps  
   https://reactnavigation.org/docs/getting-started  
   Accessed: October 2025

6. **React Native Vector Icons**  
   oblador/react-native-vector-icons: Customizable Icons for React Native  
   https://github.com/oblador/react-native-vector-icons  
   Accessed: October 2025

7. **React Native Community Slider**  
   @react-native-community/slider  
   https://github.com/callstack/react-native-slider  
   Accessed: October 2025

8. **React Native Picker**  
   @react-native-picker/picker  
   https://github.com/react-native-picker/picker  
   Accessed: October 2025

### Learning Resources

9. **React Native Tutorial - Meta**  
   Introduction · React Native  
   https://reactnative.dev/docs/tutorial  
   Accessed: October 2025

10. **TypeScript Handbook**  
    The TypeScript Handbook  
    https://www.typescriptlang.org/docs/handbook/intro.html  
    Accessed: October 2025

11. **React Hooks Documentation**  
    Hooks API Reference – React  
    https://react.dev/reference/react  
    Accessed: October 2025

12. **FlatList Performance Guide**  
    FlatList · React Native  
    https://reactnative.dev/docs/flatlist  
    Accessed: October 2025

### Design & Styling

13. **React Native StyleSheet**  
    StyleSheet · React Native  
    https://reactnative.dev/docs/stylesheet  
    Accessed: October 2025

14. **React Native Animated API**  
    Animated · React Native  
    https://reactnative.dev/docs/animated  
    Accessed: October 2025

15. **React Native Appearance API**  
    Appearance · React Native  
    https://reactnative.dev/docs/appearance  
    Accessed: October 2025

### Development Tools

16. **Expo CLI Documentation**  
    Expo CLI - Expo Documentation  
    https://docs.expo.dev/workflow/expo-cli/  
    Accessed: October 2025

17. **Metro Bundler**  
    Metro · The JavaScript Bundler for React Native  
    https://facebook.github.io/metro/  
    Accessed: October 2025

18. **VS Code for React Native**  
    React Native Tools - Visual Studio Marketplace  
    https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native  
    Accessed: October 2025

### Best Practices & Patterns

19. **React Native Performance**  
    Performance Overview · React Native  
    https://reactnative.dev/docs/performance  
    Accessed: October 2025

20. **React Context API Guide**  
    Context – React  
    https://react.dev/reference/react/useContext  
    Accessed: October 2025

21. **TypeScript with React Native**  
    Using TypeScript · React Native  
    https://reactnative.dev/docs/typescript  
    Accessed: October 2025

22. **React Native Accessibility**  
    Accessibility · React Native  
    https://reactnative.dev/docs/accessibility  
    Accessed: October 2025

### GitHub & Version Control

23. **GitHub Docs - Repository Management**  
    About repositories - GitHub Docs  
    https://docs.github.com/en/repositories  
    Accessed: October 2025

24. **Git Documentation**  
    Git - Documentation  
    https://git-scm.com/doc  
    Accessed: October 2025

### Community Resources

25. **Stack Overflow - React Native**  
    Newest 'react-native' Questions  
    https://stackoverflow.com/questions/tagged/react-native  
    Accessed: October 2025

26. **React Native Community**  
    React Native Community  
    https://github.com/react-native-community  
    Accessed: October 2025

27. **Expo Forums**  
    Expo Forums  
    https://forums.expo.dev/  
    Accessed: October 2025

### Migration Guides

28. **React Native Upgrade Helper**  
    React Native Upgrade Helper  
    https://react-native-community.github.io/upgrade-helper/  
    Accessed: October 2025

29. **Migrating from Web to React Native**  
    Out-of-Tree Platforms · React Native  
    https://reactnative.dev/docs/out-of-tree-platforms  
    Accessed: October 2025

### Testing & Quality

30. **React Native Testing Library**  
    React Native Testing Library  
    https://callstack.github.io/react-native-testing-library/  
    Accessed: October 2025

31. **TypeScript ESLint**  
    typescript-eslint  
    https://typescript-eslint.io/  
    Accessed: October 2025

### Additional Resources

32. **NPM Documentation**  
    npm Docs  
    https://docs.npmjs.com/  
    Accessed: October 2025

33. **Node.js Documentation**  
    Node.js Documentation  
    https://nodejs.org/en/docs/  
    Accessed: October 2025

34. **MDN Web Docs - JavaScript**  
    JavaScript | MDN  
    https://developer.mozilla.org/en-US/docs/Web/JavaScript  
    Accessed: October 2025

35. **React Native Directory**  
    React Native Directory  
    https://reactnative.directory/  
    Accessed: October 2025

### Academic & Tutorial Resources

36. **freeCodeCamp - React Native Tutorial**  
    React Native Tutorial for Beginners  
    https://www.freecodecamp.org/news/react-native-tutorial/  
    Accessed: October 2025

37. **Microsoft Learn - React Native**  
    Introduction to React Native - Learn | Microsoft Docs  
    https://learn.microsoft.com/en-us/training/modules/react-native-introduction/  
    Accessed: October 2025

### Image & Asset Resources

38. **React Native Image Component**  
    Image · React Native  
    https://reactnative.dev/docs/image  
    Accessed: October 2025

39. **SVG Support in React Native**  
    react-native-svg  
    https://github.com/software-mansion/react-native-svg  
    Accessed: October 2025

### License Information

40. **React Native License**  
    React Native is MIT licensed  
    https://github.com/facebook/react-native/blob/main/LICENSE  
    Accessed: October 2025

---

## Attribution

This project uses open-source software licensed under various licenses including MIT, Apache 2.0, and BSD. All third-party libraries and dependencies are used in accordance with their respective licenses.

### Key Contributors
- **Facebook/Meta Open Source** - React Native core framework
- **Expo Team** - Expo development platform and tools
- **React Navigation Team** - Navigation library
- **React Native Community** - Community-maintained packages and tools

### Development Team
- **Student ID:** ST10467774
- **Project:** MAST POE - Chef Christoffel's Menu Management App
- **Institution:** [Your Institution Name]
- **Course:** Mobile Application Software Technology
- **Year:** 2025

---






  


