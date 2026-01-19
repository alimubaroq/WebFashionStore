import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const AdminProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { success, error: toastError } = useToast();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: 0,
        description: '',
        imageUrl: '',
        sizes: '' // Comma separated for input
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditMode);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (isEditMode) {
            const fetchProduct = async () => {
                try {
                    const response = await api.get(`/products/${id}`);
                    const product = response.data;
                    setFormData({
                        name: product.name,
                        category: product.category,
                        price: product.price,
                        stock: product.stock || 0,
                        description: product.description,
                        imageUrl: product.imageUrl,
                        sizes: product.sizes.join(', ')
                    });
                } catch (error) {
                    console.error("Failed to fetch product:", error);
                    alert("Gagal mengambil data produk");
                    navigate('/admin/products');
                } finally {
                    setFetching(false);
                }
            };
            fetchProduct();
        }
    }, [id, isEditMode, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            sizes: formData.sizes.split(',').map(s => s.trim()).filter(s => s !== '')
        };

        if (isEditMode) {
            payload.id = id;
        }

        try {
            if (isEditMode) {
                await api.put(`/products/${id}`, payload);
                success("Produk berhasil diperbarui!");
            } else {
                await api.post('/products', payload);
                success("Produk berhasil ditambahkan!");
            }
            navigate('/admin/products');
        } catch (error) {
            console.error("Failed to save product:", error);
            toastError("Gagal menyimpan produk: " + (error.response?.data?.message || "Terjadi kesalahan"));
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return (
        <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto">
            <button onClick={() => navigate('/admin/products')} className="mb-6 text-gray-500 hover:text-blue-600 flex items-center transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
            </button>

            <div className="bg-white rounded-xl shadow-sm border p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">{isEditMode ? 'Edit Produk' : 'Tambah Produk Baru'}</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                        <input
                            type="text"
                            required
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 border"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                            <select
                                required
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 border bg-white"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="">Pilih Kategori</option>
                                {categories.map((cat) => (
                                    <option key={cat.id || cat._id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {categories.length === 0 && (
                                <p className="text-xs text-red-500 mt-1">Belum ada kategori. Silakan buat kategori dulu.</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                            <input
                                type="number"
                                required
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 border"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
                            <input
                                type="number"
                                required
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 border"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                        <textarea
                            required
                            rows="4"
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 border"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
                        <input
                            type="url"
                            required
                            placeholder="https://example.com/image.jpg"
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 border"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        />
                        <p className="text-xs text-gray-500 mt-1">Masukkan URL gambar langsung (akhiran .jpg, .png, dll).</p>
                        {formData.imageUrl && (
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                                <div className="h-48 w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                    <img
                                        src={formData.imageUrl}
                                        alt="Preview"
                                        className="h-full w-full object-contain"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/400x300?text=Gambar+Rusak';
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ukuran (Pisahkan dengan koma)</label>
                        <input
                            type="text"
                            required
                            placeholder="S, M, L, XL"
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 border"
                            value={formData.sizes}
                            onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70"
                        >
                            <Save className="mr-2 h-5 w-5" />
                            {loading ? 'Menyimpan...' : 'Simpan Produk'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminProductForm;
