import "./App.css";
import "antd/dist/antd.css";
import Main from "./components/Main";
import SortedArray from "./components/SortedArray";
import UsersByTagProblem from "./components/UsersByTagProblem";
import UsersByTagFixed from "./components/UsersByTagFixed";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>TypeORM Tutorial</h1>
        <Main />
        <SortedArray />
        <UsersByTagProblem />
        <UsersByTagFixed />
      </div>
    </QueryClientProvider>
  );
}

export default App;
