import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Package, Search, AlertCircle, RefreshCw } from 'lucide-react';

const AdminStock = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Failed to fetch products for stock", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-neutral-dark dark:text-white">Manajemen Stok</h1>
                <button className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors shadow-sm">
                    <RefreshCw className="h-4 w-4" />
                    <span>Refresh Data</span>
                </button>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-800 overflow-hidden">
                <div className="p-4 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="relative max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-neutral-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Cari produk..."
                            className="pl-10 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800 border-none rounded-lg w-full focus:ring-1 focus:ring-primary text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-100 dark:divide-neutral-800">
                        <thead className="bg-neutral-50 dark:bg-neutral-800/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider">Produk</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider">Varian (Size)</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider">Stok Tersedia</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-100 dark:divide-neutral-800">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            {product.imageUrl ? (
                                                <img className="h-10 w-10 rounded-lg object-cover bg-neutral-100" src={product.imageUrl} alt="" />
                                            ) : (
                                                <div className="h-10 w-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400">
                                                    <Package className="h-5 w-5" />
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-bold text-neutral-900 dark:text-white">{product.name}</div>
                                                <div className="text-xs text-neutral-500">SKU: {product.id.slice(-6).toUpperCase()}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex gap-1">
                                            {product.sizes?.map(size => (
                                                <span key={size} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                                                    {size}
                                                </span>
                                            ))}
                                            {(!product.sizes || product.sizes.length === 0) && <span className="text-neutral-400 text-sm">-</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className={product.stock < 10 ? "text-red-500 font-bold" : "text-neutral-700 dark:text-neutral-300"}>
                                                {product.stock}
                                            </span>
                                            {product.stock < 10 && <AlertCircle className="h-4 w-4 text-red-500" />}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {product.stock > 0 ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                In Stock
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                                                Out of Stock
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminStock;
