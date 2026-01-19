import React from 'react';

const About = () => {
    return (
        <div className="bg-background-light text-text-main overflow-x-hidden font-display">
            {/* Page Header / Hero */}
            <header className="relative w-full h-[400px] bg-background-alt overflow-hidden flex items-center justify-center">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAWX2paDWuNZAeXZyUHyZsu4dQRMU63zErajiAw-UukNVmm2AM5QRfRiKDPbkDhBfqU7RtxUT75nzkcF_l-ZOQMdQwBQiy7sCOlUPvknEbuE77iIJxnhX9nabgwFvtR9cuntyXCKAwpobuPd7FWtdH0tUCB11tGkp45dGcAhQa_Oz9jFgBI_c5T-gXv-e5DyJ5-56blL0w0bPMlD6S8A8NaljzJKYb18SW0qyn-wezZElFtk8bFOzThRykKhv1tekcRIEebhJZUuJg")' }}
                ></div>
                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-sm">Tentang Kami</h1>
                    <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                        Cerita di balik hasrat kami untuk mendefinisikan ulang gaya modern.
                    </p>
                </div>
            </header>

            {/* Brand Story Section */}
            <section className="py-16 md:py-24 px-4 sm:px-10 lg:px-40 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col gap-6">
                        <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
                            <span className="h-px w-8 bg-primary"></span>
                            <span>Cerita Kami</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-text-main leading-tight">
                            Bermula dari mimpi sederhana pada tahun 2020.
                        </h2>
                        <div className="space-y-4 text-text-muted text-lg leading-relaxed">
                            <p>
                                Kami bermula dari sebuah garasi kecil dengan satu tujuan: menghadirkan fashion berkualitas tinggi yang dapat diakses oleh semua orang tanpa mengorbankan etika dan kenyamanan.
                            </p>
                            <p>
                                Kami percaya bahwa gaya adalah ekspresi diri yang paling jujur. Setiap jahitan dibuat dengan dedikasi untuk memberikan kenyamanan dan kepercayaan diri bagi Anda. Di Clothing Store, kami tidak hanya menjual pakaian, kami menawarkan cara untuk menunjukkan siapa diri Anda kepada dunia.
                            </p>
                        </div>
                    </div>
                    <div className="relative group rounded-2xl overflow-hidden shadow-xl aspect-[4/5] md:aspect-square">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCBftHOqzXVv1LifFwTCMxQG5E46BBChVd7JNXL97GU-Bo5i8XrQDZhuuXzVv-CBTOqVxH1Jzu2UcSE9ArVx4R-dtKxcXIXjT-zthu4gUUUto0nZeYAJApbkQZlC43vOWZG74UlY-kP2fczT0pyUpmuE0t57uAbIG1ovEXAX6daOe2NAz44mdEBfL-TGMCJbHQzw07Lz_b3F-xBLlLv01RFVkHzArx8NxxnV68mzIgBYbJsdXpZM3VOiibZjFgG5lXRIDTa2Ea2gck")' }}
                        ></div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="bg-[#f3eae7]/50 py-20 px-4 sm:px-10 lg:px-40">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
                    <div className="md:w-1/3">
                        <h2 className="text-3xl font-bold mb-4 text-text-main">Visi Kami</h2>
                        <p className="text-text-muted text-lg leading-relaxed mb-8">
                            Menjadi brand fashion global yang tidak hanya mengikuti tren, tetapi juga menetapkan standar baru untuk keberlanjutan dan inklusivitas.
                        </p>
                        <button className="hidden md:flex items-center text-primary font-bold hover:gap-2 gap-1 transition-all">
                            Pelajari lebih lanjut <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                    <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="bg-background-light p-6 rounded-xl border border-[#e7d6d0] hover:border-primary/50 transition-colors">
                            <div className="text-primary mb-4">
                                <span className="material-symbols-outlined text-4xl">diamond</span>
                            </div>
                            <h3 className="font-bold text-xl mb-2 text-text-main">Kualitas Premium</h3>
                            <p className="text-text-muted">Kami hanya menggunakan material terbaik yang tahan lama dan nyaman dipakai sepanjang hari.</p>
                        </div>
                        <div className="bg-background-light p-6 rounded-xl border border-[#e7d6d0] hover:border-primary/50 transition-colors">
                            <div className="text-primary mb-4">
                                <span className="material-symbols-outlined text-4xl">trending_up</span>
                            </div>
                            <h3 className="font-bold text-xl mb-2 text-text-main">Desain Terkini</h3>
                            <p className="text-text-muted">Tim desain kami selalu memantau tren global untuk memastikan Anda selalu tampil modis.</p>
                        </div>
                        <div className="bg-background-light p-6 rounded-xl border border-[#e7d6d0] hover:border-primary/50 transition-colors">
                            <div className="text-primary mb-4">
                                <span className="material-symbols-outlined text-4xl">savings</span>
                            </div>
                            <h3 className="font-bold text-xl mb-2 text-text-main">Harga Terjangkau</h3>
                            <p className="text-text-muted">Kemewahan yang dapat diakses. Kami memotong biaya perantara untuk memberikan harga terbaik.</p>
                        </div>
                        <div className="bg-background-light p-6 rounded-xl border border-[#e7d6d0] hover:border-primary/50 transition-colors">
                            <div className="text-primary mb-4">
                                <span className="material-symbols-outlined text-4xl">support_agent</span>
                            </div>
                            <h3 className="font-bold text-xl mb-2 text-text-main">Pelayanan Prima</h3>
                            <p className="text-text-muted">Kepuasan Anda adalah prioritas. Tim support kami siap membantu setiap langkah Anda.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brand Values / Stats Cards */}
            <section className="py-16 px-4 sm:px-10 lg:px-40 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-text-main">Nilai Inti Kami</h2>
                    <p className="text-text-muted mt-2">Apa yang membuat kami berbeda</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex flex-col gap-2 rounded-lg border border-[#e7d6d0] bg-white p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-text-main text-lg font-bold">Kualitas</h3>
                        <div className="flex items-baseline gap-1 text-primary">
                            <span className="text-4xl font-black tracking-tighter">100%</span>
                        </div>
                        <p className="text-text-muted text-sm font-medium">Bahan Katun Organik</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-lg border border-[#e7d6d0] bg-white p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-text-main text-lg font-bold">Pelanggan</h3>
                        <div className="flex items-baseline gap-1 text-primary">
                            <span className="text-4xl font-black tracking-tighter">50K+</span>
                        </div>
                        <p className="text-text-muted text-sm font-medium">Pelanggan Puas</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-lg border border-[#e7d6d0] bg-white p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-text-main text-lg font-bold">Koleksi</h3>
                        <div className="flex items-baseline gap-1 text-primary">
                            <span className="text-4xl font-black tracking-tighter">500+</span>
                        </div>
                        <p className="text-text-muted text-sm font-medium">Desain Eksklusif</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-lg border border-[#e7d6d0] bg-white p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-text-main text-lg font-bold">Pengiriman</h3>
                        <div className="flex items-baseline gap-1 text-primary">
                            <span className="text-4xl font-black tracking-tighter">24H</span>
                        </div>
                        <p className="text-text-muted text-sm font-medium">Proses Cepat</p>
                    </div>
                </div>
            </section>

            {/* Brand Journey Timeline */}
            <section className="py-16 bg-[#fcf9f8] border-t border-[#f3eae7]">
                <div className="px-4 sm:px-10 lg:px-40 max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-text-main">Perjalanan Kami</h2>
                    </div>
                    <div className="relative">
                        {/* Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[#e7d6d0] hidden md:block"></div>
                        <div className="space-y-12 relative">
                            {/* Item 1 */}
                            <div className="flex flex-col md:flex-row items-center justify-between w-full">
                                <div className="w-full md:w-5/12 order-2 md:order-1 text-center md:text-right p-4 bg-white rounded-lg border border-[#e7d6d0] shadow-sm">
                                    <h3 className="font-bold text-xl text-primary">2020</h3>
                                    <h4 className="font-bold text-text-main mb-2">Awal Mula</h4>
                                    <p className="text-text-muted text-sm">Didirikan di sebuah studio kecil dengan koleksi pertama berupa kaos basic berkualitas.</p>
                                </div>
                                <div className="z-10 bg-primary border-4 border-[#fcf9f8] w-6 h-6 rounded-full order-1 md:order-2 mb-4 md:mb-0"></div>
                                <div className="w-full md:w-5/12 order-3 md:order-3 invisible md:visible"></div>
                            </div>
                            {/* Item 2 */}
                            <div className="flex flex-col md:flex-row items-center justify-between w-full">
                                <div className="w-full md:w-5/12 order-2 md:order-1 invisible md:visible"></div>
                                <div className="z-10 bg-primary border-4 border-[#fcf9f8] w-6 h-6 rounded-full order-1 md:order-2 mb-4 md:mb-0"></div>
                                <div className="w-full md:w-5/12 order-3 md:order-3 p-4 bg-white rounded-lg border border-[#e7d6d0] shadow-sm text-center md:text-left">
                                    <h3 className="font-bold text-xl text-primary">2021</h3>
                                    <h4 className="font-bold text-text-main mb-2">Ekspansi Digital</h4>
                                    <p className="text-text-muted text-sm">Meluncurkan website e-commerce resmi dan menjangkau pelanggan di seluruh nusantara.</p>
                                </div>
                            </div>
                            {/* Item 3 */}
                            <div className="flex flex-col md:flex-row items-center justify-between w-full">
                                <div className="w-full md:w-5/12 order-2 md:order-1 text-center md:text-right p-4 bg-white rounded-lg border border-[#e7d6d0] shadow-sm">
                                    <h3 className="font-bold text-xl text-primary">2023</h3>
                                    <h4 className="font-bold text-text-main mb-2">Toko Offline Pertama</h4>
                                    <p className="text-text-muted text-sm">Membuka flagship store pertama di Jakarta Pusat untuk memberikan pengalaman langsung.</p>
                                </div>
                                <div className="z-10 bg-primary border-4 border-[#fcf9f8] w-6 h-6 rounded-full order-1 md:order-2 mb-4 md:mb-0"></div>
                                <div className="w-full md:w-5/12 order-3 md:order-3 invisible md:visible"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team */}
            <section className="py-16 px-4 sm:px-10 lg:px-40 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-text-main text-center mb-12">Tim Kami</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex flex-col items-center">
                        <div
                            className="w-full aspect-[3/4] bg-cover bg-center rounded-lg mb-4"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD7UOjgP2j13Ug5sUNR-A4jhbFUfbDwi0rRa10E2f54NItWNwLtKMlRIubfX4PBlThV5LblEuujMWqnFOuCGShu-gAHi00PFdzGfPR65SFr5wmWRXAUgv3SmVymrqpKwiyVHD0OwqvFuBEYsd9WvZSFe7ixY2Rrnk1FpTKXaWxeTnEdAsMUvFSuxDsa7RBQKcCgjdxT4CdjXlr_fg-NEOryKog56D1BJNrCVW48barubHBaayY2zi7XbFbPtgUtzdJP9wIRLvIQw-A")' }}
                        ></div>
                        <h3 className="font-bold text-lg text-text-main">Sarah W.</h3>
                        <p className="text-text-muted text-sm">Founder & CEO</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div
                            className="w-full aspect-[3/4] bg-cover bg-center rounded-lg mb-4"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAGapHL01uWgaqN3tHfqpVZBUrFVaejnhOeGeggB71F8ZWgzRJeLUXV37fpgM6Qx6-XzgZc-pD0aMzDPmri7tx3Ool9krsBdn53CnwB4h6mct7EysVd7JB9oNmrSjLu9-37VjdgGjE8cCBD4qZqq6yWSltiS63qb3W5SUTs3m-9lJ9XpEKiZPxsLLT2Gg2DIhHTvxsRfjGiJkr9JYY0wSFTKF832RngEvAhIB3_c1CIEIhhIjVDYb9t8-CGYrQefKSdQRHw5RvzTNQ")' }}
                        ></div>
                        <h3 className="font-bold text-lg text-text-main">Budi S.</h3>
                        <p className="text-text-muted text-sm">Lead Designer</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div
                            className="w-full aspect-[3/4] bg-cover bg-center rounded-lg mb-4"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCKZ5QNsgfDcOqkC6cwJfRhdVYQ20tCzGX94JmQ6QDwqa9VgdFbjsjshfyZCdKrnPMZNGbYoh7UWbZIFbq2OAZt4OuaQnpCGgexD-4InF_HCMKKjsV8EMUowUezpNPgQUw6leQE8Z9J5ZBUPWf-4uqNLKfAP-Qbd4jsh5ljMmgLxfDGO5K6jJVgWsB-6er58IAKf2HIHx3QXWs6FAtWV7ytC9X9zrugOvQYq02iQaKgBncdEJbJBBa3aSDWmVYCeXNE2SpzKPaBMo")' }}
                        ></div>
                        <h3 className="font-bold text-lg text-text-main">Jessica T.</h3>
                        <p className="text-text-muted text-sm">Head of Marketing</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div
                            className="w-full aspect-[3/4] bg-cover bg-center rounded-lg mb-4"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD1CNWrUG5iqLcEvKuJtHI-ugp7VQqX__SWh7v_48qSKiyzwsVV-HYDm4VuqGs0Kv3q8eeBpQ6M-4IVtSwv8H4L0AsBov0fA29HBepv0rQ4tNsLVkpcofIlpd0MCRsx4tftqsVXjIranEW_HGXm7Ag4t36aTHlr4m3v27UtLbQa5TlsGdU3AmeLVv7Iw6EpM5AHoqwfxQQfJYXJBeAMmBl6QQHQoVDBJNXPnTaRm5CCNLS8TMdwQw_OTQQmnfON4kn-LRwVE9DFMXA")' }}
                        ></div>
                        <h3 className="font-bold text-lg text-text-main">Andi R.</h3>
                        <p className="text-text-muted text-sm">Operations Manager</p>
                    </div>
                </div>
            </section>

            {/* Brand Quote */}
            <section className="py-24 bg-text-main text-background-light">
                <div className="px-4 text-center max-w-4xl mx-auto">
                    <span className="material-symbols-outlined text-6xl text-primary/40 mb-6">format_quote</span>
                    <h2 className="text-3xl md:text-5xl font-light leading-tight italic tracking-tight">
                        "Fashion bukan hanya tentang apa yang Anda kenakan, tetapi bagaimana Anda merasakan diri Anda saat mengenakannya."
                    </h2>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 text-center">
                <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
                    <h2 className="text-3xl font-bold text-text-main">Siap untuk Tampil Beda?</h2>
                    <p className="text-text-muted text-lg">Temukan koleksi terbaru kami dan mulailah perjalanan gaya Anda hari ini.</p>
                    <button className="bg-primary text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30">
                        Lihat Koleksi
                    </button>
                </div>
            </section>
        </div>
    );
};

export default About;
