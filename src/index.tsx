import { createTheme, ThemeProvider } from "@mui/material";
import { createRoot } from "react-dom/client";
import { blue } from "@mui/material/colors";
import { Provider } from "react-redux";
import { store } from "~app/store.ts";
import { StrictMode } from "react";
import { App } from "./App";
import "./index.css";

const theme = createTheme({
	palette: {
		primary: blue
	}
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</StrictMode>
);
