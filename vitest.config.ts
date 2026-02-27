import { configDefaults, defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    reporters: ["junit", "default"],
    outputFile: "./test-reports/vitest-junit.xml",
    exclude: [...configDefaults.exclude, "**/tests/**"],
  },
});
