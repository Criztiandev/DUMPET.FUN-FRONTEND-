import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App.tsx";
import { SidebarProvider } from "@/common/components/atoms/ui/sidebar.tsx";
import LoadingScreen from "./common/components/page/helper/loading-screen/index.tsx";
import ErrorScreen from "./common/components/page/helper/error-screen/index.tsx";
import { ThemeProvider } from "./common/components/template/provider/theme-provider/index.tsx";
// @ts-ignore
import { ArweaveWalletKit } from "arweave-wallet-kit";
import { Toast, ToastProvider } from "./common/components/atoms/ui/toast.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingScreen />}>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                fallbackRender={({ resetErrorBoundary }) => (
                  <ErrorScreen onReset={resetErrorBoundary} />
                )}
              >
                <ArweaveWalletKit
                  config={{
                    permissions: ["SIGN_TRANSACTION", "ACCESS_ADDRESS"],
                    appInfo: {
                      name: "Super Cool App",
                      logo: "https://arweave.net/jAvd7Z1CBd8gVF2D6ESj7SMCCUYxDX_z3vpp5aHdaYk",
                    },
                    ensurePermissions: true,
                  }}
                >
                  <ToastProvider>
                    <SidebarProvider>
                      <App />
                      <Toast />
                    </SidebarProvider>
                  </ToastProvider>
                </ArweaveWalletKit>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
