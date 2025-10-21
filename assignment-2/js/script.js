// Aguarda o documento carregar completamente
document.addEventListener('DOMContentLoaded', () => {
  
  // Seleciona o botão e a lista de links
  const hamburgerBtn = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('#nav-links');

  // Verifica se os dois elementos existem antes de adicionar o evento
  if (hamburgerBtn && navLinks) {
    
    // Adiciona um evento de "click" ao botão
    hamburgerBtn.addEventListener('click', () => {
      
      // Alterna (adiciona/remove) a classe 'is-active' na lista de links
      navLinks.classList.toggle('is-active');

      // Verifica se o menu está ativo (aberto)
      const isActive = navLinks.classList.contains('is-active');

      // Atualiza os atributos de acessibilidade
      hamburgerBtn.setAttribute('aria-expanded', isActive);

      // (Opcional) Muda o ícone e o rótulo do botão
      if (isActive) {
        hamburgerBtn.innerHTML = '&times;'; // Ícone 'X' (fechar)
        hamburgerBtn.setAttribute('aria-label', 'Fechar menu');
      } else {
        hamburgerBtn.innerHTML = '&#9776;'; // Ícone Hamburguer
        hamburgerBtn.setAttribute('aria-label', 'Abrir menu');
      }
    });
  }
});