// TAG FUNCTION
let formTitle = document.getElementById('title').value;
let formAuthor = document.getElementById('author').value;
let formFilename = document.getElementById('filename').value;
let formStatus = document.getElementById('status').value;
let formRating = document.getElementById('rating').value;
let modalForm = document.getElementById("modalForm");
const formTag = document.getElementById('tag');
const ul = document.getElementById("tagList");
// Empty tags list
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
formTag.addEventListener("keyup", addTag);

// SAVE BOOK INFORMATION
const collectionContainer = document.getElementById("collection");
// initial library
let myLibrary = [
    {"title": "Hunter x Hunter",
    "author": "Yoshihiro Togashi",
    "cover": "covers/hxh.png",
    "status": "1",
    "tags": ["adventure", "fantasy", "martial arts"],
    "rating": "5"
    },
    {"title": "Naruto",
    "author": "Masashi Kishimoto",
    "cover": "covers/naruto.png",
    "status": "2",
    "tags": ["adventure", "fantasy comedy", "martial arts"],
    "rating": "3"
    },
    {"title": "Berserk",
    "author": "Kentaro Miura",
    "cover": "covers/berserk.png",
    "status": "2",
    "tags": ["dark fantasy", "epic fantasy", "sword and sorcery"],
    "rating": "5"
    },
    {"title": "Demon Slayer",
    "author": "Koyoharu Gotouge",
    "cover": "covers/ds.png",
    "status": "2",
    "tags": ["adventure", "dark fantasy", "martial arts"],
    "rating": "4"
    },
    {"title": "Beastars",
    "author": "Paru Itagaki",
    "cover": "covers/beastars.png",
    "status": "1",
    "tags": ["coming-of-age", "drama", "fantasy"],
    "rating": "4"
    }
];
// function to display books in HTML from library
function displayBook(myLibrary) {
    for(let i = 0; i < myLibrary.length; i++) {
        // Create status of book
        let status = myLibrary[i]["status"];
        if(status == "0") {
            status = "Not Started";
        } else if(status == "1") {
            status = "In Progress";
        } else if(status == "2") {
            status = "Completed";
        }
        // create book HTML
        let bookHTML = 
        `<div class="collection">
            <div class="collection-actions">
                <i class="fi fi-rr-pencil"></i>
                <i class="fi fi-rr-trash"></i>
            </div>
            <div class="collection-cover"><img class="collect-img" src=${myLibrary[i]["cover"]}></div>
            <div class="collect-text">
                <div class="collection-title">${myLibrary[i]["title"]}</div>
                <div class="collection-author">${myLibrary[i]["author"]}</div>
                <div class="collection-status"><span class="bold-text">Status:</span> <span class="collect-status">${status}</span></div>
                <div class="collection-rating"><span class="bold-text">Rating:</span> <span class="collect-rating">${myLibrary[i]["rating"]}</span></div>
                <div class="collection-tags">
                    <ul id="collect-tags">
                    </ul>
                </div>
            </div>
        </div>`
        // create genre tags
        collectionContainer.insertAdjacentHTML("afterbegin", bookHTML);
        const collect_ul = document.getElementById("collect-tags");
        let collect_tags = myLibrary[i]["tags"];
        collect_tags.forEach(tag =>{
            let liTag = `<li class="collect-tag">${tag}</li>`;
            collect_ul.insertAdjacentHTML("afterbegin", liTag); // inserting or adding li insude ul tag
        })
    }
}

// BOOK CONSTRUCTOR
function Book(title, author, filename, status, tags, rating) {
    this.title = title
    this.author = author
    this.cover = filename
    this.status = status
    this.tags = tags
    this.rating = rating
};
function addBookToLibrary() {
    // Set book information variables
    formTitle = document.getElementById('title').value;
    formAuthor = document.getElementById('author').value;
    formFilename = document.getElementById('filename').value;
    formStatus = document.getElementById('status').value;
    formRating = document.getElementById('rating').value;

    // Create new book
    let newBook = new Book(formTitle, formAuthor, formFilename, formStatus, tags, formRating);

    // Push to local storage
    myLibrary.push(newBook);
    window.localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

    // Display new book
    displayBook([newBook]);
};

// CLEAR FORM
function clearForm() {
    modalForm.reset();
    // Add removal of tags displayed
    let tagList = document.getElementById("tagList");
    let listLength = tagList.children.length;

    for (i = 0; i < listLength; i++) {
        tagList.removeChild(tagList.children[0]);
    } 
    tags = [];
}

// ON WINDOW LOAD
window.addEventListener('load', (event) => {
    // Load books
    window.localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    displayBook(JSON.parse(window.localStorage.getItem("myLibrary")));
  });