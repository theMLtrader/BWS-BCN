import React from 'react';
import { Helmet } from 'react-helmet';

type SEO = {
  title: string;
  description: string;
};

export const SEO: React.FC<SEO> = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};
