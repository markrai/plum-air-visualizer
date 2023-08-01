window.addEventListener('load', function() {
    setTimeout(function() {
        var logoContainer = document.getElementById('logo-container');
        var logoImage = document.createElement('img');
        logoImage.src = '/img/logo.gif';
        logoImage.alt = 'Animated GIF';
        logoImage.style.width = '100%';
        logoContainer.appendChild(logoImage);
    }, 1000); // Delay of 1 second, you can adjust as needed
});
