import dotenv from 'dotenv';
import { defineConfig } from 'tsup';
dotenv.config();

export default defineConfig({
  name: 'tsup',
  target: 'node20',
  dts: {
    resolve: true,
    entry: './src/app.ts',
  },
  replaceNodeEnv: true,
  env: {
    ACCESS_TOKEN:"APP_USR-8811805574601417-090307-fbb580e089a51cc26f20f21bc6a17c92-1961866566",
    PORT:'5000'
  },
});
