# REST exercises

## Exercise #1: Students

[Exercise1](exercise1) contains a spa application.
The application shows a list of students, and allows to add students, change student names and remove students. Note that student numbers are assigned on the backend.

Your task is to add routes to remove a student and change a student 
and to change the `addstudent` route to be conform with REST principles:

![RestSlide](images/Rest.png)

Additional tasks:
* When trying to update or remove a student that is not stored on server side, return a `405` Error. You can use `abort` [FlaskDoc](https://flask.palletsprojects.com/en/1.1.x/quickstart/?highlight=abort#redirects-and-errors).
* Can you change the `addstudent` route, so that it only returns the new assigned student number? How can you add this number to the new student and display it?

## Exercise #2: Validation and error handling

Take an `app.py` file, either the one from exercise 1, or the playlist example from the lecture [example](../../../examples/ajax/rest/playlist-rest/app.py). 
* Pass the application to an AI Chatbot and ask it to improve input validation and error handling.
* Analyse the proposed changes, try to understand if they are useful.