// React
import { createRoot } from "react-dom/client";

// Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

// Mantine
import { Notifications } from "@mantine/notifications";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

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

const rootElement = document.getElementById("root") as HTMLElement;
if (rootElement) {
  createRoot(rootElement).render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <Notifications position="top-left" zIndex={1000} />
          <App />
        </MantineProvider>
      </Provider>
    </QueryClientProvider>,
  );
}
