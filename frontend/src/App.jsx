import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home';
import Layout from "./components/Layout";
import Story from "./components/Story";
import Write from "./components/Write";
import Nopage from "./components/Nopage";

const App = () => {
    
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="*" element={<Nopage />} />
              <Route path="story/:id" element={<Story />} />
              <Route path="/write" element={<Write />} />
            </Route>
          </Routes>
        </BrowserRouter>
    );
}

export default App;