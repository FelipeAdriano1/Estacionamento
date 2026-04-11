//NORMALIZAR DADOS.
export default function normalize(body) {
    const result = Object.entries(body).map((v) => {
        //EXISTE UM PROBLEMA: NÃO VERIFICO EM PROFUNDIDADE.
        //MÉTODO PADRONIZADO DEMAIS.
        //SE FAÇO UM .replace('[-, ], ""'), POSSO ALTERAR STRINGS QUE NÃO DEVERIAM SER ALTERADAS.
    });

    console.log(result);
}
//VERIFICAR DUPLICIDADE.
//TRATAR SENHAS.