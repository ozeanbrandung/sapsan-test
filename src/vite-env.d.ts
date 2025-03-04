/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly UNSPLASH_CLIENT_ID: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
