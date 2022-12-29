import Head from "next/head";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = context.req.cookies;
  if (cookie.accessToken !== undefined) {
    return {
      props: {
        accessToken: cookie.accessToken,
        refreshToken: cookie.refreshToken,
      },
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
};
export default function Home() {
  return (
    <>
      <Head>
        <title>Ecommerce</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
