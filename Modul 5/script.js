//

function sedangMengetik() {
    const input = document.getElementById("komentar").value;
    const status = document.getElementById("statusKetik");
  
    if (input.length > 0) {
      status.innerText = "Anda Sedang Mengetik...";
    } else {
      status.innerText = "";
    }
  }
  
  function tampilkanKomentar() {
    const komentar = document.getElementById("komentar").value;
    const hasil = document.getElementById("hasil");
    const status = document.getElementById("statusKetik");
  
    if (komentar.trim() !== "") {
      hasil.innerHTML = `<strong>JavaScript :</strong> ${komentar}`;
      status.innerText = "";
      document.getElementById("komentar").value = "";
    } else {
      hasil.innerHTML = "";
    }
  }
  