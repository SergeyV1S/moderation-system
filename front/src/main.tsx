import { createRoot } from "react-dom/client";

import "@mantine/carousel/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { Providers } from "./providers";

const init = () => {
  const container = document.querySelector("#root")!;

  const rootElement = createRoot(container);

  rootElement.render(<Providers />);
};

init();
