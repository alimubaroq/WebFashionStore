import React, { useState, useEffect } from 'react';
import { Percent, Calendar, Plus, AlertCircle, Edit2, Trash2, X, Save } from 'lucide-react';
import api from '../../services/api';
import ConfirmDialog from '../../components/ConfirmDialog';
import { useToast } from '../../context/ToastContext';

const AdminPromos = () => {
    const { success, error: toastError } = useToast();
    const [promos, setPromos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPromo, setCurrentPromo] = useState({
        code: '',
        name: '',
        description: '',
        discountType: 'Percentage',
        discountValue: 0,
        minPurchase: 0,
        maxDiscount: null,
        startDate: new Date().toISOString().slice(0, 16),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
        usageLimit: null,
        isActive: true
    });

    // Confirm dialog state
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchPromos();
    }, []);

    const fetchPromos = async () => {
        try {
            const response = await api.get('/promos');
            setPromos(response.data);
        } catch (error) {
            console.error("Failed to fetch promos:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const promoData = {
                code: currentPromo.code,
                name: currentPromo.name,
                description: currentPromo.description,
                discountType: currentPromo.discountType,
                discountValue: parseFloat(currentPromo.discountValue),
                minPurchase: parseFloat(currentPromo.minPurchase),
                maxDiscount: currentPromo.maxDiscount ? parseFloat(currentPromo.maxDiscount) : null,
                usageLimit: currentPromo.usageLimit ? parseInt(currentPromo.usageLimit) : null,
                startDate: new Date(currentPromo.startDate).toISOString(),
                endDate: new Date(currentPromo.endDate).toISOString(),
                isActive: currentPromo.isActive
            };

            console.log("Sending promo data:", promoData);

            if (isEditing) {
                const id = currentPromo.id || currentPromo._id;
                await api.put(`/promos/${id}`, promoData);
            } else {
                await api.post('/promos', promoData);
            }
            fetchPromos();
            resetForm();
            success("Promo berhasil disimpan!");
        } catch (err) {
            console.error("Failed to save promo - Full Error:", err);
            toastError(err.response?.data?.message || err.message || "Gagal menyimpan promo");
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/promos/${deleteId}`);
            fetchPromos();
            success("Promo berhasil dihapus!");
        } catch (err) {
            console.error("Failed to delete promo:", err);
            toastError("Gagal menghapus promo");
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setShowConfirm(true);
    };

    const startEdit = (promo) => {
        setCurrentPromo({
            ...promo,
            startDate: new Date(promo.startDate).toISOString().slice(0, 16),
            endDate: new Date(promo.endDate).toISOString().slice(0, 16),
            maxDiscount: promo.maxDiscount || '',
            usageLimit: promo.usageLimit || ''
        });
        setIsEditing(true);
        setShowForm(true);
    };

    const resetForm = () => {
        setCurrentPromo({
            code: '',
            name: '',
            description: '',
            discountType: 'Percentage',
            discountValue: 0,
            minPurchase: 0,
            maxDiscount: null,
            startDate: new Date().toISOString().slice(0, 16),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
            usageLimit: null,
            isActive: true
        });
        setIsEditing(false);
        setShowForm(false);
    };

    const getPromoStatus = (promo) => {
        const now = new Date();
        const start = new Date(promo.startDate);
        const end = new Date(promo.endDate);

        if (!promo.isActive) return { label: 'Nonaktif', color: 'bg-neutral-100 text-neutral-600' };
        if (now < start) return { label: 'Terjadwal', color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' };
        if (now > end) return { label: 'Expired', color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' };
        return { label: 'Aktif', color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' };
    };

    if (loading) return (
        <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-neutral-dark dark:text-white">Promo & Diskon</h1>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm"
                >
                    <Plus className="h-5 w-5" />
                    <span>Buat Promo Baru</span>
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center sticky top-0 bg-white dark:bg-neutral-900 z-10">
                            <h2 className="text-lg font-bold text-neutral-dark dark:text-white">
                                {isEditing ? 'Edit Promo' : 'Buat Promo Baru'}
                            </h2>
                            <button onClick={resetForm} className="text-neutral-400 hover:text-red-500">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Kode Promo</label>
                                    <input
                                        type="text"
                                        required
                                        value={currentPromo.code}
                                        onChange={(e) => setCurrentPromo({ ...currentPromo, code: e.target.value.toUpperCase() })}
                                        className="w-full rounded-lg border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-dark dark:text-white uppercase"
                                        placeholder="NEWYEAR2025"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Nama Promo</label>
                                    <input
                                        type="text"
                                        required
                                        value={currentPromo.name}
                                        onChange={(e) => setCurrentPromo({ ...currentPromo, name: e.target.value })}
                                        className="w-full rounded-lg border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-dark dark:text-white"
                                        placeholder="Flash Sale Tahun Baru"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Deskripsi</label>
                                <textarea
                                    value={currentPromo.description || ''}
                                    onChange={(e) => setCurrentPromo({ ...currentPromo, description: e.target.value })}
                                    className="w-full rounded-lg border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-dark dark:text-white"
                                    rows="2"
                                    placeholder="Deskripsi promo..."
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Tipe Diskon</label>
                                    <select
                                        value={currentPromo.discountType}
                                        onChange={(e) => setCurrentPromo({ ...currentPromo, discountType: e.target.value })}
                                        className="w-full rounded-lg border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-dark dark:text-white"
                                    >
                                        <option value="Percentage">Persentase (%)</option>
                                        <option value="Fixed">Nominal (Rp)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                                        Nilai Diskon {currentPromo.discountType === 'Percentage' ? '(%)' : '(Rp)'}
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        step="any"
                                        value={currentPromo.discountValue}
                                        onChange={(e) => setCurrentPromo({ ...currentPromo, discountValue: e.target.value })}
                                        className="w-full rounded-lg border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-dark dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Max Diskon (Rp)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={currentPromo.maxDiscount || ''}
                                        onChange={(e) => setCurrentPromo({ ...currentPromo, maxDiscount: e.target.value })}
                                        className="w-full rounded-lg border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-dark dark:text-white"
                                        placeholder="Opsional"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Min. Pembelian (Rp)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={currentPromo.minPurchase}
                                        onChange={(e) => setCurrentPromo({ ...currentPromo, minPurchase: e.target.value })}
                                        className="w-full rounded-lg border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-dark dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Batas Penggunaan</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={currentPromo.usageLimit || ''}
                                        onChange={(e) => setCurrentPromo({ ...currentPromo, usageLimit: e.target.value })}
                                        className="w-full rounded-lg border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-dark dark:text-white"
                                        placeholder="Unlimited"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Tanggal Mulai</label>
                                    <input
                                        type="datetime-local"
                                        required
                                        value={currentPromo.startDate}
                                        onChange={(e) => setCurrentPromo({ ...currentPromo, startDate: e.target.value })}
                                        className="w-full rounded-lg border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-dark dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Tanggal Berakhir</label>
                                    <input
                                        type="datetime-local"
                                        required
                                        value={currentPromo.endDate}
                                        onChange={(e) => setCurrentPromo({ ...currentPromo, endDate: e.target.value })}
                                        className="w-full rounded-lg border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-dark dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={currentPromo.isActive}
                                    onChange={(e) => setCurrentPromo({ ...currentPromo, isActive: e.target.checked })}
                                    className="rounded border-neutral-300 text-primary focus:ring-primary"
                                />
                                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Aktifkan promo</label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={resetForm} className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-600 dark:text-neutral-400 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                                    Batal
                                </button>
                                <button type="submit" className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
                                    <Save className="inline h-4 w-4 mr-2" />
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Promo Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promos.map((promo) => {
                    const status = getPromoStatus(promo);
                    return (
                        <div key={promo.id || promo._id} className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-800 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 p-4 text-neutral-100 dark:text-neutral-800 opacity-50">
                                <Percent className="h-24 w-24" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${status.color}`}>
                                        {status.label}
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => startEdit(promo)} className="text-neutral-400 hover:text-primary transition-colors">
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button onClick={() => confirmDelete(promo.id || promo._id)} className="text-neutral-400 hover:text-red-500 transition-colors">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">{promo.name}</h3>
                                <p className="text-sm text-primary font-mono font-bold mb-2">{promo.code}</p>
                                <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4 line-clamp-2">{promo.description || 'Tidak ada deskripsi'}</p>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Diskon:</span>
                                        <span className="font-bold text-neutral-900 dark:text-white">
                                            {promo.discountType === 'Percentage' ? `${promo.discountValue}%` : `Rp ${promo.discountValue.toLocaleString('id-ID')}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Min. Belanja:</span>
                                        <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                                            Rp {promo.minPurchase.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Digunakan:</span>
                                        <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                                            {promo.usedCount} / {promo.usageLimit || '∞'}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-neutral-500 border border-neutral-200 dark:border-neutral-700 p-2 rounded-lg mt-4">
                                    <Calendar className="h-3 w-3" />
                                    <span>{new Date(promo.startDate).toLocaleDateString('id-ID')} - {new Date(promo.endDate).toLocaleDateString('id-ID')}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {promos.length === 0 && !loading && (
                <div className="text-center py-12 text-neutral-500">
                    <Percent className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p>Belum ada promo. Buat promo pertama Anda!</p>
                </div>
            )}

            <ConfirmDialog
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleDelete}
                title="Hapus Promo?"
                message="Apakah Anda yakin ingin menghapus promo ini? Tindakan ini tidak dapat dibatalkan."
                confirmText="Ya, Hapus"
                cancelText="Batal"
                type="danger"
            />
        </div>
    );
};

export default AdminPromos;
