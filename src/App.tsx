// React
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Router
import routerConfig from "./router";

const App: React.FC = () => {
  // Route of Views
  const routingConfig = routerConfig["guest"] || [];

  return (
    <>
      <BrowserRouter>
        <Routes>
          {routingConfig.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
              {route.children &&
                route.children.map((childRoute, childIndex) => (
                  <Route
                    key={childIndex}
                    path={childRoute.path}
                    element={childRoute.element}
                  >
                    {childRoute.children &&
                      childRoute.children.map((nestedRoute, nestedIndex) => (
                        <Route
                          key={nestedIndex}
                          path={nestedRoute.path}
                          element={nestedRoute.element}
                        />
                      ))}
                  </Route>
                ))}
            </Route>
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
