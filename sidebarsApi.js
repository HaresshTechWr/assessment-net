// @ts-check
import generatedSidebar from './api-reference/sidebar.ts';

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  apiSidebar: [
    {type: 'doc', id: 'overview', label: 'Overview'},
    ...generatedSidebar,
    {type: 'doc', id: 'error-codes', label: 'Error Codes'},
  ],
};

export default sidebars;
