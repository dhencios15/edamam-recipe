import React from "react";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";

import { Layout } from "@components/Layout";
import { store } from "@redux-store/store";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <>
      <Head>
        <title>EDA Recipe</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <NextNProgress color='#17e67b' />
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
          colors: {
            green: [
              "#ddfff1",
              "#b0ffda",
              "#80ffc3",
              "#50ffac",
              "#28ff94",
              "#17e67b",
              "#0ab35f",
              "#008043",
              "#004d27",
              "#001b09",
            ],
            gray: [
              "#f8f0f2",
              "#d9d9d9",
              "#bfbfbf",
              "#a6a6a6",
              "#8c8c8c",
              "#737373",
              "#595959",
              "#404040",
              "#262626",
              "#120b0d",
            ],
            yellow: [
              "#fffada",
              "#ffefad",
              "#ffe57d",
              "#ffdb4b",
              "#ffd01a",
              "#e6b700",
              "#b38e00",
              "#806500",
              "#4e3d00",
              "#1d1400",
            ],
            "deep-white": [
              "#f8f0f2",
              "#d9d9d9",
              "#bfbfbf",
              "#a6a6a6",
              "#8c8c8c",
              "#737373",
              "#595959",
              "#404040",
              "#262626",
              "#120b0d",
            ],
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
}
