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
import { Toaster } from "./common/components/atoms/ui/toaster.tsx";
import { Toaster as SoonerToaster } from "./common/components/atoms/ui/sonner.tsx";
import { TooltipProvider } from "./common/components/atoms/ui/tooltip.tsx";

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
                      name: "DUMPET.FUN",
                      logo: "https://pbs.twimg.com/media/GcMreW3asAAcrI9?format=jpg&name=4096x4096",
                    },
                    ensurePermissions: true,
                  }}
                >
                  <TooltipProvider>
                    <SidebarProvider>
                      <App />
                      <Toaster />
                      <SoonerToaster />
                    </SidebarProvider>
                  </TooltipProvider>
                </ArweaveWalletKit>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
