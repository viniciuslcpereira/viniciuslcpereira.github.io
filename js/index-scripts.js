function redirect_to(user) {

    var redirects = {
        'nutella': 'UI.html',
        'root': 'bash.html'
    }

    return window.location.href = redirects[user];
}