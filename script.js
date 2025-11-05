// Função para criptografar usando a cifra de César com deslocamento personalizado
function caesarCipher(text, shift = 3) {
    let result = '';
    for (let char of text) {
        if (char.match(/[a-z]/i)) {
            // Determina se é maiúscula ou minúscula
            const isUpperCase = char === char.toUpperCase();
            const base = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            // Aplica o deslocamento com rotação circular
            const shifted = (((char.charCodeAt(0) - base + shift) % 26 + 26) % 26) + base;
            result += String.fromCharCode(shifted);
        } else if (char.match(/[0-9]/)) {
            // Processa dígitos com deslocamento circular
            const digit = parseInt(char);
            const shiftedDigit = ((digit + shift) % 10 + 10) % 10;
            result += shiftedDigit.toString();
        } else {
            // Mantém caracteres não alfanuméricos inalterados
            result += char;
        }
    }
    return result;
}

// Função para gerar criptografia aleatória com mapa único
function randomCipher(text) {
    // Conjunto de caracteres possíveis para substituição: letras, números, símbolos
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    const charArray = chars.split('');

    // Cria um mapa de substituição único para esta execução
    const substitutionMap = {};
    const usedChars = new Set();

    for (let char of text) {
        if (!substitutionMap[char]) {
            // Encontra um caractere não usado para substituir
            let randomChar;
            do {
                randomChar = charArray[Math.floor(Math.random() * charArray.length)];
            } while (usedChars.has(randomChar));
            usedChars.add(randomChar);
            substitutionMap[char] = randomChar;
        }
    }

    // Aplica a substituição
    let result = '';
    for (let char of text) {
        result += substitutionMap[char];
    }

    return { result, map: substitutionMap };
}

// Função para descriptografar usando a cifra de César com deslocamento personalizado
function caesarDecipher(text, shift = -3) {
    return caesarCipher(text, shift);
}

// Função para descriptografar texto aleatório (não possível)
function randomDecipher(text) {
    return 'Este tipo de criptografia não pode ser revertido, pois utiliza um mapa de substituição aleatório único que não é armazenado.';
}

// Função para calcular possibilidades baseado no tipo de criptografia
function calculatePossibilities(shiftValue, text, encryptionType) {
    if (encryptionType === 'caesar') {
        // Para César, o cálculo é baseado no número de dígitos do deslocamento
        const shiftStr = Math.abs(shiftValue).toString();
        const numDigits = shiftStr.length;
        // Combinações possíveis = 10^n onde n é o número de dígitos
        return Math.pow(10, numDigits);
    } else if (encryptionType === 'random') {
        // Para aleatória, possibilidades são baseadas no número de caracteres únicos no texto
        const uniqueChars = new Set(text.split('')).size;
        // Número de permutações possíveis dos caracteres únicos
        let possibilities = 1;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        const availableChars = chars.length;
        for (let i = 0; i < uniqueChars; i++) {
            possibilities *= (availableChars - i);
        }
        return possibilities;
    }
    return 1;
}

// Função para gerar explicação passo a passo
function generateExplanation(originalText, encryptionType = 'caesar', shift = 3) {
    if (!originalText.trim()) {
        return '<p>Aguarde uma entrada para ver a explicação passo a passo.</p>';
    }

    if (encryptionType === 'caesar') {
        let explanation = `<h3>Explicação Passo a Passo (Cifra de César com deslocamento ${shift}):</h3><ul>`;
        const encrypted = caesarCipher(originalText, shift);

        for (let i = 0; i < originalText.length; i++) {
            const originalChar = originalText[i];
            const encryptedChar = encrypted[i];
            if (originalChar.match(/[a-z]/i)) {
                explanation += `<li>"${originalChar}" → "${encryptedChar}" (deslocamento de ${shift} posições)</li>`;
            } else if (originalChar.match(/[0-9]/)) {
                explanation += `<li>"${originalChar}" → "${encryptedChar}" (deslocamento de ${shift} unidades, rotação circular)</li>`;
            } else {
                explanation += `<li>"${originalChar}" → "${encryptedChar}" (caractere não alfanumérico, permanece inalterado)</li>`;
            }
        }
        explanation += '</ul>';
        explanation += `<p><strong>Resultado final:</strong> "${encrypted}"</p>`;
        return explanation;
    } else if (encryptionType === 'random') {
        let explanation = '<h3>Explicação Passo a Passo (Criptografia Aleatória):</h3>';
        explanation += '<p>Nesta criptografia, cada caractere único da frase é substituído por um caractere aleatório (letra, número ou símbolo) de forma única para esta execução.</p>';
        explanation += '<h4>Mapa de Substituição Gerado:</h4><ul>';

        const map = window.currentRandomMap || {};
        for (let char in map) {
            explanation += `<li>"${char}" → "${map[char]}"</li>`;
        }
        explanation += '</ul>';

        explanation += '<h4>Aplicação à Frase:</h4><ul>';
        for (let i = 0; i < originalText.length; i++) {
            const originalChar = originalText[i];
            const encryptedChar = map[originalChar];
            explanation += `<li>Posição ${i + 1}: "${originalChar}" → "${encryptedChar}"</li>`;
        }
        explanation += '</ul>';

        const result = originalText.split('').map(char => map[char]).join('');
        explanation += `<p><strong>Resultado final:</strong> "${result}"</p>`;
        return explanation;
    }

    return '<p>Tipo de criptografia não reconhecido.</p>';
}

// Função para gerar explicação passo a passo da descriptografia
function generateDecryptExplanation(decryptText, decryptType = 'caesar', shift = 3) {
    if (!decryptText.trim()) {
        return '<p>Aguarde uma entrada para ver a explicação passo a passo da descriptografia.</p>';
    }

    if (decryptType === 'caesar') {
        let explanation = `<h3>Explicação Passo a Passo (Descriptografia César com deslocamento ${-shift}):</h3><ul>`;
        const decrypted = caesarDecipher(decryptText, -shift);

        for (let i = 0; i < decryptText.length; i++) {
            const originalChar = decryptText[i];
            const decryptedChar = decrypted[i];
            if (originalChar.match(/[a-z]/i)) {
                explanation += `<li>"${originalChar}" → "${decryptedChar}" (deslocamento de ${-shift} posições)</li>`;
            } else if (originalChar.match(/[0-9]/)) {
                explanation += `<li>"${originalChar}" → "${decryptedChar}" (deslocamento de ${-shift} unidades, rotação circular)</li>`;
            } else {
                explanation += `<li>"${originalChar}" → "${decryptedChar}" (caractere não alfanumérico, permanece inalterado)</li>`;
            }
        }
        explanation += '</ul>';
        explanation += `<p><strong>Resultado final:</strong> "${decrypted}"</p>`;
        return explanation;
    } else if (decryptType === 'random') {
        let explanation = '<h3>Descriptografia Aleatória:</h3>';
        explanation += '<p>Este tipo de criptografia não pode ser revertido, pois utiliza um mapa de substituição aleatório único que não é armazenado.</p>';
        return explanation;
    }

    return '<p>Tipo de criptografia não reconhecido.</p>';
}

// Função para alternar entre abas
function switchTab(tabName) {
    // Remove a classe 'active' de todas as abas e botões
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Adiciona a classe 'active' à aba selecionada
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');

    // Se a aba "Como Funciona" for selecionada, atualiza a explicação e o texto do exemplo
    if (tabName === 'how-it-works') {
        const inputText = document.getElementById('input-text').value;
        const encryptionType = document.getElementById('encryption-type').value;
        const shiftValue = parseInt(document.getElementById('shift-value').value);
        updateExampleText(inputText);
        document.getElementById('explanation').innerHTML = generateExplanation(inputText, encryptionType, shiftValue);
    }

    // Se a aba "Como foi Descriptografado" for selecionada, atualiza a explicação da descriptografia
    if (tabName === 'how-decrypt-works') {
        const decryptText = document.getElementById('decrypt-input-text').value;
        const decryptType = document.getElementById('decrypt-type').value;
        const decryptShiftValue = parseInt(document.getElementById('decrypt-shift-value').value);
        document.getElementById('decrypt-explanation').innerHTML = generateDecryptExplanation(decryptText, decryptType, decryptShiftValue);
    }
}

// Função para atualizar o texto do exemplo
function updateExampleText(inputText) {
    const exampleTextElement = document.getElementById('example-text');
    if (inputText.trim()) {
        exampleTextElement.textContent = `Por exemplo, se você digitar "${inputText}", a transformação será:`;
    } else {
        exampleTextElement.textContent = 'Por exemplo, se você digitar "Olá Mundo!", a transformação será:';
    }
}

// Função para descriptografar e exibir resultado
function decryptText() {
    const inputText = document.getElementById('decrypt-input-text').value.trim();
    const decryptShiftValue = parseInt(document.getElementById('decrypt-shift-value').value);
    const decryptType = document.getElementById('decrypt-type').value;
    const errorMessage = document.getElementById('decrypt-error-message');
    const resultDiv = document.getElementById('decrypt-result');
    const decryptedText = document.getElementById('decrypted-text');

    if (!inputText) {
        // Exibe mensagem de erro
        errorMessage.classList.remove('hidden');
        resultDiv.classList.add('hidden');
        return;
    }

    if (decryptShiftValue === 0) {
        errorMessage.textContent = 'O deslocamento precisa ser diferente de zero.';
        errorMessage.classList.remove('hidden');
        resultDiv.classList.add('hidden');
        return;
    }

    // Oculta erro e exibe resultado
    errorMessage.classList.add('hidden');
    resultDiv.classList.remove('hidden');

    let result;
    if (decryptType === 'caesar') {
        result = caesarDecipher(inputText, -decryptShiftValue);
        decryptedText.textContent = `Descriptografado: ${result}`;
    } else if (decryptType === 'random') {
        result = randomDecipher(inputText);
        decryptedText.textContent = result;
    }

    // Atualiza a explicação na aba "Como foi Descriptografado" se estiver ativa
    if (document.getElementById('how-decrypt-works').classList.contains('active')) {
        document.getElementById('decrypt-explanation').innerHTML = generateDecryptExplanation(inputText, decryptType, decryptShiftValue);
    }
}

// Função para criptografar e exibir resultado
function encryptText() {
    const inputText = document.getElementById('input-text').value.trim();
    const shiftValue = parseInt(document.getElementById('shift-value').value);
    const encryptionType = document.getElementById('encryption-type').value;
    const errorMessage = document.getElementById('error-message');
    const resultDiv = document.getElementById('result');
    const encryptedText = document.getElementById('encrypted-text');

    if (!inputText) {
        // Exibe mensagem de erro
        errorMessage.classList.remove('hidden');
        resultDiv.classList.add('hidden');
        return;
    }

    if (shiftValue === 0) {
        errorMessage.textContent = 'O deslocamento precisa ser diferente de zero.';
        errorMessage.classList.remove('hidden');
        resultDiv.classList.add('hidden');
        return;
    }

    // Oculta erro e exibe resultado
    errorMessage.classList.add('hidden');
    resultDiv.classList.remove('hidden');

    let result;
    if (encryptionType === 'caesar') {
        result = caesarCipher(inputText, shiftValue);
        encryptedText.textContent = `Cifra de César: ${result}`;
    } else if (encryptionType === 'random') {
        const { result: randomResult, map } = randomCipher(inputText);
        result = randomResult;
        encryptedText.textContent = `Criptografia Aleatória: ${result}`;
        // Armazena o mapa para a explicação
        window.currentRandomMap = map;
    }

    // Calcula possibilidades baseado no deslocamento e texto
    const numPossibilities = calculatePossibilities(shiftValue, inputText, encryptionType);
    const chancePercent = (1 / numPossibilities * 100).toFixed(2);

    // Determina a cor baseada na probabilidade
    let colorClass = '';
    if (chancePercent < 1) {
        colorClass = 'low';
    } else if (chancePercent >= 1 && chancePercent < 10) {
        colorClass = 'medium';
    } else {
        colorClass = 'high';
    }

    // Exibe possibilidades
    const possibilitiesDiv = document.getElementById('possibilities');
    const numPossibilitiesSpan = document.getElementById('num-possibilities');
    const chancePercentSpan = document.getElementById('chance-percent');
    numPossibilitiesSpan.textContent = numPossibilities;
    chancePercentSpan.textContent = chancePercent + '%';
    chancePercentSpan.className = `chance-percent ${colorClass}`;
    possibilitiesDiv.classList.remove('hidden');

    // Atualiza a explicação na aba "Como Funciona" se estiver ativa
    if (document.getElementById('how-it-works').classList.contains('active')) {
        updateExampleText(inputText);
        document.getElementById('explanation').innerHTML = generateExplanation(inputText, encryptionType, shiftValue);
    }
}

// Função para baixar PDF
function downloadPDF() {
    const link = document.createElement('a');
    link.href = 'Assets/pdf.pdf';
    link.download = 'pdf.pdf';
    link.click();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Botões das abas
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            switchTab(this.getAttribute('data-tab'));
        });
    });

    // Botão de criptografar
    document.getElementById('encrypt-button').addEventListener('click', encryptText);

    // Botão de descriptografar
    document.getElementById('decrypt-button').addEventListener('click', decryptText);

    // Botão de download PDF
    document.getElementById('download-pdf-button').addEventListener('click', downloadPDF);

    // Evento para a tecla Enter no campo de entrada de criptografia
    document.getElementById('input-text').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita quebra de linha no textarea
            encryptText();
        }
    });

    // Evento para a tecla Enter no campo de entrada de descriptografia
    document.getElementById('decrypt-input-text').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita quebra de linha no textarea
            decryptText();
        }
    });

    // Atualiza a explicação em tempo real quando o texto muda (opcional, mas útil)
    document.getElementById('input-text').addEventListener('input', function() {
        if (document.getElementById('how-it-works').classList.contains('active')) {
            const encryptionType = document.getElementById('encryption-type').value;
            const shiftValue = parseInt(document.getElementById('shift-value').value);
            updateExampleText(this.value);
            document.getElementById('explanation').innerHTML = generateExplanation(this.value, encryptionType, shiftValue);
        }
    });

    // Atualiza a explicação quando o tipo de criptografia muda
    document.getElementById('encryption-type').addEventListener('change', function() {
        if (this.value === 'caesar') {
            document.getElementById('shift-value').value = 3;
        }
        if (document.getElementById('how-it-works').classList.contains('active')) {
            const inputText = document.getElementById('input-text').value;
            const shiftValue = parseInt(document.getElementById('shift-value').value);
            updateExampleText(inputText);
            document.getElementById('explanation').innerHTML = generateExplanation(inputText, this.value, shiftValue);
        }
    });

    // Atualiza a explicação da descriptografia em tempo real quando o texto muda
    document.getElementById('decrypt-input-text').addEventListener('input', function() {
        if (document.getElementById('how-decrypt-works').classList.contains('active')) {
            const decryptType = document.getElementById('decrypt-type').value;
            const decryptShiftValue = parseInt(document.getElementById('decrypt-shift-value').value);
            document.getElementById('decrypt-explanation').innerHTML = generateDecryptExplanation(this.value, decryptType, decryptShiftValue);
        }
    });

    // Atualiza a explicação da descriptografia quando o tipo muda
    document.getElementById('decrypt-type').addEventListener('change', function() {
        if (document.getElementById('how-decrypt-works').classList.contains('active')) {
            const decryptText = document.getElementById('decrypt-input-text').value;
            const decryptShiftValue = parseInt(document.getElementById('decrypt-shift-value').value);
            document.getElementById('decrypt-explanation').innerHTML = generateDecryptExplanation(decryptText, this.value, decryptShiftValue);
        }
    });
});
