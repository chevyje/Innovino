// import LoginPage from "./loginPagina/login.tsx";

// function App() {
//   return (
//     <>
//       <LoginPage />
//     </>
//   )
// }

// export default App
import LoginPage from './loginPagina/login';
import ProductOverview from './productOverview/ProductOverview';

function App() {
    const isProductsPage = window.location.pathname.startsWith('/products');

    return isProductsPage ? <ProductOverview /> : <LoginPage />;
}

export default App;
