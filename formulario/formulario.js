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
