import { AppContext, Pages } from "./_app";
import { useContext } from "react";

export default function Settings() {
  const { setPage } = useContext(AppContext);
  setPage(Pages.settings);

  return <div>SETTINGS PAGE</div>;
}
