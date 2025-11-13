# MAST-POE
## Part 2: Mobile App Implementation – Chef Christoffel’s Digital Menu
Github link: https://github.com/VCCT-MAST5112-2025-G1/MAST-POE-ST10467774 
### 🍽️ App Overview
App Name: Chef Christoffel’s Digital Menu
Framework: React Native
Purpose: To provide Chef Christoffel with a dynamic mobile platform to manage and showcase his private dining menus.
Platforms: Android & iOS
Navigation: Bottom tab navigation

### What the App Is
Chef Christoffel’s Food App is a mobile digital menu and management system designed for private dining experiences. It allows Chef Christoffel to add, edit, and display menu items, while clients can browse, search, and filter meals to suit their preferences.
The app provides an elegant mobile-first experience with smooth navigation and a high-end restaurant feel — showcasing the chef’s brand and professionalism.

### Purpose and Target Users
* Purpose: To streamline menu management and enhance the client dining experience.
* Target Users:
* Chef Christoffel (admin) → manages menu items, pricing, and details.
* Clients/Guests → browse and explore the menu, filter by dietary needs, and mark favorites.
* South African Context (ZAR Currency)
All pricing is displayed in South African Rands (R) to reflect the local market.
Example: R350 for a main course, R120 for dessert.

#### The app allows:
* Chef Christoffel to add and manage menu items
* Clients to browse dishes, filter, and favourite meals
* Real-time updates on the menu display

### Complete Feature List (10 Major Features)
#### Home Screen Dashboard
* Displays featured dishes, daily menu, and elegant imagery.
* Quick access to dish categories (Starters, Mains, Desserts).
* 
#### Add Menu Item (Admin Form)
* Chef can add new dishes with name, price (in Rands), description, image URL, and dietary type.
* Includes form validation and error handling.

#### Menu Item Details View
* Shows full dish information: image, ingredients, dietary info, wine pairing, and allergens.
* Button to “Add to Favorites”.
  
#### Search Functionality
* Users can search by dish name or keyword.
* Smart suggestions show popular searches.

#### Favorites System
* Clients can save dishes they love and view them later in the “Favorites” tab.
* 
####  Filter Menu (Course, Price, Allergens)
* Filters dishes by course type, dietary preference, and price range (R0–R1000).

#### Settings Customization
* Manage dietary preferences (e.g., vegetarian, gluten-free).
* Toggle notifications or contact the chef.

#### Data Persistence
* Local data storage ensures dishes and favorites remain after the app is closed.
* Uses AsyncStorage in React Native.

#### Mobile-First Design
* Fully optimized for Android and iOS using React Native.
* Touch-friendly buttons and smooth navigation.

#### Bottom Navigation Bar
* Tabs for Home, Search, Add, Favorites, and Settings.
* Built using React Navigation with Ionicons icons.

 ### 3. Detailed How-To Guide for Chef Christoffel
#### Getting Started
* Open the app on your mobile device or emulator.
* You’ll see the Home Screen with the daily menu.
* Use the bottom navigation to explore different sections.

#### Adding New Dishes
* Tap “Add” from the bottom navigation.
* Fill in the fields: Dish Name, Price (R), Description, and Dietary Info.
* Tap “Add Dish” to save it — it appears instantly on the Home Screen.
* Error messages will appear if required fields are empty or price is invalid.

#### Managing Dishes
* View Dishes: All added dishes show on the Home Screen.
* Favorite Dishes: Tap the “❤️ Add to Favorites” button on the Details Screen.
* Delete (Optional Feature): Future update could allow removing old dishes.

#### Finding Dishes
* Tap Search in the bottom navigation.
* Type part of the dish name or ingredient.
* Apply filters for course type, price range, or dietary restrictions.

#### Client Presentations
* Use the app during private events to show the day’s curated menu.
* Allow guests to browse dishes, read descriptions, and view wine pairings.

#### Menu Planning Tips
* Keep menu categories balanced: Starters, Mains, Desserts.
* Rotate dishes weekly to keep offerings fresh.
* Ensure price consistency and highlight premium dishes.

### 4. Best Practices
#### Menu Management Tips
* Use descriptive dish names and high-quality images.
* Regularly update seasonal ingredients and specials.

#### Client Experience Guidelines
* Keep the app elegant and simple for clients to browse.
* Highlight signature dishes and chef’s recommendations.

#### Presentation Recommendations
* Use consistent colors, fonts, and spacing for a professional look.
* Keep prices visible and pair each dish with appropriate wine suggestions.

 ### 5.Sample Menu Structure
#### Pricing Strategies
* Keep main courses between R250–R450.
* Offer premium tasting experiences around R890 per person.

#### Course Organization
* Appetizers → Soups → Mains → Desserts → Beverages.

### 6. Technical Information
#### Built With: React Native, TypeScript, React Navigation, Vector Icons
* Local Storage: AsyncStorage (for saving dishes and favorites)
* Performance: Optimized for mobile rendering and touch inputs
* Compatibility: Android and iOS (Expo environment)
* Architecture:
* Components: HomeScreen, AddScreen, SearchScreen, FavoritesScreen, FilterScreen, SettingsScreen
* Central Navigation: AppNavigator
* Styling: styles.ts using React Native’s StyleSheet.create()

### Screenshots
![WhatsApp Image 2025-10-22 at 20 14 25_3bd827a8](https://github.com/user-attachments/assets/c0da03e1-2d28-4c92-8b4c-74bb9f5022f1)
![WhatsApp Image 2025-10-22 at 20 14 25_7ac87baf](https://github.com/user-attachments/assets/2659b74c-47d8-452c-9e12-ba2922c6d7c7)
![WhatsApp Image 2025-10-22 at 20 14 26_3a32fb88](https://github.com/user-attachments/assets/773377d1-4e48-49ea-8a9c-40ea6263bc0f)
![WhatsApp Image 2025-10-22 at 20 29 44_f14751d1](https://github.com/user-attachments/assets/f0a380b8-c309-4d95-9cd2-b97365144f9a)
![WhatsApp Image 2025-10-22 at 20 29 44_276884db](https://github.com/user-attachments/assets/ee3ec49e-fcd1-4cba-9375-5779cae74fef)

### Changelog
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

## Reference List (Mendeley Harvard Anglia Style)
* Engelbrecht, C. (2025) Chef Christoffel’s Mobile App Prototype Design [Figma file]. Available at: https://www.figma.com/
 (Accessed: 8 September 2025).
* React Native (2025) React Native Documentation. Available at: https://reactnative.dev
 (Accessed: 9 September 2025).
* React Navigation (2025) React Navigation Documentation. Available at: https://reactnavigation.org/docs/getting-started
 (Accessed: 9 September 2025).
* Oblador (2025) React Native Vector Icons Documentation. Available at: https://github.com/oblador/react-native-vector-icons
 (Accessed: 9 September 2025).
* OpenAI (2025) ChatGPT Conversational Model. Available at: https://chat.openai.com
 (Accessed: 9 September 2025).
* The Independent Institute of Education (2025) Mobile App Scripting Module Guide, The IIE.

 ## Part 3: Final Implementation - Christoffel's Digital Menu
GitHub Link: https://github.com/VCCT-MAST5112-2025-G1/MAST-POE-ST10467774  

React Native (Expo) app written in TypeScript. This project is a small menu management / private dining demo app (Chef Christoffel) with screens for Home, Search, Favorites, Settings, Add Menu Item and Filter. Navigation uses React Navigation (bottom tabs + stack). The project is configured for Expo and TypeScript. The focus was more on adding more dishes, updating the SearchScreen and error handeling.

### Project status
Work in progress. The app uses React Navigation (bottom tabs + stack) and Expo. The Add flow is presented as a separate stack screen and Filter is available both as a tab and via the Home header.

### Prerequisites
- Node.js (LTS recommended)
- npm or yarn
- Expo CLI (optional, `npm install -g expo-cli` or use `npx expo`)
- Android Studio or Xcode if you want to run on simulators/emulators
- (Optional) Git and GitHub access for pushing the repo
This repo uses TypeScript and depends on packages listed in `package.json` (React Native, Expo, react-navigation, etc.).

### Screenshots
![WhatsApp Image 2025-11-13 at 18 35 11_c214d2ce](https://github.com/user-attachments/assets/2f44dd56-7a97-47bc-aa16-4ab0aee06b89)
![WhatsApp Image 2025-11-13 at 18 35 11_f5cd5b01](https://github.com/user-attachments/assets/1b064456-38a3-46e4-85bb-144d4d481b5a)
![WhatsApp Image 2025-11-13 at 18 35 12_d1861239](https://github.com/user-attachments/assets/1ad579bf-e5ed-4c19-8402-e00eae833a5b)
![WhatsApp Image 2025-11-13 at 18 35 12_94b666b1](https://github.com/user-attachments/assets/a144dc6f-aef2-42d5-ae63-3d6cf0bab26e)
![WhatsApp Image 2025-11-13 at 18 35 13_17e22456](https://github.com/user-attachments/assets/3f7e5e70-3f6e-4ff6-8b1b-d7a6ce836835)
![WhatsApp Image 2025-11-13 at 18 35 13_1d0bf45f](https://github.com/user-attachments/assets/da876eb8-7ced-4de8-bbbb-3cadd80b2e8e)
![WhatsApp Image 2025-11-13 at 18 35 13_00b1dfea](https://github.com/user-attachments/assets/1c1c7726-46c9-4bc6-a097-819021d22f22)
![WhatsApp Image 2025-11-13 at 18 35 14_621e6eda](https://github.com/user-attachments/assets/2e9d93da-cb5e-4804-8f72-07a17c774a23)

### Changelog November 2025
## Version 2.0.1 (2025-11-12) - UI / Navigation / Accessibility Updates
### Summary
Small-to-medium updates to navigation, UX, accessibility, and seed data performed on Nov 12, 2025. These changes improve navigation (Add screen separated into a stack), expose the Filter screen in the bottom tab bar, increase touch targets and accessibility labels across important buttons, refine search UX, add price-range choices in the filter UI, and refresh the sample dishes list.
### Changed
- Migrated app navigation to a combined Stack + Bottom Tabs pattern so the Add flow is a separate stack screen (keeps tabs visible while enabling push/pop flows).
- Added a dedicated Filter tab to the bottom tab navigator so users can open filtering from the main navigation.
- Improved button touch targets and accessibility across multiple components (hitSlop, accessibilityLabel, clearer visual buttons).
- Search behavior: results are only shown after the user types at least 2 characters to avoid showing overly broad results on single-letter input.
- Filter menu: added predefined price-range choices (quick-tap badges) to help users narrow results by budget.
- Seed data: added several more sample dishes to the initial `menuItems` array so the Home screen is populated for testing.
### Fixed / Cleaned
- Removed a legacy function call and stray helper (`setCurrentScreen`) found during edits.
- Applied a minimal typing/workaround in navigator instantiation to satisfy this project's TypeScript environment (`id={undefined}` on navigators) — this is an environment-specific workaround and can be replaced with proper typed param lists later.
- Resolved style key/name collisions in `FilterMenu` and adjusted styles to avoid duplication.
### Added
- Price-range choice UI inside `src/components/FilterMenu.tsx` (predefined ranges simplified for quick selection).
- Accessibility and hitSlop improvements in: `src/components/HomeScreen.tsx`, `src/components/AddMenuItems.tsx`, `src/components/FilterMenu.tsx`, `src/components/BottomNavigation.tsx`.
### Files changed in this session
- `App.tsx` — migrated to React Navigation (Stack + Bottom Tabs), added MainTabs, moved Add into stack, updated menu seed data, removed legacy helper call, re-added Cape Malay Bobotie (was briefly removed then restored during edits).
- `src/components/BottomNavigation.tsx` — added Filter tab item and increased hit targets / accessibility.
- `src/components/HomeScreen.tsx` — header and action buttons made more touchable/visible; improved add/filter button touch targets.
- `src/components/AddMenuItems.tsx` — hitSlop and accessibility labels added for back/upload controls.
- `src/components/FilterMenu.tsx` — added price options UI, selected price state, and filtering logic; improved touch targets.
- `src/components/SearchScreen.tsx` — only shows results after a minimum input length (2 characters).
- `README.md` — new or updated onboarding / run instructions added.
### Notes & Next steps
- Please run the app locally (Expo) and validate the new navigation and touch targets on an actual device or Expo Go. The dev server can be started via `npx expo start`.
- Consider replacing the navigator typing workaround with properly-typed param lists (recommended for long-term maintenance).
- If the external Bobotie image URL still causes rendering issues, replace it with a base64 placeholder or a different hosted image — I can update that for you.
### Verification
- Quick workspace search was performed to assert the presence of edited symbols (e.g., "Cape Malay Bobotie" exists in `App.tsx`).

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

### Reference list:
* React Native (2025) Getting Started – React Native Documentation. Available at: https://reactnative.dev/docs/getting-started
 (Accessed: 11 November 2025).
* React Native (2025) React Native Components and APIs. Available at: https://reactnative.dev/docs/components-and-apis
 (Accessed: 11 November 2025).
* React Native (2025) Accessibility Guide. Available at: https://reactnative.dev/docs/accessibility
 (Accessed: 10 November 2025).
* React Native (2025) Performance Guide. Available at: https://reactnative.dev/docs/performance
 (Accessed: 10 November 2025).
* React Native (2025) StyleSheet Documentation. Available at: https://reactnative.dev/docs/stylesheet
 (Accessed: 10 November 2025).
* React Native (2025) Animated API Documentation. Available at: https://reactnative.dev/docs/animated
 (Accessed: 9 November 2025).
* React (2025) React Documentation. Available at: https://react.dev/
 (Accessed: 11 November 2025).
* TypeScript (2025) TypeScript Handbook. Available at: https://www.typescriptlang.org/docs/
 (Accessed: 11 November 2025).
* MDN Web Docs (2025) JavaScript Reference – Language Documentation. Mozilla Foundation. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript
 (Accessed: 12 November 2025).
* Expo (2025) Expo Documentation – Running Apps with Expo Go. Available at: https://docs.expo.dev/
 (Accessed: 12 November 2025).
* React Navigation (2025) Getting Started – Navigation Documentation. Available at: https://reactnavigation.org/docs/getting-started
 (Accessed: 11 November 2025).
* react-native-vector-icons (2025) React Native Vector Icons Documentation. Available at: https://github.com/oblador/react-native-vector-icons
 (Accessed: 10 November 2025).
* @react-native-picker/picker (2025) React Native Picker Documentation. Available at: https://github.com/react-native-picker/picker
 (Accessed: 12 November 2025).
* @react-native-community/slider (2025) React Native Slider Documentation. Available at: https://github.com/callstack/react-native-slider
 (Accessed: 11 November 2025).
* React Native Testing Library (2025) Testing Documentation. Callstack. Available at: https://callstack.github.io/react-native-testing-library/
 (Accessed: 10 November 2025).
* typescript-eslint (2025) TypeScript + ESLint Guidance. Available at: https://typescript-eslint.io/
 (Accessed: 10 November 2025).
* React Native Community (2025) Upgrade Helper and Migration Guide. Available at: https://react-native-community.github.io/upgrade-helper/
 (Accessed: 10 November 2025).
* OpenAI (ChatGPT) (2025) Assistance with App Structure, Documentation and Code Implementation. OpenAI. Available at: https://chat.openai.com/
 (Accessed: 10 November 2025).




## Setup
* Clone the repository (if not already cloned):
```pwsh
git clone https://github.com/ST10467774/MAST-POE.git
cd "MAST POE"

* Install dependencies:
```pwsh
npm install
# or
npm ci

* If you prefer yarn:
```pwsh
yarn install

* Run a TypeScript check (optional but recommended):
```pwsh
npx tsc --noEmit


## Run (development)
Start the Expo dev server:
```pwsh
npm start
# or
npx expo start

This opens the Metro/Expo dev tools. From there you can run on a simulator or a device using the QR code (Expo Go) or launch an emulator.

* Run on Android emulator (via expo):
```pwsh
npm run android

* Run on iOS simulator (macOS only):
```pwsh
npm run ios

## Build (production)
Follow Expo docs to build for Android/iOS (EAS or classic builds). Example (EAS build):
```pwsh
* Install EAS CLI if needed
npm install -g eas-cli
eas build --platform android
eas build --platform ios

See Expo docs for signing and credentials.

## Project structure (important files)
- `App.tsx` — app entry, theme provider and navigation setup (React Navigation stack + bottom tabs).
- `src/components/` — screen and UI components (HomeScreen, AddMenuItems, FilterMenu, BottomNavigation, etc.).
- `styles/` — theme, colors, and helpers.
- `package.json` — dependencies and scripts.
- `tsconfig.json` — TypeScript config.

## Key components
- `HomeScreen.tsx` — shows featured menu items in a grid, header with add & filter actions.
- `AddMenuItems.tsx` — form to add a new menu item (now implemented as its own stack screen).
- `FilterMenu.tsx` — filters (course, price range, allergens) and filtered results.
- `BottomNavigation.tsx` — legacy component; the app uses React Navigation bottom tabs but this file remains in the codebase (you can remove if unused).

## Navigation notes
- Navigation uses `@react-navigation/bottom-tabs` and `@react-navigation/stack`.
- `MainTabs` (bottom tabs) contain Home, Search, Favorites, Filter, and Settings.
- `Add` is a separate `Stack.Screen` so Add appears modally on top of the tabs and can call `navigation.goBack()` to return.
- `Details` is another stack screen; the selected item is passed via a local state variable in `App.tsx` and displayed by `MenuItemDetails` when available.

If you want to further type the navigation params safely, you can add `RootStackParamList` and `RootTabParamList` generics and pass them to the navigator creators.

## Scripts & checks
Common commands:
```pwsh
npm start          * expo start
npm run android    * expo run:android
npm run ios        * expo run:ios (macOS)
npx tsc --noEmit   * type check

* Pre-commit hooks: none in repo by default. It's recommended to add a `pre-commit` hook (husky) to run `npx tsc --noEmit` or `eslint` to catch issues before committing.

#### Commit & PR guidance
Use clear, conventional commit messages. Example for the recent changes:

* feat: separate Add screen into stack, add Filter tab, improve button hit targets
- Move Add flow to a dedicated stack screen and wire Home to navigate to it.
- Add an explicit Filter tab to bottom tabs and keep Filter accessible from Home header.
- Improve touchability and accessibility for controls (hitSlop and accessibilityLabel).
- Seed app with more menu items for a richer Home screen.

If you amend or rewrite commits that have already been pushed, use `git push --force-with-lease` and coordinate with collaborators.

## Troubleshooting
- If Expo complains about SDK versions, ensure your local `expo` version is compatible with `package.json` and installed global CLI if using it.
- If TypeScript navigator typing raises complaints, you can temporarily remove strict navigator generics or add `id={undefined}` on `<Navigator>` (workaround) — preferable long-term fix: declare the correct `RootStackParamList`/`RootTabParamList` and use them with the navigators.
- If you see whitespace errors when committing, run `git diff --check` and use an automatic trimming script or editor setting to remove trailing whitespace.

## Contributing
1. Fork the repo and create a feature branch: `git checkout -b feat/my-change`.
2. Run `npm install` and make your changes.
3. Ensure TypeScript compiles: `npx tsc --noEmit`.
4. Open a Pull Request describing the change.


