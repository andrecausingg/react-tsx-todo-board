// Layout
import GuestLayout from "./layouts/guest/GuestLayout";

// Guest Views
import HomeView from "./views/guest/home/HomeView";

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

const routerConfig: Record<string, RouteConfig[]> = {
  // List route
  // Guest
  guest: [
    {
      path: "/",
      element: <GuestLayout />,
      children: [{ path: "/", element: <HomeView /> }],
    }
  ],
};

export default routerConfig;
