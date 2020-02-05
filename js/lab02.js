var displayArtistForm = document.getElementById("artistFormDiv");

function toggleArtistForm() {
  if (displayArtistForm.style.display === "none" || displayArtistForm.style.display === ""){
    displayArtistForm.style.display = "block";
  } else {
    displayArtistForm.style.display = "none";
  }
}


function addArtist() {

    var profile = document.getElementById("addForm").elements;
    let profileName = profile[0].value;
    let profileDesc = profile[1].value;
    let profileImg = profile[2].value;

    displayArtistForm.style.display = "none";

    var ul = document.getElementById("peopleList");
    var li = document.createElement("li");
    var person = document.createElement("div");
    person.setAttribute("id", "person");
    ul.insertBefore(li, ul.firstChild);
    li.appendChild(person);
    var img = document.createElement("img");
    person.appendChild(img);
    img.setAttribute("id", "img");
    img.setAttribute("alt", profileName);
    img.setAttribute("src", profileImg);
    var info = document.createElement("div");
    info.setAttribute("class", "info");
    person.appendChild(info);
    var name = document.createElement("p");
    name.setAttribute("class", "name");
    var about = document.createElement("p");
    info.appendChild(name);
    info.appendChild(about);
    name.appendChild(document.createTextNode(profileName));
    about.appendChild(document.createTextNode(profileDesc));
    var del = document.createElement("button");
    del.setAttribute("class", "del");
    del.setAttribute("onClick", "deleteArtist(this)");
    person.appendChild(del);
    del.appendChild(document.createTextNode("Delete"));
}

function deleteArtist(btn){
    (btn.parentNode.parentNode.parentNode).removeChild(btn.parentNode.parentNode);
}
