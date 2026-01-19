import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Users, Search, Mail, Phone, MapPin } from 'lucide-react';

export const AdminCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await api.get('/users');
            // Filter to show only customers, not other admins if you prefer
            const onlyCustomers = response.data.filter(u => u.role === 'Customer');
            setCustomers(onlyCustomers);
        } catch (error) {
            console.error("Failed to fetch customers:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredCustomers = customers.filter(customer =>
        customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary dark:text-white">Data Pelanggan</h1>
                    <p className="text-text-secondary">Kelola data pelanggan terdaftar.</p>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-text-secondary" />
                    </div>
                    <input
                        type="text"
                        placeholder="Cari pelanggan..."
                        className="pl-10 pr-4 py-2.5 w-full md:w-64 border border-border-light rounded-xl bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-surface-dark dark:border-neutral-700 dark:text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-border-light overflow-hidden dark:bg-surface-dark dark:border-neutral-800">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-border-light dark:divide-neutral-800">
                        <thead className="bg-background-light dark:bg-neutral-800/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary uppercase tracking-wider">Nama Lengkap</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary uppercase tracking-wider">Kontak</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary uppercase tracking-wider">Alamat</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary uppercase tracking-wider">Bergabung</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-border-light dark:bg-surface-dark dark:divide-neutral-800">
                            {filteredCustomers.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-text-secondary">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="h-12 w-12 rounded-full bg-background-light flex items-center justify-center dark:bg-neutral-800">
                                                <Users className="h-6 w-6 text-text-secondary" />
                                            </div>
                                            <p>Tidak ada data pelanggan yang cocok.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredCustomers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-background-light/50 transition-colors dark:hover:bg-neutral-800/50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                                    {customer.fullName.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-bold text-text-primary dark:text-white">{customer.fullName}</div>
                                                    <div className="text-xs text-text-secondary bg-background-light px-2 py-0.5 rounded-full inline-block mt-1 dark:bg-neutral-800">
                                                        {customer.role}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col space-y-1.5">
                                                <div className="flex items-center text-sm text-text-secondary">
                                                    <Mail className="h-3.5 w-3.5 mr-2" />
                                                    {customer.email}
                                                </div>
                                                {customer.phoneNumber && (
                                                    <div className="flex items-center text-sm text-text-secondary">
                                                        <Phone className="h-3.5 w-3.5 mr-2" />
                                                        {customer.phoneNumber}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-start text-sm text-text-secondary max-w-xs">
                                                <MapPin className="h-3.5 w-3.5 mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="truncate block" title={customer.address}>{customer.address || '-'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                            {/* Mock date if not available */}
                                            {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};



export const AdminSettings = () => (
    <div className="mx-auto max-w-3xl space-y-8">
        <div>
            <h1 className="text-2xl font-bold text-text-primary dark:text-white">Pengaturan Toko</h1>
            <p className="text-text-secondary">Konfigurasi umum toko dan aplikasi.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-border-light p-8 dark:bg-surface-dark dark:border-neutral-800">
            <h2 className="text-lg font-bold text-text-primary dark:text-white mb-6">Informasi Umum</h2>
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-text-secondary">Nama Toko</label>
                        <input type="text" className="w-full border-border-light rounded-xl shadow-sm p-3 border focus:ring-primary focus:border-primary dark:bg-background-dark dark:border-neutral-700 dark:text-white" defaultValue="LuxeWear Store" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-text-secondary">Email Kontak</label>
                        <input type="email" className="w-full border-border-light rounded-xl shadow-sm p-3 border focus:ring-primary focus:border-primary dark:bg-background-dark dark:border-neutral-700 dark:text-white" defaultValue="admin@luxewear.com" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-text-secondary">Nomor Telepon</label>
                        <input type="text" className="w-full border-border-light rounded-xl shadow-sm p-3 border focus:ring-primary focus:border-primary dark:bg-background-dark dark:border-neutral-700 dark:text-white" defaultValue="+62 812 3456 7890" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-text-secondary">Mata Uang</label>
                        <select className="w-full border-border-light rounded-xl shadow-sm p-3 border focus:ring-primary focus:border-primary dark:bg-background-dark dark:border-neutral-700 dark:text-white">
                            <option>IDR (Rp)</option>
                            <option>USD ($)</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary">Alamat Toko</label>
                    <textarea rows="3" className="w-full border-border-light rounded-xl shadow-sm p-3 border focus:ring-primary focus:border-primary dark:bg-background-dark dark:border-neutral-700 dark:text-white" defaultValue="Jl. Sudirman No. 10, Jakarta Selatan, Indonesia"></textarea>
                </div>

                <div className="pt-4 border-t border-border-light dark:border-neutral-800 flex justify-end">
                    <button type="button" className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-opacity-90 shadow-lg shadow-primary/20 transition-all">
                        Simpan Perubahan
                    </button>
                </div>
            </form>
        </div>
    </div>
);
