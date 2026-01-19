import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Tags, Plus, Search, Edit2, Trash2, Save, X } from 'lucide-react';
import ConfirmDialog from '../../components/ConfirmDialog';
import { useToast } from '../../context/ToastContext';

const AdminCategories = () => {
    const { success, error: toastError } = useToast();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Form state
    const [isEditing, setIsEditing] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ name: '', description: '' });
    const [showForm, setShowForm] = useState(false);

    // Confirm dialog state
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await api.get('/categories');
            setCategories(response.data);
        } catch (error) {
            console.error("Failed to fetch categories", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                const id = currentCategory.id || currentCategory._id;
                await api.put(`/categories/${id}`, currentCategory);
            } else {
                await api.post('/categories', currentCategory);
            }
            fetchCategories();
            resetForm();
            success("Kategori berhasil disimpan!");
        } catch (error) {
            console.error("Failed to save category", error);
            toastError("Gagal menyimpan kategori");
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/categories/${deleteId}`);
            fetchCategories();
            success("Kategori berhasil dihapus!");
        } catch (error) {
            console.error("Failed to delete category", error);
            toastError("Gagal menghapus kategori");
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setShowConfirm(true);
    };

    const startEdit = (category) => {
        setCurrentCategory(category);
        setIsEditing(true);
        setShowForm(true);
    };

    const resetForm = () => {
        setCurrentCategory({ name: '', description: '' });
        setIsEditing(false);
        setShowForm(false);
    };

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && !categories.length) return (
        <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-neutral-dark dark:text-white">Kategori</h1>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm"
                >
                    <Plus className="h-5 w-5" />
                    <span>Tambah Kategori</span>
                </button>
            </div>

            {/* Form Modal/Section */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-neutral-dark dark:text-white">
                                {isEditing ? 'Edit Kategori' : 'Tambah Kategori Baru'}
                            </h2>
                            <button onClick={resetForm} className="text-neutral-400 hover:text-red-500">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Nama Kategori</label>
                                <input
                                    type="text"
                                    required
                                    value={currentCategory.name}
                                    onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                                    className="w-full rounded-lg border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-dark dark:text-white focus:ring-primary"
                                    placeholder="Contoh: Baju Pria"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Deskripsi</label>
                                <textarea
                                    value={currentCategory.description || ''}
                                    onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                                    className="w-full rounded-lg border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-dark dark:text-white focus:ring-primary"
                                    rows="3"
                                    placeholder="Deskripsi singkat kategori..."
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={resetForm} className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-600 dark:text-neutral-400 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                                    Batal
                                </button>
                                <button type="submit" className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-800 overflow-hidden">
                <div className="p-4 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="relative max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-neutral-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Cari kategori..."
                            className="pl-10 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800 border-none rounded-lg w-full focus:ring-1 focus:ring-primary text-sm text-neutral-dark dark:text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-100 dark:divide-neutral-800">
                        <thead className="bg-neutral-50 dark:bg-neutral-800/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider">Nama Kategori</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider">Deskripsi</th>
                                <th className="px-6 py-3 text-right text-xs font-bold text-neutral-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-100 dark:divide-neutral-800">
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((cat) => (
                                    <tr key={cat.id || cat._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                                    <Tags className="h-5 w-5" />
                                                </div>
                                                <span className="font-bold text-neutral-900 dark:text-white capitalize">{cat.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-normal text-sm text-neutral-600 dark:text-neutral-400 max-w-xs">
                                            {cat.description || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => startEdit(cat)}
                                                className="text-neutral-400 hover:text-primary transition-colors mr-3"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => confirmDelete(cat.id || cat._id)}
                                                className="text-neutral-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-8 text-center text-neutral-500">
                                        {loading ? 'Memuat data...' : 'Tidak ada kategori ditemukan.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmDialog
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleDelete}
                title="Hapus Kategori?"
                message="Apakah Anda yakin ingin menghapus kategori ini? Tindakan ini tidak dapat dibatalkan."
                confirmText="Ya, Hapus"
                cancelText="Batal"
                type="danger"
            />
        </div>
    );
};

export default AdminCategories;
