import { createBrowserRouter } from "react-router-dom";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { DonateFood } from "./components/DonateFood";
import { BrowseFood } from "./components/BrowseFood";
import { HowItWorks } from "./components/HowItWorks";
import { VendorAuth }  from "./components/VendorAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "donate", Component: DonateFood },
      { path: "browse", Component: BrowseFood },
      { path: "how-it-works", Component: HowItWorks },
      { path: "login",        Component: VendorAuth },
    ],
  },
]);
