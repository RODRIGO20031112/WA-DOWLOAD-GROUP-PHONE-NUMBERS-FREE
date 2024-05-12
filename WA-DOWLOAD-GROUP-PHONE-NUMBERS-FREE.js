// Cria um arquivo CSV com os números de telefone
function downloadCSV(data, filename) {
    var csv = 'Números de Telefone\n' + data.join('\n');
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // Para o Internet Explorer
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement('a');
        if (link.download !== undefined) {
            var url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

// Obtém todos os elementos que contêm números de telefone
var elementos = document.querySelectorAll('span[class*="x1iyjqo2"]');

// Inicializa uma variável para armazenar os números de telefone
var numerosTelefone = [];

// Itera sobre cada elemento encontrado
elementos.forEach(function(elemento) {
    // Obtém o texto dentro do elemento
    var texto = elemento.innerText.trim();
    // Usa expressão regular para extrair os números de telefone
    var numeros = texto.match(/\+?\d{1,3}\s?\d{2,3}\s?\d{4,5}-?\d{4}/g);
    // Adiciona os números de telefone à lista
    if (numeros) {
        numerosTelefone = numerosTelefone.concat(numeros);
    }
});

// Salva os números de telefone em um arquivo CSV
downloadCSV(numerosTelefone, 'numeros_telefone.csv');
