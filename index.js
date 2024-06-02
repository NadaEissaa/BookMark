var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var tableBody = document.getElementById("tableBody");

var bookMarksContainer = [];

// Load bookmarks from local storage if available
window.onload = function() {
    if (localStorage.getItem('bookMarksContainer') !== null) {
        bookMarksContainer = JSON.parse(localStorage.getItem('bookMarksContainer'));
        console.log(bookMarksContainer);
        displayBooks(); // Display the bookmarks after loading them from local storage
    }
};

// Function to add a bookmark
function addBook() {
    var book = {
        name: siteNameInput.value,
        url: siteURLInput.value
    };
    bookMarksContainer.push(book);
    console.log(bookMarksContainer);

    localStorage.setItem('bookMarksContainer', JSON.stringify(bookMarksContainer));
    displayBooks();
    clearForm();
}

// Function to display all bookmarks
function displayBooks() {
    var cartoona = ``;
    for (var i = 0; i < bookMarksContainer.length; i++) {
        cartoona += `
            <tr class="pb-4">
                <td>${i + 1}</td>
                <td>${bookMarksContainer[i].name}</td>
                <td><button type="button" class="btn btn-outline-success px-4 " onclick="visitSite('${bookMarksContainer[i].url}')"><i class="bi bi-eye"></i> Visit</button></td>
                <td><button type="button" class="btn btn-outline-danger px-4" onclick="deleteBook(${i})"><i class="bi bi-trash"></i> Delete</button></td>
            </tr>
        `;
    }
    tableBody.innerHTML = cartoona;
}

// Function to clear the input form
function clearForm() {
    siteNameInput.value = "";
    siteURLInput.value = "";
}

// Function to visit a site
function visitSite(url) {
    window.open(url, '_blank');
}

// Function to delete a bookmark
function deleteBook(index) {
    bookMarksContainer.splice(index, 1);
    localStorage.setItem('bookMarksContainer', JSON.stringify(bookMarksContainer)); // Update local storage after deletion
    displayBooks();
}


// /^[A-Za-z]{3,15}/
// /^(https?:\/\/\)?(w{3}\.)?\w+ /

function validateInput(element) {
    var regex = {
        siteName: /^[A-Za-z]{3,}/,
        siteURL:/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/\S*)?$/
    };

    if (regex[element.id].test(element.value)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.nextElementSibling.classList.add('d-none');
    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        element.nextElementSibling.classList.remove('d-none');
    }
}
