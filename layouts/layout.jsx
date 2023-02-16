import Meta from "./meta";
import Logo from "./logo";
import Background from "./background";

import dynamic from "next/dynamic";
import { Box, Main } from "./styles";

const FootNavbar = dynamic(() => import('./navbar'), { ssr: false })

const Sidebar = dynamic(() => import('./sidebar'), { ssr: false })

export const Layout = ({ children }) => (
  <>
    <Meta />
    <Box>
      <Background />
      <Logo />
      <Sidebar />
      <FootNavbar />
      <Main>
        {children}
      </Main>
    </Box>
  </>
)
