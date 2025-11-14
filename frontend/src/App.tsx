import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestPage from "./testPage/test.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/test" element={<TestPage />} />
            </Routes>
            {/*<LoginPage />*/}
        </BrowserRouter>
    );
}

export default App;
