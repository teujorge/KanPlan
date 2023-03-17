import { AppContext, Pages } from "./_app";
import { useContext } from "react";

export default function Home() {
  const { setPage } = useContext(AppContext);
  setPage(Pages.index);

  return <div>WORKSPACE PAGE</div>;
}
