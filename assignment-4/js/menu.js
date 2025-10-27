/* Espera o DOM (a página) carregar completamente */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SELEÇÃO DOS ELEMENTOS ---
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const navLinksContainer = document.querySelector('#nav-links');

    // Se não houver menu, não faz nada.
    if (!hamburgerBtn || !navLinksContainer) {
        return;
    }

    // --- 2. LÓGICA DO MENU HAMBURGER (MOBILE) ---
    
    function openMenu() {
        navLinksContainer.classList.add('is-active'); 
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        hamburgerBtn.setAttribute('aria-label', 'Fechar menu');
        // [A11Y] Foca no primeiro item
        navLinksContainer.querySelector('a[href]:not([disabled]), button:not([disabled])').focus();
    }

    function closeMenu() {
        navLinksContainer.classList.remove('is-active'); 
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.setAttribute('aria-label', 'Abrir menu');
        // [A11Y] Devolve o foco ao botão
        hamburgerBtn.focus();
    }

    // Clique no botão hamburger
    hamburgerBtn.addEventListener('click', () => {
        const isMenuOpen = navLinksContainer.classList.contains('is-active');
        isMenuOpen ? closeMenu() : openMenu();
    });

    // (REQUISITO DO USUÁRIO) Fechar o menu mobile ao clicar em um link
    navLinksContainer.addEventListener('click', (e) => {
        // Verifica se o hamburger está visível (estamos no mobile)
        const isMobile = hamburgerBtn.offsetParent !== null;

        // Se estamos no mobile E o item clicado foi um link (<a>)
        if (isMobile && e.target.tagName === 'A') {
            closeMenu();
        }
    });

    
    // --- 3. LÓGICA DO DROPDOWN (DESKTOP) ---
    
    const dropdownItems = document.querySelectorAll('.nav-links .dropdown-item');

    function closeAllDropdowns() {
        dropdownItems.forEach(item => item.classList.remove('is-open'));
    }

    dropdownItems.forEach(item => {
        const mainLink = item.querySelector('.nav-link'); // O link "Projetos Sociais"
        
        mainLink.addEventListener('click', (e) => {
            // Verifica se o hamburger está escondido (estamos no desktop)
            const isDesktop = hamburgerBtn.offsetParent === null;

            if (isDesktop) {
                // [A11Y] No desktop, impede o link de navegar
                // e o transforma em um "botão" de menu
                e.preventDefault(); 
                
                const isOpen = item.classList.contains('is-open');
                closeAllDropdowns(); // Fecha os outros
                
                if (!isOpen) {
                    item.classList.add('is-open');
                    // [A11Y] Foca no primeiro item do submenu
                    item.querySelector('.submenu a').focus();
                }
            }
            // Se for mobile, não faz nada (deixa o clique fechar o menu, como acima)
        });
    });


    // --- 4. LISTENERS GLOBAIS (ESC, Click-Out, Tab Trap) ---

    // [A11Y] Fecha menus com a tecla ESCAPE
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Fecha o menu mobile (se estiver aberto)
            if (navLinksContainer.classList.contains('is-active')) {
                e.preventDefault();
                closeMenu();
            }
            // Fecha o dropdown de desktop (se estiver aberto)
            closeAllDropdowns();
        }
        
        // [A11Y] "Focus Trap" do HAMBURGER
        // Só executa se o menu hamburger estiver ativo
        if (navLinksContainer.classList.contains('is-active')) {
            if (e.key === 'Tab') {
                const focusableItems = navLinksContainer.querySelectorAll('a[href]:not([disabled]), button:not([disabled])');
                const firstFocusableItem = focusableItems[0];
                const lastFocusableItem = focusableItems[focusableItems.length - 1];

                if (e.shiftKey) { 
                    if (document.activeElement === firstFocusableItem) {
                        e.preventDefault();
                        lastFocusableItem.focus();
                    }
                } else { 
                    if (document.activeElement === lastFocusableItem) {
                        e.preventDefault();
                        firstFocusableItem.focus();
                    }
                }
            }
        }
    });
    
    // [A11Y] Fecha o dropdown de desktop se clicar fora dele
    document.addEventListener('click', (e) => {
        // Se o clique NÃO foi dentro de um .dropdown-item
        // E NÃO foi o botão hamburger (para evitar fechar o menu que acabou de abrir)
        if (!e.target.closest('.dropdown-item') && !e.target.closest('.hamburger-menu')) {
            closeAllDropdowns();
        }
    });

});