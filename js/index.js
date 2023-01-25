var lesListes = [];
var divLesListes = document.querySelector('#lesListes');
document.onclick = hideMenu;

function Main(){
    getAllList();
    AfficherLesListes();
}

function getAllList() {
    let laListe = localStorage.getItem('mesList');
    if (!laListe) {
        console.log('Nouvelle liste crée');
        localStorage.setItem('mesList', JSON.stringify([]));
    } else {
        lesListes = JSON.parse(laListe);
    }
}

function AfficherLesListes(){
    divLesListes.innerHTML = "";
    lesListes.map(((element, index) => divLesListes.insertAdjacentHTML(
        "beforeend",
        `<div onclick="document.location.href='todo.html?listId=${index}'" oncontextmenu="ClickGaucheTodo(event, '${element.etat}', ${index})" class="carte" style="background-color:${element.color}; cursor:pointer">
            ${element.nom}
        </div>`)
    ));
}


function BtnAjouterListe(){
    let newListNom = document.querySelector('#newListNom').value;
    let newListColor = document.querySelector('#newListColor').value;

    if(newListNom != "" && newListColor != ""){
        lesListes.push({
            nom: newListNom,
            color: newListColor,
            todo: [],
        });
        localStorage.setItem('mesList', JSON.stringify(lesListes));
        document.location.reload();
    }else{
        alert('Veuillez remplire tous les champs');
    }
}

function BtnDeleteList(idList){
    if (window.confirm("Voulez vous vraiment le supprimer ?")) {
        lesListes.splice(idList, 1);
        localStorage.setItem('mesList', JSON.stringify(lesListes));
        // document.location.reload();
        Main();
    }
      
}


function ClickGaucheTodo(e, etat, idListe){
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
            <p onclick="ClickModifierList(${idListe})">Modifier</p>
            <p onclick="BtnDeleteList(${idListe})">Supprimer</p>
        </div>`
    );
}

function hideMenu() { 
    document.getElementById("contextMenu").style.display = "none";
}

function ClickModifierList(idListe){
    let divFormModif = document.querySelector('#formModif');
    divFormModif.classList.remove("hide");
    document.querySelector('#theFormModif').innerHTML = `
    <label class="form-label">Nom</label>
    <input type="text" class="form-control "value="${lesListes[idListe].nom}" id="modifListNom">
    <br>
    <label class="form-label">Couleur</label>
    <select class="form-select" id="modifListColor">
        <option value="#f1948a">Rouge</option>
        <option value="#c39bd3">Violet</option>
        <option value="#76d7c4">Vert</option>
        <option value="#f7dc6f">Jaune</option>
        <option value="#d0d3d4">Gris</option>
        <option value="#5dade2">Bleu</option>
    </select>
    <br>
    <button type="button" class="btn btn-primary" onclick="CloseFormModif()">Annuler</button>
    <button type="button" class="btn btn-outline-success" onclick="ValiderFormModif(${idListe})">Valider</button>`;

    document.querySelector('#modifListColor').value = lesListes[idListe].color;
}

function CloseFormModif(){
    let divFormModif = document.querySelector('#formModif');
    divFormModif.classList.add("hide");
}

function ValiderFormModif(idList){
    let newListNom = document.querySelector('#modifListNom').value;
    let newListColor = document.querySelector('#modifListColor').value;


    lesListes[idList] = {
        nom: newListNom,
        color: newListColor,
        todo: [],
    };
    localStorage.setItem('mesList', JSON.stringify(lesListes));
    document.location.reload();
}