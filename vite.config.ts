import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

  
// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }: any) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnvValues = {
    'process.env': Object.entries(env).reduce(
      (prev, [key, val]) => {
        return {
          ...prev,
          [key]: val,
        }
      },
      {},
    )
  }
  if (command === 'dev') {
    return{
      plugins: [
        react(),
        tsconfigPaths(),
    ].filter(Boolean),
      port:3000,
     define: processEnvValues 
      };
  } else {
    return {
      plugins: [
        react(),
        tsconfigPaths(),
    ].filter(Boolean),
      define: processEnvValues 
    };
  }
});