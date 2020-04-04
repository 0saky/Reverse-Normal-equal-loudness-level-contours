function display(text = "") {
    let write = "";
    for (let i = 0; i < systeme[0].length; i++) {
        for (let j = 0; j < systeme.length; j++) {
            write += systeme[j][i] + "\t";
        }

        write += "\n";
    }
    console.log(text + "\n", write);
}

function ajouter(l1, l0, coef) {
    for (let i = 0; i < systeme.length; i++) {
        systeme[i][l1] += coef * systeme[i][l0];
    }
}
function opligne(l, coef) {
    for (let i = 0; i < systeme.length; i++) {
        systeme[i][l] *= coef;
    }
}

function incoprinc(ligne) {
    for (let i = ligne + 1; i < systeme[0].length; i++) {

        let coef = 0;
        if (systeme[ligne][ligne] != 0) {
            coef = -systeme[ligne][i] / systeme[ligne][ligne];
        }

      //  console.log(ligne, i, ": ", systeme[ligne][i], "\t", ligne, ligne, ": ", systeme[ligne][ligne], "\n coef:", coef);

        ajouter(i, ligne, coef);
    }
}

function neutral(ligne) {

   // console.log("ligne", ligne, " ", systeme[ligne][ligne]);
    if (systeme[ligne][ligne] != 0 && systeme[ligne][ligne] != 1) {
        let coef = 1 / systeme[ligne][ligne];
       // console.log("Coef:", coef);
        opligne(ligne, coef);
    }

}

function final(ligne) {
    for (let i = ligne-1; i >= 0; i--) {
        //console.log("ligne", ligne, "i ", i, " ", systeme[ligne][i]);
        if (systeme[ligne][i] != 0 ) {
            let coef = -systeme[ligne][i];
            //console.log("Coef:", coef);
            ajouter(i, ligne, coef);
        }
    }
}