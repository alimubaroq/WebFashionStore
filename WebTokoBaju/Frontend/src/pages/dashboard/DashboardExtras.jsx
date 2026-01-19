import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Save, MapPin } from 'lucide-react';

export const DashboardWishlist = () => (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-light bg-background-light py-20 text-center dark:bg-background-dark dark:border-neutral-800">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-surface-light shadow-sm dark:bg-surface-dark">
            <span className="material-symbols-outlined text-4xl text-text-secondary">favorite</span>
        </div>
        <h3 className="text-xl font-bold text-text-primary dark:text-white">Wishlist Belum Tersedia</h3>
        <p className="mt-2 text-text-secondary max-w-sm mx-auto">Fitur wishlist sedang dalam pengembangan. Segera hadir untuk menyimpan produk favoritmu!</p>
    </div>
);

export const DashboardAddress = () => (
    <div className="p-4 text-center">
        <p>This component has been moved to UserAddresses.jsx</p>
    </div>
);

export const DashboardSettings = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        userId: '',
        email: '',
        currentPassword: '',
        newPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                userId: user.id || user._id,
                fullName: user.fullName || '',
                email: user.email || ''
            }));
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            // Fetch fresh data
            const userId = user.id || user._id;
            const userData = await api.get(`/users/${userId}`);

            const payload = {
                ...userData.data,
                fullName: formData.fullName
                // Email usually not changeable freely
            };

            if (formData.newPassword) {
                payload.password = formData.newPassword;
            }

            await api.put(`/users/${userId}`, payload);
            setMessage({ type: 'success', text: 'Profil berhasil diperbarui!' });
        } catch (error) {
            console.error("Failed to update profile:", error);
            setMessage({ type: 'error', text: 'Gagal memperbarui profil.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-6">Pengaturan Akun</h2>

            {message && (
                <div className={`flex items-center gap-2 rounded-xl p-4 mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    <span className="material-symbols-outlined">{message.type === 'success' ? 'check_circle' : 'error'}</span>
                    <p className="text-sm font-medium">{message.text}</p>
                </div>
            )}

            <div className="rounded-2xl bg-white p-8 shadow-sm border border-border-light dark:bg-surface-dark dark:border-neutral-800">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-text-secondary">Nama Lengkap</label>
                        <input
                            type="text"
                            className="w-full rounded-xl border border-border-light bg-background-light px-4 py-3 text-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-background-dark dark:border-neutral-700 dark:text-white"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-text-secondary">Email</label>
                        <input
                            type="email"
                            className="w-full rounded-xl border border-border-light bg-gray-50 px-4 py-3 text-sm text-text-secondary outline-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-400"
                            value={formData.email}
                            readOnly
                        />
                        <p className="text-xs text-text-secondary flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">lock</span>
                            Email tidak dapat diubah
                        </p>
                    </div>

                    <div className="my-8 h-px bg-border-light dark:bg-neutral-800"></div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-text-primary dark:text-white">Keamanan</h3>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-text-secondary">Password Baru (Opsional)</label>
                            <input
                                type="password"
                                className="w-full rounded-xl border border-border-light bg-background-light px-4 py-3 text-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-background-dark dark:border-neutral-700 dark:text-white"
                                placeholder="Kosongkan jika tidak ingin mengubah"
                                value={formData.newPassword}
                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-opacity-90 disabled:opacity-70 shadow-lg shadow-primary/20 transition-all"
                        >
                            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
