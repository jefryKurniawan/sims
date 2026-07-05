import { Head as InertiaHead } from '@inertiajs/inertia-react';

export const Head = ({ title, description, image, ...rest }) => {
  const fullTitle = title ? `${title} - Sekolahku` : 'Sekolahku';
  return (
    <>
      <title>{fullTitle}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      {description && <meta name="description" content={description} />}
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta name="twitter:image" content={image} />
        </>
      )}
      <InertiaHead {...rest} title={title} />
    </>
  );
};