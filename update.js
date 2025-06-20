var user_update = function(){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "code": document.getElementById('code').value,
        "bName": document.getElementById('bName').value,
        "aName": document.getElementById('aName').value,
        "genre": document.getElementById('genre').value
        });

        const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

    fetch("http://localhost/BOOKLIST_CRUD/api/users/update.php", requestOptions)
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


    var user_readone =function(){
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const requestOptions = {
            method: "GET",
            redirect: "follow"
    };

    fetch("http://localhost/BOOKLIST_CRUD/api/users/readone.php?code=" +code, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            var jsonObj = JSON.parse(result);
            document.getElementById('code').value = jsonObj.code;
            document.getElementById('bName').value = jsonObj.bName;
            document.getElementById('aName').value = jsonObj.aName;
            document.getElementById('genre').value = jsonObj.genre;
        })
        .catch((error) => console.error(error));
    }