//pages/_app.tsx
import "../styles/globals.css";
import App, { AppContext, AppProps } from "next/app";
import { Provider } from "react-redux/";
import configureStore from "../store/configureStore";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = configureStore();

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
