import React, { useState } from 'react';
import ProductFormDialog from './product-form-dialog';
import { Button } from './ui/button';

interface NavbarProps {
    onAddProduct: () => void;
    selectedCategory: string;
}

const Navbar: React.FC<NavbarProps> = ({ onAddProduct }) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const handleOpenDialog = () => setIsDialogOpen(true);
    const handleCloseDialog = () => setIsDialogOpen(false);

    return (
        <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
            <h1 className="text-xl font-bold">Product Manager</h1>
            <Button onClick={handleOpenDialog} variant="default">
                Add Product
            </Button>

            <ProductFormDialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                onProductAdded={onAddProduct}
            />
        </nav>
    );
};

export default Navbar;
