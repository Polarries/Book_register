
    var users_read = function(){
        const requestOptions = {
            method: "GET",
            redirect: "follow"
    };

    var users_table = document.getElementById('users_table');
    users_table.innerHTML ='Loading...';
    fetch("http://localhost/BOOKLIST_CRUD/api/users/read.php", requestOptions)
        .then((response) => response.text())
        .then((result) =>{
            users_table.innerHTML = '';
            var jsonObj = JSON.parse(result);
            for (let books of jsonObj){
                var row = ` 
            <tr>
                <th scope="row"> `+books.code+`</th>
                <td>`+books.bName+`</td>
                <td>`+books.aName+`</td>
                <td>`+books.genre+`</td>
                <td><a href="edit.html?code=`+books.code+`"><i class="fa-solid fa-pen"></i></a>
                    <a href="#" onclick="user_delete(`+books.code+`)"><i class="fa-solid fa-xmark"></i></a>
                </td>
            </tr>
        `;
        users_table.insertAdjacentHTML('beforeend', row);
            }
        })
        .catch((error) => console.error(error));
}
  
        function validateForm() {
        const bName = document.getElementById('bName').value.trim();
        const aName = document.getElementById('aName').value.trim();
        const genre = document.getElementById('genre').value.trim();
        const messageBox = document.getElementById('form-message');

        if (!bName || !aName || !genre) {
            messageBox.innerText = "- - - - Please fill the form!!! - - - -";
            messageBox.className = "error";
            messageBox.style.display = "block";
            return;
        }

            messageBox.innerText = "Registered...";
            messageBox.className = "success";
            messageBox.style.display = "block";

        //After type in every box
        user_create();
        }


    var user_create = function(){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "bName": document.getElementById('bName').value,
        "aName": document.getElementById('aName').value,
        "genre": document.getElementById('genre').value
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

    fetch("http://localhost/BOOKLIST_CRUD/api/users/create.php", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            var jsonObj = JSON.parse(result);
            if(jsonObj.status == 'ok'){
                location.href='index.html';
            }
            else{
                alert('error');
            }
        })
        .catch((error) => console.error(error));
    }

var user_delete = function(code){
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "code": code
});

const requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost/BOOKLIST_CRUD/api/users/delete.php", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    var jsonObj = JSON.parse(result);
        if(jsonObj.status == 'ok'){
                location.href='index.html';
        }
        else{
                alert('error');
            }
  })
  .catch((error) => console.error(error));
}