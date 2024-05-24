import { RecoilRoot } from "recoil";
import "./App.css";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <RecoilRoot>
        <HomePage />
      </RecoilRoot>
    </>
  );
}

export default App;
