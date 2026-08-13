import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom"
import Marketplace from "./pages/Marketplace.tsx"
import Community from "./pages/Community.tsx"
import MyCollection from "./pages/MyCollection.tsx"
import Navbar from "./components/layout/Navbar.tsx"
import ProductDetails from "./pages/ProductDetails.tsx"
import PostDetails from "./pages/PostDetails.tsx"

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Marketplace />}/> 

        {/* Marketplace */}
        <Route path="/marketplace" element={<Marketplace />} />

        {/* Marketplace Product Details */}
        <Route path="/marketplace/:id" element={<ProductDetails />} />

        {/* Community */}
        <Route path="/community" element={<Community />} />

        {/* Community Post Details */}
        <Route path="/community/:id" element={<PostDetails />} />
        
        {/* MyCollection */}
        <Route path="/collection" element={<MyCollection />} />

        {/* Unknown url  */}
        <Route path="*" element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
