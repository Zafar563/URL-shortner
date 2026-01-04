document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('shorten-form');
    const urlInput = document.getElementById('url-input');
    const aliasInput = document.getElementById('alias-input');
    const resultArea = document.getElementById('result-area');
    const errorArea = document.getElementById('error-area');
    const shortLink = document.getElementById('short-link');
    const errorMessage = document.getElementById('error-message');
    const copyBtn = document.getElementById('copy-btn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset state
        resultArea.classList.add('hidden');
        errorArea.classList.add('hidden');

        const url = urlInput.value;
        const alias = aliasInput.value;

        try {
            const response = await fetch('/url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: url, alias: alias }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.error) {
                    throw new Error(data.error);
                }
                throw new Error('Something went wrong. Please try again.');
            }

            // Success
            const fullShortUrl = `${window.location.protocol}//${window.location.host}/${data.alias}`;
            shortLink.href = fullShortUrl;
            shortLink.textContent = fullShortUrl;
            resultArea.classList.remove('hidden');

        } catch (error) {
            errorMessage.textContent = error.message;
            errorArea.classList.remove('hidden');
        }
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(shortLink.textContent).then(() => {
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
            }, 2000);
        });
    });
});
