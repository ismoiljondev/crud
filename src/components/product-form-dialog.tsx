import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { setData, getData } from '../utils/localStorage';
import toast from 'react-hot-toast';
import { Product } from '@/types/products';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface ProductFormDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onProductAdded: () => void;
    productToEdit?: Product | null;
}

const ProductFormDialog: React.FC<ProductFormDialogProps> = ({
    isOpen,
    onClose,
    onProductAdded,
    productToEdit,
}) => {
    const {
        control,
        handleSubmit,
        reset,
    } = useForm();

    useEffect(() => {
        if (productToEdit) {
            reset({
                title: productToEdit.title,
                price: productToEdit.price.toString(),
                category: productToEdit.category,
                description: productToEdit.description,
            });
        }
    }, [productToEdit, reset]);

    const onSubmit = (data: any) => {
        const { title, price, category, description } = data;

        if (!title || !price || !category || !description) {
            toast.error('Please fill in all fields!');
            return;
        }

        const products = getData<Product>('products') || [];

        if (productToEdit) {
            const updatedProducts = products.map((product) =>
                product.id === productToEdit.id
                    ? { ...product, title, price: parseFloat(price), category, description }
                    : product
            );
            setData('products', updatedProducts);
            toast.success('Product updated successfully!');
        } else {
            const newProduct = {
                id: Date.now(),
                title,
                price: parseFloat(price),
                category,
                description,
            };
            setData('products', [...products, newProduct]);
            toast.success('Product added successfully!');
        }

        onProductAdded();
        onClose();
        reset();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{productToEdit ? 'Edit Product' : 'Add Product'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Controller
                            name="title"
                            control={control}
                            rules={{ required: 'Title is required' }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="title"
                                    placeholder="Product title"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <Controller
                            name="price"
                            control={control}
                            rules={{ required: 'Price is required' }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="price"
                                    placeholder="Product price"
                                    type="number"
                                />
                            )}
                        />
                    </div>

                    <div>
                        <Controller
                            name="category"
                            control={control}
                            rules={{ required: 'Category is required' }}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    id="category"
                                    className="w-full p-2 border border-gray-300 rounded"
                                >
                                    <option value="">Select Category</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="fashion">Fashion</option>
                                    <option value="home">Home</option>
                                </select>
                            )}
                        />
                    </div>

                    <div>
                        <Controller
                            name="description"
                            control={control}
                            rules={{ required: 'Description is required' }}
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    id="description"
                                    placeholder="Product description"
                                />
                            )}
                        />
                    </div>

                    <DialogFooter>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="default" type="submit">
                            {productToEdit ? 'Update Product' : 'Add Product'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ProductFormDialog;
