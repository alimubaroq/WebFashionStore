import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Home = () => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    // Dummy product data for static home page (usually this comes from API)
    const featuredProducts = [
        { id: 1, name: 'Graphic Street Tee', price: 149000, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnhwz9exaoBkCjE7iB-uJwu17e2eB2h2sMEug09qB7uTD3Jv6HEolcO6jLeVGvSpIdB4qJ29hPCmK67kPfBNCkBbD8CjPCtsXfNRrSBRn9bgbWsw6QswNJp2BY9dDsgqKX--NkT-F5wfrJNJftR6uXWooqyna0mmRCkRjvLz7WrktlsMnsN5PSj_8B3awbZkS0YXuDMC5GAT3F2yiFcCaL_uByI6X-vBn3mZVZvAtpN6uV-7bgJwvYoGcCBIhaOnwQpIwuxRqlvrA' },
        { id: 2, name: 'Urban Walk Sneakers', price: 399000, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWEbsk53FmQ8CXxJCMW2kddt5VFCNkSDHde9WjDaaqmd4FJqNwzOUv2FAj-DT30RuDLYa9o-i_XibeY2SMbiNgzSvb8NXL1x-t8-bzOL3HH3NjBodwg8FbU348byQZ9FbEI8_luPG-UtpxHXid1v8PeYIdgvGZE_MoGblxAc6IqVPkBJkcZvg7TTtNOPNqg51Q3jP1kv_zahs_oR0xFjvW0_oaEqn1J_KepQHlvaV3ScxXj8nZD_Zbj8kTfGgzGG1NaZylri6LAvo' },
        { id: 3, name: 'Oversized Hoodie Beige', price: 249000, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs8VIWFkIMq3Bf5jXhKh2HGMLWyiQRrALGtOOuKt_OfvvLpiIREXIlV7xmRJAuQ8xfTBSMQo6ZHjZvFlzoOu_wYb7cjaI4ChIteXFYoZJelQs9CZ25SAf3WPJE4u2uXDlXvt8um-rB3hr7WfS8Izko5LXYzCK1c54C1iwk7RSwcByIYuIfh2IOj5y-ltJZahCjjPymyTpa5Abua5tp4Sy-ZOlKKldLc3Mq5H9qVuT06B4Hg6lGnCuBvnTV0MQu2Pt-oNEz7eQ9_H8' },
        { id: 4, name: 'Tactical Cargo Pants', price: 279000, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHR02ORmuAfp0sYnQI1fLb8IF_mvoPV2eTFZjSic0xiHPazC4envdYAOvA3FkeXHWieUv8Gv6APPB9NFgI0eBa8q9Fz7_PC4mkh4_PNkXEPNlI97jEGeF9jpch8kVjjOk7kBmAV8U0RPSJYyv9iT77n9PIS_9xfH-Rmxds5v5eRd1BaA9d6G0D7lX8ukucnDxLJUpr1G7tGjRQPRyUSunsyO9wdCR_w1kyZForGb3jsvcPLmotA-3Vp8weOuNDUgvnVwv7lWs9vRQ' },
    ];

    const handleAddToCart = (product) => {
        addToCart(product);
        alert('Produk berhasil ditambahkan ke keranjang!'); // Simple feedback
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="relative w-full overflow-hidden bg-background-light dark:bg-background-dark py-12 lg:py-20">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="flex flex-col gap-6 order-2 lg:order-1 text-center lg:text-left">
                            <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-primary font-bold text-sm tracking-widest uppercase">
                                <span className="w-8 h-[2px] bg-primary"></span>
                                New Collection 2024
                            </div>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] text-neutral-dark dark:text-white tracking-tight">
                                Tampil Stylish <br />
                                <span className="relative inline-block">
                                    <span className="relative z-10">Setiap Hari</span>
                                    <span className="absolute bottom-2 left-0 w-full h-4 bg-primary/40 -rotate-1 -z-0"></span>
                                </span>
                            </h1>
                            <p className="text-lg text-neutral-600 dark:text-slate-300 max-w-lg mx-auto lg:mx-0">
                                Temukan koleksi terbaru kami yang dirancang untuk kenyamanan dan gaya modern minimalis Anda. Buat setiap momen berkesan.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                                <Link to="/products" className="bg-primary hover:bg-primary/90 text-neutral-dark px-8 py-4 rounded-lg text-base font-bold transition-all hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none flex items-center justify-center gap-2">
                                    <span>Shop Now</span>
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </Link>
                                <Link to="/products" className="bg-white dark:bg-surface-dark border-2 border-slate-200 dark:border-slate-700 text-neutral-dark dark:text-white px-8 py-4 rounded-lg text-base font-bold transition-all hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary text-center flex items-center justify-center">
                                    Lihat Katalog
                                </Link>
                            </div>
                        </div>
                        {/* Hero Image */}
                        <div className="order-1 lg:order-2 relative">
                            <div className="absolute top-10 right-10 w-full h-full bg-primary/20 rounded-2xl -z-10 translate-x-4 translate-y-4 hidden lg:block"></div>
                            <div className="relative w-full aspect-[4/5] lg:aspect-square overflow-hidden rounded-2xl bg-slate-200">
                                <img alt="Fashionable man in streetwear jacket posing confidently" className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNeRqFkj9lF6kwG_WxPKPLVuelzH_nBivwGaTc_LpycLgkwgqP2yWMtaOGUbHz-ikDsaokkyU3ywKvqUcsH8E0BVBQw47pwBimAZy8N4p3yOT3NNqdJLcMO3iqMsnuagNEhrD8nKrrANkxbE39j7octHmquRJdr492rQsugz9kCicoydt5-RAmj7zS9DyYNujZo6QBKknkFj13K7WxeiA1HqKvg2uuTfVjKSQUD2RaQcDrWmqVzYD6gpLNPeFFz-eaj2fZSuRjIN0" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 bg-surface-light dark:bg-surface-dark">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark dark:text-white">Kategori Pilihan</h2>
                        <a className="text-primary font-bold text-sm hover:underline flex items-center gap-1" href="#">
                            Lihat Semua <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {/* Category Item 1 */}
                        <a className="group relative overflow-hidden rounded-xl aspect-[4/5] bg-slate-100" href="#">
                            <img alt="Person wearing a simple white t-shirt" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFFmcSOPNm7JP0WK86XqptsoxLHTNdoezIi25bdwm7-pydNLOBRL9HJOPZMOJmURbMmGvO6We7DwYAVZrtesrWMayhvRXkvVvXla0F42znP3RTxo9UnqlW7RLhrk4jTUyH6864uC8pnhtS91AyHNPluFg-CCrg0uqPfUo7G98PqevIxHiMfiF1IRjL1himREuhxlU07dz0MkRqE-_rsjMaWcidKoX_FDoMPOlvLzNkVzEw6lJ5qyj3dKzv86saXDCOdh4IX3dA4sA" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                                <div>
                                    <p className="text-white text-lg font-bold">Kaos</p>
                                    <p className="text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">Essential Tees</p>
                                </div>
                            </div>
                        </a>
                        {/* Category Item 2 */}
                        <a className="group relative overflow-hidden rounded-xl aspect-[4/5] bg-slate-100" href="#">
                            <img alt="Person wearing a comfortable hoodie" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxJJBxizHBQ3YgnhYuE-WGtu1IbMKruKxnFCl64Bau2puniAMNZZnkQDKq0N5cgCvcnUjIzj5HS0XqMoj7cNupnreAdRqqdSCDKdiTUsbOTUUGK66ATBlNxo8h6gf4mwlO8PNDeSvZ4GZL5txgF0-6SVBClU7G97N2b-aent4np4O3NOU_BYJoByNPgLfCoftCzFXWehLFiVwQa9s2HHLmhOFRlDLavwAHho7uVT9ORivqC3jBN3r9gSIG43U_CKFBQPtur15avbY" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                                <div>
                                    <p className="text-white text-lg font-bold">Hoodie</p>
                                    <p className="text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">Cozy Layers</p>
                                </div>
                            </div>
                        </a>
                        {/* Category Item 3 */}
                        <a className="group relative overflow-hidden rounded-xl aspect-[4/5] bg-slate-100" href="#">
                            <img alt="Stylish denim jacket outfit" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCl2JtYJq8FBMEUWWilYWGg43bll6fMV2VRLXh-HYt4fgL7NZbEbKuWHPFVsu6cTyJXrsK_olKP1TLHffBdrhcsQK_56yHlZsA5ajtXUhbCyf3gCKTyfRluz0k6P2EO-NgAZu9u0dwKxyhob1RKZxC2yK3FttG8CZRohwZnMkg850iAexIRwx8VqOVEBjsv7qEJxkW2NJwwU0s_9vFkGmkuRA-MIc2GgMg4mm7j2GLZ2dOXS33IC2SD6au9rU7pouH0MNxdsSMxafg" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                                <div>
                                    <p className="text-white text-lg font-bold">Jaket</p>
                                    <p className="text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">Outerwear</p>
                                </div>
                            </div>
                        </a>
                        {/* Category Item 4 */}
                        <a className="group relative overflow-hidden rounded-xl aspect-[4/5] bg-slate-100" href="#">
                            <img alt="Folded denim jeans stack" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCidmfa4l5pHoPhlc9CSiQ6ljTy49K6BvgPEPs7yBI6fUWI-bTbiO8Fp0qAo1CoqYLuMrFBlfhkyZB1WOXREoDzJMd73szrGtLM_cVWDnE9iSfzCkIL2F1cloUH7teUbTvIpIw09khbgJlRMtedq3SCQHsZLCEI2wvxXDOs0W3d1XyhuE9M6LVLgYnaHFP2K3WdaMMsW0n519cjwHUTQSJvNukWYORUzL8q7-AUA5xWnwry53GOyId2OPs0IfPlwZ2Hbf-jpLhT52c" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                                <div>
                                    <p className="text-white text-lg font-bold">Celana</p>
                                    <p className="text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">Bottoms</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-background-light dark:bg-background-dark">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark dark:text-white mb-3">Produk Unggulan</h2>
                        <p className="text-neutral-600 dark:text-slate-400">Pilihan favorit pelanggan kami bulan ini</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Product 1 */}
                        <div className="group bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-800">
                            <div className="relative aspect-[4/5] overflow-hidden bg-slate-200">
                                <span className="absolute top-3 left-3 bg-primary text-neutral-dark text-xs font-bold px-2 py-1 rounded z-10">Best Seller</span>
                                <img alt="Black graphic t-shirt front view" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnhwz9exaoBkCjE7iB-uJwu17e2eB2h2sMEug09qB7uTD3Jv6HEolcO6jLeVGvSpIdB4qJ29hPCmK67kPfBNCkBbD8CjPCtsXfNRrSBRn9bgbWsw6QswNJp2BY9dDsgqKX--NkT-F5wfrJNJftR6uXWooqyna0mmRCkRjvLz7WrktlsMnsN5PSj_8B3awbZkS0YXuDMC5GAT3F2yiFcCaL_uByI6X-vBn3mZVZvAtpN6uV-7bgJwvYoGcCBIhaOnwQpIwuxRqlvrA" />
                                <button className="absolute bottom-4 right-4 bg-white text-neutral-dark p-2 rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary">
                                    <span className="material-symbols-outlined">add_shopping_cart</span>
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="text-neutral-dark dark:text-white font-bold text-lg mb-1 truncate">Graphic Street Tee</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">Kaos</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-primary font-bold text-lg">Rp 149.000</span>
                                    <div className="flex gap-1">
                                        <span className="w-3 h-3 rounded-full bg-black border border-slate-300"></span>
                                        <span className="w-3 h-3 rounded-full bg-white border border-slate-300"></span>
                                    </div>
                                </div>
                                <button className="w-full mt-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-neutral-dark dark:text-white hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-colors">
                                    Tambah ke Keranjang
                                </button>
                            </div>
                        </div>
                        {/* Product 2 */}
                        <div className="group bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-800">
                            <div className="relative aspect-[4/5] overflow-hidden bg-slate-200">
                                <span className="absolute top-3 left-3 bg-neutral-dark text-white text-xs font-bold px-2 py-1 rounded z-10">New</span>
                                <img alt="White minimalist sneakers" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWEbsk53FmQ8CXxJCMW2kddt5VFCNkSDHde9WjDaaqmd4FJqNwzOUv2FAj-DT30RuDLYa9o-i_XibeY2SMbiNgzSvb8NXL1x-t8-bzOL3HH3NjBodwg8FbU348byQZ9FbEI8_luPG-UtpxHXid1v8PeYIdgvGZE_MoGblxAc6IqVPkBJkcZvg7TTtNOPNqg51Q3jP1kv_zahs_oR0xFjvW0_oaEqn1J_KepQHlvaV3ScxXj8nZD_Zbj8kTfGgzGG1NaZylri6LAvo" />
                                <button className="absolute bottom-4 right-4 bg-white text-neutral-dark p-2 rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary">
                                    <span className="material-symbols-outlined">add_shopping_cart</span>
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="text-neutral-dark dark:text-white font-bold text-lg mb-1 truncate">Urban Walk Sneakers</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">Sepatu</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-primary font-bold text-lg">Rp 399.000</span>
                                    <div className="flex gap-1">
                                        <span className="w-3 h-3 rounded-full bg-white border border-slate-300"></span>
                                    </div>
                                </div>
                                <button className="w-full mt-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-neutral-dark dark:text-white hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-colors">
                                    Tambah ke Keranjang
                                </button>
                            </div>
                        </div>
                        {/* Product 3 */}
                        <div className="group bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-800">
                            <div className="relative aspect-[4/5] overflow-hidden bg-slate-200">
                                <img alt="Beige oversized hoodie" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCs8VIWFkIMq3Bf5jXhKh2HGMLWyiQRrALGtOOuKt_OfvvLpiIREXIlV7xmRJAuQ8xfTBSMQo6ZHjZvFlzoOu_wYb7cjaI4ChIteXFYoZJelQs9CZ25SAf3WPJE4u2uXDlXvt8um-rB3hr7WfS8Izko5LXYzCK1c54C1iwk7RSwcByIYuIfh2IOj5y-ltJZahCjjPymyTpa5Abua5tp4Sy-ZOlKKldLc3Mq5H9qVuT06B4Hg6lGnCuBvnTV0MQu2Pt-oNEz7eQ9_H8" />
                                <button className="absolute bottom-4 right-4 bg-white text-neutral-dark p-2 rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary">
                                    <span className="material-symbols-outlined">add_shopping_cart</span>
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="text-neutral-dark dark:text-white font-bold text-lg mb-1 truncate">Oversized Hoodie Beige</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">Hoodie</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-primary font-bold text-lg">Rp 249.000</span>
                                    <div className="flex gap-1">
                                        <span className="w-3 h-3 rounded-full bg-[#e8e4d9] border border-slate-300"></span>
                                        <span className="w-3 h-3 rounded-full bg-black border border-slate-300"></span>
                                    </div>
                                </div>
                                <button className="w-full mt-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-neutral-dark dark:text-white hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-colors">
                                    Tambah ke Keranjang
                                </button>
                            </div>
                        </div>
                        {/* Product 4 */}
                        <div className="group bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-800">
                            <div className="relative aspect-[4/5] overflow-hidden bg-slate-200">
                                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">-20%</span>
                                <img alt="Cargo pants green" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHR02ORmuAfp0sYnQI1fLb8IF_mvoPV2eTFZjSic0xiHPazC4envdYAOvA3FkeXHWieUv8Gv6APPB9NFgI0eBa8q9Fz7_PC4mkh4_PNkXEPNlI97jEGeF9jpch8kVjjOk7kBmAV8U0RPSJYyv9iT77n9PIS_9xfH-Rmxds5v5eRd1BaA9d6G0D7lX8ukucnDxLJUpr1G7tGjRQPRyUSunsyO9wdCR_w1kyZForGb3jsvcPLmotA-3Vp8weOuNDUgvnVwv7lWs9vRQ" />
                                <button className="absolute bottom-4 right-4 bg-white text-neutral-dark p-2 rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary">
                                    <span className="material-symbols-outlined">add_shopping_cart</span>
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="text-neutral-dark dark:text-white font-bold text-lg mb-1 truncate">Tactical Cargo Pants</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">Celana</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-primary font-bold text-lg">Rp 279.000</span>
                                        <span className="text-slate-400 text-xs line-through">Rp 349.000</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <span className="w-3 h-3 rounded-full bg-[#4a5d4f] border border-slate-300"></span>
                                        <span className="w-3 h-3 rounded-full bg-black border border-slate-300"></span>
                                    </div>
                                </div>
                                <button className="w-full mt-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-neutral-dark dark:text-white hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-colors">
                                    Tambah ke Keranjang
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Store USPs */}
            <section className="py-12 bg-surface-light dark:bg-surface-dark border-y border-[#e7f3eb] dark:border-slate-800">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-3xl">verified</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-neutral-dark dark:text-white text-lg">Bahan Berkualitas</h3>
                                <p className="text-sm text-neutral-600 dark:text-slate-400">Material premium dan tahan lama untuk gaya terbaik.</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-3xl">attach_money</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-neutral-dark dark:text-white text-lg">Harga Terjangkau</h3>
                                <p className="text-sm text-neutral-600 dark:text-slate-400">Fashion berkelas dengan harga yang pas di kantong.</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-3xl">local_shipping</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-neutral-dark dark:text-white text-lg">Pengiriman Cepat</h3>
                                <p className="text-sm text-neutral-600 dark:text-slate-400">Layanan pengiriman ekspres ke seluruh Indonesia.</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-3xl">lock</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-neutral-dark dark:text-white text-lg">Pembayaran Aman</h3>
                                <p className="text-sm text-neutral-600 dark:text-slate-400">Transaksi aman dan mudah dengan berbagai metode.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-background-light dark:bg-background-dark">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-neutral-dark dark:text-white mb-10">Kata Mereka</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Testimonial 1 */}
                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <div className="flex text-primary mb-4">
                                <span className="material-symbols-outlined">star</span>
                                <span className="material-symbols-outlined">star</span>
                                <span className="material-symbols-outlined">star</span>
                                <span className="material-symbols-outlined">star</span>
                                <span className="material-symbols-outlined">star</span>
                            </div>
                            <p className="text-neutral-600 dark:text-slate-300 italic mb-6">"Gak nyangka bahannya seadem ini! Potongannya juga pas banget di badan, bikin keliatan lebih stylish."</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                                    <img alt="Avatar of Sarah K." className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXTFz4O-KtA-VIQwCTUnr1nqc3ZuYtd27oI7Ylw7MH4l3Gl6SKiodrSGYpfwJBvMN-sFw2wW4UmHQP8U3Jy-hGJHiMLzFRLj0Z4pTZx5R16h_E9OkwqhYkAL7La-1KivHrdWmOWMxFdklDB7n7_1E-b4HTKYXoHkWJhZNN8ucyHs68TZCRVnZfKn4eXt29Eww-eXIrMBhOH6Gupi-GAzTZdkU63Fo9JdB8QmZr6Il_YzU2x3jD3nkA0C578UCBB8qyDe6Lv1lXFJU" />
                                </div>
                                <div>
                                    <p className="font-bold text-neutral-dark dark:text-white text-sm">Sarah K.</p>
                                    <p className="text-xs text-slate-500">Jakarta</p>
                                </div>
                            </div>
                        </div>
                        {/* Testimonial 2 */}
                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <div className="flex text-primary mb-4">
                                <span className="material-symbols-outlined">star</span>
                                <span className="material-symbols-outlined">star</span>
                                <span className="material-symbols-outlined">star</span>
                                <span className="material-symbols-outlined">star</span>
                                <span className="material-symbols-outlined">star_half</span>
                            </div>
                            <p className="text-neutral-600 dark:text-slate-300 italic mb-6">"Pengiriman cepet banget, pesen pagi sore udah sampe. Bajunya keren, fix bakal langganan disini."</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                                    <img alt="Avatar of Budi S." className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgTyyD8-_aTLHacNWgReAUB3zbBCAR4eqeYFLJRv1RcIKfxbwwJUve2ajF-1kHl1PHVFvHw3uU0GPSanZN0Gx6EFf20o3w7Y5AmeKawIp1eCMgywQ8vP0oPJxPwuoPKCFcUL267v8w8lyBtOlOtP1BE2buXsMXugw9ZFgMw6eH4HLsRXgyFxAw8vVm-QKoYnE6S4vaE2QfeZrF6JiGH28FPGILn_Q0LQYHj1V25Ws3iKF4DPVXPdiR8gs0acvH5-K-5kZQGpxa_fU" />
                                </div>
                                <div>
                                    <p className="font-bold text-neutral-dark dark:text-white text-sm">Budi S.</p>
                                    <p className="text-xs text-slate-500">Bandung</p>
                                </div>
                            </div>
                        </div>
                        {/* Testimonial 3 */}
                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <div className="flex text-primary mb-4">
                                <span className="material-symbols-outlined">star</span>
                                <span className="material-symbols-outlined">star</span>
                                <span className="material-symbols-outlined">star</span>
                                <span className="material-symbols-outlined">star</span>
                                <span className="material-symbols-outlined">star</span>
                            </div>
                            <p className="text-neutral-600 dark:text-slate-300 italic mb-6">"Hoodienya cozy banget buat daily wear. Warnanya juga sesuai sama foto katalog. Worth it!"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                                    <img alt="Avatar of Jessica T." className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG6cgWqM6PbRFhwWoU0rLWwPz0gdwKEZ5mjIPEuLoVE4ZBWXmvLl7_eUCNkveq_scnq26KEPynnTdbBP75Ru6TNoTcvWuS7Q5EFzlMUyNsI_nTDOcLLnB_A53ahJ5aerwtI6-uUsM_WWCBJWvycr1uK1hKHUHSkMNliyxt5IAxw753TCzr51Gp47spo5eeSRQtADp1O7DW_2blo2EzxzkUtKXXNjsuPm01EReGy7zVxifhAw4LQMAtRO1Ya-hTzWNENj9g5oMI6xk" />
                                </div>
                                <div>
                                    <p className="font-bold text-neutral-dark dark:text-white text-sm">Jessica T.</p>
                                    <p className="text-xs text-slate-500">Surabaya</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Promo Banner */}
            <section className="py-10 bg-primary text-neutral-dark">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-2xl md:text-4xl font-black mb-2 uppercase tracking-tight">Flash Sale Akhir Tahun!</h3>
                    <p className="text-lg font-bold mb-6">Gunakan kode <span className="bg-black text-primary px-2 py-1 rounded mx-1 font-mono">MODERN50</span> untuk diskon 50%</p>
                    <div className="flex justify-center gap-4">
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg min-w-[70px]">
                            <span className="block text-2xl font-bold">02</span>
                            <span className="text-xs font-bold uppercase">Jam</span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg min-w-[70px]">
                            <span className="block text-2xl font-bold">15</span>
                            <span className="text-xs font-bold uppercase">Menit</span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg min-w-[70px]">
                            <span className="block text-2xl font-bold">45</span>
                            <span className="text-xs font-bold uppercase">Detik</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-20 bg-surface-light dark:bg-surface-dark border-b border-[#e7f3eb] dark:border-slate-800">
                <div className="max-w-xl mx-auto px-4 text-center">
                    <span className="material-symbols-outlined text-4xl text-primary mb-4">mail</span>
                    <h2 className="text-3xl font-bold text-neutral-dark dark:text-white mb-4">Jangan Lewatkan Promo Eksklusif</h2>
                    <p className="text-neutral-600 dark:text-slate-400 mb-8">Daftarkan email Anda untuk mendapatkan info koleksi terbaru dan voucher diskon spesial.</p>
                    <form className="flex flex-col sm:flex-row gap-3">
                        <input className="flex-1 px-5 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-neutral-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Masukkan alamat email Anda" type="email" />
                        <button type="button" className="bg-neutral-dark dark:bg-white text-white dark:text-neutral-dark px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity whitespace-nowrap">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Home;
