//Máscara

document.getElementById("cpf").addEventListener("input", function(e) {
    var cpf = this.value.replace(/\D/g, '');  // 
    if (cpf.length > 11) cpf = cpf.slice(0, 11); 
    
    if (cpf.length > 9){
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4'); 
    } else if (cpf.length > 6) {
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3'); 
    }else if (cpf.length > 3) {
    cpf = cpf.replace(/(\d{3})(\d{0,3})/, '$1.$2'); 
    }
    this.value = cpf; 
});


document.getElementById("dataNascimento").addEventListener("input", function(e) {
    var data = this.value.replace(/\D/g, '');
    if (data.length > 8) data = data.slice(0, 8);

    if (data.length >= 5){
    data = data.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    }else if (data.length >= 3){
    data = data.replace(/(\d{2})(\d{2})/, '$1/$2');
    }else{
        data=data
    }
    this.value = data;
})
document.getElementById("Telefone").addEventListener("input", function(e) {
    var Telefone = this.value.replace(/\D/g, ''); 
    if (Telefone.length > 11) Telefone = Telefone.slice(0, 11);


    if (Telefone.length <= 2) {
        Telefone = Telefone;
    } else if (Telefone.length <= 6) {
        Telefone = Telefone.replace(/(\d{2})(\d{0,4})/, '($1) $2');
    } else {
        Telefone = Telefone.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
    this.value = Telefone;
});

//CRUD
// Lista para armazenar as propriedades
let propriedades = [];
let editIndex = -1;

// Referências dos elementos
const formulario = document.getElementById("formulario");
const tabela = document.getElementById("Tabela").querySelector("tbody");
const buttonCancel = document.getElementById("button_Cancel");

// Função para atualizar a tabela na tela
function atualizarTabela() {
    tabela.innerHTML = "";
    propriedades.forEach((prop, idx) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${prop.nome}</td>
            <td>${prop.dataNascimento}</td>
            <td>${prop.telefone}</td>
            <td>${prop.cpf}</td>
            <td>${prop.genero}</td>
            <td>
                <button onclick="editarPropriedade(${idx})">Editar</button>
                <button onclick="deletarPropriedade(${idx})">Excluir</button>
            </td>
        `;
        tabela.appendChild(row);
    });
}


formulario.addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("texto").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    const telefone = document.getElementById("Telefone").value;
    const cpf = document.getElementById("cpf").value;
    const genero = document.getElementById("Genero").value;

    const novaPropriedade = { nome, dataNascimento, telefone, cpf, genero };

    if (editIndex == -1) {
    propriedades.unshift(novaPropriedade); 
    } else {
    propriedades[editIndex] = novaPropriedade;
    editIndex = -1;
    }


    atualizarTabela();
    formulario.reset();
});

// Cancelar edição
buttonCancel.addEventListener("click", function(e) {
    e.preventDefault();
    formulario.reset();
    editIndex = -1;
});

// Editar propriedade
window.editarPropriedade = function(index) {
    const prop = propriedades[index];
    document.getElementById("texto").value = prop.nome;
    document.getElementById("dataNascimento").value = prop.dataNascimento;
    document.getElementById("Telefone").value = prop.telefone;
    document.getElementById("cpf").value = prop.cpf;
    document.getElementById("Genero").value = prop.genero;
    editIndex = index;
};

// Deletar propriedade
window.deletarPropriedade = function(index) {
    if (confirm("Deseja excluir este registro?")) {
        propriedades.splice(index, 1);
        atualizarTabela();
    }
};
