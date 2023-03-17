import { AppContext, Pages } from "./_app";
import { useContext } from "react";

export default function Workspace() {
  const { setPage } = useContext(AppContext);
  setPage(Pages.workspace);

  return <div>WORKSPACE PAGE</div>;
}
