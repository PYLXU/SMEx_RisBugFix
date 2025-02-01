const updateLyrics = () => {
  const currentLyricsElement = document.querySelector('.SimLRC>.active');
  const currentLyrics = currentLyricsElement ? currentLyricsElement.firstChild.innerHTML : '';
  const currentLyricsTranslate = currentLyricsElement && currentLyricsTranslate !== currentLyricsElement.lastChild.innerHTML ? currentLyricsElement.lastChild.innerHTML : '';

  console.log('Lyrics:', currentLyrics);
  console.log('Translation:', currentLyricsTranslate);

  fetch(
    `http://127.0.0.1:50063/component/lyrics/lyrics/`,
    {
        method: "POST",
        body: JSON.stringify({
          basic: currentLyrics,
          extra: currentLyricsTranslate
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .catch(error => {
      console.error('Error:', error);
    });

};

const parentElement = document.querySelector('.SimLRC');
if (parentElement) {
  const observer = new MutationObserver(updateLyrics);
  observer.observe(parentElement, { childList: true, subtree: true });
  updateLyrics();
}
