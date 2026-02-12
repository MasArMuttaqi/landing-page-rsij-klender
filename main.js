  $(document).ready(function() {


    // Fungsi untuk render
function renderLogos(kerjasama) {
    $.each(kerjasama, function(index, item) {
        var html = `
            <div class="logo-item">
                <img src="${item.logo}" alt="${item.lembaga}" title="${item.lembaga}">
            </div>
        `;
        $(".logo-marquee").append(html);
    });
}

// Render dua kali untuk efek seamless
renderLogos(kerjasama);
renderLogos(kerjasama);

    var $carouselInner = $("#testimoniCarousel .carousel-inner");
    var $indicators = $("#testimoniCarousel .carousel-indicators");
    
    $carouselInner.empty();
    $indicators.empty();

    $.each(testimoni, function(i, item) {
        var isActive = i === 0 ? "active" : "";

        // 1. Buat Indicator
        var indicatorHtml = `
            <button type="button" 
                    data-bs-target="#testimoniCarousel" 
                    data-bs-slide-to="${i}" 
                    class="${isActive}">
            </button>`;
        $indicators.append(indicatorHtml);

        // 2. Buat Slide Item
        // Kita gunakan .justify-content-center agar di desktop card berada di tengah
        var slideHtml = `
            <div class="carousel-item ${isActive}">
                <div class="row g-4 justify-content-center">
                    <div class="col-12 col-md-8 col-lg-6"> 
                        <div class="card h-100 shadow-sm rounded-4">
                            <div class="card-body p-4">
                                <figure class="mb-0">
                                    <blockquote class="blockquote">
                                        <p style="font-size: 1rem;">"${item.testimoni}"</p>
                                    </blockquote>
                                    <figcaption class="blockquote-footer mt-2">
                                        <strong>${item.nama}</strong> <cite>Pasien</cite>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        
        $carouselInner.append(slideHtml);
    });

    var $container = $(".container.layanan_penunjang");
    
    // Kosongkan container dari elemen statis
    $container.empty();

    $.each(layanan_penunjang, function(i, item) {
        var cardHtml = `
            <div class="service-card bg-${item.color}">
                <div class="icon-box text-${item.color}">
                    <img src="${item.icon}" alt="icon" onerror="this.src='https://cdn-icons-png.flaticon.com/128/833/833472.png'">
                </div>
                <div>
                    <small class="text-muted">${item.layanan_penunjang}</small>
                </div>
            </div>`;
        
        $container.append(cardHtml);
    });


    var $containerLain = $(".container.layanan_lain");
    
    // Kosongkan kontainer
    $containerLain.empty();

    $.each(layanan_lain, function(i, item) {
        var cardHtml = `
            <div class="service-card bg-${item.color} mb-3">
                <div class="icon-box text-${item.color}">
                    <img src="${item.icon}" alt="icon" style="width: 40px;" onerror="this.src='https://cdn-icons-png.flaticon.com/128/1048/1048953.png'">
                </div>
                <div>
                    <small class="text-muted">${item.layanan_pendukung}</small>
                </div>
            </div>`;
        
        $containerLain.append(cardHtml);
    });


    var $container = $("#container_rawat_inap");
    $container.empty();

    $.each(rawat_inap, function(i, item) {
        // Render Card
        var cardHtml = `
        <div class="col-md-6">
            <div class="card custom-card text-white border-0 overflow-hidden shadow-sm mb-3" style="border-radius: 15px;">
                <img src="${item.foto}" class="card-img" alt="${item.kategori}" style="height: 250px; object-fit: cover; filter: brightness(0.7);">
                <div class="card-img-overlay d-flex flex-column justify-content-end">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title mb-0 fw-bold">${item.kategori}</h5>
                        </div>
                        <button class="btn btn-start btn-detail" data-index="${i}">Detail</button>
                    </div>
                </div>
            </div>
        </div>`;
        
        $container.append(cardHtml);
    });

    // Event Klik Tombol Detail
    $(document).on("click", ".btn-detail", function() {
        var index = $(this).data("index");
        var data = rawat_inap[index];

        // Isi Judul Offcanvas
        $("#offcanvasBottomLabel").text("Fasilitas " + data.kategori);

        // Render Body Offcanvas dengan struktur Card
    var listHtml = '<div class="d-flex flex-column gap-3">'; // Menggunakan gap untuk jarak antar card
    
    $.each(data.fasilitas, function(j, fas) {
        // Tentukan warna berdasarkan index agar bervariasi (opsional)
        var colors = ['purple', 'orange', 'blue', 'yellow'];
        var selectedColor = colors[j % colors.length];

        listHtml += `
            <div class="service-card bg-${selectedColor}">
                <div class="icon-box text-${selectedColor}">
                    <img src="${fas.icon}" alt="icon" style="width: 25px; height: 25px; object-fit: contain;">
                </div>
                <div class="ms-3">
                    <h6 class="mb-0 fw-semibold">${fas.fasilitas}</h6>
                    <small class="text-muted">${fas['keterangan detail']}</small>
                </div>
            </div>`;
    });
    
    listHtml += '</div>';

        $("#fasilitas-content").html(listHtml);

        // Tampilkan Offcanvas
        var myOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasBottom'));
        myOffcanvas.show();
    });


    // --- PROSES SORTING ---
    daftar_klinik.sort(function(a, b) {
        // Mengambil angka setelah huruf 'K' dan membandingkannya
        var numA = parseInt(a.Kode.replace("K", ""));
        var numB = parseInt(b.Kode.replace("K", ""));
        return numA - numB;
    });
    // ----------------------
    var $containerKlinik = $("#daftar_klinik");
    $containerKlinik.empty();

    $.each(daftar_klinik, function(i, item) {
        var cardHtml = `
            <div class="col-6">
                <button class="btn btn-light info-card d-flex flex-column align-items-center w-100 py-3 shadow-sm btn-poli" 
                        type="button" 
                        data-index="${i}">
                    <div class="icon-wrapper">
                        <div class="bg-layer"></div> 
                      <div class="glass-layer">
                        <img src="${item.icon}" alt="${item.klinik}" class="icon-img">
                      </div>
                   </div>
                    <span class="text-label fw-semibold" style="font-size: 0.85rem; color: #444;">${item.klinik}</span>
                </button>
            </div>`;
        
        $containerKlinik.append(cardHtml);
    });

    // Handler Klik untuk memunculkan Offcanvas
    $(document).on("click", ".btn-poli", function() {
        var idx = $(this).data("index");
        var data = daftar_klinik[idx];

        // Update konten Offcanvas
        $("#offcanvasBottomLabel").text(data.klinik);
        var deksripsiklinik = `<p>${data.deskripsi}</p><button class="btn service-card kategori-klinik bg-blue w-100" data-id="${data.Kode}">
    <div class="icon-box text-blue">
      <img src="https://cdn-icons-png.flaticon.com/128/9262/9262792.png">
    </div>
    <div>
      <h6 class="mb-1 fw-semibold">Cari Dokter</h6>
    </div>
  </button>`;

        $("#fasilitas-content").html(deksripsiklinik);
        // $("#offcanvas-icon").attr("src", data.icon);

        // Munculkan Offcanvas
        var myOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasBottom'));
        myOffcanvas.show();
    });


    var $selectKlinik = $("#pilihklinik");

    // 2. Kosongkan select dan tambahkan opsi default
    $selectKlinik.empty();
    $selectKlinik.append('<option value="" selected disabled>Pilih Klinik...</option>');

    // 3. Looping data ke dalam tag <option>
    $.each(daftar_klinik, function(i, item) {
        var optionHtml = `<option value="${item.Kode}">${item.klinik}</option>`;
        $selectKlinik.append(optionHtml);
    });


    var $selectDokter = $("#pilihdokter");

    // 1. Kosongkan select dan beri opsi default
    $selectDokter.empty();
    $selectDokter.append('<option value="" selected>Pilih Dokter...</option>');

    // 2. Ambil daftar nama dokter unik (agar tidak dobel di dropdown)
    var listNamaDokter = [];
    $.each(data_dokter, function(i, item) {
        if ($.inArray(item.NAMA_DOKTER, listNamaDokter) === -1) {
            listNamaDokter.push(item.NAMA_DOKTER);
        }
    });

    // 3. Masukkan nama yang sudah unik ke dalam select
    $.each(listNamaDokter, function(i, nama) {
        var optionHtml = `<option value="${nama}">${nama}</option>`;
        $selectDokter.append(optionHtml);
    });


    $(document).on("click", ".kategori-klinik", function() {
        // 1. Ambil ID dari data-id tombol yang diklik
        var kodeKlinik = $(this).data("id");

        // 2. Set nilai pada select #pilihklinik
        // Pastikan value di <option> sesuai dengan kodeKlinik (misal: "K1")
        $("#pilihklinik").val(kodeKlinik).change();

        // 3. (Opsional) Tutup Offcanvas secara otomatis setelah klik
        var offcanvasElement = document.getElementById('offcanvasBottom');
        if (offcanvasElement) {
            var bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (bsOffcanvas) bsOffcanvas.hide();
        }

        // 4. (Opsional) Scroll ke arah form select agar user tahu sudah terpilih
        $('html, body').animate({
            scrollTop: $("#pilihklinik").offset().top - 100
        }, 500);
    });

    function renderJadwal() {
        // Ambil nilai dari select
        var filterKlinik = $("#pilihklinik").val();
        var filterDokter = $("#pilihdokter").val();

        var $container = $("#container_jadwal_dokter");
        $container.empty();

        // LOGIKA FILTER: 
        // Jika null/kosong/Choose, maka dianggap true (lolos filter)
        var filteredData = data_dokter.filter(function(item) {
            var matchKlinik = (filterKlinik === null || filterKlinik === "" || filterKlinik === "Choose...") 
                              ? true : item.KODE_KLINIK === filterKlinik;
            
            var matchDokter = (filterDokter === null || filterDokter === "" || filterDokter === "Choose...") 
                              ? true : item.NAMA_DOKTER === filterDokter;

            return matchKlinik && matchDokter;
        });

        // Jika hasil filter ada, lakukan looping
        if (filteredData.length > 0) {
            $.each(filteredData, function(i, doc) {
                var jadwal = doc.HARI_JAM_PRAKTEK;
                
                // 1. Dapatkan index hari ini (0 = Minggu, 1 = Senin, ..., 6 = Sabtu)
                var hariIniIndex = new Date().getDay();
                
                // 2. Fungsi pembantu untuk menentukan class active/highlight
                // Kita bandingkan index hari loop dengan index hari ini
                var checkToday = function(targetIndex) {
                    // Jika targetIndex sama dengan hari ini, tambahkan class 'bg-white text-dark rounded-3 shadow-sm' atau class kustom Anda
                    return hariIniIndex === targetIndex ? 'bg-white text-dark fw-bold rounded-3 shadow-sm px-2' : '';
                };

                var cardHtml = `
                <div class="card-doctor-schedule col-md-6 mb-3">
                    <div class="glass-card text-start">
                        <div class="profile-img">
                            <img src="https://cdn-icons-png.flaticon.com/128/4189/4189146.png">
                        </div>
                        <h5 class="fw-bold mb-0">${doc.NAMA_DOKTER}</h5>
                        <p class="text-muted mb-3">Klinik ${doc.NAMA_KLINIK}</p>
                        
                        <ul class="list-group list-group-transparent list-group-flush">
                            <li class="list-group-item d-flex justify-content-between ${checkToday(1)}"><strong>Senin</strong> <span>${jadwal["SENIN"]}</span></li>
                            <li class="list-group-item d-flex justify-content-between ${checkToday(2)}"><strong>Selasa</strong> <span>${jadwal["SELASA"]}</span></li>
                            <li class="list-group-item d-flex justify-content-between ${checkToday(3)}"><strong>Rabu</strong> <span>${jadwal["RABU"]}</span></li>
                            <li class="list-group-item d-flex justify-content-between ${checkToday(4)}"><strong>Kamis</strong> <span>${jadwal["KAMIS"]}</span></li>
                            <li class="list-group-item d-flex justify-content-between ${checkToday(5)}"><strong>Jumat</strong> <span>${jadwal["JUM'AT"]}</span></li>
                            <li class="list-group-item d-flex justify-content-between ${checkToday(6)}"><strong>Sabtu</strong> <span>${jadwal["SABTU"]}</span></li>
                        </ul>
                        <div class="d-grid">
                            <a href="#" class="btn btn-get-touch my-3"> 
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1280px-WhatsApp.svg.png" style="width: 25px; margin-right:15px;"> 
                                Buat Janji Temu
                            </a>
                        </div>
                    </div>
                </div>`;
                $container.append(cardHtml);
            });
        } else {
            $container.append('<div class="service-card bg-orange"><div class="icon-box text-orange"><img src="https://cdn-icons-png.flaticon.com/128/9841/9841569.png" style="width: 40px; height: 40px;"></div><div><h6 class="mb-1 fw-semibold">Mohon maaf, Jadwal dokter tidak ditemukan. </h6><small>Customer Care siap membantu membuat janji temu Anda.</small></div></div>');
        }
    }

    // Jalankan render saat halaman pertama kali dibuka (menampilkan semua)
    renderJadwal();

    // Jalankan render setiap kali ada perubahan pada dropdown
    $("#pilihklinik, #pilihdokter").on("change", function() {
        renderJadwal();
    });


    $("#pilihklinik").on("change", function() {
    var kodeKlinik = $(this).val();
    $selectDokter.empty().append('<option value="" selected>Pilih Dokter...</option>');

    var filterBerdasarkanKlinik = data_dokter.filter(function(d) {
        return kodeKlinik === "" || d.KODE_KLINIK === kodeKlinik;
    });

    var tempNama = [];
    $.each(filterBerdasarkanKlinik, function(i, item) {
        if ($.inArray(item.NAMA_DOKTER, tempNama) === -1) {
            tempNama.push(item.NAMA_DOKTER);
            $selectDokter.append(`<option value="${item.NAMA_DOKTER}">${item.NAMA_DOKTER}</option>`);
        }
    });
});



  });
