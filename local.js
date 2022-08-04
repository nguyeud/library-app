// VARIABLES AND CONSTANTS
let formTitle = document.getElementById('title').value;
let formAuthor = document.getElementById('author').value;
let formFilename = document.getElementById('filename').value;
let formStatus = document.getElementById('status').value;
let formRating = document.getElementById('rating').value;
let modalForm = document.getElementById("modalForm");
const formTag = document.getElementById('tag');

// TAG FUNCTION
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

formTag.addEventListener("keyup", addTag);

// SAVE BOOK INFORMATION
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

function Book(title, author, filename, status, tags, rating) {
    this.title = title
    this.author = author
    this.cover = filename
    this.status = status
    this.tags = tags
    this.rating = rating
};

// [{"title":"Hello","author":"WORLD!","cover":"C:\\fakepath\\icons8-book-96.png","status":"2","tags":["this is a tag","hehe"],"rating":"2"},{"title":"BOOK","author":"AUTHOR","cover":"","status":"1","tags":["this is a genre","do i like this book?"],"rating":"5"},{"title":"ANIME","author":"MANGA","cover":"","status":"0","tags":["anime","pls"],"rating":"1"}]

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
};

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