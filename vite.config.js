import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import strip from 'vite-plugin-strip';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    // strip({
    //   include: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
    //   functions: ['console.log', 'console.debug', 'console.warn', 'console.info', 'debugger'],
    // }),
  ],
});
