contacts = new Array();

async function login(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let form = document.getElementById("loginform");
    form.style.display = "none";

    try {
        let response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: password})
        });
        if (response.status != 200){
            form.style.display = "block";
            alert("Wrong username or password!");
            return
        }
        let user = await response.json();
        let logoutform = document.getElementById("logoutform");
        logoutform.style.display = "block";
        document.getElementById("loggedinname").innerText = user.username;
    } catch (error) {
        console.log(error);
        alert(`Network error: ${error}`)
    }

    
    // an alternative to this call would be 
    // returning the addresses as a field of the user
    getAddresses();
}

async function logout(){
    try {
        let response = await fetch("/logout")
        if (response.status != 200){
            alert("Failed to log out!");
            return
        }
    } catch (error) {
        console.log(error);
        alert(`Network error: ${error}`)
    }

    let form = document.getElementById("loginform");
    form.style.display = "block";
    let logoutform = document.getElementById("logoutform");
    logoutform.style.display = "none";
    document.getElementById("address-wrapper").style.display = "none";
}

// try if there is a user logged in
async function getUser(){
    try {
        let response = await fetch("/user")
        if (response.status == 404){
            console.log("No user logged in!")
            return
        }
        if (response.status == 200){
            let user = await response.json();
            let logoutform = document.getElementById("logoutform");
            logoutform.style.display = "block";
            document.getElementById("loggedinname").innerText = user.username;

            let form = document.getElementById("loginform");
            form.style.display = "none";
            // an alternative to this call would be 
            // returning the addresses as a field of the user
            getAddresses();
        }
    } catch (error) {
        console.log(error);
        alert(`Network error: ${error}`)
    }
}

async function getAddresses(){
    try {
        let response = await fetch("/addresses");
        if (response.status != 200){
            alert("Failed to get addresses");
            return
        }
        let result = await response.json();
        result.forEach((address)=>{
            contacts.push(new Entry(address.id,address.name,address.tel, address.email));
        });
        document.getElementById("address-wrapper").style.display = "block";
        displayEntries();
    } catch (error) {
        console.log(error);
        alert(`Network error: ${error}`)
    }
}

async function storeAddress(address){
    try {
        let response = await fetch("/addresses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(address)
        });
        if (response.status == 200){
            let newid = await response.text();
            return newid;
        }
    } catch (error) {
        console.log(error);
        alert(`Network error: ${error}`)
    }
    return "-1";
    
}

async function updateAddress(address){

    try {
        let url = "/addresses/" + address.id;

        let response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(address)
        });
        if (response.status == 200){
            return true;
        }
        console.log("Error saving changes.")
    } catch (error) {
        console.log(error);
        alert(`Network error: ${error}`)
    }
    return false;
}

async function deleteAddress(address){
    try {
        let url = "/addresses/" + address.id;
        let response = await fetch(url, {
            method: "DELETE",
        });
        if (response.status == 200){
            return true;
        }
        console.log("Error deleting contact.")
        alert("Error deleting contact, please refresh page.")
    } catch (error) {
        console.log(error);
        alert(`Network error: ${error}`)
    }
    return false;
}