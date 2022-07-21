// TAG FUNCTION
const formTag = document.getElementById('tag');
const ul = document.querySelector("ul");

let tags = [];

function createTag() {
    // removing all li tags before adding so there will be no duplicates
    ul.querySelectorAll("li").forEach(li => li.remove());
    tags.slice().reverse().forEach(tag =>{
        let liTag = `<li>${tag} <i class="fi fi-rr-cross-small" onclick="removeTag(this, '${tag}')"></i></li>`;
        ul.insertAdjacentHTML("afterbegin", liTag); // inserting or adding li insude ul tag
    });
};

function removeTag(element, tag) {
    let index = tags.indexOf(tag); // getting index of tag being removed
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)]; // removing or exclusing selected tag from array
    element.parentElement.remove(); // removing li of removed tag
}

function addTag(e) {
    if(e.key == "Enter") {
        let tag = e.target.value.replace(/\s+/g, " "); // remove unwanted spaces from user tag
        if(tag.length >= 1 && !tags.includes(tag)) { // if tag length is greater than 1 AND the tag doesn't exist
            tag.split(',').forEach(tag => { // splitting each tag from comma (,)
                if(tags.length < 10) {
                    tags.push(tag);
                    createTag();
                    formTag.value = "";
                };
            });
        };
    };
};

input.addEventListener("keyup", addTag);














function saveBook() {
    let formTitle = document.getElementById('title').value;
    let formAuthor = document.getElementById('author').value;
    let formFilename = document.getElementById('filename').value;
    let formStatus = document.getElementById('status').value;
    let formRating = document.getElementById('rating').value;
}