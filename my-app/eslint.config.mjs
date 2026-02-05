import "@rushstack/eslint-patch/modern-module-resolution";
import nextConfig from "eslint-config-next";
import coreWebVitals from "eslint-config-next/core-web-vitals.js";
import typescript from "eslint-config-next/typescript.js";

export default [...nextConfig, ...coreWebVitals, ...typescript];
