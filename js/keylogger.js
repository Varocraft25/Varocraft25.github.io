document.addEventListener('DOMContentLoaded', () => {
    const keyElement = document.getElementById('key');
    const keyHistoryElementCode = document.getElementById('key-history-code');
    const keyHistoryElementKey = document.getElementById('key-history-key');
    const downloadCodeBtn = document.getElementById('download-code-btn');
    const downloadKeyBtn = document.getElementById('download-key-btn');
    

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        const code = event.code;

        // Actualizar la tecla presionada actual
        keyElement.textContent = key;

        // Crear elementos <span> para cada historial y añadirlos
        const keySpanCode = document.createElement('span');
        keySpanCode.textContent = code;
        keyHistoryElementCode.appendChild(keySpanCode);
        keyHistoryElementCode.scrollTop = keyHistoryElementCode.scrollHeight;

        const keySpanKey = document.createElement('span');
        keySpanKey.textContent = key;
        keyHistoryElementKey.appendChild(keySpanKey);
        keyHistoryElementKey.scrollTop = keyHistoryElementKey.scrollHeight;
    });

    // Manejador de eventos para descargar el historial de event.code
    downloadCodeBtn.addEventListener('click', () => {
        const codes = Array.from(keyHistoryElementCode.children).map(span => span.textContent).join('');
        const blob = new Blob([codes], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'code_history.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // Manejador de eventos para descargar el historial de event.key
    downloadKeyBtn.addEventListener('click', () => {
        const keys = Array.from(keyHistoryElementKey.children).map(span => span.textContent).join('');
        const blob = new Blob([keys], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'key_history.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});
