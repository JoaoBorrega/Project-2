# Project-2


Fazer especie de site que com jogos de pc, que tenha descrição do jogo

- imagem inicial, um gif de um comando da playstation a rodar

- começamos com pagina inicial, com o nosso logo no inicio

- no canto superior direito iremos ter uns icons, um que tenha opçao de signup ou login, uma estrela de favoritos,
uma barra de search


Nome do projeto:

irá conter: canto superior direito em fila
- Login ou - Sigup
- icon para entrar na conta e ver o seu perfil 
- Favoritos
- barra de pesquisa

- botao para entrar nas reviews e edit as reviews


- Carrosel com os destaques, 
- Um carrosel com os tipos de jogos
- Lado esquerdo
	- Novidades
	- mais vendidos
	- tipos de jogos

- Ao entrarmos no jogo escolhido, temos a descrição do jogo e os requisitos do sistema
- as plataformas onde podemos jogar
- se é multiplayer ou na, online ou nao,tipo de jogo, etc
- média de preço
- add and delete, favoritos




meter link de compra para ir diretamente para site da worten


------------------------------------

Se tivermos tempo metemos site como se fosse de compra de jogos

adicionar link para revendedores

no carrossel do jogo ter as estrelas do rating

----------------------------------------------------

# Project title
GameVerse
<br>



## Description

Make a website with pc games, which has a description of the game

- splash image, a gif of a playstation controller running

- we start with the home page, with our logo at the beginning

- in the upper right corner we will have some icons, one that has a signup or login option, a star of favorites,
a search bar

will contain: top right corner in row
- Login or - Sigup
- icon to enter the account and see your profile
- Favorites
- search bar

- button to enter reviews and edit reviews


- Carousel with highlights,
- A carousel with the types of games
- Left side
- News
- best sellers
- types of games

- When we enter the chosen game, we have the description of the game and the system requirements
- the platforms where we can play
- whether it's multiplayer or not, online or not, type of game, etc.
- price average
- add and delete, favorites


<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage and filter by type of restaurant, log in and sign up. 
- **sign up** - As a user I want to sign up on the web page so that I can add favorite restaurants to my list.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **favorite list** - As a user I want to see the list of my favorite and delete them.
- **edit user** - As a user I want to be able to edit my profile.
- **result** - As a user I want to see the list of restaurant filter by my preferences.
- **games listing** - As a user I want to see more details of the restaurant, be able to call them and visit their website and save it as favorites.



<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  email, password  }                                    |                                                        |
| `PUT`      | `/private/edit-profile`            | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [firsttitle], [lasttitle],} |
| `GET`      | `/private/favorites`               | Private route. Render the `favorites` view.                  |                                                          |
| `POST`     | `/private/favorites/`              | Private route. Adds a new favorite for the current user.     | { title, cuisine, city, }                                 |
| `DELETE`   | `/private/favorites/:gameId` | Private route. Deletes the existing favorite from the current user. |                                                          |
| `GET`      | `/games`                     | Renders `games-list` view.                              |                                                          |
| `GET`      | `/games/details/:id`         | Renders `games-details` view for the particular restaurant. |                                                          |

user
game
-> eumerar categorias
favoritos





## Models

User model

```javascript
{
  title: String,
  email: String,
  password: String,
  favorites: [FavoriteId],
}

```



Favorites model

```javascript
{
  placeId: String,
}

```



<br>

## API's




## Packages





## Backlog

[See the Trello board.](https://trello.com/b/Ni3giVKf/ironhackproject)



<br>



## Links



### Git

The url to your repository and to your deployed project

[Repository Link]()

[Deploy Link]()



<br>



### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing)

### Contributors
Firsttitle Lasttitle - [`<github-usertitle>`](https://github.com/person1-usertitle) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/person1-usertitle)

Firsttitle Lasttitle - [`<github-usertitle>`](https://github.com/person2-usertitle) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/person2-usertitle)




qru1wqUQZueFv19v