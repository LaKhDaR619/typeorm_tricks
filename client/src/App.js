import "./App.css";
import "antd/dist/antd.css";
import Main from "./components/Main";
import SortedArray from "./components/SortedArray";
import UsersByTagProblem from "./components/UsersByTagProblem";
import UsersByTagFixed from "./components/UsersByTagFixed";

function App() {
  return (
    <div className="App">
      <h1>TypeORM Tutorial</h1>
      <Main />
      <SortedArray />
      <UsersByTagProblem />
      <UsersByTagFixed />
    </div>
  );
}

export default App;
