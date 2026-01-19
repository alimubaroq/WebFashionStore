import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const DashboardProfile = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.id || user?._id) {
            const userId = user.id || user._id; // Handle both id formats
            const fetchDashboardData = async () => {
                try {
                    const response = await api.get(`/orders/user/${userId}`);
                    // Sort orders by date descending
                    const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setOrders(sortedOrders);
                } catch (error) {
                    console.error("Failed to fetch user orders:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchDashboardData();
        }
    }, [user]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
    };

    // Derived Stats
    const stats = {
        orders: orders.length,
        activeOrders: orders.filter(o => !['Selesai', 'Dibatalkan', 'Delivered'].includes(o.status)).length,
        wishlist: 0, // Placeholder until Wishlist API is ready
        wallet: formatCurrency(user?.walletBalance || 0)
    };

    const lastOrder = orders.length > 0 ? orders[0] : null;

    if (loading) return (
        <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="mx-auto max-w-6xl space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-text-primary dark:text-white md:text-4xl">Halo, {user?.fullName?.split(' ')[0] || 'User'} 👋</h2>
                    <p className="mt-2 text-text-secondary">Senang melihatmu kembali! Cek status pesananmu hari ini.</p>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white p-2 pr-4 shadow-sm border border-border-light dark:bg-surface-dark dark:border-neutral-800">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
                        <span className="material-symbols-outlined">stars</span>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-text-secondary">Poin Reward</p>
                        <p className="text-lg font-bold text-text-primary dark:text-white">0 <span className="text-xs font-normal text-text-secondary">Pts</span></p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col gap-1 rounded-2xl bg-white p-6 shadow-sm border border-border-light dark:bg-surface-dark dark:border-neutral-800 hover:border-primary/30 transition-colors">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                        <span className="material-symbols-outlined">shopping_basket</span>
                    </div>
                    <p className="text-sm font-medium text-text-secondary">Total Pesanan</p>
                    <h3 className="text-2xl font-bold text-text-primary dark:text-white">{stats.orders}</h3>
                </div>
                <div className="flex flex-col gap-1 rounded-2xl bg-white p-6 shadow-sm border border-border-light dark:bg-surface-dark dark:border-neutral-800 hover:border-primary/30 transition-colors">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                        <span className="material-symbols-outlined">local_shipping</span>
                    </div>
                    <p className="text-sm font-medium text-text-secondary">Pesanan Aktif</p>
                    <h3 className="text-2xl font-bold text-text-primary dark:text-white">{stats.activeOrders}</h3>
                </div>
                <div className="flex flex-col gap-1 rounded-2xl bg-white p-6 shadow-sm border border-border-light dark:bg-surface-dark dark:border-neutral-800 hover:border-primary/30 transition-colors">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500">
                        <span className="material-symbols-outlined">favorite</span>
                    </div>
                    <p className="text-sm font-medium text-text-secondary">Item Wishlist</p>
                    <h3 className="text-2xl font-bold text-text-primary dark:text-white">{stats.wishlist}</h3>
                </div>
                <div className="flex flex-col gap-1 rounded-2xl bg-white p-6 shadow-sm border border-border-light dark:bg-surface-dark dark:border-neutral-800 hover:border-primary/30 transition-colors">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-500">
                        <span className="material-symbols-outlined">account_balance_wallet</span>
                    </div>
                    <p className="text-sm font-medium text-text-secondary">Saldo Wallet</p>
                    <h3 className="text-2xl font-bold text-text-primary dark:text-white text-sm truncate">{stats.wallet}</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Left Column: Order Tracking & Recent Orders */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Active Order Tracking */}
                    {lastOrder && !['Selesai', 'Dibatalkan', 'Delivered'].includes(lastOrder.status) ? (
                        <div className="rounded-2xl bg-white p-6 shadow-sm border border-border-light dark:bg-surface-dark dark:border-neutral-800">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-text-primary dark:text-white">Lacak Pesanan Terakhir</h3>
                                <div className="flex gap-2">
                                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">ID: #{lastOrder.id?.slice(-6).toUpperCase()}</span>
                                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${lastOrder.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                        lastOrder.status === 'Completed' || lastOrder.status === 'Paid' || lastOrder.status === 'Selesai' ? 'bg-green-100 text-green-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>{lastOrder.status}</span>
                                </div>
                            </div>

                            {/* Simple Tracking Status */}
                            <div className="flex items-center justify-between px-2 md:px-10 mb-8 relative">
                                <div className="absolute left-0 top-4 h-1 w-full bg-border-light dark:bg-neutral-800 -z-10"></div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
                                        <span className="material-symbols-outlined text-sm">inventory_2</span>
                                    </div>
                                    <span className="text-xs font-bold">Diproses</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center shadow-md ${['Dikirim', 'Delivered', 'Selesai', 'Paid'].includes(lastOrder.status) ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                                        <span className="material-symbols-outlined text-sm">local_shipping</span>
                                    </div>
                                    <span className="text-xs font-bold">Dikirim</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center shadow-md ${['Selesai', 'Delivered', 'Completed'].includes(lastOrder.status) ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                                        <span className="material-symbols-outlined text-sm">check_circle</span>
                                    </div>
                                    <span className="text-xs font-bold">Selesai</span>
                                </div>
                            </div>

                            <div className="flex justify-between rounded-xl bg-background-light p-4 dark:bg-background-dark">
                                <div className="flex gap-4">
                                    <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-3xl text-gray-400">checkroom</span>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p className="font-bold text-text-primary dark:text-white">{lastOrder.items?.length > 0 ? lastOrder.items[0].productName : 'Produk'}</p>
                                        <p className="text-sm text-text-secondary">{lastOrder.items?.length > 1 ? `+ ${lastOrder.items.length - 1} item lainnya` : `${lastOrder.items?.length || 0} Item`}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-primary">{formatCurrency(lastOrder.totalAmount || 0)}</p>
                                    <p className="text-xs text-text-secondary">{formatDate(lastOrder.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-2xl bg-white p-6 shadow-sm border border-border-light dark:bg-surface-dark dark:border-neutral-800 text-center py-12">
                            <h3 className="text-lg font-bold text-text-primary dark:text-white mb-2">Belum ada pesanan aktif</h3>
                            <p className="text-text-secondary text-sm">Pesanan yang sedang berjalan akan muncul di sini.</p>
                            <Link to="/products" className="mt-4 inline-block rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-opacity-90">Mulai Belanja</Link>
                        </div>
                    )}

                    {/* Recent Orders Table */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-border-light dark:bg-surface-dark dark:border-neutral-800">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-text-primary dark:text-white">Riwayat Pesanan</h3>
                            <Link to="/dashboard/orders" className="text-sm font-bold text-primary hover:underline">Lihat Semua</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px] text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-border-light dark:border-neutral-800 text-xs uppercase tracking-wider text-text-secondary">
                                        <th className="pb-3 font-semibold">ID Pesanan</th>
                                        <th className="pb-3 font-semibold">Tanggal</th>
                                        <th className="pb-3 font-semibold">Total</th>
                                        <th className="pb-3 font-semibold">Status</th>
                                        <th className="pb-3 text-right font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {orders.slice(0, 5).map(order => (
                                        <tr key={order.id || order._id} className="group border-b border-border-light/50 dark:border-neutral-800 last:border-0 hover:bg-background-light dark:hover:bg-neutral-800/50 transition-colors">
                                            <td className="py-4 font-bold text-text-primary dark:text-white">#{(order.id || order._id || '').slice(-6).toUpperCase()}</td>
                                            <td className="py-4 text-text-secondary">{formatDate(order.createdAt)}</td>
                                            <td className="py-4 font-medium text-text-primary dark:text-white">{formatCurrency(order.totalAmount)}</td>
                                            <td className="py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.status === 'Completed' || order.status === 'Paid' || order.status === 'Selesai' ? 'bg-green-100 text-green-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-4 text-right">
                                                <button className="rounded-lg p-2 text-text-secondary hover:bg-white dark:hover:bg-neutral-700 hover:text-primary hover:shadow-sm transition-all">
                                                    <span className="material-symbols-outlined text-lg">visibility</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {orders.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="py-8 text-center text-text-secondary">Belum ada riwayat pesanan.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column: Profile & Wishlist Preview */}
                <div className="space-y-8">
                    {/* Address Card */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-border-light dark:bg-surface-dark dark:border-neutral-800">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-text-primary dark:text-white">Alamat Utama</h3>
                            <Link to="/dashboard/addresses" className="text-xs font-bold text-primary hover:underline">Ubah</Link>
                        </div>
                        <div className="flex flex-col gap-3">
                            {user?.address ? (
                                <div className="flex items-start gap-3 rounded-xl bg-background-light p-4 dark:bg-background-dark">
                                    <div className="mt-1 text-primary">
                                        <span className="material-symbols-outlined">home_pin</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-text-primary dark:text-white">Alamat Terdaftar</p>
                                        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                                            {user.address}
                                        </p>
                                        <p className="mt-2 text-sm font-medium text-text-primary dark:text-white">{user.phoneNumber || '-'}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-4 text-text-secondary text-sm">Belum ada alamat tersimpan.</div>
                            )}

                            <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 p-3 text-sm font-bold text-primary hover:bg-primary/5 transition-colors">
                                <span className="material-symbols-outlined text-lg">add</span>
                                {user?.address ? 'Ganti Alamat' : 'Tambah Alamat Baru'}
                            </button>
                        </div>
                    </div>

                    {/* Profile Settings Snippet */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-border-light dark:bg-surface-dark dark:border-neutral-800">
                        <div className="mb-6 border-b border-border-light dark:border-neutral-800 pb-4">
                            <h3 className="text-lg font-bold text-text-primary dark:text-white">Informasi Akun</h3>
                        </div>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-text-secondary">Nama Lengkap</label>
                                <input
                                    className="w-full rounded-xl border border-border-light bg-background-light px-4 py-2.5 text-sm text-text-primary focus:border-primary focus:ring-1 focus:ring-primary dark:bg-background-dark dark:border-neutral-700 dark:text-white"
                                    type="text"
                                    defaultValue={user?.fullName}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-text-secondary">Email</label>
                                <input
                                    className="w-full rounded-xl border border-border-light bg-background-light px-4 py-2.5 text-sm text-text-primary focus:border-primary focus:ring-1 focus:ring-primary dark:bg-background-dark dark:border-neutral-700 dark:text-white"
                                    type="email"
                                    defaultValue={user?.email}
                                    readOnly
                                />
                            </div>
                            <div className="flex justify-end mt-4">
                                <button className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-opacity-90 transition-all shadow-md shadow-primary/20" type="button">
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardProfile;
