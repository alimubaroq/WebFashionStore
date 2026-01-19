import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';

const DashboardOrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                // Currently API /orders/user/:userId returns list. 
                // We might need a specific endpoint for single order, OR filter from list if backend doesn't support get by ID for users.
                // Assuming `api.get('/orders/' + id)` exists and is secured, or we fetch all and find one. 
                // Let's try to fetch specifically if possible, or fallback.
                // Based on standard REST, let's try direct ID fetch. 
                // If backend OrdersController has [HttpGet("{id}")] it should work.

                const response = await api.get(`/orders/${id}`);
                setOrder(response.data);
            } catch (error) {
                console.error("Failed to fetch order details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchOrder();
        }
    }, [id]);

    if (loading) return (
        <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    if (!order) return (
        <div className="text-center py-12">
            <h3 className="text-lg font-bold text-text-primary">Pesanan tidak ditemukan</h3>
            <Link to="/dashboard/orders" className="text-primary hover:underline">Kembali ke daftar pesanan</Link>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <Link to="/dashboard/orders" className="p-2 rounded-full hover:bg-background-light text-text-secondary transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-text-primary dark:text-white">Detail Pesanan</h1>
                    <p className="text-text-secondary">#{(order.id || order._id).toUpperCase()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Status Card */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-border-light dark:bg-surface-dark dark:border-neutral-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-text-primary dark:text-white">Status Pesanan</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Selesai' ? 'bg-green-100 text-green-700' :
                                    order.status === 'Dibatalkan' ? 'bg-red-100 text-red-700' :
                                        'bg-blue-100 text-blue-700'
                                }`}>
                                {order.status}
                            </span>
                        </div>
                        {/* Simple Timeline Mockup */}
                        <div className="relative pl-4 border-l-2 border-border-light space-y-6 my-4">
                            <div className="relative">
                                <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-white dark:ring-surface-dark"></div>
                                <p className="text-sm font-bold text-text-primary dark:text-white">Pesanan Dibuat</p>
                                <p className="text-xs text-text-secondary">{new Date(order.createdAt).toLocaleString()}</p>
                            </div>
                            {/* Add more timeline items based on status if needed */}
                        </div>
                    </div>

                    {/* Items List */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-border-light dark:bg-surface-dark dark:border-neutral-800">
                        <h3 className="font-bold text-text-primary dark:text-white mb-4">Produk Dibeli</h3>
                        <div className="space-y-4">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex gap-4 py-3 border-b border-border-light last:border-0 dark:border-neutral-800">
                                    <div className="h-20 w-20 rounded-lg bg-background-light overflow-hidden flex-shrink-0">
                                        <img src={item.imageUrl || 'https://via.placeholder.com/80'} alt={item.productName} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-text-primary dark:text-white text-sm">{item.productName}</h4>
                                        <p className="text-xs text-text-secondary mt-1">
                                            Size: {item.size}, Qty: {item.quantity}
                                        </p>
                                        <p className="font-bold text-primary mt-2">
                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Payment Summary */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-border-light dark:bg-surface-dark dark:border-neutral-800">
                        <h3 className="font-bold text-text-primary dark:text-white mb-4">Rincian Pembayaran</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-text-secondary">
                                <span>Total Harga ({order.items.length} Barang)</span>
                                <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.totalAmount)}</span>
                            </div>
                            <div className="flex justify-between text-text-secondary">
                                <span>Ongkos Kirim</span>
                                <span>Rp 0</span>
                            </div>
                            <div className="border-t border-border-light dark:border-neutral-800 my-2 pt-2 flex justify-between font-bold text-text-primary dark:text-white text-base">
                                <span>Total Belanja</span>
                                <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.totalAmount)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-border-light dark:bg-surface-dark dark:border-neutral-800">
                        <h3 className="font-bold text-text-primary dark:text-white mb-4">Info Pengiriman</h3>
                        <div className="text-sm text-text-secondary leading-relaxed">
                            <p className="font-bold text-text-primary dark:text-white mb-1">{order.shippingAddress?.recipientName || user?.fullName || 'Penerima'}</p>
                            <p>{order.shippingAddress?.street || order.shippingAddress}</p>
                            <p>{order.shippingAddress?.city}, {order.shippingAddress?.province} {order.shippingAddress?.postalCode}</p>
                            <p className="mt-2">{order.shippingAddress?.phoneNumber || user?.phoneNumber}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOrderDetail;
