import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
	base: "/redux-toolkit-todos/",
	build: { outDir: "build" },
	plugins: [react()],
	resolve: {
		alias: {
			"~app": "/src/app",
			"~components": "/src/components",
			"~features": "/src/features",
			"~pages": "/src/pages",
			"~types": "/src/types",
			"~utils": "/src/utils"
		}
	}
});
