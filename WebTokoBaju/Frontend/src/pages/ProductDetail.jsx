import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
                if (data.sizes && data.sizes.length > 0) {
                    setSelectedSize(data.sizes[0]);
                }
            } catch (err) {
                setError("Produk tidak ditemukan");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Pilih ukuran terlebih dahulu!");
            return;
        }
        addToCart(product, selectedSize);
        alert("Produk berhasil ditambahkan ke keranjang!");
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    if (error || !product) return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{error || "Produk tidak ditemukan"}</h2>
            <button onClick={() => navigate('/')} className="text-blue-600 hover:underline flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda
            </button>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button onClick={() => navigate('/')} className="mb-8 text-gray-500 hover:text-blue-600 flex items-center transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Section */}
                <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Info Section */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                        <p className="text-gray-500 text-lg">{product.category}</p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-3xl font-bold text-blue-600">
                            Rp {product.price.toLocaleString('id-ID')}
                        </span>
                        <div className="flex items-center text-yellow-400">
                            <Star className="fill-current h-5 w-5" />
                            <span className="ml-1 text-gray-600 font-medium">4.8 (120 Ulasan)</span>
                        </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-lg">
                        {product.description}
                    </p>

                    {/* Size Selector */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-4">Pilih Ukuran</h3>
                        <div className="flex space-x-4">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-12 h-12 rounded-lg flex items-center justify-center font-medium transition-all ${selectedSize === size
                                            ? 'bg-blue-600 text-white shadow-lg scale-110'
                                            : 'bg-white border hover:border-blue-600 text-gray-700'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-6">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center shadow-lg hover:shadow-blue-500/30"
                        >
                            <ShoppingCart className="mr-2 h-6 w-6" />
                            Tambah ke Keranjang
                        </button>
                    </div>

                    {/* Additional Info */}
                    <div className="border-t pt-6 space-y-3 text-sm text-gray-500">
                        <p className="flex items-center">
                            <span className="w-32 font-medium text-gray-700">Pengiriman:</span> Tersedia seluruh Indonesia
                        </p>
                        <p className="flex items-center">
                            <span className="w-32 font-medium text-gray-700">Jaminan:</span> 100% Original
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
