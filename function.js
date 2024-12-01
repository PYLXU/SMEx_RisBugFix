const audioElement = document.getElementById('audio');
if (audioElement) {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
        const src = mutation.target.getAttribute('src');
        // 替换反斜杠为正斜杠，以便进行URL编码
        const forwardSlashesSrc = src.replace(/\\/g, '/');
        // 如果src包含#，则进行URL编码
        if (forwardSlashesSrc.includes('#')) {
          const encodedSrc = encodeURIComponent(forwardSlashesSrc);
          // 将编码后的URL中的%2F替换为正斜杠，以保持URL格式
          const finalSrc = 'file:///' + encodedSrc.replace(/%2F/g, '/').replace(/%3a/g, ':');
          // 更新audio标签的src属性
          mutation.target.setAttribute('src', finalSrc);
        }
      }
    });
  });

  const config = { attributes: true };
  observer.observe(audioElement, config);
}