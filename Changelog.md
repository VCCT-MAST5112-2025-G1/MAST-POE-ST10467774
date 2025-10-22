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


  


