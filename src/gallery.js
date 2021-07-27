function addDOM(result) {
  let data = JSON.parse(result);
  let dom = document.querySelector("#dom");
  let fragment = document.createDocumentFragment();

  data.gallery.forEach((e) => {
    let wrapper = document.createElement("div");
    if (e.title != "+") {
      wrapper.onclick = function () {
        // location.href = "project?title=" + e.title;
      };
    } else {
      wrapper.onclick = function () {
        // location.href = "projects";
      };
    }

    wrapper.className =
      "column is-one-quarter-desktop hero is-one-third-tablet is-half-mobile";
    let img = document.createElement("img");
    img.className = "galleryimg";
    let more = document.createElement("div");
    more.className = "viewmore subtitle has-text-centered";
    let p = document.createElement("p");
    p.className = "viewmoretext";
    p.innerText = e.title;

    fragment.appendChild(wrapper);
    img.src = e.image;
    img.alt = e.title;
    wrapper.appendChild(img);
    wrapper.appendChild(more);
    more.appendChild(p);
  });

  dom.appendChild(fragment);
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

readJSON("./src/gallery.json");
