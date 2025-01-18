// src/App.tsx
import React, { useState, useEffect } from 'react';
import { getData } from './utils/localStorage';
import Navbar from './components/navbar';
import ProductList from './components/product-lists';
import ProductFormDialog from './components/product-form-dialog';
import { Product } from './types/products';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const loadProducts = () => {
    const storedProducts = getData<Product>('products') || [];
    setProducts(storedProducts);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        onAddProduct={loadProducts}
        selectedCategory={selectedCategory}
      />
      <div className="container mx-auto p-4 flex flex-col gap-3">
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
          </select>
        </div>
        <ProductList
          products={products}
          refreshProducts={loadProducts}
          onEditProduct={handleEditProduct}
          selectedCategory={selectedCategory} // Pass selectedCategory to ProductList
        />
        {selectedProduct && (
          <ProductFormDialog
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onProductAdded={loadProducts}
            productToEdit={selectedProduct}
          />
        )}
      </div>
    </div>
  );
};

export default App;
