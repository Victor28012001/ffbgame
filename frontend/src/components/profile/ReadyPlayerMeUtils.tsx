// Utility to get Ready Player Me avatar URL via an iframe interaction
export async function getReadyPlayerMeAvatarUrl(): Promise<string> {
    return new Promise((resolve) => {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://readyplayer.me/avatar';
      iframe.style.width = '100%';
      iframe.style.height = '600px';
      document.body.appendChild(iframe);
  
      window.addEventListener('message', function receiveMessage(event) {
        if (event.origin === 'https://readyplayer.me' && event.data && event.data.url) {
          resolve(event.data.url); // Avatar URL is received from Ready Player Me
          window.removeEventListener('message', receiveMessage);
          iframe.remove(); // Remove the iframe after avatar selection
        }
      });
    });
  }
  