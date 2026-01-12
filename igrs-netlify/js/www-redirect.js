// WWW to non-WWW redirect for domain consolidation
if (window.location.hostname === 'www.igrs.online') {
  window.location.replace('https://igrs.online' + window.location.pathname + window.location.search + window.location.hash);
}
