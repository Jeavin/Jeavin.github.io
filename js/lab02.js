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
  fetch('/loadProfiles', {
    method: 'GET',
    mode: 'cors',
    headers: {
    'Content-Type': 'application/json'
    }
   })
   .then((res) => {
        return res.json();
   })
   .then((data) => {
        console.log(data)
        clearArtistList();
        createProfile(data);
   })
}

function clearArtistList(){
    var x = document.getElementById('peopleList');
    var child = x.lastElementChild;
    while (child) {
        x.removeChild(child);
        child = x.lastElementChild;
    }
}

// function insertArray(name, desc, img){
//
//   // if(JSON.parse(localStorage.getItem('artistArray'))){
//   //   temp = JSON.parse(localStorage.getItem('artistArray'));
//   //   var profileItem = {name: name, desc: desc, img: img};
//   //   temp.push(profileItem);
//   //   localStorage.setItem('artistArray', JSON.stringify(temp));
//   // } else {
//   //   var profileItem = [{name: name, desc: desc, img: img}];
//   //   localStorage.setItem('artistArray', JSON.stringify(profileItem));
//   // }
//   // loadArtistList();
// }

function addArtist() {
    var profile = document.getElementById("addForm").elements;
    let profileName = profile[0].value;
    let profileDesc = profile[1].value;
    let profileImg = profile[2].value;

    var profileJSON = {"name":profileName, "desc":profileDesc, "img":profileImg};
    console.log(profileJSON);

    fetch('/profiles', {
      method: 'POST',
      body: JSON.stringify(profileJSON),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json)
    .then(json => console.log(json))
    .then((data) => {
      loadArtistList();
    });

    displayArtistForm.style.display = "none";
}

function createProfile(jsonArray) {

  id = 0;
  for(let i = 0; i < jsonArray.length; i++){
    var name = "";
    var desc = "";
    var url = "";
    var id = 0;
    name = jsonArray[i].name;
    desc = jsonArray[i].desc;
    url = jsonArray[i].img;
    id = jsonArray[i].id;

    console.log(name);
    console.log(desc);
    console.log(url);
    console.log(id);

    var ul = document.getElementById("peopleList");
    var li = document.createElement("li");
    var person = document.createElement("div");
    person.setAttribute("id", "person");
    ul.insertBefore(li, ul.firstChild);
    li.appendChild(person);
    var img = document.createElement("img");
    person.appendChild(img);
    img.setAttribute("id", "img");
    img.setAttribute("alt", name);
    img.setAttribute("src", url);
    var info = document.createElement("div");
    info.setAttribute("class", "info");
    person.appendChild(info);
    var name2 = document.createElement("p");
    name2.setAttribute("class", "name");
    var about = document.createElement("p");
    info.appendChild(name2);
    info.appendChild(about);
    name2.appendChild(document.createTextNode(name));
    about.appendChild(document.createTextNode(desc));
    var del = document.createElement("button");
    del.setAttribute("class", "del");
    del.setAttribute("onClick", "deleteArtist(this)");
    del.setAttribute("value", id);
    person.appendChild(del);
    del.appendChild(document.createTextNode("Delete"));
  }
}

function deleteArtist(btn){
    var id = btn.value;
    console.log(id);
    let index = {
        ind: id
        };
    console.log(index);
    fetch('/delete', {
        method: 'POST',
        body: JSON.stringify(index),
        headers: { 'Content-Type': 'application/json;' },
    })
    .then((data) => {
        console.log(data);
        loadArtistList();
    })
    .then(res => res.json);
    loadArtistList();
}

// function searchArray(){
//   let searchBar = document.getElementById("searchValue").value;
//   console.log(searchBar);
//   let artist = JSON.parse(localStorage.getItem('artistArray'));
//   let arr = new Array();
//   for(let i = 0; i < artist.length; i++){
//     if(artist[i].name.search(searchBar) >= 0){
//         arr.push(i);
//         console.log(artist[i].name);
//     }
//   }
//   let list = document.getElementById('peopleList');
//   while (list.firstChild) {
//     list.removeChild(list.firstChild);
//   }
//   for(let profile of arr){
//     createProfile(profile);
//   }
// }
