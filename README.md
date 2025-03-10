# sapsan-test

**Чтобы начать работу с проектом, необходимо создать файл .env.local и задать занчения переменным окружения, перечисленным в .env**

Запуск проекта: 
- npm i
- npm run dev

Деплой проекта: https://sapsan-test-eight.vercel.app/

DONE: 
- fetch unsplash photos on search 
- add tanstack query 
- add unsplash service 
- add prettier
- add HeadlessUI + Tailwind for ui-kit 
- add infinite scroll 
- add virtualized list 
- add modal
- add mobile styles 
- add desktop styles 
- handle enter down
- fix resizing
- fix issues with tanstack queries: don't query without button click, reset fetched data when search input cleared
- fix search bar positioning and animation 
- deploy

TODO: 
- handle loadings, errors states
- add routing
- add absolute imports 
- add imports order lint check
- refactor (+ check todos at code, fix lint warnings)
- test 
- check accessibility 

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
