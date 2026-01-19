import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Products = () => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                // Ensure we handle potential missing images or fallback
                const data = response.data.map(p => ({
                    ...p,
                    image: p.imageUrl || 'https://via.placeholder.com/400x500?text=No+Image'
                }));
                // Sort by newest by default (assuming higher ID/timestamp is newer, or just reverse)
                setProducts(data.reverse());
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
        alert('Produk berhasil ditambahkan ke keranjang!');
    };

    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 9; // Show 9 items per page for better layout

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 md:px-10 lg:px-20 py-8">
            {/* Page Header */}
            <section className="mb-10 text-center md:text-left border-b border-neutral-light dark:border-neutral-800 pb-8">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-neutral-dark dark:text-white uppercase">Koleksi Kami</h1>
                <p className="text-accent-text text-lg font-medium">Temukan gaya terbaikmu di sini, dari casual hingga formal.</p>
            </section>

            {/* Main Grid Layout */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters (Desktop) */}
                <aside className="w-full lg:w-64 shrink-0 space-y-8 hidden lg:block sticky top-24 h-fit max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
                    {/* Filter: Categories */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-neutral-dark dark:text-white">
                            <span className="material-symbols-outlined text-primary text-xl">category</span>
                            Kategori
                        </h3>
                        <div className="space-y-3">
                            {['Kaos & T-Shirts', 'Hoodie & Sweater', 'Jaket & Outerwear', 'Celana Panjang', 'Aksesoris'].map((cat, idx) => (
                                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="rounded border-neutral-300 text-primary focus:ring-primary h-5 w-5 bg-neutral-light dark:bg-neutral-800 dark:border-neutral-700 accent-primary"
                                        defaultChecked={idx === 1}
                                    />
                                    <span className="text-sm font-medium group-hover:text-primary transition-colors text-neutral-dark dark:text-neutral-300">{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Filter: Sizes */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-neutral-dark dark:text-white">
                            <span className="material-symbols-outlined text-primary text-xl">straighten</span>
                            Ukuran
                        </h3>
                        <div className="grid grid-cols-4 gap-2">
                            {['S', 'M', 'L', 'XL'].map((size) => (
                                <button
                                    key={size}
                                    className={`h-10 w-full rounded font-medium text-sm flex items-center justify-center transition-all ${size === 'M'
                                        ? 'bg-primary text-white border border-primary'
                                        : 'bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 hover:border-primary hover:text-primary text-neutral-dark dark:text-neutral-300'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Filter: Price Range */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-neutral-dark dark:text-white">
                            <span className="material-symbols-outlined text-primary text-xl">attach_money</span>
                            Rentang Harga
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between text-xs font-semibold text-accent-text">
                                <span>IDR 100k</span>
                                <span>IDR 2.000k</span>
                            </div>
                            <div className="relative h-1.5 w-full bg-neutral-light dark:bg-neutral-700 rounded-full">
                                <div className="absolute left-0 top-0 h-full w-2/3 bg-primary rounded-full"></div>
                                <div className="absolute left-2/3 top-1/2 -translate-y-1/2 h-4 w-4 bg-white border-2 border-primary rounded-full shadow cursor-pointer hover:scale-110 transition-transform"></div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-2 py-1 text-xs w-full text-neutral-dark dark:text-neutral-300">Min: 100.000</div>
                                <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-2 py-1 text-xs w-full text-neutral-dark dark:text-neutral-300">Max: 850.000</div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid Area */}
                <div className="flex-1">
                    {/* Toolbar: Mobile Filter Toggle & Sorting */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sticky top-20 lg:static z-20 bg-background-light dark:bg-background-dark py-2 lg:py-0">
                        {/* Mobile Filter Button */}
                        <button className="lg:hidden flex items-center gap-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm w-full sm:w-auto justify-center text-neutral-dark dark:text-white">
                            <span className="material-symbols-outlined">filter_list</span>
                            Filter & Sort
                        </button>

                        {/* Result Count */}
                        <p className="text-sm text-neutral-500 font-medium hidden sm:block">
                            Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, products.length)} dari {products.length} produk
                        </p>

                        {/* Sorting */}
                        <div className="relative group min-w-[200px] hidden sm:block">
                            <div className="flex items-center justify-between cursor-pointer bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-4 py-2 rounded-lg shadow-sm hover:border-primary transition-colors text-neutral-dark dark:text-white">
                                <span className="text-sm font-medium">Urutkan: Terbaru</span>
                                <span className="material-symbols-outlined text-lg">expand_more</span>
                            </div>
                            {/* Dropdown Content */}
                            <div className="absolute right-0 top-full mt-2 w-full bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30">
                                <div className="p-1">
                                    <a className="block px-3 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded text-primary font-bold" href="#">Terbaru</a>
                                    <a className="block px-3 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded text-neutral-dark dark:text-neutral-200" href="#">Harga Terendah</a>
                                    <a className="block px-3 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded text-neutral-dark dark:text-neutral-200" href="#">Harga Tertinggi</a>
                                    <a className="block px-3 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded text-neutral-dark dark:text-neutral-200" href="#">Terpopuler</a>
                                </div>
                            </div>
                        </div>

                        {/* Chips (Desktop quick filter placeholder mainly for mobile view but requested in HTML) */}
                        <div className="flex lg:hidden gap-2 overflow-x-auto w-full pb-2">
                            <span className="whitespace-nowrap px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">Hoodie</span>
                            <span className="whitespace-nowrap px-3 py-1 bg-neutral-light dark:bg-neutral-800 text-xs font-medium rounded-full text-neutral-dark dark:text-neutral-300">Size M</span>
                            <span className="whitespace-nowrap px-3 py-1 bg-neutral-light dark:bg-neutral-800 text-xs font-medium rounded-full text-neutral-dark dark:text-neutral-300">New Arrival</span>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                        {currentItems.map((product) => (
                            <div key={product.id} className="group flex flex-col gap-3">
                                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-200">
                                    <img alt={product.name} className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105" src={product.image} />
                                    {product.id === 1 && <div className="absolute top-3 left-3 bg-neutral-dark text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Best Seller</div>}
                                    {product.id === 2 && <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">New Arrival</div>}
                                    {product.id === 5 && <div className="absolute top-3 left-3 bg-neutral-500/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Limited</div>}

                                    <button className="absolute top-3 right-3 bg-white/80 p-1.5 rounded-full text-neutral-dark hover:bg-primary hover:text-white transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300 backdrop-blur-sm">
                                        <span className="material-symbols-outlined text-sm">favorite</span>
                                    </button>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="absolute bottom-4 left-4 right-4 bg-white text-neutral-dark hover:bg-primary hover:text-white font-bold text-sm py-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                                        Tambah ke Keranjang
                                    </button>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-base font-bold text-neutral-dark dark:text-white group-hover:text-primary transition-colors">{product.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-accent-text">Rp {product.price.toLocaleString('id-ID')}</p>
                                        <div className="flex gap-1">
                                            {/* Dummy color swatches for variety */}
                                            <div className="w-3 h-3 rounded-full bg-black border border-gray-300 shadow-sm"></div>
                                            <div className="w-3 h-3 rounded-full bg-white border border-gray-300 shadow-sm"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-16 flex justify-center">
                        <nav className="flex items-center gap-2">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg hover:bg-neutral-light dark:hover:bg-neutral-800 disabled:opacity-50 text-neutral-dark dark:text-white disabled:cursor-not-allowed"
                            >
                                <span className="material-symbols-outlined text-sm">arrow_back_ios_new</span>
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => paginate(i + 1)}
                                    className={`w-10 h-10 rounded-lg font-medium flex items-center justify-center transition-colors ${currentPage === i + 1
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                        : 'hover:bg-neutral-light dark:hover:bg-neutral-800 text-neutral-dark dark:text-white'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg hover:bg-neutral-light dark:hover:bg-neutral-800 disabled:opacity-50 text-neutral-dark dark:text-white disabled:cursor-not-allowed"
                            >
                                <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <section className="bg-neutral-light dark:bg-neutral-800 py-16 px-4 mt-20 -mx-4 md:-mx-10 lg:-mx-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-black mb-4 text-neutral-dark dark:text-white">Sudah menemukan yang kamu cari?</h2>
                    <p className="text-neutral-600 dark:text-neutral-300 mb-8 max-w-lg mx-auto">Jangan ragu untuk checkout sekarang sebelum kehabisan. Stok kami terbatas untuk menjaga eksklusivitas.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/cart" className="bg-neutral-dark dark:bg-white text-white dark:text-neutral-dark px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center">
                            Lihat Keranjang
                        </Link>
                        <button className="bg-transparent border border-neutral-dark dark:border-white px-8 py-3 rounded-lg font-bold hover:bg-neutral-dark hover:text-white dark:hover:bg-white dark:hover:text-neutral-dark transition-colors text-neutral-dark dark:text-white">
                            Hubungi CS
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Products;
