import '../styles/globals.css';
import { Provider, UseHydrate } from './store';
import Layout from './layout';

function MyApp({ Component, pageProps }) {
  const store = () => UseHydrate(pageProps.initialZustandState);

  return (
    <Provider createStore={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
