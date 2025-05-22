        $(document).ready(function() { 
    // Efek smooth scroll saat klik navbar link 
    $("a.nav-link").click(function(event) { 
        event.preventDefault(); 
        let target = $(this).attr("href"); 
        $("html, body").animate({ 
            scrollTop: $(target).offset().top - 10 
        }, 0); 
    }); 
     
 
    // Mode Gelap/Terang 
    $("#toggleTheme").click(function() { 
        $("body").toggleClass("bg-dark text-light"); 
        $(this).text($("body").hasClass("bg-dark") ? "Mode Terang" : "Mode Gelap"); 
    }); 
 
    // To-Do List 
    $("#addTask").click(function() { 
        let task = $("#newTask").val(); 
        if (task !== "") { 
            $("#taskList").append('<li class="list-group-item">' + task + ' <button class="btn btn-danger btn-sm float-end remove-task">Hapus</button></li>');  $("#newTask").val(""); 
        } 
    }); 
 
    $(document).on("click", ".remove-task", function() { 
        $(this).parent().remove(); 
    }); 
 
    // Tabel Interaktif (Pencarian) 
    $("#searchTable").on("keyup", function() { 
        let value = $(this).val().toLowerCase(); 
        $("#tableData tr").filter(function() { 
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1); 
        }); 
    }); 
 
    // Ubah warna kotak sesuai tombol yang diklik 
    $(".change-box-color").click(function() { 
        let color = $(this).data("color"); 
        $("#colorBox").css("background-color", color); 
    }); 
 
    // Tabel Interaktif (Sorting) 
    $("#sortName").click(function() { 
        let rows = $("#tableData tr").get(); 
        rows.sort(function(a, b) { 
            let keyA = $(a).children("td").eq(0).text().toUpperCase(); 
            let keyB = $(b).children("td").eq(0).text().toUpperCase(); 
            return (keyA < keyB) ? -1 : (keyA > keyB) ? 1 : 0; 
        }); 
        $.each(rows, function(index, row) { 
            $("#tableData").append(row); 
        }); 
    }); 
 
    // Simulasi Login 
    $("#loginBtn").click(function() { 
        alert("Login Berhasil! (Simulasi)"); 
        $("#loginModal").modal("hide"); 
    }); 
}); 