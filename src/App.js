import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import LinkedList from "./pages/LinkedList";
import Trees from "./pages/Trees";
import Sort2 from "./pages/Sort2";

function App() {
  return (
    <div className="App">
      <div className="scrolling-text">DATA STRUCTURES - ALGORITHMS - SORTING - LINKED LIST - BINARY SEARCH TREE - MERGE SORT - QUICK SORT - HEAP SORT - REVERSE LINKED LIST - DEPTH FIRST TRAVERSAL - BREADTH FIRST TRAVERSAL</div>
      <Router>
      <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sort" element={<Sort2 />} />
          <Route path="/linked-list" element={<LinkedList />} />
          <Route path="/trees" element={<Trees />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
