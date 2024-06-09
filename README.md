# UI-Monorepo

This is a monorepo project managed with Lerna, containing a UI components library and a React playground for testing and development.

    .
    ├── ...
    ├── packages                      # Lists of packages to build.
    │   ├── ui-components             # Develop UI components using react.
    │   └── other                     # other packages or library need to build.
    ├── ...
    ├── playground                    # Lists of app library or framework.
    │   ├── react                     # React used to test the `ui-components` library.
    │   └── other                     # other React project files or Vue or Angular
    └── ...

## Prerequisites

- Yarn installed on your machine. If you don't have Yarn installed, you can download it from [Yarn's official website](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable).

## Installation

To get started with this monorepo:

1. **Clone the repository and Build:**

   ```bash
   git clone https://github.com/frantanius/ui-components-Monorepo.git
   ```

   ```bash
   cd ui-components-Monorepo
   ```

   ```bash
   yarn install
   ```

   ```bash
   yarn build
   ```

2. **Run the app with Storybook:**

   ```bash
   yarn start:storybook
   ```

3. **Run the app with the React playground (optional | development purposes):**

   ```bash
   yarn dev
   ```

   After running the app with the react playground, you can access it by opening your web browser and navigating to `http://localhost:3001`.

4. **Add library to the Dependencies to any project react (optional):**

   ```bash
   npm or yarn install @makyo-components/ui-components
   ```

   And import the packages including the styles

   ```bash
   import { Dropdown } from '@makyo-components/ui-components';
   import '@makyo-components/ui-components/build/index.css';
   ```

## Demo storybook

[website](https://ui-components-monorepo.vercel.app/?path=/docs/dropdown--docs)
