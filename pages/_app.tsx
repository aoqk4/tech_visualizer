//pages/_app.tsx
import "../styles/globals.css";
import App, { AppContext, AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
