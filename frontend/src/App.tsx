// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import TestPage from "./testPage/test.tsx";
// import LoginPage from "./loginPagina/login.tsx"

// function App() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<LoginPage />} />
//                 <Route path="/test" element={<TestPage />} />
//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default App;
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import LoginPage from "./loginPagina/login.tsx";
// import TestPage from "./testPage/test.tsx";
// import ProductOverview from "./products/ProductOverview";
// import ProductDetail from "./products/ProductDetail";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/products" element={<ProductOverview sessionId="" />} />
//         <Route path="/products/:id" element={<ProductDetail sessionId="" />} />
//         <Route path="/test" element={<TestPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
import { BrowserRouter, Route, Routes, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCookie } from "./utils/cookies";
import LoginPage from "./loginPagina/login.tsx";
import TestPage from "./testPage/test.tsx";
import ProductOverview from "./products/ProductOverview";
import ProductDetail from "./products/ProductDetail";
import CartPage from "./cart/CartPage";

function ProductDetailRoute({ sessionId }: { sessionId: string }) {
  const { id } = useParams();
  const productId = Number(id);
  if (Number.isNaN(productId)) {
    return <p>Ongeldig product</p>;
  }
  return <ProductDetail productId={productId} sessionId={sessionId} />;
}

function AppRoutes() {
  const [sessionId, setSessionId] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    setSessionId(getCookie("session_id") ?? "");
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/products" element={<ProductOverview sessionId={sessionId} />} />
      <Route path="/products/:id" element={<ProductDetailRoute sessionId={sessionId} />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}


