const lintStagedConfig = {
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],
  '*.{json,css,md,mdx}': ['prettier --write'],
};

export default lintStagedConfig;
