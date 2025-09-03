const cepInput = document.querySelector("#cep");
const form = document.querySelector("#cepForm");

// deixar só números no CEP
cepInput.addEventListener("input", () => {
    cepInput.value = cepInput.value.replace(/\D/g, "");
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const cep = cepInput.value;

    if (cep.length !== 8) {
        alert("Digite um CEP com 8 números.");
        return;
    }

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        if (dados.erro) {
            alert("CEP não encontrado!");
            return;
        }

        document.querySelector("#logradouro").value = dados.logradouro || "";
        document.querySelector("#bairro").value = dados.bairro || "";
        document.querySelector("#localidade").value = dados.localidade || "";
        document.querySelector("#uf").value = dados.uf || "";
        document.querySelector("#regiao").value = dados.regiao || "";

    } catch (err) {
        alert("Erro ao buscar o CEP. Tente de novo mais tarde.");
        console.error(err);
    }
});
