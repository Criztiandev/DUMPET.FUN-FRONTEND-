import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    base: "",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      "process.env.VITE_DEV_ENVIRONMENT": JSON.stringify(
        env.VITE_DEV_ENVIRONMENT
      ),
      "process.env.VITE_DEV_MAIN_PROCESS_ID": JSON.stringify(
        env.VITE_DEV_MAIN_PROCESS_ID
      ),
      "process.env.VITE_DEV_DUMPET_TOKEN_TXID": JSON.stringify(
        env.VITE_DEV_DUMPET_TOKEN_TXID
      ),
    },
  };
});
