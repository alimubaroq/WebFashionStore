import React from 'react';

const Contact = () => {
    return (
        <main className="flex min-h-[calc(100vh-64px)] w-full flex-col">
            {/* Hero Section */}
            <section className="relative w-full overflow-hidden bg-background-light py-16 dark:bg-background-dark lg:py-24">
                <div
                    className="absolute inset-0 opacity-30 dark:opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(#e64c19 0.5px, transparent 0.5px)',
                        backgroundSize: '24px 24px'
                    }}
                ></div>
                <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-text-main dark:text-white sm:text-5xl lg:text-6xl">
                        Hubungi Kami
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-text-muted dark:text-gray-400">
                        Kami siap membantu kebutuhan fashion Anda. Jangan ragu untuk menghubungi kami untuk pertanyaan, saran, atau kolaborasi.
                    </p>
                </div>
            </section>

            {/* Main Contact Content */}
            <section className="w-full pb-16 lg:pb-24">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    {/* Left Column: Contact Info */}
                    <div className="flex flex-col gap-8">
                        {/* Info Cards */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="flex flex-col rounded-xl border border-accent-light bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-white/5">
                                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined text-2xl">location_on</span>
                                </div>
                                <h3 className="mb-1 text-base font-bold text-text-main dark:text-white">Alamat</h3>
                                <p className="text-sm text-text-muted dark:text-gray-400">Jalan Fashion No. 123, Jakarta Selatan, 12345</p>
                            </div>
                            <div className="flex flex-col rounded-xl border border-accent-light bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-white/5">
                                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined text-2xl">mail</span>
                                </div>
                                <h3 className="mb-1 text-base font-bold text-text-main dark:text-white">Email</h3>
                                <p className="text-sm text-text-muted dark:text-gray-400">hello@kontak-store.id</p>
                                <p className="text-sm text-text-muted dark:text-gray-400">support@kontak-store.id</p>
                            </div>
                            <div className="flex flex-col rounded-xl border border-accent-light bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-white/5">
                                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined text-2xl">chat</span>
                                </div>
                                <h3 className="mb-1 text-base font-bold text-text-main dark:text-white">WhatsApp</h3>
                                <p className="text-sm text-text-muted dark:text-gray-400">+62 812 3456 7890</p>
                                <p className="text-xs text-primary mt-1 font-medium">Respon Cepat (09:00 - 17:00)</p>
                            </div>
                            <div className="flex flex-col rounded-xl border border-accent-light bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-white/5">
                                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined text-2xl">schedule</span>
                                </div>
                                <h3 className="mb-1 text-base font-bold text-text-main dark:text-white">Jam Operasional</h3>
                                <p className="text-sm text-text-muted dark:text-gray-400">Senin - Jumat: 09:00 - 17:00</p>
                                <p className="text-sm text-text-muted dark:text-gray-400">Sabtu - Minggu: Libur</p>
                            </div>
                        </div>
                        {/* Map */}
                        <div className="relative h-64 w-full overflow-hidden rounded-xl border border-accent-light bg-accent-light/50 dark:border-white/10 dark:bg-white/5">
                            <img alt="Peta Lokasi Toko" className="h-full w-full object-cover grayscale opacity-80 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLibFJSnQrzi7_5pg8rfYdhEM8aexdg6e1toS1j83lHR8BgZnEcwbvbwc_gVovIvx3s8cN9J4pdYY3Wrt7Ol2RlOnOspTD34CTm4QgMobhO_MTVcc5LI1RV3iuvnvHtjHaqQY9C_6idXzbrxhNPXXZRuFlCSusO1BLN8ZknXW6mH8Yt8yvooUEc52GhZPtMQKUMFIePOU89pEp7_aNZ-E-oYhJiaZ53rSZUDVIeK3pVqhoO5bxd29tBTzDx8uk4W-30fwtPN7gZfw" />
                            <div className="absolute bottom-4 right-4 rounded-lg bg-white px-3 py-1 text-xs font-bold text-text-main shadow-md">Lihat di Google Maps</div>
                        </div>
                        {/* Socials */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-bold text-text-main dark:text-white">Ikuti Kami</h3>
                            <div className="flex gap-4">
                                <a className="group flex size-10 items-center justify-center rounded-full bg-white border border-accent-light transition-colors hover:border-primary hover:bg-primary/5 dark:bg-white/5 dark:border-white/10" href="#">
                                    <span className="text-text-main text-lg font-bold group-hover:text-primary dark:text-white">IG</span>
                                </a>
                                <a className="group flex size-10 items-center justify-center rounded-full bg-white border border-accent-light transition-colors hover:border-primary hover:bg-primary/5 dark:bg-white/5 dark:border-white/10" href="#">
                                    <span className="text-text-main text-lg font-bold group-hover:text-primary dark:text-white">TT</span>
                                </a>
                                <a className="group flex size-10 items-center justify-center rounded-full bg-white border border-accent-light transition-colors hover:border-primary hover:bg-primary/5 dark:bg-white/5 dark:border-white/10" href="#">
                                    <span className="text-text-main text-lg font-bold group-hover:text-primary dark:text-white">WA</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="flex flex-col gap-6 rounded-2xl border border-accent-light bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 lg:p-8">
                        <div className="mb-2">
                            <h2 className="text-2xl font-bold text-text-main dark:text-white">Kirim Pesan</h2>
                            <p className="text-sm text-text-muted dark:text-gray-400">Isi formulir di bawah ini dan kami akan segera menghubungi Anda.</p>
                        </div>
                        <form className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-text-main dark:text-gray-300">Nama Lengkap</span>
                                    <input className="h-12 w-full rounded-lg border border-accent-light bg-background-light px-4 text-text-main placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-white/10 dark:bg-white/5 dark:text-white transition-all" placeholder="Masukkan nama Anda" type="text" />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-text-main dark:text-gray-300">Email</span>
                                    <input className="h-12 w-full rounded-lg border border-accent-light bg-background-light px-4 text-text-main placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-white/10 dark:bg-white/5 dark:text-white transition-all" placeholder="contoh@email.com" type="email" />
                                </label>
                            </div>
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-text-main dark:text-gray-300">Subjek</span>
                                <div className="relative">
                                    <select className="h-12 w-full appearance-none rounded-lg border border-accent-light bg-background-light px-4 text-text-main focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-white/10 dark:bg-white/5 dark:text-white transition-all">
                                        <option>Pertanyaan Umum</option>
                                        <option>Status Pesanan</option>
                                        <option>Pengembalian &amp; Penukaran</option>
                                        <option>Kolaborasi</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">expand_more</span>
                                </div>
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-text-main dark:text-gray-300">Pesan</span>
                                <textarea className="w-full resize-none rounded-lg border border-accent-light bg-background-light p-4 text-text-main placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-white/10 dark:bg-white/5 dark:text-white transition-all" placeholder="Tulis pesan Anda di sini..." rows="5"></textarea>
                            </label>
                            <button className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary font-bold text-white transition-all hover:bg-primary/90 hover:shadow-lg active:scale-95" type="button">
                                <span>Kirim Pesan</span>
                                <span className="material-symbols-outlined text-lg">send</span>
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* FAQ Section (Brief) */}
            <section className="w-full bg-accent-light/30 py-16 dark:bg-white/5">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <h2 className="text-2xl font-bold text-text-main dark:text-white sm:text-3xl">Pertanyaan Umum</h2>
                        <p className="mt-2 text-text-muted dark:text-gray-400">Jawaban cepat untuk pertanyaan yang sering diajukan.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <details className="group rounded-lg bg-white p-4 shadow-sm dark:bg-white/5 [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-text-main dark:text-white">
                                <h3 className="font-bold">Berapa lama waktu pengiriman?</h3>
                                <span className="material-symbols-outlined transition-transform duration-300 group-open:-rotate-180">expand_more</span>
                            </summary>
                            <p className="mt-4 leading-relaxed text-text-muted dark:text-gray-400">
                                Untuk wilayah Jabodetabek, pengiriman memakan waktu 1-3 hari kerja. Untuk luar Jabodetabek, estimasi 3-5 hari kerja tergantung ekspedisi yang dipilih.
                            </p>
                        </details>
                        <details className="group rounded-lg bg-white p-4 shadow-sm dark:bg-white/5 [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-text-main dark:text-white">
                                <h3 className="font-bold">Bagaimana cara menukar barang?</h3>
                                <span className="material-symbols-outlined transition-transform duration-300 group-open:-rotate-180">expand_more</span>
                            </summary>
                            <p className="mt-4 leading-relaxed text-text-muted dark:text-gray-400">
                                Anda dapat menukar barang maksimal 7 hari setelah barang diterima. Pastikan tag masih terpasang dan barang dalam kondisi belum dicuci. Hubungi CS kami untuk instruksi lebih lanjut.
                            </p>
                        </details>
                        <details className="group rounded-lg bg-white p-4 shadow-sm dark:bg-white/5 [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-text-main dark:text-white">
                                <h3 className="font-bold">Apakah ada toko fisik?</h3>
                                <span className="material-symbols-outlined transition-transform duration-300 group-open:-rotate-180">expand_more</span>
                            </summary>
                            <p className="mt-4 leading-relaxed text-text-muted dark:text-gray-400">
                                Saat ini kami hanya beroperasi secara online. Namun, kantor kami di Jakarta Selatan terbuka untuk pengambilan barang dengan janji temu (appointment only).
                            </p>
                        </details>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative w-full overflow-hidden bg-primary py-16 lg:py-20">
                <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')" }}></div>
                <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl">Siap Tampil Lebih Modis?</h2>
                    <p className="mb-8 max-w-2xl text-lg text-white/90">
                        Jelajahi koleksi terbaru kami yang dirancang untuk kenyamanan dan gaya Anda sehari-hari.
                    </p>
                    <button className="rounded-full bg-white px-8 py-3.5 text-base font-bold text-primary shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
                        Lihat Koleksi Terbaru
                    </button>
                </div>
            </section>
        </main>
    );
};

export default Contact;
