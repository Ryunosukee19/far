// 'DOMContentLoaded' memastikan kode ini berjalan HANYA setelah
// seluruh file HTML selesai dimuat. Ini sangat penting.
document.addEventListener('DOMContentLoaded', () => {

    // --- FUNGSI NAVIGASI MENU ---
    const allLinks = document.querySelectorAll('.sidebar ul li a');
    const allCards = document.querySelectorAll('.content .card');

    // Menambahkan event listener ke setiap link di sidebar
    allLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Mencegah link default (href="#") berpindah halaman
            event.preventDefault(); 
            
            const targetId = link.getAttribute('data-target');
            showContent(targetId);
        });
    });

    function showContent(targetId) {
        // 1. Sembunyikan semua konten (card)
        allCards.forEach(card => {
            card.classList.remove('active');
        });

        // 2. Tampilkan konten (card) yang ditargetkan
        const targetCard = document.getElementById(targetId);
        if (targetCard) {
            targetCard.classList.add('active');
        }

        // 3. Update status 'active' pada link menu di sidebar
        allLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            }
        });
    }

    // --- FUNGSI PERHITUNGAN PELUANG SEDERHANA ---
    const calculateButton = document.getElementById('calculate-btn-simple');
    
    // Pastikan tombolnya ada sebelum menambahkan listener
    if (calculateButton) {
        calculateButton.addEventListener('click', hitungPeluang);
    }

    function hitungPeluang() {
        const s = parseFloat(document.getElementById('sampleSpace').value);
        const e = parseFloat(document.getElementById('eventCount').value);
        const resultSpan = document.getElementById('prediction-value');

        if (isNaN(s) || isNaN(e) || s <= 0 || e < 0 || e > s) {
            resultSpan.innerText = "Input Tidak Valid! (|E| harus ≤ |S|)";
            return;
        }

        const peluang = e / s;
        resultSpan.innerText = peluang.toFixed(4) + ` (${e}/${s})`;
    }

    // Tampilkan konten "Prediksi Peluang" saat pertama kali dimuat
    showContent('predict');
});