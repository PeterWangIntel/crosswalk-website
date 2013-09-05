document.addEventListener ('DOMContentLoaded', function () {
    Array.prototype.forEach.call (
        document.querySelectorAll ('a:not(a[href^="/"]'), 
        function (link) {
            console.log (link.getAttribute ('href'));
    });
});