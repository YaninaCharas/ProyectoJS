let cad=`
<nav class="navbar navbar-expand-lg bg-pink navbar-transparent fixed-top">
<div class="container-fluid">
  <a class="navbar-brand" href="../index.html"><img src="../images/iconos/logo_largo.png" alt="Logo 5asec" class="img_logo"/></a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-link" href="../index.html">INICIO</a>
      <a class="nav-link" href="./servicios.html">SERVICIOS</a>
      <a class="nav-link" href="./procesos.html">PROCESOS</a>
      <a class="nav-link" href="./tips.html">TIPS</a>
      <a class="nav-link" href="./delivery.html">DELIVERY</a>
      <a class="nav-link" href="./contacto.html">CONTACTO</a>
    </div>
  </div>
</div>
</nav>`

document.getElementById("idheader").innerHTML=cad;

cad = `
<span>Copyright© 2022 - Yanina Charas</span>
<a class="btn-mail" href="mailto:5asec.maure@gmail.com">Contactame aqui</a>
<a href="https://www.facebook.com/profile.php?id=100085885331815" target="_blank" class="bi-facebook"></a>
<a href="https://www.instagram.com/5asec_maure" target="_blank" class="bi-instagram"></a>
<a href="https://api.whatsapp.com/send?phone=05491134317751&text=Hola, agendanos y envianos un Whatsapp!!!" target="_blank" class="bi-whatsapp"></a>`

document.getElementById("idfooter").innerHTML=cad;