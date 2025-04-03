# Assignment 8 - Addressbook Backend

In this assignment, you should create a backend for the addressbook from assignment 4. Additionally, you should add a login functionality to the page.


## Functional requirements:
1. The user can log on. Previous to login, none of the other functionalities are enabled.
2. The user can logout.
3. After login, the addresses stored by the user are shown.
4. The user can add, update, and delete addresses, and these changes are stored on the server.
5. Make sure addresses stored by one user can only be displayed, updated and deleted by that user.

## Technology used:

You should implement a flask application, that stores users and addresses in a SQLite database. Create some initial data.
You can use the provided `setup_db.py` file, which includes functions to create an access the database.

You can also store users and contacts in files. `setup_json.py` contains some functions for accessing data in these files.

**You are not allowed to use templates.** 
1. Serve your web application as static filed.
2. Use AJAX requests for login and to access addresses.
3. Implement a REST API to access addresses.

# Øving 8 - Adressebok Backend

I denne oppgaven skal du lage en backend for adresseboken fra øving 4. I tillegg skal du utvide applikasjonen med en påloggingsfunksjonalitet.


## Funksjonelle krav:
1. Brukeren kan logge på. Uten pålogging er ingen av de andre funksjonene aktivert.
2. Brukeren kan logge av.
3. Etter pålogging vises adressene som er lagret av brukeren.
4. Brukeren kan legge til, oppdatere og slette adresser, og disse endringene lagres på serveren.
5. Pass på at adresser som er lagret av en bruker, bare kan vises, oppdateres og slettes av denne brukeren.

## Teknologi brukt:

Du bør implementere et flaskapplikasjon som lagrer brukere og adresser i en SQLite database. Lagre noen eksempel data.
Du kan bruke `setup_db.py` som inkluderer funksjoner for å lage og bruke en database.

Du kan også bruke filer for å lagre brukere og contacter. 
`setup_json.py` inneholder noen funksjoner som kanskje hjelper.

** Du har ikke lov til å bruke templates. **
1. Server HTML og JS som statiske filer.
2. Bruke AJAX til innlogging og for få tilgang til adresser.
3. Implementer et REST API for å få tilgang til adresser.
