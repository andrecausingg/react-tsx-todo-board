// React
import { Outlet } from "react-router-dom";

// Mantine
import { AppShell, Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const GuestLayout: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <AppShell navbar={undefined} padding={isMobile ? "" : ""}>
        {/* Main */}
        <AppShell.Main>
          <Container size="xl">
            <Outlet />
          </Container>
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default GuestLayout;
