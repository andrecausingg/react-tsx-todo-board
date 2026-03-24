// React
import { Outlet } from "react-router-dom";

// Mantine
import { AppShell, Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const GuestLayout: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <AppShell
        footer={{ height: 60 }}
        navbar={undefined}
        padding={isMobile ? "" : ""}
      >
        {/* Main */}
        <AppShell.Main>
          <Container size="xl"  h="100%">
            <Outlet />
          </Container>
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default GuestLayout;
