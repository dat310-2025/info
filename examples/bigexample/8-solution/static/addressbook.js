/* Display settings (global variables, set to default values) */
var font = "Arial, sans-serif";
var color = "#ffffff";    
var fontsize = "0.8em";

/*
 * Entry class
 */
function Entry(id,name, tel, email) {
    this.id = id;
    this.name = name;
    this.tel = tel;
    this.email = email;
    this.display = displayEntry;
    this.contains = contains;
}

/*
 * Display a given entry
 */
function displayEntry(idx) {    
    return "<div class=\"contact_name\">" + this.name + "</div>\n"
        + "<div class=\"contact_details\">" + this.tel + "</div>\n"
        + "<div class=\"contact_details\"><a href=\"mailto:" + this.email 
        + "\" tabindex='0'>" + this.email + "</a></div>\n"
        + "<div class=\"contact_operations\">"
        + "<button area-label=\"edit address" + this.name + "\" onclick=\"modifyEntry(" + idx + ")\"><i class=\"fa fa-pencil-square-o\"></i></button><br />"
        + "<a href=\"#\" area-label=\"delete address" + this.name + "\"  onclick=\"deleteEntry(" + idx + ")\"><i class=\"fa fa-trash-o\"></i></a>"
        +"</div>";
}

/*
 * Check if the entry contains a given search string in any of the fields
 */
function contains(str) {
    str = str.toLowerCase(); // case-insensitive matching
    return (this.name.toLowerCase().indexOf(str) > -1) 
            || (this.tel.toLowerCase().indexOf(str) > -1)
            || (this.email.toLowerCase().indexOf(str) > -1);
}

/*
 * Check if telephone number if valid
 */
function isValidTel(tel) {
	// check for allowed characters using a regular expression
	var re = /^[0-9()+\-\s]*$/
	return re.test(tel);
}

/*
 * Check if email address if valid
 */
function isValidEmail(email) {
	// we use a regular expression
	// see http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/*
 * Check input fields
 * (Function returns true if there is an error)
 */
function isInputError(name, tel, email) {
    if (name.length == 0) {
        alert("Empty name!");
    }
    // check for empty fields
    else if (tel.length == 0 && email.length == 0) {
        alert("Provide tel or email!");
    }
    // check for valid tel no
    else if (tel.length > 0 && !isValidTel(tel)) {
        alert("Invalid telephone number!");
    }
    // check for valid email
    else if (email.length > 0 && !isValidEmail(email)) {
        alert("Invalid email address!");
    }
    // no error
    else {    
    	return false;
    }
    return true;
}

/*
 * Add a new entry
 */
async function addEntry() {
    var name = document.getElementById("add_name").value;
    var tel = document.getElementById("add_tel").value;
    var email = document.getElementById("add_email").value;
    
    if (!isInputError(name, tel, email)) {
        let newid = await storeAddress({
            name: name,
            tel: tel,
            email: email
        });
        if (newid == -1) return;
        contacts.push(new Entry(newid, name, tel, email));
        // reset field values and hide add panel
        document.getElementById("add_name").value = "";
        document.getElementById("add_tel").value = "";
        document.getElementById("add_email").value = "";
        hide("addentry");
        // refresh contact list
        displayEntries();
    }
}

/*
 * Delete a given entry
 */
async function deleteEntry(idx) {
    var c = confirm("Are you sure you want to delete this entry?");
    if (c) {
        deleted = await deleteAddress(contacts[idx])
        if (deleted){
            contacts.splice(idx, 1);
            displayEntries();
        }
    }
}

/*
 * Modify a given entry (display panel)
 */
function modifyEntry(idx) {
    document.getElementById("mod_name").value = contacts[idx].name;
    document.getElementById("mod_tel").value = contacts[idx].tel;
    document.getElementById("mod_email").value = contacts[idx].email;
    document.getElementById("mod_id").value = contacts[idx].id;
    document.getElementById("mod_name").focus();
	show('modentry');
}

/*
 * Save changes after modifying entry
 */
async function saveChanges() {
    var name = document.getElementById("mod_name").value;
    var tel = document.getElementById("mod_tel").value;
    var email = document.getElementById("mod_email").value;
    var id = document.getElementById("mod_id").value;
    
    if (!isInputError(name, tel, email)) {
    	let ok = await updateAddress({id: id, name: name, tel: tel, email: email});
        if (!ok) {
            return;
        }
        // make changes
        contact = contacts.find((contact)=> (contact.id == id));
    	contact.name = name;
    	contact.tel = tel;
    	contact.email = email;
        // hide mod panel
        hide("modentry");
        // refresh contact list
        displayEntries();
    }

}

/*
 * Refresh appearance (reapply css settings) based on global settings
 */
function refreshAppearance() {
    var nameDivs = document.getElementsByClassName("contact");
    for (var i = 0; i < nameDivs.length; i++) {
        nameDivs[i].style.fontFamily = font;
        nameDivs[i].style.fontSize = fontsize;
        nameDivs[i].style.background = color;
    }
}

/*
 * Change settings
 */
function changeSettings() {
	// update global settings
    font = document.getElementById("font").value;
    color = document.getElementById("color").value;    
    // getting radio value is slightly more complicated
    // as there are multiple input elements with the same name
    var radios = document.getElementsByName("fontsize");
    for (var i=0; i < radios.length; i++) {
    	if (radios[i].checked==true) {
            fontsize = radios[i].value;
        }
    }

	// refresh appearance
    refreshAppearance();
    
    // hide settings panel
    hide('settings');
}

/*
 * Sort contacts 
 */
function sortContacts() {
    // sorting criteria
    var sorting = document.getElementById("sort").value;
    
    // we provide a custom comparative function for sorting the contacts array
    contacts.sort(function(a,b) {
    	if (sorting == "name") {
    		return a.name > b.name;
    	}
    	if (sorting == "tel") {
    		return a.tel > b.tel;
    	}
    	if (sorting == "email") {
    		return a.email > b.email;
    	}
    });    
}

/*
 * Display all entries according to the set sorting criteria
 */
function displayEntries() {
    var contactsDiv = document.getElementById("contacts");        
    // i) clear the list by settin innerHTML on the list empty
    contactsDiv.innerHTML = "";    
    // ii) (re-)add all entries
    for (var i = 0; i < contacts.length; i++) {
        var entryDiv = document.createElement("div");
        entryDiv.role = "listitem";
        entryDiv.innerHTML = "<div id=\"contact_" + i + "\" class=\"contact\">" 
                + contacts[i].display(i) + "</div>";
        contactsDiv.appendChild(entryDiv);
    }
    // reapply display settings
    refreshAppearance();
}

/*
 * Search for a given string
 * (hide entries in the listing that don't contain it)
 */
function searchEntries() {
    var search = document.getElementById("search").value;
    // iterate through all entries
    for (var i = 0; i < contacts.length; i++) {
        // entry i is in div id="contact_{i}"
        var entryDiv = document.getElementById("contact_" + i);    
        if (search.length > 0 && !contacts[i].contains(search)) {
            entryDiv.style.display = "none";
        }
        else {
            entryDiv.style.display = "";            
        }        
    }
}

/*
 * Hide div
 */
function hide(id) {
    var element = document.getElementById(id);
    element.style.display = "none";
}

/*
 * Show div
 */
function show(id) {
    var element = document.getElementById(id);
    element.style.display = "";    
}
