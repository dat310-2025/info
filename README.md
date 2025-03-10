  # UiS DAT310 Web Programming course
This repository is for the 2025 spring edition of the DAT310 Web programming course at the University of Stavanger. 

  - **Intro**: 
  - [Exam project](exam/examinfo.md)
  - Introduction [slides](slides/WebProgramming-Course_info.pdf)
  - Introduction [video](https://youtu.be/Vnt1MH8uEc4)
  - [how to hand in assignments on GitHub](quickfeed.md)
  - [git slides](slides/0-Web-programming-Git.pdf)
  - [Quickfeed](https://uis.itest.run)
  - [List of useful resources](Resources.md)
  - [Assignments](#assignments)
  - [Discord](https://discord.gg/Q4uzjJHPcn)
  

## Schedule 
| Day | Hour    | Room    |             |
| --- | ------- | ------- | ----------- |
| Tue | 10 - 12 | C-101   | Forelesning |
| Thu | 12 - 14 | AR-G001 | Forelesning |
| Fre | 10 - 12 | AR-G001 | Forelesning |
| Fre | 12 - 16 | E456    | Lab         |


This is a tentative schedule and will be subject to changes.

| Week | Lecture | Topic                 | Lecturer | Resources                                                                                                                                                                                                   |
| ---: | ------: | --------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    2 |     Tue | HTML                  | Florenc  | [Slides](slides/1-1-Web-programming-HTML.pdf)(**2024**) [examples](examples/html/basic/) [exercises](exercises/html/basic/) [solutions](solutions/html/basic/)                                              |
|    2 |     Thu | CSS I (properties)    | Florenc  | [Slides](slides/2-1-Web-programming-CSS-p1.pdf) (**2024**) [examples](examples/css/properties) [exercises](exercises/css/properties) [solutions](solutions/css/properties)                                  |
|    3 |     Tue | CSS II (selectors)    | Florenc  | [Slides](slides/2-2-Web-programming-CSS-p2.pdf) (**2024**) [examples](examples/css/selectors)  [exercises](exercises/css/selectors)  [solutions](solutions/css/selectors)                                   |
|    3 |     Thu | CSS III (positioning) | Florenc  | [Slides](slides/3-1-Web-programming-CSS-p3.pdf) (**2024**) [examples](examples/css/positioning/)  [exercises](exercises/css/positioning/)  [solutions](solutions/css/positioning/)                          |
|    4 |     Tue | HTML Forms            | Florenc  | [Slides](slides/3-2-Web-programming-HTML-Forms.pdf) (**2024**) [examples](examples/html/forms/)  [exercises](exercises/html/forms/)  [solutions](solutions/html/forms/)                                     |
|    4 |     Thu | JavaScript I (basics) | Florenc  | [Slides](slides/4-1-Web-programming-JavaScript-p1.pdf) (**2024**) [examples](examples/js/basics/)  [exercises](exercises/js/basics/)  [solutions](solutions/js/basics/)                                     |
|    5 |     Tue | JavaScript II (dom)   | Florenc  | [Slides](slides/4-2-Web-programming-JavaScript-p2.pdf) (**2024**) [examples](examples/js/events_dom/)  [exercises](exercises/js/events_dom/)  [solutions](solutions/js/events_dom/)                         |
|    5 |     Thu | JavaScript III        | Florenc  | [Slides](slides/5-1-Web-programming-JavaScript-p3.pdf) (**2024**) [examples](examples/js/more/)  [exercises](exercises/js/more/)  [solutions](solutions/js/more/)                                           |
|    6 |     Tue | Bootstrap Framework   | Florenc  | [Slides](slides/5-2-Web-programming-Bootstrap.pdf) (**2024**) [examples](examples/bootstrap/)  [exercises](exercises/bootstrap/)  [solutions](solutions/bootstrap/)            ****                         |
|    6 |     Thu | JS Example            |          | [Slides](slides/X-X-Web-programming-js-example.pdf) (**2024**) [example](examples/js/labyrinth/)                                                                                                            |
|    7 |     Tue | Vue Teaser            | Leander  | [Slides](slides/6-2-Web-programming-vue-p1.pdf) (**2024**) [examples](examples/js/vue/)  [exercises](exercises/js/vue/)  [solutions](solutions/js/vue/)                                                     |
|    7 |     Thu | SQL                   | Florenc  | [Slides](slides/Web-programming-SQL-p1.pdf) [exercises](exercises/sql/basics)                                                                                                                               |
|    8 |     Tue | SQL                   | Leander  | [Slides](slides/Web-programming-SQL-p2.pdf) [examples](examples/sql/query) [exercises](exercises/sql/queries) [solutions](exercises/sql/queries/solution.sql)                                               |
|    8 |     Thu | SQL                   | Florenc  | [Slides](slides/Web-programming-SQL-p3.pdf)                                                |
|    9 |     Tue | SQL                   | Florenc  | [Example](/examples/sql/README.md) [solutions](/examples/sql/Part-3-Example)                                               |                                                                                                                                                          |
|    9 |     Thu | HTTP                  | Florenc  | [Slides](slides/8-1-Web-programming-HTTP.pdf) (**2024**) [examples](examples/python/http/) [exercises](exercises/python/http/) [solutions](solutions/python/http/)                                          |
|   10 |     Tue | Flask I (requests)    | Leander  | [Venv](slides/Flask-I-venv.pdf) (**2024**) [Slides](slides/8-2-Web-programming-Server-p1.pdf) [examples](examples/python/flask) [exercises](exercises/python/flask1/) [solutions](solutions/python/flask1/) |
|   10 |     Thu | Flask II (templates)  | Leander  | [Slides](slides/9-1-Web-programming-Server-p2.pdf) [examples](examples/python/flask) [exercises](exercises/python/flask2/) [solutions](solutions/python/flask2/)                                            |
|   11 |     Tue | Flask III (database)  | Leander  | [Slides](slides/9-2-Web-programming-Server-p3.pdf) [examples](examples/python/flask) [exercises](exercises/python/flask3sql) [solutions](solutions/python/flask3sql)                                            |
|   11 |     Thu | JS Async              | Leander  | [Slides](slides/10-1-Web-programming-JS-async.pdf) (**2024**) [examples](examples/async/js) [exercises](exercises/async/js) [solutions](solutions/async/js)                                                 |
|   12 |     Tue | AJAX                  | Leander  | [Slides](slides/11-1-Web-programming-AJAX.pdf) (**2024**) [examples](examples/ajax) [exercises](exercises/ajax) [solutions](solutions/ajax)                                                                 |
|   12 |     Thu | AJAX & SPA            | Leander  |                                                                                                                                                                                                             |
|   13 |     Tue | Flask IV (cookies)    | Leander  | [Slides](slides/12-2-Web-programming-Server-p4.pdf) [examples](examples/python/flask4) [exercises](exercises/python/flask4) [solutions](solutions/python/flask4)                                            |
|   13 |     Thu | RESTfull APIs         | Leander  | [Slides](slides/12-1-Web-programming-Flask-APIs.pdf) (**2024**) [examples](examples/ajax) [exercises](exercises/ajax) [solutions](solutions/ajax)                                                           |
|   14 |     Tue | Login                 | Leander  | [Slides](slides/13-1-Web-programming-Server-Login.pdf) [examples](examples/python/flask5) [exercises](exercises/python/flask5) [solutions](solutions/python/flask5)                                         |
|   14 |     Tue | Authorisation         | Leander  | [Slides](slides/15-1-Web-programming-Ass8-Access.pdf) [examples](examples/a11y/table.html)                                                                                                                  |

**There will be no lectures the remaining weeks. Instead, every group should attend an individual meeting with Leander.**

## Assignments

To see and handin assignments you need to complete these steps:
1. Create a github user.
2. Join the course on [Quickfeed](https://uis.itest.run)
3. Wait for manual approval.
4. Join the github organization [dat310-2025](https://github.com/dat310-2025)

You can then view assignments at [here](https://github.com/dat310-2025/assignments).

### First assignment:
To allow you to start the first assignment right away, you can see it in the `assignment-1` [folder](assignment-1/).

**After delivering, assignments need to be approved by showing it to a student assistant. This must happen within 1 week after the deadline.**
