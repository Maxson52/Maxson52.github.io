function addDOM(result) {
  let data = JSON.parse(result);
  let dom = document.querySelector("#dom");
  let fragment = document.createDocumentFragment();

  let findTitle;

  if (id == 1) {
    findTitle = data.projects.find((obj) => {
      return obj.title == title;
    });
  } else {
    findTitle = data.gallery.find((obj) => {
      return obj.title == title;
    });
  }

  if (findTitle == undefined || findTitle == null || findTitle == "") {
    window.location = "projects";
  } else {
    let col1 = document.createElement("div");
    let col2 = document.createElement("div");
    col1.className = "column is-6";
    col2.className = "column";

    let img;

    if (findTitle.type == "video") {
      img = document.createElement("video");
      img.src = findTitle.image2;

      img.autoplay = true;
      img.loop = true;
    } else {
      img = document.createElement("img");
      img.src = findTitle.image2;
    }

    let more = document.createElement("div");
    more.className = "viewmore subtitle has-text-centered";
    let h2 = document.createElement("h2");
    h2.innerText = findTitle.title;
    let p = document.createElement("p");
    p.innerText = findTitle.text;

    fragment.appendChild(col1);
    fragment.appendChild(col2);

    col1.appendChild(h2);
    col1.appendChild(p);
    col2.appendChild(img);

    dom.appendChild(fragment);

    let docTitle = findTitle.title.toUpperCase();

    document.title = docTitle + " | Max T";
  }
}

function readJSON(path) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", path, true);
  xhr.responseType = "blob";
  xhr.onload = function (e) {
    if (this.status == 200) {
      var file = new File([this.response], "temp");
      var fileReader = new FileReader();
      fileReader.addEventListener("load", function () {
        addDOM(fileReader.result);
      });
      fileReader.readAsText(file);
    }
  };
  xhr.send();
}

const url = new URLSearchParams(window.location.search);
const title = url.get("title");
const id = url.get("id");

readJSON("./src/gallery.json");
