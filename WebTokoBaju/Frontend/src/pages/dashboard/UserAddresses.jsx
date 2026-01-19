import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';

const UserAddresses = () => {
    const { user, login } = useAuth(); // login used here to update user context
    const { success, error } = useToast();
    const [loading, setLoading] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        label: 'Home',
        recipientName: '',
        phoneNumber: '',
        street: '',
        city: '',
        province: '',
        postalCode: '',
        isDefault: false
    });

    useEffect(() => {
        if (user?.addresses) {
            setAddresses(user.addresses);
        }
    }, [user]);

    const resetForm = () => {
        setFormData({
            label: 'Home',
            recipientName: user?.fullName || '',
            phoneNumber: user?.phoneNumber || '',
            street: '',
            city: '',
            province: '',
            postalCode: '',
            isDefault: false
        });
        setEditingId(null);
        setShowForm(false);
    };

    const handleEdit = (addr) => {
        setFormData(addr);
        setEditingId(addr.id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Yakin ingin menghapus alamat ini?')) return;

        const updatedAddresses = addresses.filter(a => a.id !== id);
        await saveAddresses(updatedAddresses);
    };

    const handleSetDefault = async (id) => {
        const updatedAddresses = addresses.map(a => ({
            ...a,
            isDefault: a.id === id
        }));
        await saveAddresses(updatedAddresses);
    };

    const saveAddresses = async (newAddresses) => {
        setLoading(true);
        try {
            // Fetch fresh user data first
            const userId = user.id || user._id;
            const { data: userData } = await api.get(`/users/${userId}`);

            // Update addresses on the fresh user object
            const updatedUser = { ...userData, addresses: newAddresses };

            // Backend update
            await api.put(`/users/${userId}`, updatedUser);

            // Update local state
            setAddresses(newAddresses);
            success('Alamat berhasil diperbarui');
        } catch (error) {
            console.error("Failed to update addresses:", error);
            error('Gagal memperbarui alamat');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let updatedAddresses = [...addresses];

        if (formData.isDefault) {
            updatedAddresses = updatedAddresses.map(a => ({ ...a, isDefault: false }));
        }

        if (editingId) {
            updatedAddresses = updatedAddresses.map(a =>
                a.id === editingId ? { ...formData, id: editingId } : a
            );
        } else {
            const newAddr = {
                ...formData,
                id: Date.now().toString()
            };

            if (updatedAddresses.length === 0) newAddr.isDefault = true;

            updatedAddresses.push(newAddr);
        }

        await saveAddresses(updatedAddresses);
        resetForm();
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-text-primary dark:text-white">Alamat Saya</h2>
                    <p className="text-text-secondary">Kelola alamat pengiriman untuk checkout lebih cepat.</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-opacity-90"
                >
                    <span className="material-symbols-outlined text-lg">add</span>
                    Tambah Alamat
                </button>
            </div>

            {/* List Addresses */}
            {!showForm && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {addresses.map(addr => (
                        <div key={addr.id} className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all ${addr.isDefault ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-border-light bg-white dark:bg-surface-dark dark:border-neutral-800'}`}>
                            {addr.isDefault && (
                                <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                                    Utama
                                </div>
                            )}

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm font-bold text-text-secondary mb-2">
                                    <span className="material-symbols-outlined text-lg">label</span>
                                    {addr.label}
                                </div>
                                <h3 className="text-lg font-bold text-text-primary dark:text-white">{addr.recipientName}</h3>
                                <p className="text-text-primary dark:text-white">{addr.phoneNumber}</p>
                                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                                    {addr.street}, {addr.city}<br />
                                    {addr.province}, {addr.postalCode}
                                </p>
                            </div>

                            <div className="mt-6 flex gap-3 pt-4 border-t border-border-light/50 dark:border-neutral-700">
                                <button
                                    onClick={() => handleEdit(addr)}
                                    className="flex-1 rounded-lg border border-border-light bg-white px-3 py-2 text-sm font-semibold text-text-primary hover:bg-background-light dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700"
                                >
                                    Ubah
                                </button>
                                {!addr.isDefault && (
                                    <>
                                        <button
                                            onClick={() => handleSetDefault(addr.id)}
                                            className="flex-1 rounded-lg border border-border-light bg-white px-3 py-2 text-sm font-semibold text-text-primary hover:bg-background-light dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700"
                                        >
                                            Jadikan Utama
                                        </button>
                                        <button
                                            onClick={() => handleDelete(addr.id)}
                                            className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-400"
                                        >
                                            <span className="material-symbols-outlined text-lg">delete</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}

                    {addresses.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-light bg-background-light py-12 text-center dark:bg-background-dark dark:border-neutral-800">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-light shadow-sm dark:bg-surface-dark">
                                <span className="material-symbols-outlined text-3xl text-text-secondary">location_off</span>
                            </div>
                            <h3 className="text-lg font-bold text-text-primary dark:text-white">Belum ada alamat</h3>
                            <p className="text-text-secondary text-sm max-w-xs mx-auto mt-1">Tambahkan alamat pengiriman untuk memudahkan proses belanja Anda.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Form */}
            {showForm && (
                <div className="rounded-2xl bg-white p-6 shadow-sm border border-border-light dark:bg-surface-dark dark:border-neutral-800">
                    <h3 className="mb-6 text-xl font-bold text-text-primary dark:text-white">
                        {editingId ? 'Ubah Alamat' : 'Tambah Alamat Baru'}
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-text-secondary">Label Alamat</label>
                                <input
                                    required
                                    placeholder="Contoh: Rumah, Kantor"
                                    className="w-full rounded-xl border border-border-light bg-background-light px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-background-dark dark:border-neutral-700 dark:text-white"
                                    value={formData.label}
                                    onChange={e => setFormData({ ...formData, label: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-text-secondary">Nama Penerima</label>
                                <input
                                    required
                                    className="w-full rounded-xl border border-border-light bg-background-light px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-background-dark dark:border-neutral-700 dark:text-white"
                                    value={formData.recipientName}
                                    onChange={e => setFormData({ ...formData, recipientName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-text-secondary">Nomor Telepon</label>
                                <input
                                    required
                                    className="w-full rounded-xl border border-border-light bg-background-light px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-background-dark dark:border-neutral-700 dark:text-white"
                                    value={formData.phoneNumber}
                                    onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-text-secondary">Kota / Kabupaten</label>
                                <input
                                    required
                                    className="w-full rounded-xl border border-border-light bg-background-light px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-background-dark dark:border-neutral-700 dark:text-white"
                                    value={formData.city}
                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-text-secondary">Provinsi</label>
                                <input
                                    required
                                    className="w-full rounded-xl border border-border-light bg-background-light px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-background-dark dark:border-neutral-700 dark:text-white"
                                    value={formData.province}
                                    onChange={e => setFormData({ ...formData, province: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-text-secondary">Kode Pos</label>
                                <input
                                    required
                                    className="w-full rounded-xl border border-border-light bg-background-light px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-background-dark dark:border-neutral-700 dark:text-white"
                                    value={formData.postalCode}
                                    onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-text-secondary">Alamat Lengkap (Jalan, No. Rumah, RT/RW)</label>
                            <textarea
                                required
                                rows="3"
                                className="w-full rounded-xl border border-border-light bg-background-light px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-background-dark dark:border-neutral-700 dark:text-white resize-none"
                                value={formData.street}
                                onChange={e => setFormData({ ...formData, street: e.target.value })}
                            ></textarea>
                        </div>

                        <div className="flex items-center gap-3 py-2">
                            <input
                                type="checkbox"
                                id="isDefault"
                                className="h-5 w-5 rounded border-border-light text-primary focus:ring-primary"
                                checked={formData.isDefault}
                                onChange={e => setFormData({ ...formData, isDefault: e.target.checked })}
                            />
                            <label htmlFor="isDefault" className="text-sm font-medium text-text-primary dark:text-white">
                                Jadikan alamat utama
                            </label>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-border-light dark:border-neutral-700">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="flex-1 rounded-xl border border-border-light px-4 py-2.5 text-sm font-bold text-text-secondary hover:bg-background-light dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-opacity-90 disabled:opacity-50"
                            >
                                {loading ? 'Menyimpan...' : 'Simpan Alamat'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserAddresses;
