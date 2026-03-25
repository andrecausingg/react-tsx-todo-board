// React
import { createRoot } from "react-dom/client";

// Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

// Mantine Library
import { Notifications } from "@mantine/notifications";
import { createTheme, MantineProvider } from "@mantine/core";

// Mantine Css
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

// Component
import App from "./App";

// Tailwind
import "./assets/style/index.css";

// React tanstack
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// React tanstack
const queryClient = new QueryClient();

// Mantine | Theme
export const theme = createTheme({
  fontFamily: "Jost, sans-serif",
  headings: { fontFamily: "Jost, sans-serif" },
});

// Context
import { AuthProvider } from "./context/authentication/AuthContext";

const rootElement = document.getElementById("root") as HTMLElement;
if (rootElement) {
  createRoot(rootElement).render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <Notifications position="bottom-right" zIndex={1000} />
          <AuthProvider>
            <App />
          </AuthProvider>
        </MantineProvider>
      </Provider>
    </QueryClientProvider>,
  );
}
