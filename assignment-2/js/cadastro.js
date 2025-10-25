const submitButton = document.getElementById('btn-enviar'); 
    // Primeiro, seleciono os campos (inputs) do formulário que quero manipular
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');

    // Todos os outros campos OBRIGATÓRIOS
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const enderecoInput = document.getElementById('endereco');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');


    // Função que verifica a validade de TODOS os campos
    function validarFormulario() {
        // Ajuste o '.length' para o tamanho exato que suas máscaras produzem    //aaaaaaaaaaaaaaaaaaaa
        const cpfValido = cpfInput.value.length === 14;       // "000.000.000-00"
        const telefoneValido = telefoneInput.value.length === 15; // "(00) 00000-0000"
        const cepValido = cepInput.value.length === 9;        // "00000-000"      
        const nomeValido = nomeInput.value.trim() !== "";
        const emailValido = emailInput.value.includes('@');
        const enderecoValido = enderecoInput.value.trim() !== "";
        const cidadeValido = cidadeInput.value.trim() !== "";
        const estadoValido = estadoInput.value.trim() !== "";
        

        // Condição final
        if (cpfValido && telefoneValido && cepValido  && nomeValido && emailValido && enderecoValido && cidadeValido && estadoValido) {
            submitButton.disabled = false; // Habilita o botão
        } else {
            submitButton.disabled = true;  // Desabilita o botão
        }
    }


    // Máscara para CPF: 000.000.000-00 (...)
    cpfInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); 
        value = value.replace(/(\d{3})(\d)/, '$1.$2'); 
        value = value.replace(/(\d{3})(\d)/, '$1.$2'); 
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
        e.target.value = value;
        
        // Chama a função de validação após a máscara
        validarFormulario();
    });

    // Máscara para Telefone: (00) 00000-0000
    telefoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); 
        value = value.replace(/(\d{5})(\d)/, '$1-$2'); 
        e.target.value = value;
        validarFormulario();
    });

    // Máscara para CEP: 00000-000
    cepInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); 
        value = value.replace(/^(\d{5})(\d)/, '$1-$2'); 
        e.target.value = value; 
        validarFormulario();
    });

    // Adicione 'listeners' para seus outros campos obrigatórios
    nomeInput.addEventListener('input', validarFormulario);
    emailInput.addEventListener('input', validarFormulario);
    enderecoInput.addEventListener('input', validarFormulario);
    cidadeInput.addEventListener('input', validarFormulario);
    estadoInput.addEventListener('input', validarFormulario);

    // Chama a função uma vez no início para garantir
    // que o botão comece desabilitado (mesmo se o navegador
    // preencher automaticamente os campos).
    validarFormulario();