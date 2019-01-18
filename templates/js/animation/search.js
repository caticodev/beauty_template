export default function search(container) {
    container.querySelector('.c-search_close').addEventListener('click', () => container.classList.toggle('is-open'));
}
