import Head from "next/head";

interface Props {
  title: string;
  description: string;
}

export const Seo = ({ title, description }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Produits cosmétiques à base de plantes de Madagascar"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700&family=Poppins:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <link rel="icon" href="/assets/favicon_io/android-chrome-192x192.png" />
    </Head>
  );
};
