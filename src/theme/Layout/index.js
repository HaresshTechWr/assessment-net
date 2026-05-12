import React from 'react';
import Layout from '@theme-original/Layout';
import HelpButton from '@site/src/components/HelpButton';

export default function LayoutWrapper(props) {
  return (
    <>
      <Layout {...props} />
      <HelpButton />
    </>
  );
}
