import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestPage from "./testPage/test.tsx";
import LoginPage from "./loginPagina/login.tsx"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/test" element={<TestPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
