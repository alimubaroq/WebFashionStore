import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { ShoppingBag, Search, Filter, Plus, Check } from 'lucide-react';

const DashboardShop = () => {
    const { addToCart, cartItems } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState([]);
    const [addedItems, setAddedItems] = useState({});

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            const data = response.data.map(p => ({
                ...p,
                image: p.imageUrl || 'https://via.placeholder.com/400x500?text=No+Image'
            }));
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories');
            setCategories(response.data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    const handleAddToCart = (product) => {
        const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'M';
        addToCart(product, defaultSize);

        // Show "Added" animation
        setAddedItems(prev => ({ ...prev, [product.id]: true }));
        setTimeout(() => {
            setAddedItems(prev => ({ ...prev, [product.id]: false }));
        }, 1500);
    };

    const isInCart = (productId) => {
        return cartItems.some(item => item.id === productId);
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) return (
        <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-neutral-dark dark:text-white mb-2">Belanja</h1>
                <p className="text-neutral-500 dark:text-neutral-400">Temukan produk fashion terbaru untuk Anda</p>
            </div>

            {/* Search & Filter */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-800 p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-neutral-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Cari produk..."
                            className="pl-10 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800 border-none rounded-lg w-full focus:ring-1 focus:ring-primary text-sm text-neutral-dark dark:text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="h-5 w-5 text-neutral-400" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="bg-neutral-50 dark:bg-neutral-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary text-neutral-dark dark:text-white"
                        >
                            <option value="All">Semua Kategori</option>
                            {categories.map((cat) => (
                                <option key={cat.id || cat._id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-800 overflow-hidden hover:shadow-md transition-shadow group"
                    >
                        <Link to={`/products/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 left-3">
                                <span className="px-3 py-1 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-full text-xs font-bold text-neutral-700 dark:text-neutral-300">
                                    {product.category}
                                </span>
                            </div>
                        </Link>
                        <div className="p-4">
                            <Link to={`/products/${product.id}`}>
                                <h3 className="font-bold text-neutral-900 dark:text-white mb-1 hover:text-primary transition-colors line-clamp-1">
                                    {product.name}
                                </h3>
                            </Link>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3 line-clamp-2">
                                {product.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-primary">
                                    Rp {product.price.toLocaleString('id-ID')}
                                </span>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    disabled={addedItems[product.id]}
                                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${addedItems[product.id]
                                            ? 'bg-green-500 text-white'
                                            : isInCart(product.id)
                                                ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                                                : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30'
                                        }`}
                                >
                                    {addedItems[product.id] ? (
                                        <>
                                            <Check className="h-4 w-4" />
                                            <span>Ditambahkan</span>
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="h-4 w-4" />
                                            <span>Keranjang</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-12 text-neutral-500">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p>Tidak ada produk ditemukan.</p>
                </div>
            )}
        </div>
    );
};

export default DashboardShop;
