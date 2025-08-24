// MAPEAR CAMPOS

let campoCep = document.querySelector("#cep")

// Sanitizando o campo somente numeros

campoCep.addEventListener("input", () => {
    campoCep.value = campoCep.value.replace(/[^0-9]/g, "")
})

// Ver quando o usuario saiu do campo cep

campoCep.addEventListener("blur", () => {

    if (campoCep.value.length !== 8) {
        alert("Coloque um CEP válido")
    } else {
        fetch(`https://viacep.com.br/ws/${campoCep.value}/json`)
            .then(resposta => {
                if (!resposta.ok) {
                    throw new Error("Erro no  status do servidor" + resposta.status)
                }
                return resposta.json();
            })
            .then(data => {
                if (data.erro) {
                    alert("Cep nao encontrado, insira um cep válido!")
                    } else {
                        for(chave in data){
                            if(document.querySelector("#" + chave)){
                                document.querySelector("#" + chave).value = data[chave]
                            }
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            }
    });