# TODO - Atualização do Site de Criptografia César

- [x] Criar index.html com estrutura básica, abas, campo de entrada e seções de resultado/explicação
- [x] Criar styles.css com design profissional, responsivo e cores neutras
- [x] Criar script.js com lógica da cifra de César, troca de abas, validação de entrada e eventos de teclado
- [x] Adicionar seletor de tipo de criptografia (César ou Aleatória)
- [x] Implementar função de criptografia aleatória com mapa único
- [x] Atualizar explicação para mostrar mapa quando aleatória
- [x] Indicar no resultado se foi aleatória
- [x] Atualizar texto do exemplo dinamicamente com o que o usuário digitou
- [x] Adicionar botão para baixar PDF em local apropriado da interface
- [x] Adicionar nova aba "Descriptografar Frase" com campo de entrada, seletor de tipo (César ou Aleatória), botão e resultado
- [x] Implementar lógica de descriptografia para César (deslocamento -3) e mensagem para aleatória
- [x] Adicionar nova aba "Como foi Descriptografado" com explicação passo a passo para César usando exemplo do usuário
- [x] Atualizar script.js com funções decryptText, generateDecryptExplanation e eventos para novas abas
- [ ] Testar o site abrindo no navegador para verificar funcionalidade, responsividade e design

# TODO - Suporte à Criptografia de Números Decimais e Negativos

- [x] Atualizar função caesarCipher para processar dígitos (0-9) com deslocamento de 3 unidades e rotação circular
- [x] Atualizar função caesarDecipher para descriptografia com deslocamento -3
- [x] Atualizar generateExplanation para incluir explicação passo a passo para dígitos em criptografia César
- [x] Atualizar generateDecryptExplanation para incluir explicação passo a passo para dígitos em descriptografia César
- [ ] Testar a funcionalidade com exemplos como 1.25 → 4.58, -12.3 → -45.6, e descriptografia inversa
