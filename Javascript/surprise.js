document.addEventListener('DOMContentLoaded', function() {
  // Remove the existing functionality

  // Create an iframe element for the Spotify playlist embed
  const iframe = document.createElement('iframe');
  iframe.style.borderRadius = '12px';
  iframe.src = 'https://open.spotify.com/embed/playlist/0IKdt8G6HTp9UzuD6fEW0Y?utm_source=generator';
  iframe.width = '100%';
  iframe.height = '352';
  iframe.frameBorder = '0';
  iframe.allowFullscreen = true;
  iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
  iframe.loading = 'lazy';

  // Append the iframe to the body or a specific container
  document.body.appendChild(iframe);
});
