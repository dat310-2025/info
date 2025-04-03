/* Display settings (global variables, set to default values) */
let font = "Arial, sans-serif";
let color = "#ffffff";    
let fontsize = "0.8em";

/*
 * Global variable remembering the entry we are currently editing
 */
editingEntry = null;


/*
 * Entry class
 */
class Entry{
    constructor(name, tel, email) {
        this.name = name;
        this.tel = tel;
        this.email = email;
    }
    contains(str) {
        str = str.toLowerCase(); // case-insensitive matching
        return (this.name.toLowerCase().indexOf(str) > -1) 
                || (this.tel.toLowerCase().indexOf(str) > -1)
                || (this.email.toLowerCase().indexOf(str) > -1);
    }
}

/*
 * Display a given entry
 */
function createHTML(entry) 
{  

    /* creates the following HTML
    <div class="contact">
        <div class="contract_name">entry.name</div>
        <div class="contact_details">entry.tel</div>
        <div class="contact_details"><a href="mailto:this.email">entry.email</a></div>
        <div class="contact_operations">
            <a><i class="fa fa-pencil-square-o"></a>
            <a><i class="fa fa-trash-o"></a>
        </div>
    </div>

    */

    let entryDiv = document.createElement("div");
    // entryDiv.id = "contact_" + idx;
    entryDiv.className = "contact";

    let nameDiv = document.createElement("div");
    let contactName = document.createTextNode(entry.name);
    nameDiv.appendChild(contactName);
    nameDiv.className = "contact_name";
    entryDiv.appendChild(nameDiv);

    let telDiv = document.createElement("div");
    let contactTel = document.createTextNode(entry.tel);
    telDiv.appendChild(contactTel);
    telDiv.className = "contact_details";
    entryDiv.appendChild(telDiv);

    let emailDiv = document.createElement("div");
    let contactEmail = document.createElement("a");
    contactEmail.href = "mailto:" + entry.email;
    let emailLink = document.createTextNode(entry.email);
    contactEmail.appendChild(emailLink);
    emailDiv.appendChild(contactEmail);
    emailDiv.className = "contact_details";
    entryDiv.appendChild(emailDiv);

    let opDiv = document.createElement("div");
    opDiv.className = "contact_operations"
    let modifyOp = document.createElement("a");
    // modifyOp.id = "m" + idx;
    modifyOp.href = "#";
    modifyOp.onclick = modifyEntry;
    let modifyOpI = document.createElement("i");
    modifyOpI.className = "fa fa-pencil-square-o";
    modifyOp.appendChild(modifyOpI);
    opDiv.appendChild(modifyOp);
    let deleteOp = document.createElement("a");
    // deleteOp.id = "d" + idx;
    deleteOp.href = "#";
    
    let deleteOpI = document.createElement("i");
    deleteOpI.className = "fa fa-trash-o";
    deleteOp.appendChild(deleteOpI);
    opDiv.appendChild(deleteOp);
    entryDiv.appendChild(opDiv);

    modifyOp.entry = entry;
    modifyOp.onclick = modifyEntry;
    deleteOp.entry = entry;
    deleteOp.onclick = deleteEntry;

    return entryDiv;
}

/*
 * Check if telephone number if valid
 */
function isValidTel(tel) {
	// check for allowed characters using a regular expression
	let re = /^[0-9()+\-\s]*$/
	return re.test(tel);
}

/*
 * Check if email address if valid
 */
function isValidEmail(email) {
	// we use a regular expression
	// see http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
	let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
function addEntry() {
    let name = document.getElementById("add_name").value;
    let tel = document.getElementById("add_tel").value;
    let email = document.getElementById("add_email").value;
    
    if (!isInputError(name, tel, email)) {
        contacts.push(new Entry(name, tel, email));
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
function deleteEntry() 
{
    let entry = this.entry;
    let c = confirm("Are you sure you want to delete this entry?");
    if (c) {
        let index = contacts.indexOf(entry);
        if (index > -1){
            contacts.splice(index, 1)
            displayEntries();
        }
    }
}

/*
 * Modify a given entry (display panel)
 */
function modifyEntry() {
    let entry = this.entry;
    document.getElementById("mod_name").value = entry.name;
    document.getElementById("mod_tel").value = entry.tel;
    document.getElementById("mod_email").value = entry.email;
    // safe modifying entry in global variable.
    modifyEntry = entry;
	show('modentry');
}

/*
 * Save changes after modifying entry
 */
function saveChanges() {
    let name = document.getElementById("mod_name").value;
    let tel = document.getElementById("mod_tel").value;
    let email = document.getElementById("mod_email").value;
    
    if (!isInputError(name, tel, email)) {
    	// make changes
    	modifyEntry.name = name;
    	modifyEntry.tel = tel;
    	modifyEntry.email = email;
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
    let nameDivs = document.getElementsByClassName("contact");
    for (let i = 0; i < nameDivs.length; i++) {
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
    let radios = document.getElementsByName("fontsize");
    for (let i=0; i < radios.length; i++) {
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
    let sorting = document.getElementById("sort").value;
    
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
    let contactsDiv = document.getElementById("contacts");        
    // i) clear the list by settin innerHTML on the list empty
    contactsDiv.innerHTML = "";    
    // ii) (re-)add all entries
    let displayContacts = searchEntries()
    for (let i = 0; i < displayContacts.length; i++) {
        let entryDiv = createHTML(displayContacts[i]);
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
    let search = document.getElementById("search").value;
    if (!search){
        return contacts;
    }
    
    // iterate through all entries
    let searchlist = []
    for (let i = 0; i < contacts.length; i++) {
        // entry i is in div id="contact_{i}"

        if (!search || contacts[i].contains(search)) {
            searchlist.push(contacts[i])
        }
    }
    return searchlist;
}

/*
 * Hide div
 */
function hide(id) {
    let element = document.getElementById(id);
    element.style.display = "none";
}

/*
 * Show div
 */
function show(id) {
    let element = document.getElementById(id);
    element.style.display = "";    
}
