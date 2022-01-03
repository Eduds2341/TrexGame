//Arrays e Matrizes

var notasAluno1 = [7.5, 8, 10, 5];
var media = 0;
var soma = 0;

console.log(notasAluno1.length);



for (let i = 0; i < notasAluno1.length; i++) {
    soma = soma + notasAluno1[i];  
}
media = soma/notasAluno1.length;

console.log(media);

