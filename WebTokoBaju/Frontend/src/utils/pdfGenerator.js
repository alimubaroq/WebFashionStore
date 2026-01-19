import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Helper to format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
};

// Helper to format date
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Generates a professional receipt PDF for a single order.
 * @param {Object} order - The order object.
 */
export const generateOrderReceipt = (order) => {
    const doc = new jsPDF();

    // -- Header --
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(0, 0, 0); // Black
    doc.text("LuxeWear", 15, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60); // Dark Gray
    doc.text("Jl. Sudirman No. 10, Jakarta Selatan, Indonesia", 15, 26);
    doc.text("Email: support@luxewear.com | Telp: +62 812 3456 7890", 15, 31);

    // -- Divider --
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(15, 38, 195, 38);

    // -- Receipt Details --
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("KUITANSI PEMBAYARAN", 195, 20, { align: 'right' });

    doc.setFont("courier", "normal"); // Monospaced for numbers looks professional
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    doc.text(`NO. ORDER: #${(order.id || order._id).slice(-8).toUpperCase()}`, 195, 28, { align: 'right' });
    doc.text(`TANGGAL  : ${formatDate(order.createdAt)}`, 195, 33, { align: 'right' });

    // -- Customer & Shipping --
    const startY = 48;

    // Left Column: Bill To
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("KEPADA:", 15, startY);

    doc.setFont("helvetica", "normal");
    doc.text(order.customerName || "Customer", 15, startY + 6);
    doc.text(order.phoneNumber || "-", 15, startY + 11);

    // Right Column: Ship To (Approx x=110)
    doc.setFont("helvetica", "bold");
    doc.text("DIKIRIM KE:", 110, startY);

    doc.setFont("helvetica", "normal");
    const splitAddress = doc.splitTextToSize(order.shippingAddress || "-", 80);
    doc.text(splitAddress, 110, startY + 6);

    // -- Items Table --
    const tableStartY = startY + 25;

    // Item Data
    const tableBody = order.items.map(item => [
        item.productName,
        item.size || '-',
        item.quantity,
        formatCurrency(item.price),
        formatCurrency(item.price * item.quantity)
    ]);

    autoTable(doc, {
        startY: tableStartY,
        head: [['PRODUK', 'UKURAN', 'QTY', 'HARGA', 'TOTAL']],
        body: tableBody,
        theme: 'plain', // Minimalist theme
        styles: {
            fontSize: 9,
            cellPadding: 3,
            textColor: [0, 0, 0],
            font: "helvetica",
            lineColor: [200, 200, 200],
            lineWidth: { bottom: 0.1 }
        },
        headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
            fontStyle: 'bold',
            lineWidth: { bottom: 0.5, top: 0.5 },
            lineColor: [0, 0, 0]
        },
        columnStyles: {
            0: { cellWidth: 80 }, // Product Name
            3: { halign: 'right' },
            4: { halign: 'right', fontStyle: 'bold' }
        },
        footStyles: { fillColor: [255, 255, 255] }
    });

    // -- Totals Section --
    const finalY = doc.lastAutoTable.finalY + 10;
    const rightMargin = 195;
    const labelX = 140;

    const addTotalRow = (label, value, isBold = false, isHeavy = false) => {
        doc.setFont("helvetica", isBold ? "bold" : "normal");
        doc.setFontSize(isHeavy ? 12 : 10);
        doc.setTextColor(0, 0, 0);
        doc.text(label, labelX, finalY + offset, { align: 'right' });

        doc.setFont("courier", isBold ? "bold" : "normal"); // Number alignment
        doc.text(value, rightMargin, finalY + offset, { align: 'right' });
        offset += (isHeavy ? 8 : 6);
    };

    let offset = 0;
    // We only display Total for simplicity and professionalism unless we have tax details
    addTotalRow("Total Pembayaran:", formatCurrency(order.totalAmount), true, true);

    // -- Paid Stamp --
    if (order.status === 'Paid' || order.status === 'Selesai') {
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(1);
        doc.rect(15, finalY, 30, 12); // Box
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text("LUNAS", 30, finalY + 8, { align: 'center' });
    }

    // -- Footer --
    const pageHeight = doc.internal.pageSize.height;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("Terima kasih telah berbelanja di LuxeWear.", 105, pageHeight - 15, { align: 'center' });
    doc.text("www.luxewear.com", 105, pageHeight - 10, { align: 'center' });

    doc.save(`Receipt_LuxeWear_${(order.id || order._id).slice(-8)}.pdf`);
};

/**
 * Generates a sales report PDF for admin.
 * @param {Array} salesData - Array of consolidated sales data or orders.
 * @param {string} period - e.g. "Bulan Ini"
 */
export const generateSalesReport = (stats, period = "Bulan Ini") => {
    const doc = new jsPDF();
    const dateNow = new Date().toLocaleDateString('id-ID');

    // -- Header --
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("LuxeWear", 15, 20);

    doc.setFontSize(14);
    doc.text("LAPORAN PENJUALAN", 15, 28);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Periode: ${period} | Dicetak: ${dateNow}`, 15, 35);

    doc.setDrawColor(0, 0, 0);
    doc.line(15, 40, 195, 40);

    // -- Summary Metrics using Tables instead of rectangles for cleaner look --
    const startY = 50;

    autoTable(doc, {
        startY: startY,
        head: [['Total Pendapatan', 'Total Pesanan', 'Pelanggan Baru', 'Avg. Order']],
        body: [[
            formatCurrency(stats.totalRevenue),
            stats.totalOrders.toString(),
            stats.newCustomers.toString(),
            formatCurrency(stats.averageOrderValue)
        ]],
        theme: 'plain',
        headStyles: {
            fontSize: 9,
            textColor: [100, 100, 100],
            halign: 'center',
            cellPadding: 2
        },
        bodyStyles: {
            fontSize: 14,
            fontStyle: 'bold',
            textColor: [0, 0, 0],
            halign: 'center',
            cellPadding: 4
        },
        tableLineColor: [200, 200, 200],
        tableLineWidth: 0.1,
    });

    // -- Top Products List --
    const listStartY = doc.lastAutoTable.finalY + 15;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Produk Terlaris", 15, listStartY);

    const tableBody = stats.topProducts.map(p => [
        p.name || p.Name, // Handle potentially different casing from backend
        (p.sales || p.Sales).toString(),
        formatCurrency(p.revenue || p.Revenue) // Format the number
    ]);

    autoTable(doc, {
        startY: listStartY + 5,
        head: [['NAMA PRODUK', 'TERJUAL (UNIT)', 'PENDAPATAN']],
        body: tableBody,
        theme: 'plain',
        headStyles: {
            fillColor: [0, 0, 0],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            halign: 'left'
        },
        bodyStyles: {
            textColor: [0, 0, 0],
            lineColor: [230, 230, 230],
            lineWidth: { bottom: 0.1 }
        },
        columnStyles: {
            1: { halign: 'center' },
            2: { halign: 'right' }
        }
    });

    // -- Footer --
    const pageHeight = doc.internal.pageSize.height;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Dokumen Rahasia - Internal LuxeWear", 15, pageHeight - 10);

    doc.save(`Laporan_LuxeWear_${period.replace(/\s/g, '_')}.pdf`);
};
