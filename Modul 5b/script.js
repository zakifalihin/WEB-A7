$(document).ready(function () {
    $('#cekNilai').click(function () {
      let nilai = parseInt($('#nilai').val());
      let pesan = "";
      let warna = "";

      if (nilai >= 85) {
        pesan = "Mendapatkan Nilai A";
        warna = "green";
      } else if (nilai >= 75 && nilai <= 79) {
        pesan = "Mendapatkan Nilai B+";
        warna = "orange";
      } else if (nilai >= 60 && nilai <= 74) {
        pesan = "Mendapatkan Nilai C+";
        warna = "yellow";
      } else if (nilai < 50) {
        pesan = "Mendapatkan Nilai E";
        warna = "red";
      } else {
        pesan = "Nilai tidak masuk dalam kategori khusus";
        warna = "";
      }
  
      $('#hasil')
        .removeClass("green orange yellow red")
        .addClass(warna)
        .text(pesan)
        .fadeIn();
    });
  });

  
  