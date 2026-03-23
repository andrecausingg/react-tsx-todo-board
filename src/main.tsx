// React
import { createRoot } from "react-dom/client";

// Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

// Mantine
import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";

// Component
import App from "./App";

// Tailwind
import "./assets/style/index.css";

// React tanstack
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// React tanstack
const queryClient = new QueryClient();

const rootElement = document.getElementById("root") as HTMLElement;
if (rootElement) {
  createRoot(rootElement).render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <MantineProvider>
          <Notifications position="top-left" zIndex={1000} />
          <App />
        </MantineProvider>
      </Provider>
    </QueryClientProvider>,
  );
}
