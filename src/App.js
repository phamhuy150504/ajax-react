import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodilistClass from "./components/Ajax-react/TodilistClass";
import TodolisFun from "./components/Ajax-react/TodolisFun";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}></Route>
        <Route path="ajax-class" element={<TodilistClass />} />
        <Route path="ajax-fun" element={<TodolisFun />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
