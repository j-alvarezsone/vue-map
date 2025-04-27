# Vue 3 + TypeScript + Vite + Mapbox

This project is a starter template for building interactive maps using [Vue 3](https://vuejs.org/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), and [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/). It features:

- Mapbox map integration

## Getting Started

### 1. Install dependencies

Using [pnpm](https://pnpm.io/):

```sh
pnpm install
```

Or with npm:

```sh
npm install
```

Or with yarn:

```sh
yarn install
```

### 2. Create a Mapbox account and get an API key

Sign up at [Mapbox](https://account.mapbox.com/) and obtain your **Access Token**.

### 3. Configure environment variables

Create a `.env` file in the root of the project with the following content:

```
VITE_MAPBOX_API_KEY=YOUR_API_KEY
```

Replace `YOUR_API_KEY` with your actual Mapbox access token.

### 4. Run the development server

```sh
pnpm dev
```

Or with npm:

```sh
npm run dev
```

Or with yarn:

```sh
yarn dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.
