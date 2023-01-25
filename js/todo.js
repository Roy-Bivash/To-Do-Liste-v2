var lesTodo = [];
var divLesTodo = document.querySelector('#lesTodos');
var idListe;

let laListe = localStorage.getItem('mesList');
laListe = JSON.parse(laListe);

document.onclick = hideMenu;


function Main(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    idListe = urlParams.get('listId')
    
    lesTodo = laListe[idListe].todo;
    document.querySelector('#titre').textContent = `Todo de la liste ${laListe[idListe].nom}`;
    AfficherLesTodo();
}

function BtnAjouterTodo(){
    let newTodoNom = document.querySelector('#newTodoNom').value;
    let newTodoDesc = document.querySelector('#newTodoDesc').value;
    let newTodoEtat = document.querySelector('#newTodoEtat').value;
    let newTodoColor = document.querySelector('#newTodoColor').value;
    lesTodo.push({
        nom: newTodoNom,
        desc: newTodoDesc,
        etat: newTodoEtat,
        color: newTodoColor
    });
    // laListe = JSON.parse(laListe);

    laListe[idListe].todo = lesTodo;
    localStorage.setItem('mesList', JSON.stringify(laListe));
    document.location.reload();
}

function AfficherLesTodo(){
    divLesTodo.innerHTML = "";
    lesTodo.map(
        (element, index) => {
            let colorClass = (element.etat == "fini") ? "border-fini" : "border-enCours";
            divLesTodo.insertAdjacentHTML(
            "beforeend",
            `<div class="carte ${colorClass}" style="background-color:${element.color}" oncontextmenu="ClickGaucheTodo(event, '${element.etat}', ${index})">
                ${element.nom} - <span style="text-transform: capitalize;">${element.etat}</span> <br> ${element.desc}
            </div>`);
        }
    );
}

function ChangerEtat(idTodo, etat){
    laListe[idListe].todo[idTodo].etat = (etat == "en cours") ? "fini" : "en cours";
    localStorage.setItem('mesList', JSON.stringify(laListe));
    Main();

}

function ClickGaucheTodo(e, etat, idTodo){
    e.preventDefault();
    // console.log(e)
    // ShowPersonnalContextMenue();
    let divContextMenu = document.querySelector('#contextMenu');
    divContextMenu.style.display = "block";
    divContextMenu.innerHTML = "";
    divContextMenu.style.left = e.pageX + "px";
    divContextMenu.style.top = e.pageY + "px"; 
    divContextMenu.insertAdjacentHTML(
        "beforeend",
        `<div class="menuContainer">
            <h6>Vos Actions</h6>
            <hr>
            <p onclick="ChangerEtat(${idTodo}, '${etat}')">Changer d'état</p>
            <p onclick="ClickModifierTodo(${idTodo})">Modifier</p>
            <p onclick="ClickSupprimerTodo(${idTodo})">Supprimer</p>
        </div>`
    );
}

function hideMenu() { 
    document.getElementById("contextMenu").style.display = "none";
}

function ClickModifierTodo(idTodo){
    let divFormModif = document.querySelector('#formModif');
    divFormModif.classList.remove("hide");

    document.querySelector('#theFormModif').innerHTML = `
    <label class="form-label">Nom</label>
    <input type="text" class="form-control" value="${lesTodo[idTodo].nom}" id="formModifNom">
    <br>
    <label class="form-label">Description</label>
    <textarea type="text" class="form-control" id="formModifDesc">${lesTodo[idTodo].desc}</textarea>
    <br>
    <label class="form-label">Etat</label>
    <select class="form-select" id="formModifEtat">
        <option value="en cours">En cours</option>
        <option value="fini">Fini</option>
    </select>
    <br>
    <label class="form-label">Couleur</label>
    <select class="form-select" id="formModifColor">
        <option value="#f1948a">Rouge</option>
        <option value="#c39bd3">Violet</option>
        <option value="#76d7c4">Vert</option>
        <option value="#f7dc6f">Jaune</option>
        <option value="#d0d3d4">Gris</option>
        <option value="#5dade2">Bleu</option>
    </select>
    <br>
    <button type="button" class="btn btn-primary" onclick="CloseFormModif()">Annuler</button>
    <button type="button" class="btn btn-outline-success" onclick="ValiderFormModif(${idTodo})">Valider</button>`;

    document.querySelector('#formModifColor').value = lesTodo[idTodo].color;
    document.querySelector('#formModifEtat').value = lesTodo[idTodo].etat;

}

function CloseFormModif(){
    let divFormModif = document.querySelector('#formModif');
    divFormModif.classList.add("hide");
}

function ValiderFormModif(idTodo){
    let newTodoNom = document.querySelector('#formModifNom').value;
    let newTodoDesc = document.querySelector('#formModifDesc').value;
    let newTodoEtat = document.querySelector('#formModifEtat').value;
    let newTodoColor = document.querySelector('#formModifColor').value;

    lesTodo[idTodo] = {
        nom: newTodoNom,
        desc: newTodoDesc,
        etat: newTodoEtat,
        color: newTodoColor
    };
    laListe[idListe].todo = lesTodo;
    localStorage.setItem('mesList', JSON.stringify(laListe));
    document.location.reload();
}

function ClickSupprimerTodo(idTodo){
    lesTodo.splice(idTodo, 1);
    laListe[idListe].todo = lesTodo;
    localStorage.setItem('mesList', JSON.stringify(laListe));
    document.location.reload();
}
