//const api_url = "<heroku_app_url>"
const api_url = "https://krutika-mven.herokuapp.com/user"

function loadData(records = []) {
        var table_data = "";
        for(let i=0; i<records.length; i++) {
                table_data += `<tr>`;
                table_data += `<td>${records[i].title}</td>`;
                table_data += `<td>${records[i].title_year}</td>`;
                table_data += `<td>${records[i].rating}</td>`;
                table_data += `<td>${records[i].language}</td>`;
                table_data += `<td>`;
                table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
              </svg></button></a>`;
                table_data += '&nbsp;&nbsp;';
                table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i]._id}')><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
              </svg></button>`;
                table_data += `</td>`;
                table_data += `</tr>`;
        }
        //console.log(table_data);
        document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
        fetch(api_url)
        .then((response) => response.json())
        .then((data) => {
                console.table(data);
                loadData(data);
        });
}


function getDataById(id) {
        fetch(`${api_url}/${id}`)
        .then((response) => response.json())
        .then((data) => {

                console.log(data);
                document.getElementById("id").value = data._id;
                document.getElementById("title").value = data.title;
                document.getElementById("title_year").value = data.title_year;
                document.getElementById("rating").value = data.rating;
                document.getElementById("language").value = data.language;
        })
}


function postData() {
        var title = document.getElementById("title").value;
        var title_year = document.getElementById("title_year").value;
        var rating = document.getElementById("rating").value;
        var language = document.getElementById("language").value;

        data = {title: title, title_year: title_year, rating: rating, language: language};

        fetch(api_url, {
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
                console.log(data);
                window.location.href = "index.html";
        })
}


function putData() {

        var _id = document.getElementById("id").value;
        var title = document.getElementById("title").value;
        var title_year = document.getElementById("title_year").value;
        var rating = document.getElementById("rating").value;
        var language = document.getElementById("language").value;

        data = {_id: _id, title: title, title_year: title_year, rating: rating, language: language};

        fetch(api_url, {
                method: "PUT",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
                console.table(data);
                window.location.href = "index.html";
        })
}


function deleteData(id) {
        user_input = confirm("Are you sure you want to delete this record?");
        if(user_input) {
                fetch(api_url, {
                        method: "DELETE",
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({"_id": id})
                })
                .then((response) => response.json())
                .then((data) => {
                        console.log(data);
                        window.location.reload();
                })
        }
}


