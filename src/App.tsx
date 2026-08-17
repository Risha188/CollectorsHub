import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Marketplace from "./pages/Marketplace.tsx";
import Community from "./pages/Community.tsx";
import MyCollection from "./pages/MyCollection.tsx";
import Navbar from "./components/layout/Navbar.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import PostDetails from "./pages/PostDetails.tsx";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-200 text-slate-900">

        {/* Navbar */}
        <div className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
          <Navbar />
        </div>

        {/* Main Application Area */}
        <main className="min-h-[calc(100vh-72px)]">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

            <Routes>

              {/* Home */}
              <Route
                path="/"
                element={<Marketplace />}
              />

              {/* Marketplace */}
              <Route
                path="/marketplace"
                element={<Marketplace />}
              />

              {/* Marketplace Product Details */}
              <Route
                path="/marketplace/:id"
                element={<ProductDetails />}
              />

              {/* Community */}
              <Route
                path="/community"
                element={<Community />}
              />

              {/* Community Post Details */}
              <Route
                path="/community/:id"
                element={<PostDetails />}
              />

              {/* My Collection */}
              <Route
                path="/collection"
                element={<MyCollection />}
              />

              {/* Unknown URL */}
              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />

            </Routes>

          </div>
        </main>

        {/* Simple Footer */}
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
            <p>© 2026 Collector's Hub. All rights reserved.</p>

            <p className="text-slate-400">
              Built for collectors, by collectors.
            </p>
          </div>
        </footer>

      </div>
    </BrowserRouter>
  );
};

export default App;