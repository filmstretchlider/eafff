document.getElementById("quoteForm")?.addEventListener("submit", function(e){
  e.preventDefault();
  const data = new FormData(this);
  const subject = "Solicitud de cotización - EAFF";
  const lines = [];
  for (const [key, value] of data.entries()) {
    lines.push(key + ": " + value);
  }
  window.location.href = "mailto:eaff@eaff.com.ar?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
});
