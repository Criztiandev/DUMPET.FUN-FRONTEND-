/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEV_ENVIRONMENT: string;
  readonly VITE_DEV_MAIN_PROCESS_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
