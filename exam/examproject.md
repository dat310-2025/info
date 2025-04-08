# Exam project

- [Exam project](#exam-project)
  - [Dates](#dates)
  - [Overview](#overview)
  - [Groups](#groups)
  - [Collaboration requirements](#collaboration-requirements)
  - [Meeting](#meeting)
  - [Idea](#idea)
  - [Project delivery](#project-delivery)
  - [Project Requirements](#project-requirements)
  - [Technology Allowed](#technology-allowed)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Layout Requirements](#layout-requirements)
  - [Functional Requirements](#functional-requirements)
    - [AJAX and REST API](#ajax-and-rest-api)
    - [Login](#login)
    - [Data items](#data-items)
    - [Data Collection Display](#data-collection-display)
    - [Preference](#preference)
    - [Validation](#validation)
    - [Layout](#layout)
    - [Additional Features](#additional-features)
  - [Grading](#grading)
    - [Score Table](#score-table)
    - [Log in and register users | 6 |](#log-in-and-register-users--6-)
    - [Example data | 2 |](#example-data--2-)
    - [JS Form validation | 5 |](#js-form-validation--5-)
    - [Sort or search possible | 3 |](#sort-or-search-possible--3-)
    - [Preference stored | 4 |](#preference-stored--4-)
    - [Update, delete data | 3 |](#update-delete-data--3-)
    - [AJAX request used | 8 |](#ajax-request-used--8-)
    - [Fluid layout | 2 |](#fluid-layout--2-)
    - [Absolute used | 2 |](#absolute-used--2-)
    - [Flex used | 2 |](#flex-used--2-)
    - [Semantic tags | 2 |](#semantic-tags--2-)
    - [Phone layout | 5 |](#phone-layout--5-)
    - [Code separation | 5 |](#code-separation--5-)
    - [Data stored | 6 |](#data-stored--6-)
    - [Rest API | 6 |](#rest-api--6-)
    - [Server side validation | 5 |](#server-side-validation--5-)
    - [Errors displayed | 5 |](#errors-displayed--5-)
    - [Authentication | 5 |](#authentication--5-)
    - [Access control | 3 |](#access-control--3-)
    - [Extra feature | 18 |](#extra-feature--18-)
      - [Extra JavaScript/Frontend features | max 12p |](#extra-javascriptfrontend-features--max-12p-)
      - [Extra database features | max 7p |](#extra-database-features--max-7p-)
      - [Extra backend features | max 12p |](#extra-backend-features--max-12p-)
  - [Project presentation](#project-presentation)
  - [Help and plagiarism](#help-and-plagiarism)

## Dates

| Date   |              |                    |
| ------ | ------------ | ------------------ |
| 14.04. | Start        |                    |
| 06.05. | Idea         | **deadline**       |
| 01.06. | Code         | **deadline** 23:59 |
| 10.06. | Presentation |                    |
| 11.06. | Presentation |                    |

## Overview

For the exam project you are required to design and implement a complete web application, frontend and backend.

You are free to chose what kind of application you implement, but restrictions apply to both [technology that you may use](#technology-allowed) and there is some [required functionality](#functional-requirements).

## Groups

You are expected to do the project in groups of 2.

You can form groups yourself, and register your group on QuickFeed.

If you need to find a partner, you can either:

- Write on the group finder channel on discord.
- Write an email to Leander, asking to be put into a group.

If you want to work alone, you need a good reason to do so.

If you want to work alone, and you have a good reason to do so, send an email to Leander.

## Collaboration requirements

After forming a group on QuickFeed, you will receive a group repository on GitHub.

Use this repository to coordinate your work.

Both group members need to contribute.

As a rule of thumb, you should make at least 20% of the commits.

## Meeting

Every group should meet at least once with me, before handing in your draft report.
This is to make sure you are on track.

Use the [this link](https://outlook.office.com/bookwithme/user/90a9d200a112481b8677a71c1ab2a195@uis.no?anonymous&ep=plink) to book a meeting. Send a message if no times are available.

## Idea

Some weeks after the start of the project, you have to upload a file `idea.md` to your repository.
The idea markdown file must contain a description of the application you want to implement.

You can include both the general scheme and more detailed information on what features you want to implement.
Also mention what kind of data you will store.

The idea file does not need to include all functionality and you can make changes to what you describe, but the general idea is binding.
Here is an example for the idea file: [idea_example](./idea_example.md)

*The `idea.md` needs to be uploaded to your groups GitHub repository.*

## Project delivery

On the final delivery you should hand in your complete code, and a README.md markdown file.
Your code should also include a SQLite database or a `setup_db.py` file that creates the database with example data.

The `README.md` file should contain the following sections:

- How to run: e.g.
    > Start the application by running `app.py` in the application folder.
- Instructions for testing, e.g. `username` and `password` for existing users.
- List of all functionality: List all implemented functionality, to make sure all your work is taken into account. For example
  - Dark mode is stored in local storage and present if the user revisits the page.
  - New categories can be added on the category pages.
    - An Icon and color can be chosen for the category.
  - If the user tries to register a password with less than 5 characters, an Error is displayed.

## Project Requirements

## Technology Allowed

You need to use the technology from the course.
You may only use the frameworks listed below. If you are unsure if something is allowed, please ask on Discord.

### Backend

Your web server should be Flask. Data should be stored in an SQLite database.
You may use the Flask-login plugin, but that is not required. If you do so, note it in your README.md.
You should write SQL queries.
Do not use an Object-Relational-Mapper or SQLAlchemy.
You cannot use Flask-forms, wtforms, Flask-WTF or similar.

### Frontend

The frontend should be either pure JS or Vue.
You may use plugins like Vuex or Vue-Router in Vue.
You may use the Lodash JS library.
You may use all built-in JS APIs.
You may use use either Vue version 2 or 3.

You are not allowed to use a different JS Framework like React.

You may use additional JS libraries for achieving extra functionality, e.g. showing graphs, or similar.
Ask on discord, and mention what is used and for what in your README.

You can use Node.js and Webpack or Vite to create your Vue application.
However, in this case, you need to build your application and include the final js files in you Flask application such that we do not have to run Node.js to run your project.
You still have to include your source code on GitHub.
Also note that I do only have limited ability to help you with these tools.

### Layout Requirements

You can either use plain CSS or Bootstrap.
If you copy CSS files from the web, e.g. `reset.css` or `normalize.css`, you must specify this in the README.md. If specified, it will not count as plagiarism.

## Functional Requirements

The following are the functional requirements which build the bases for grading your project.
You can omit some features, but this will effect grading.

### AJAX and REST API

You are free to implement a Single page application (SPA) or an application with multiple routes using Flask templates.

However, some part of your application needs to be implemented using AJAX calls.
The naming of routes in your Flask application should follow REST API principles.
You can deviate from this is you have good reasons.
If you do not implement an SPA, you need to use AJAX calls a place it makes sense.

For maximum score, your application must be well-organized and separated into components, or base templates, ...

### Login

Your application should allow login and registration of new users.
Users should be stored in the database.

You should enforce some reasonable restrictions on passwords.

### Data items

The database needs to contain at least 3 tables, this include a table fore users.
All tables must be used in the application.
The application should allow to add, delete, and update some of the data stored.

Some of these operations should require specific authorization, e.g., not every user is allowed to delete every item.

### Data Collection Display

The frontend must contain functionality to display a collection of items.
There should be functionality to **filter**, or **sort**.

### Preference

Some user preference must be stored automatically and set when the user revisits.
This can be the sort order the user did set, or light/dark mode.
It can be stored in the database, or simply in a cookie or local storage.

### Validation

Forms for login, registration, adding and updating data items should be validated.
Validation should be done both in JS and on the server side.
If validation fails, a meaningful error message must be displayed.

You should also use appropriate HTTP error codes.

Similar, if AJAX requests fail, due to server side validation, meaningful errors should be displayed.

### Layout

You should use semantic HTML tags.
Use tags where it everywhere it makes sense.

- Some elements should be displayed using a flexbox.
- Some elements should use absolute positioning.
- The layout of your page should be fluid, i.e. adjust to different browser window sizes.
- For full points, you page needs to both look like it makes good use of a desktop screen, e.g. `>1200px`, but also be able to adjust to phone size, e.g. `375px`.

### Additional Features

You are expected to implement additional, more complex features.
More info and examples on more complex features is given below.

Additional features should be meaningful for the application you are implementing.

## Grading

The submitted project code builds the main basis for the grading.

Additionally, you will have to showcase your application in a short presentation.

Your application should be well tested and working.
All functionality should be error free, including JS code.
The presence of **dysfunctional or unused code** will give a penalty. Remove such code before you submit.

The following table gives a rough overview of grading criteria.
The criteria are explained in more detail below.

### Score Table

| Idea report                                 | 5%  |
| ------------------------------------------- | --- |
| **Project code**                        | **95%** |
| Log in and register users | 6 |
| Example data | 2 |
| JS Form validation | 5 |
| Sort or search possible | 3 |
| Preference stored | 4 |
| Update, delete data | 3 |
| AJAX request used | 8 |
| Fluid layout | 2 |
| Absolute used | 2 |
| Flex used | 2 |
| Semantic tags | 2 |
| Phone layout | 5 |
| Code separation | 5 |
| Data stored | 6 |
| Rest API | 6 |
| Server side validation | 5 |
| Errors handled and displayed | 5 |
| Authentication | 5 |
| Access control | 3 |
| Extra feature | 18 |

### Log in and register users | 6 |

Possible to register new users and they can log in.
Security aspects are not the most important, but you should either implement a login similar to what is shown in the lecture, or use an existing method, e.g. flask login.

### Example data | 2 |

Your application should come with sufficient example data, e.g. some example users that have some data inserted already.

### JS Form validation | 5 |

Validate the forms and help the users with errors.
To get full points, you need to do more than just have `required` and `input type=email`.

### Sort or search possible | 3 |

The app displays some list or collection of item in which you can search or which you can sort.
This can e.g. be highscores, userlist, products, ...

### Preference stored | 4 |

Some setting the user does is stored automatically as a preference and set again when the user is revisiting, e.g. dark mode or similar.

### Update, delete data | 3 |

Users can update and delete some of the data in your database.

### AJAX request used | 8 |

AJAX request is used someplace, where it makes sense to use an AJAX request.

### Fluid layout | 2 |

Elements change size or position based on the screen width.

### Absolute used | 2 |

Absolute positioning is used somewhere it makes sense.

### Flex used | 2 |

Flex is used somewhere it makes sense.

### Semantic tags | 2 |

Uses semantic tags where ever they fit.

### Phone layout | 5 |

App can be nicely displayed on phone size.
For full points, something must be different on phone than on desktop.

### Code separation | 5 |

Code (backend and/or frontend) is divided in multiple files.

### Data stored | 6 |

Data is stored in a database with at least 3 tables.

### Rest API | 6 |

The routes of your flask server follow a naming according to rest principles.

### Server side validation | 5 |

Validate all inputs, always.

### Errors displayed | 5 |

Errors must be checked and displayed to the user and proper error codes must be used.

### Authentication | 5 |

Some routes/sites are only accessible to logged in users, with proper checks.

### Access control | 3 |

Some routes/sites or data are only accessible to certain users or user roles, with proper checks.

### Extra feature | 18 |

You can get up to 18 points for bonus features.
However, you can get at most:

- 12 points for pure JavaScript bonus features,
- 7 points for database bonus features
- 12 points for backend bonus features

#### Extra JavaScript/Frontend features | max 12p |

You can add more JavaScript features.
This includes any functionality on the front end that goes beyond what is absolutely required.
Examples in this category are:

- A small game running in JS,
- Your page is an SPA (Single Page Application),
- Image preview and upload, if done in JS
- Multi client interaction and events triggered by the server, e.g. via long polling or websockets
- Evaluate accessibility and fix all errors (https://www.w3.org/WAI/test-evaluate/tools/list/)
- Display graphs or compute something

#### Extra database features | max 7p |

You get extra points if you model a more complex database, e.g.

- More tables
- Good table layout
- Complex queries (join?)

The extra tables and queries must be used in the application, to give points.

#### Extra backend features | max 12p |

Extra features implemented in the flask backend.
Here are some examples I have seen in previous years:

- Extensive API (must be used)
- Image upload
- Accessing an external API
- Email user verification
- More complex login (JWT)
- Compute something

## Project presentation

You will have to give a 5 minute presentation about your project.
The goal is that you give a demo, showing how your application works, and we will ask some questions about your code.
Also show an example how your application handles errors.
The presentation is mandatory and graded pass/fail.
If you fail the presentation, e.g. you show that you do not understand your own code, your project will not be graded.

For the presentation, you need to understand functions and features you use.
For example, if you use the `forEach` method in Javascript, you should be able to explain:
> `forEach` is a method on a Array. It takes a function (*callback function*) as argument and executes the *callback function* once for each element in the array. The element is given to the *callback function* as argument.

## Help and plagiarism

You need to write the application code yourself, or within the group.

You can use AI for help, but do only include code that you understand in your project.
If you do not understand the code the AI produces, you can ask it to create simpler code and explain it.
