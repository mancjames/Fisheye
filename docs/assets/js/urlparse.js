export default function callback() {
  // creating array to help with URL parsing
  const photographersId = [];
  for (let i = 0; i < photographers.length; i++) {
    const photographersString = JSON.stringify(photographers[i].id);
    photographersId.push(photographersString);
  }
  // Parse the URL parameter
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  const dynamicContent = getParameterByName('dc');
  if (photographersId.indexOf(dynamicContent) !== -1) {
    document.getElementById('photographer-page').style.display = 'block';
  } else {
    document.getElementById('default-content').style.display = 'block';
  }
}
