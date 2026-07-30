// Vehicle Categories slider
document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('catTrack');
    const prevBtn = document.getElementById('catPrev');
    const nextBtn = document.getElementById('catNext');

    if (!track || !prevBtn || !nextBtn) return;

    const cards = track.querySelectorAll('.cat-card');
    if (cards.length === 0) return;

    let index = 0;

    function step() {
        // Width of one card plus the flex gap between cards
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return cards[0].getBoundingClientRect().width + gap;
    }

    function maxIndex() {
        // How many cards are fully visible in the viewport
        const viewport = track.parentElement.getBoundingClientRect().width;
        const perView = Math.max(1, Math.round(viewport / step()));
        return Math.max(0, cards.length - perView);
    }

    function update() {
        index = Math.min(index, maxIndex());
        track.style.transform = 'translateX(' + (-index * step()) + 'px)';
        prevBtn.disabled = index <= 0;
        nextBtn.disabled = index >= maxIndex();
    }

    prevBtn.addEventListener('click', function () {
        index = Math.max(0, index - 1);
        update();
    });

    nextBtn.addEventListener('click', function () {
        index = Math.min(maxIndex(), index + 1);
        update();
    });

    window.addEventListener('resize', update);
    update();
});
