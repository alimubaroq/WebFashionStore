import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-background-light dark:bg-background-dark border-t border-neutral-light dark:border-neutral-800 pt-16 pb-8 transition-colors duration-200">
            <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 text-neutral-dark dark:text-white group mb-4">
                            <div className="size-6 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-3xl">diamond</span>
                            </div>
                            <h2 className="text-xl font-bold tracking-tight">LuxeWear</h2>
                        </Link>
                        <p className="text-sm text-neutral-500 mb-6">
                            Fashion modern yang mendefinisikan kepribadianmu. Elegan, minimalis, dan selalu relevan.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Icons Placeholder */}
                            {['Ig', 'Tk', 'Wa'].map((social, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-neutral-light dark:bg-neutral-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-neutral-dark dark:text-white">
                                    <i className="text-lg font-bold not-italic">{social}</i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-neutral-dark dark:text-white">Belanja</h4>
                        <ul className="space-y-2 text-sm text-neutral-500">
                            <li><Link to="/products" className="hover:text-primary transition-colors">Koleksi Pria</Link></li>
                            <li><Link to="/products" className="hover:text-primary transition-colors">Koleksi Wanita</Link></li>
                            <li><Link to="/products" className="hover:text-primary transition-colors">Aksesoris</Link></li>
                            <li><Link to="/products" className="hover:text-primary transition-colors">New Arrivals</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-neutral-dark dark:text-white">Bantuan</h4>
                        <ul className="space-y-2 text-sm text-neutral-500">
                            <li><a href="#" className="hover:text-primary transition-colors">Status Pesanan</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Konfirmasi Pembayaran</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Pengiriman</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Penukaran Barang</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-neutral-dark dark:text-white">Newsletter</h4>
                        <p className="text-sm text-neutral-500 mb-4">Dapatkan info promo terbaru.</p>
                        <div className="flex gap-2">
                            <input
                                className="w-full bg-neutral-light dark:bg-neutral-800 border-none rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary text-neutral-dark dark:text-white"
                                placeholder="Email kamu"
                                type="email"
                            />
                            <button className="bg-primary text-white p-2 rounded hover:opacity-90">
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-neutral-light dark:border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-400">
                    <p>© 2026 LuxeWear. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
