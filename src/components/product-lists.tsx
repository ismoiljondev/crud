// src/components/ProductList.tsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { setData } from '../utils/localStorage';
import { Product } from '@/types/products';
import { Button } from './ui/button';
import ConfirmationDialog from './confirmation-modal';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

interface ProductListProps {
    products: Product[];
    refreshProducts: () => void;
    onEditProduct: (product: Product) => void;
    selectedCategory: string;
}

const ProductList: React.FC<ProductListProps> = ({
    products,
    refreshProducts,
    onEditProduct,
    selectedCategory,
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const filteredProducts = selectedCategory
        ? products.filter((product) => product.category === selectedCategory)
        : products;

    const handleDelete = (id: number) => {
        const filteredProducts = products.filter((product) => product.id !== id);
        setData('products', filteredProducts);
        refreshProducts();
        toast.success('Product deleted successfully!');
        setIsDialogOpen(false);
    };

    const openDialog = (product: Product) => {
        setProductToDelete(product);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setProductToDelete(null);
        setIsDialogOpen(false);
    };

    return (
        <div className="grid grid-cols-4 gap-2 max-md:grid-cols-3 max-sm:grid-cols-2 max-[450px]:grid-cols-1">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <Sheet key={product.id}>
                        <SheetTrigger className="text-start">
                            <div className="p-4 border border-gray-300 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold">{product.title}</h3>
                                <p className="text-gray-600">Price: ${product.price}</p>
                                <p className="text-gray-600">Category: {product.category}</p>
                                <p className="text-gray-600 truncate">Description: {product.description}</p>
                                <div className="flex space-x-2 mt-2">
                                    <Button
                                        variant="destructive"
                                        onClick={() => openDialog(product)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="default"
                                        onClick={() => onEditProduct(product)}
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>{product.title}</SheetTitle>
                                <SheetDescription>
                                    <p className="text-gray-600">Price: ${product.price}</p>
                                    <p className="text-gray-600">Category: {product.category}</p>
                                    <p className="text-gray-600 truncate">Description: {product.description}</p>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                ))
            ) : (
                <p className="text-gray-500">No products available.</p>
            )}
            <ConfirmationDialog
                isOpen={isDialogOpen}
                title="Confirm Deletion"
                description={`Are you sure you want to delete "${productToDelete?.title || ''}"? This action cannot be undone.`}
                onConfirm={() => productToDelete && handleDelete(productToDelete.id)}
                onCancel={closeDialog}
            />
        </div>
    );
};

export default ProductList;
