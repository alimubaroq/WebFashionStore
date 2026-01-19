import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { createOrder } from '../../services/orderService';
import api from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Ticket, X, MapPin, Truck, CreditCard, Copy, Clock, ShieldCheck } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const DashboardCheckout = () => {
    const { cartItems, totalPrice, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { success: showSuccess, error: showError } = useToast();

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState(null);
    const [virtualAccount, setVirtualAccount] = useState('');
    const [paymentTimer, setPaymentTimer] = useState(30 * 60); // 30 minutes in seconds

    // Form Data
    const [formData, setFormData] = useState({
        customerName: '',
        shippingAddress: '',
        phoneNumber: '',
    });

    // Promo states
    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [promoLoading, setPromoLoading] = useState(false);
    const [promoError, setPromoError] = useState('');

    const SHIPPING_COST = 25000;
    const TAX_RATE = 0.11;

    // Calculate totals
    const taxAmount = totalPrice * TAX_RATE;
    const preDiscountTotal = totalPrice + SHIPPING_COST + taxAmount;
    const discountAmount = appliedPromo ? appliedPromo.discountAmount : 0;
    const finalTotal = Math.max(0, preDiscountTotal - discountAmount);

    useEffect(() => {
        if (user) {
            fetchUserData();
        }
    }, [user]);

    // Timer effect for payment modal
    useEffect(() => {
        let interval;
        if (showPaymentModal && paymentTimer > 0) {
            interval = setInterval(() => {
                setPaymentTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [showPaymentModal, paymentTimer]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const fetchUserData = async () => {
        try {
            const response = await api.get(`/users/${user.id || user._id}`);
            const userData = response.data;

            // Find default address from list
            let defaultAddr = '';
            if (userData.addresses && userData.addresses.length > 0) {
                const def = userData.addresses.find(a => a.isDefault);
                const addr = def || userData.addresses[0];
                defaultAddr = `${addr.street}, ${addr.city}, ${addr.province}, ${addr.postalCode}`;
            }

            setFormData({
                customerName: userData.fullName || user.fullName || '',
                shippingAddress: defaultAddr || userData.address || '',
                phoneNumber: userData.phoneNumber || ''
            });
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            setFormData(prev => ({ ...prev, customerName: user.fullName || '' }));
        } finally {
            setPageLoading(false);
        }
    };

    const handleApplyPromo = async () => {
        if (!promoCode.trim()) return;
        setPromoLoading(true);
        setPromoError('');
        try {
            const response = await api.post('/promos/validate', {
                code: promoCode,
                totalAmount: totalPrice
            });
            setAppliedPromo({
                code: promoCode,
                discountAmount: response.data.discountAmount,
                details: response.data.promo
            });
            showSuccess("Kode promo berhasil diterapkan!");
        } catch (error) {
            setAppliedPromo(null);
            setPromoError(error.response?.data?.message || "Kode promo tidak valid");
            showError(error.response?.data?.message || "Kode promo tidak valid");
        } finally {
            setPromoLoading(false);
        }
    };

    const handleRemovePromo = () => {
        setAppliedPromo(null);
        setPromoCode('');
        setPromoError('');
    };

    const handleCreateOrder = async (e) => {
        e.preventDefault();
        setLoading(true);

        const orderPayload = {
            userId: user ? (user.id || user._id) : null,
            items: cartItems.map(item => ({
                productId: item.id || item._id,
                productName: item.name,
                price: Number(item.price),      // Ensure number
                quantity: Number(item.quantity),// Ensure number
                size: item.size || 'N/A',       // Default if missing
                imageUrl: item.imageUrl
            })),
            totalAmount: Number(finalTotal),    // Ensure number
            customerName: formData.customerName,
            shippingAddress: formData.shippingAddress,
            phoneNumber: formData.phoneNumber,
            status: 'Pending',
            promoCode: appliedPromo ? appliedPromo.code : null,
            discountAmount: Number(discountAmount)
        };

        try {
            // 1. Create Order (Status: Pending)
            const response = await createOrder(orderPayload);
            // Assuming response contains the created order with ID. 
            // If createOrder returns void/simple success, we might need adjustments.
            // But usually API returns the object.

            // Generate random VA
            const randomVA = "8808" + Math.floor(1000000000 + Math.random() * 9000000000);
            setVirtualAccount(randomVA);

            // Set Order ID from response if available, or just mocking for now since we need it for update
            // createOrder implementation checks: usually returns response.data
            // If createOrder returns just "data", we use that.
            // Let's assume standard axios response
            const orderId = response?.id || response?.data?.id;
            if (orderId) {
                setCurrentOrderId(orderId);
            }

            // Show Payment Modal
            setShowPaymentModal(true);
            setLoading(false);

            // clear cart now or after payment? 
            // Usually after payment, but for this flow let's clear it now to prevent double order
            clearCart();

        } catch (error) {
            console.error("Order creation failed:", error);
            showError("Gagal membuat pesanan. Silakan coba lagi.");
            setLoading(false);
        }
    };

    const handleSimulatePayment = async () => {
        setLoading(true);

        try {
            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Update Order Status to "Paid" if we have an ID
            if (currentOrderId) {
                await api.put(`/orders/${currentOrderId}/status`, "Paid", {
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            setShowPaymentModal(false);
            setSuccess(true); // Show success UI
        } catch (error) {
            console.error("Payment simulation failed:", error);
            showError("Gagal memproses pembayaran simulasi.");
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (cartItems.length === 0 && !showPaymentModal && !success) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-center">
                <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-full mb-4">
                    <Truck className="h-12 w-12 text-neutral-400" />
                </div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Keranjang Kosong</h2>
                <Link to="/dashboard/shop" className="text-primary font-medium hover:underline">
                    Mulai Belanja
                </Link>
            </div>
        );
    }

    // Success Screen
    if (success) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-center animate-in fade-in duration-500">
                <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-full mb-6">
                    <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Pembayaran Berhasil!</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    Terima kasih! Pesanan Anda telah terverifikasi dan akan segera diproses.
                </p>
                <div className="flex gap-4">
                    <Link
                        to="/dashboard/shop"
                        className="px-6 py-2 border border-neutral-300 rounded-lg font-bold hover:bg-neutral-50 transition-colors"
                    >
                        Belanja Lagi
                    </Link>
                    <Link
                        to="/dashboard/orders"
                        className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors"
                    >
                        Lihat Pesanan
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Payment Filter Overlay */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
                        <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center bg-primary/5">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                Pembayaran Aman
                            </h3>
                            <div className="text-sm font-medium text-primary flex items-center gap-1 bg-white px-2 py-1 rounded-full shadow-sm">
                                <Clock className="h-4 w-4" />
                                {formatTime(paymentTimer)}
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="text-center">
                                <p className="text-sm text-neutral-500 mb-1">Total Pembayaran</p>
                                <h2 className="text-3xl font-black text-primary">Rp {finalTotal.toLocaleString('id-ID')}</h2>
                            </div>

                            <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Bank MCA Virtual Account</span>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png" alt="BCA" className="h-4 object-contain opacity-70" />
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    <code className="text-xl font-mono font-bold text-neutral-900 dark:text-white tracking-wider">
                                        {virtualAccount}
                                    </code>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(virtualAccount);
                                            showSuccess("Nomor VA disalin!");
                                        }}
                                        className="p-2 hover:bg-white rounded-lg transition-colors text-primary"
                                        title="Salin"
                                    >
                                        <Copy className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Petunjuk Pembayaran:</h4>
                                <ol className="text-xs text-neutral-500 space-y-1 list-decimal pl-4">
                                    <li>Buka aplikasi M-Banking Anda.</li>
                                    <li>Pilih menu <strong>m-Transfer</strong> then <strong>BCA Virtual Account</strong>.</li>
                                    <li>Masukkan nomor VA di atas.</li>
                                    <li>Periksa detail dan konfirmasi pembayaran.</li>
                                </ol>
                            </div>
                        </div>

                        <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex flex-col gap-3">
                            <button
                                onClick={handleSimulatePayment}
                                disabled={loading}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-600/20 transition-all flex justify-center items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Memverifikasi Transaksi...
                                    </>
                                ) : (
                                    "Saya Sudah Bayar"
                                )}
                            </button>
                            <button
                                onClick={() => {
                                    if (window.confirm("Batalkan pembayaran? Pesanan akan tetap dibuat dengan status Pending.")) {
                                        setShowPaymentModal(false);
                                        navigate('/dashboard/orders');
                                    }
                                }}
                                className="text-neutral-500 text-sm font-medium hover:text-neutral-700 text-center"
                            >
                                Bayar Nanti
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Checkout</h2>
                <p className="text-neutral-500 dark:text-neutral-400">Lengkapi informasi pengiriman dan pembayaran.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Shipping Info Card */}
                    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-800 p-6">
                        <div className="flex items-center gap-3 mb-6 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                            <MapPin className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Alamat Pengiriman</h3>
                        </div>

                        <form id="checkout-form" onSubmit={handleCreateOrder} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Nama Penerima</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-neutral-50 dark:bg-neutral-800 border-none rounded-lg p-3 text-neutral-900 dark:text-white focus:ring-1 focus:ring-primary"
                                    value={formData.customerName}
                                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Nomor Telepon</label>
                                <input
                                    type="tel"
                                    required
                                    className="w-full bg-neutral-50 dark:bg-neutral-800 border-none rounded-lg p-3 text-neutral-900 dark:text-white focus:ring-1 focus:ring-primary"
                                    value={formData.phoneNumber}
                                    placeholder="Contoh: 08123456789"
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Alamat Lengkap</label>
                                <textarea
                                    required
                                    rows="3"
                                    className="w-full bg-neutral-50 dark:bg-neutral-800 border-none rounded-lg p-3 text-neutral-900 dark:text-white focus:ring-1 focus:ring-primary"
                                    value={formData.shippingAddress}
                                    placeholder="Jalan, Nomor Rumah, Kecamatan, Kota, Kode Pos"
                                    onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                                ></textarea>
                                {(!formData.shippingAddress || formData.shippingAddress.length < 10) && (
                                    <p className="text-xs text-orange-500 mt-1 flex items-center gap-1">
                                        <Truck className="h-3 w-3" /> Pastikan alamat lengkap agar pengiriman lancar.
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Payment Method (Mock) */}
                    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-800 p-6">
                        <div className="flex items-center gap-3 mb-6 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                            <CreditCard className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Metode Pembayaran</h3>
                        </div>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 p-4 rounded-lg border border-primary bg-primary/5 cursor-pointer ring-1 ring-primary">
                                <input type="radio" name="payment" defaultChecked className="text-primary focus:ring-primary" />
                                <div className="flex-1">
                                    <span className="font-bold text-neutral-900 dark:text-white block">Virtual Account</span>
                                    <span className="text-xs text-neutral-500">Verifikasi Otomatis (BCA, Mandiri, BRI)</span>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 opacity-60 cursor-not-allowed">
                                <input type="radio" name="payment" disabled className="text-neutral-400" />
                                <span className="text-neutral-500">E-Wallet (Coming Soon)</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-800 p-6 sticky top-6">
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-6">Ringkasan Pesanan</h3>

                        {/* Promo Input */}
                        <div className="mb-6">
                            {appliedPromo ? (
                                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Ticket className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        <div>
                                            <p className="text-sm font-bold text-green-800 dark:text-green-300">{appliedPromo.code}</p>
                                            <p className="text-xs text-green-600 dark:text-green-400">Hemat Rp {appliedPromo.discountAmount.toLocaleString('id-ID')}</p>
                                        </div>
                                    </div>
                                    <button onClick={handleRemovePromo} className="text-neutral-400 hover:text-red-500">
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="KODE PROMO"
                                        className="flex-1 bg-neutral-50 dark:bg-neutral-800 border-none rounded-lg py-2 px-3 text-sm uppercase text-neutral-900 dark:text-white focus:ring-1 focus:ring-primary"
                                        value={promoCode}
                                        onChange={(e) => {
                                            setPromoCode(e.target.value.toUpperCase());
                                            setPromoError('');
                                        }}
                                    />
                                    <button
                                        onClick={handleApplyPromo}
                                        disabled={promoLoading || !promoCode}
                                        className="bg-neutral-800 dark:bg-neutral-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-700 dark:hover:bg-neutral-600 disabled:opacity-50 transition-colors"
                                    >
                                        {promoLoading ? '...' : 'Pakai'}
                                    </button>
                                </div>
                            )}
                            {promoError && (
                                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                                    <X className="h-3 w-3" /> {promoError}
                                </p>
                            )}
                        </div>

                        {/* Totals */}
                        <div className="space-y-3 pt-4 border-t border-dashed border-neutral-200 dark:border-neutral-700 mb-6">
                            <div className="flex justify-between text-sm text-neutral-500 dark:text-neutral-400">
                                <span>Total Item ({cartItems.length})</span>
                                <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between text-sm text-neutral-500 dark:text-neutral-400">
                                <span>Ongkos Kirim</span>
                                <span>Rp {SHIPPING_COST.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between text-sm text-neutral-500 dark:text-neutral-400">
                                <span>Pajak (11%)</span>
                                <span>Rp {taxAmount.toLocaleString('id-ID')}</span>
                            </div>
                            {appliedPromo && (
                                <div className="flex justify-between text-sm font-bold text-green-600 dark:text-green-400">
                                    <span>Diskon</span>
                                    <span>- Rp {discountAmount.toLocaleString('id-ID')}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-end pt-4 border-t border-neutral-200 dark:border-neutral-700 mb-6">
                            <span className="text-base font-bold text-neutral-900 dark:text-white">Total Bayar</span>
                            <span className="text-2xl font-black text-primary">Rp {finalTotal.toLocaleString('id-ID')}</span>
                        </div>

                        <button
                            form="checkout-form"
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Memproses...' : 'Bayar Sekarang'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardCheckout;
