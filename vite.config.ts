import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import tsconfig from './tsconfig.json';

const SRC_PATH = path.resolve(__dirname, 'src');

const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
  const aliases: Record<string, string> = {};

  Object.entries(paths).forEach(([alias, paths]) => {
    const aliasPath = paths[0].replace('*', '');
    aliases[alias.replace('/*', '')] = path.join(SRC_PATH, aliasPath);
  });

  return aliases;
};

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },
});
