// Garante que o script só rode depois que a página HTML estiver totalmente carregada
document.addEventListener('DOMContentLoaded', () => {
    // Pega os elementos do HTML pelo ID
    const passwordOutput = document.getElementById('passwordOutput');
    const passwordLength = document.getElementById('passwordLength');
    const includeUppercase = document.getElementById('includeUppercase');
    const includeLowercase = document.getElementById('includeLowercase');
    const includeNumbers = document.getElementById('includeNumbers');
    const includeSymbols = document.getElementById('includeSymbols');
    const generateButton = document.getElementById('generateButton');
    const copyButton = document.getElementById('copyButton');

    // Define os conjuntos de caracteres possíveis
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    // Função principal para gerar a senha
    function generatePassword() {
        let chars = ''; // String vazia para acumular os tipos de caracteres selecionados

        // Adiciona os caracteres se os checkboxes estiverem marcados
        if (includeUppercase.checked) chars += uppercaseChars;
        if (includeLowercase.checked) chars += lowercaseChars;
        if (includeNumbers.checked) chars += numberChars;
        if (includeSymbols.checked) chars += symbolChars;

        // Se nenhum tipo de caractere for selecionado, mostra uma mensagem de erro
        if (chars === '') {
            passwordOutput.value = 'Selecione pelo menos um tipo de caractere!';
            return; // Sai da função
        }

        let password = '';
        // Converte o valor do input de texto para número inteiro
        const length = parseInt(passwordLength.value);

        // Gera a senha selecionando caracteres aleatórios
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex]; // Adiciona o caractere aleatório à senha
        }

        passwordOutput.value = password; // Exibe a senha gerada no campo de saída
    }

    // Função para copiar a senha para a área de transferência
    function copyPassword() {
        // Verifica se há uma senha para copiar ou se é a mensagem de erro
        if (passwordOutput.value === '' || passwordOutput.value === 'Selecione pelo menos um tipo de caractere!') {
            alert('Não há senha válida para copiar!');
            return;
        }

        // Seleciona o texto no campo de saída da senha
        passwordOutput.select();
        // Para dispositivos móveis (garante que todo o texto seja selecionado)
        passwordOutput.setSelectionRange(0, 99999);

        // Tenta copiar o texto para a área de transferência usando a API Clipboard
        navigator.clipboard.writeText(passwordOutput.value)
            .then(() => {
                alert('Senha copiada para a área de transferência!');
            })
            .catch(err => {
                // Em caso de erro na cópia (por exemplo, permissões negadas)
                console.error('Erro ao copiar a senha: ', err);
                alert('Erro ao copiar a senha. Por favor, copie manualmente.');
            });
    }

    // Adiciona "ouvintes" de evento aos botões
    // Quando o botão "Gerar Senha" for clicado, a função generatePassword será chamada
    generateButton.addEventListener('click', generatePassword);
    // Quando o botão "Copiar" for clicado, a função copyPassword será chamada
    copyButton.addEventListener('click', copyPassword);

    // Gera uma senha inicial assim que a página é carregada
    generatePassword();
});
