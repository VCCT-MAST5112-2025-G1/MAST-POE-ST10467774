# MAST-POE

React Native (Expo) app written in TypeScript. This project is a small menu management / private dining demo app (Chef Christoffel) with screens for Home, Search, Favorites, Settings, Add Menu Item and Filter. Navigation uses React Navigation (bottom tabs + stack). The project is configured for Expo and TypeScript.

## Table of contents
- Project status
- Prerequisites
- Setup
- Run (dev)
- Build (platforms)
- Project structure
- Key components
- Navigation notes
- Scripts & checks
- Commit & PR guidance
- Troubleshooting
- Contributing
- License

## Project status

Work in progress. The app uses React Navigation (bottom tabs + stack) and Expo. The Add flow is presented as a separate stack screen and Filter is available both as a tab and via the Home header.

## Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- Expo CLI (optional, `npm install -g expo-cli` or use `npx expo`)
- Android Studio or Xcode if you want to run on simulators/emulators
- (Optional) Git and GitHub access for pushing the repo

This repo uses TypeScript and depends on packages listed in `package.json` (React Native, Expo, react-navigation, etc.).

## Setup

Clone the repository (if not already cloned):

```pwsh
git clone https://github.com/ST10467774/MAST-POE.git
cd "MAST POE"
```

Install dependencies:

```pwsh
npm install
# or
npm ci
```

If you prefer yarn:

```pwsh
yarn install
```

Run a TypeScript check (optional but recommended):

```pwsh
npx tsc --noEmit
```

## Run (development)

Start the Expo dev server:

```pwsh
npm start
# or
npx expo start
```

This opens the Metro/Expo dev tools. From there you can run on a simulator or a device using the QR code (Expo Go) or launch an emulator.

Run on Android emulator (via expo):

```pwsh
npm run android
```

Run on iOS simulator (macOS only):

```pwsh
npm run ios
```

## Build (production)

Follow Expo docs to build for Android/iOS (EAS or classic builds). Example (EAS build):

```pwsh
# Install EAS CLI if needed
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

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
npm start        # expo start
npm run android  # expo run:android
npm run ios      # expo run:ios (macOS)
npx tsc --noEmit  # type check
```

Pre-commit hooks: none in repo by default. It's recommended to add a `pre-commit` hook (husky) to run `npx tsc --noEmit` or `eslint` to catch issues before committing.

## Commit & PR guidance

Use clear, conventional commit messages. Example for the recent changes:

```
feat: separate Add screen into stack, add Filter tab, improve button hit targets

- Move Add flow to a dedicated stack screen and wire Home to navigate to it.
- Add an explicit Filter tab to bottom tabs and keep Filter accessible from Home header.
- Improve touchability and accessibility for controls (hitSlop and accessibilityLabel).
- Seed app with more menu items for a richer Home screen.
```

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

If you want me to add contribution helpers (editorconfig, husky pre-commit hooks, linting), I can implement them.

## License


