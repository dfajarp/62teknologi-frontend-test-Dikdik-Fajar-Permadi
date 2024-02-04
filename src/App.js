import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Detail, Search } from "./pages";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
