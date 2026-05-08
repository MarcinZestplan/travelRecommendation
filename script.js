 const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const navSearch = document.getElementById('nav-search');
 
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    navSearch.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });
 
  function handleSearch() {
    const val = document.getElementById('search-field').value.trim();
    if (val) console.log('Searching for:', val);
  }
 
  function clearSearch() {
    document.getElementById('search-field').value = '';
    document.getElementById('search-field').focus();
  }
 
  // Search on Enter key
  document.getElementById('search-field').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSearch();
  });