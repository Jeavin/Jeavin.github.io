var displayArtistForm = document.getElementById("artistFormDiv");
var artistArray = [];
var size = 0;

loadArtistList();

function toggleArtistForm() {
  if (displayArtistForm.style.display === "none" || displayArtistForm.style.display === ""){
    displayArtistForm.style.display = "block";
  } else {
    displayArtistForm.style.display = "none";
  }
}

function loadArtistList() {
  let arr = localStorage.getItem('artistArray');
  console.log(arr);
  let profiles = JSON.parse(arr);
  size = profiles.length;
  console.log(profiles);
  console.log(size);

  for(let i = 0; i < size; i++){
    createProfile(i);
  }
}

function insertArray(name, desc, img){

  console.log(profileItem);

  if(JSON.parse(localStorage.getItem('artistArray'))){
    temp = JSON.parse(localStorage.getItem('artistArray'));
    var profileItem = {name: name, desc: desc, img: img};
    temp.push(profileItem);
    localStorage.setItem('artistArray', JSON.stringify(temp));
  } else {
    var profileItem = [{name: name, desc: desc, img: img}];
    localStorage.setItem('artistArray', JSON.stringify(profileItem));
  }
  loadArtistList();
}

function addArtist() {

    var profile = document.getElementById("addForm").elements;
    let profileName = profile[0].value;
    let profileDesc = profile[1].value;
    let profileImg = profile[2].value;

    insertArray(profileName, profileDesc, profileImg);

    displayArtistForm.style.display = "none";
    // var ul = document.getElementById("peopleList");
    // var li = document.createElement("li");
    // var person = document.createElement("div");
    // person.setAttribute("id", "person");
    // ul.insertBefore(li, ul.firstChild);
    // li.appendChild(person);
    // var img = document.createElement("img");
    // person.appendChild(img);
    // img.setAttribute("id", "img");
    // img.setAttribute("alt", profileName);
    // img.setAttribute("src", profileImg);
    // var info = document.createElement("div");
    // info.setAttribute("class", "info");
    // person.appendChild(info);
    // var name = document.createElement("p");
    // name.setAttribute("class", "name");
    // var about = document.createElement("p");
    // info.appendChild(name);
    // info.appendChild(about);
    // name.appendChild(document.createTextNode(profileName));
    // about.appendChild(document.createTextNode(profileDesc));
    // var del = document.createElement("button");
    // del.setAttribute("class", "del");
    // del.setAttribute("onClick", "deleteArtist(this)");
    // person.appendChild(del);
    // del.appendChild(document.createTextNode("Delete"));
}

function createProfile(i) {

  // let profileName = profile[0].value;
  // let profileDesc = profile[1].value;
  // let profileImg = profile[2].value;
  // temp1 = localStorage.getItem('artistArray');
  // console.log(temp1);

  let artist = JSON.parse(localStorage.getItem('artistArray'));
  console.log(artist);

  var ul = document.getElementById("peopleList");
  var li = document.createElement("li");
  var person = document.createElement("div");
  person.setAttribute("id", "person");
  ul.insertBefore(li, ul.firstChild);
  li.appendChild(person);
  var img = document.createElement("img");
  person.appendChild(img);
  img.setAttribute("id", "img");
  img.setAttribute("alt", artist[i].name);
  img.setAttribute("src", artist[i].img);
  var info = document.createElement("div");
  info.setAttribute("class", "info");
  person.appendChild(info);
  var name = document.createElement("p");
  name.setAttribute("class", "name");
  var about = document.createElement("p");
  info.appendChild(name);
  info.appendChild(about);
  name.appendChild(document.createTextNode(artist[i].name));
  about.appendChild(document.createTextNode(artist[i].desc));
  var del = document.createElement("button");
  del.setAttribute("class", "del");
  del.setAttribute("onClick", "deleteArtist(this)");
  person.appendChild(del);
  del.appendChild(document.createTextNode("Delete"));
}

function deleteArtist(btn){
    (btn.parentNode.parentNode.parentNode).removeChild(btn.parentNode.parentNode);
}

function searchArray(){
  let searchBar = document.getElementById("searchValue").value;
  console.log(searchBar);
  let artist = JSON.parse(localStorage.getItem('artistArray'));
  let arr = new Array();
  for(let i = 0; i < artist.length; i++){
    if(artist[i].name.search(searchBar) >= 0){
        arr.push(i);
        console.log(artist[i].name);
    }
  }
  let list = document.getElementById('peopleList');
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  for(let profile of arr){
    createProfile(profile);
  }
}
