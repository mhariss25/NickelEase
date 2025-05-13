import { SideNavContextProvider } from "@/component/sidenav/expandContext";
import { ThemeProvider } from "@/component/navbar/themeContext";
import "@/styles/globals.css";
import "rsuite/dist/rsuite.min.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <SideNavContextProvider>
        <Component {...pageProps} />
      </SideNavContextProvider>
    </ThemeProvider>
  );
}
