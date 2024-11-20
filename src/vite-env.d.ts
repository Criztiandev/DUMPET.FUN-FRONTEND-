/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEV_ENVIRONMENT: string;
  readonly VITE_DEV_MAIN_PROCESS_ID: string;
  readonly VITE_DEV_DUMPET_TOKEN_TXID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
