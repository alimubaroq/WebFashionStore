import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
    const navigate = useNavigate();

    // Constants for demo calculations matching the design
    const SHIPPING_COST = 25000;
    const TAX_RATE = 0.11;

    const taxAmount = totalPrice * TAX_RATE;
    const finalTotal = totalPrice + SHIPPING_COST + taxAmount;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 text-center px-4">
                <div className="bg-neutral-light dark:bg-neutral-800 p-8 rounded-full">
                    <span className="material-symbols-outlined text-6xl text-neutral-400">shopping_cart_off</span>
                </div>
                <h2 className="text-2xl font-bold text-neutral-dark dark:text-white">Keranjang Belanja Kosong</h2>
                <p className="text-neutral-500 dark:text-neutral-400">Sepertinya Anda belum menambahkan produk apapun.</p>
                <Link
                    to="/products"
                    className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
                >
                    Mulai Belanja
                </Link>
            </div>
        );
    }

    return (
        <main className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 py-8 md:py-12">
            {/* Page Header */}
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-dark dark:text-white tracking-tight mb-2">Keranjang Belanja</h1>
                <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-primary"></span>
                    <p className="text-neutral-500 dark:text-neutral-400 font-medium">Periksa kembali pilihanmu sebelum checkout</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 relative">
                {/* Left Column: Product List */}
                <div className="flex-1 w-full">
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-neutral-light dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-neutral-dark dark:text-neutral-200 w-[45%]">Produk</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-neutral-dark dark:text-neutral-200 w-[20%]">Harga</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-neutral-dark dark:text-neutral-200 w-[20%] text-center">Kuantitas</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-neutral-dark dark:text-neutral-200 w-[15%] text-right">Total</th>
                                    <th className="px-4 py-4 w-[50px]"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                                {cartItems.map((item) => (
                                    <tr key={`${item.id}-${item.size}`} className="group hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                                        <td className="px-6 py-6">
                                            <div className="flex gap-4">
                                                <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 border border-neutral-200 dark:border-neutral-700">
                                                    <img
                                                        alt={item.name}
                                                        className="h-full w-full object-cover"
                                                        src={item.image || item.imageUrl}
                                                    />
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <h3 className="font-bold text-neutral-dark dark:text-white text-base mb-1">{item.name}</h3>
                                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Ukuran: {item.size || 'Standard'}</p>
                                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Warna: {item.color || 'Default'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 align-middle">
                                            <span className="text-sm font-medium text-neutral-dark dark:text-neutral-200">
                                                Rp {item.price.toLocaleString('id-ID')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 align-middle">
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                    className="size-8 rounded-full border border-neutral-200 dark:border-neutral-600 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-primary transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">remove</span>
                                                </button>
                                                <span className="w-6 text-center text-sm font-bold text-neutral-dark dark:text-white">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                    className="size-8 rounded-full border border-neutral-200 dark:border-neutral-600 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-primary transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">add</span>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 align-middle text-right">
                                            <span className="text-base font-bold text-primary">
                                                Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                                            </span>
                                        </td>
                                        <td className="px-4 py-6 align-middle text-center">
                                            <button
                                                onClick={() => removeFromCart(item.id, item.size)}
                                                className="text-neutral-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile List View */}
                    <div className="flex flex-col gap-4 md:hidden">
                        {cartItems.map((item) => (
                            <div key={`${item.id}-${item.size}-mobile`} className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 shadow-sm flex gap-4">
                                <div className="h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                    <img
                                        alt={item.name}
                                        className="h-full w-full object-cover"
                                        src={item.image || item.imageUrl}
                                    />
                                </div>
                                <div className="flex flex-col flex-1 justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-neutral-dark dark:text-white text-sm">{item.name}</h3>
                                            <button
                                                onClick={() => removeFromCart(item.id, item.size)}
                                                className="text-neutral-400 hover:text-red-500 p-1 -mr-2 -mt-2"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">close</span>
                                            </button>
                                        </div>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">{item.color || 'Default'} / {item.size || 'Standard'}</p>
                                        <p className="text-primary font-bold text-sm">Rp {item.price.toLocaleString('id-ID')}</p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                            className="size-7 rounded border border-neutral-200 dark:border-neutral-600 flex items-center justify-center text-neutral-500 bg-neutral-50 dark:bg-neutral-700"
                                        >
                                            <span className="material-symbols-outlined text-[14px]">remove</span>
                                        </button>
                                        <span className="text-sm font-bold text-neutral-dark dark:text-white">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                            className="size-7 rounded border border-neutral-200 dark:border-neutral-600 flex items-center justify-center text-neutral-500 bg-neutral-50 dark:bg-neutral-700"
                                        >
                                            <span className="material-symbols-outlined text-[14px]">add</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex items-center">
                        <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-neutral-dark dark:text-white hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[18px] rotate-180">arrow_right_alt</span>
                            Lanjut Belanja
                        </Link>
                    </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="w-full lg:w-[380px] shrink-0">
                    <div className="sticky top-24 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm overflow-hidden">
                        <div className="p-6 md:p-8">
                            <h2 className="text-xl font-bold text-neutral-dark dark:text-white mb-6">Ringkasan Pesanan</h2>
                            <div className="flex flex-col gap-4 mb-6">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-neutral-500 dark:text-neutral-400">Subtotal</span>
                                    <span className="font-semibold text-neutral-dark dark:text-neutral-200">Rp {totalPrice.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-neutral-500 dark:text-neutral-400">Ongkos Kirim (Est.)</span>
                                    <span className="font-semibold text-neutral-dark dark:text-neutral-200">Rp {SHIPPING_COST.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-neutral-500 dark:text-neutral-400">Pajak (11%)</span>
                                    <span className="font-semibold text-neutral-dark dark:text-neutral-200">Rp {taxAmount.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm pb-4 border-b border-neutral-200 dark:border-neutral-700 border-dashed">
                                    <span className="text-neutral-500 dark:text-neutral-400">Diskon</span>
                                    <span className="font-semibold text-green-600">- Rp 0</span>
                                </div>
                            </div>

                            {/* Voucher Code */}
                            <div className="mb-6">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2" htmlFor="promo">Kode Promo</label>
                                <div className="flex gap-2">
                                    <input
                                        className="flex-1 h-10 px-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-light dark:bg-neutral-900 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400 text-neutral-dark dark:text-white"
                                        id="promo"
                                        placeholder="Masukkan kode"
                                        type="text"
                                    />
                                    <button className="h-10 px-4 bg-neutral-dark dark:bg-neutral-700 text-white rounded-lg text-sm font-bold hover:opacity-90 transition-colors">
                                        Gunakan
                                    </button>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-end mb-8 pt-2">
                                <span className="text-base font-bold text-neutral-dark dark:text-white">Total Pembayaran</span>
                                <span className="text-2xl font-black text-primary tracking-tight">Rp {finalTotal.toLocaleString('id-ID')}</span>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-lg text-base font-bold tracking-wide shadow-md shadow-primary/30 transition-all active:scale-[0.98]"
                            >
                                Checkout
                            </button>

                            <div className="mt-4 flex items-center justify-center gap-2 text-neutral-500 dark:text-neutral-400">
                                <span className="material-symbols-outlined text-[16px]">lock</span>
                                <span className="text-xs font-medium">Pembayaran aman & terenkripsi</span>
                            </div>
                        </div>
                        <div className="bg-neutral-50 dark:bg-neutral-700/30 px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
                            <p className="text-xs text-center text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                Gratis ongkir untuk pembelian di atas Rp 500.000. Pengembalian barang mudah dalam 30 hari.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Cart;
