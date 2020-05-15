<h1 align="center">
Interactive Frontend - Milestone Project 2 - Guess That Title - David O Neill
</h1>

<h1 align="center"> 
<img src="readme-images/logo.png" width = "100px" alt="logo">
</h1>

<h2 align="center">About The Game</h2>
<p>
Guess That Title is an fun, interactive quiz game that's all about guessing! You will be presented with topics to choose from. Based on your choice, 
you will be given movie titles with one word missing! Your task is to guess the missing word before you run out of time! Round One is easy - you get 60 seconds! But each round, your
time is cut in half. How many rounds can you complete before you run out of lives?
</p>
<h4 align="center">Try Out Guess That Title <a href="https://davidosongschool.github.io/GuessThatTitle/">HERE</a></h4>

## Contents

1. [**UX**](#ux)
   - [**Strategy**](#strategy)
   - [**Scope**](#scope)
   - [**Structure**](#structure)
   - [**Design**](#design)
   - [**Surface**](#surface)

## UX

### [**Strategy**](#strategy)

In this section, we need to develop the business goals, target audiences, and most
importantly the value our website/app will add for the user.

#### Business Goals

For a simple game like ours, business goals may include:

- Increase brand awareness
- Add a fun element to our brand
- Stand out from competitors

#### User Goals

- Have fun playing an interactive game
- Discover new movie titles to research
- Simple and easy to use interface
- Guidence on how to play if needed

#### Target Audience

We must conisder how our audience might incluence our design (both visually and technically)
Our taget audience for this app is very wide (Roughtly: 15-50). Therefore, we need to make sure our application is designed with
encorporate all users that may land on our website. To do this, we can make sure:

- We include a mixture of content that is relevant to both young and old (movies from all years)
- Our visual design is young enough not to be boring but also easily understood by an older audience
- Our app must be simple to use for all audiences

### [**Scope**](#scope)

In this section, we will discuss how features will align with our strategy. We need to identify what needs to be done, what tradeoffs we might need to make, 
and ask ourselves more about the user and their journey using our app. We will discuss the needs of the user.

#### What is the user looking for? 
Our user is in search of a fun, interactive game that they can play and share with friends. 
They want a game that is challenging but also engageing. 

 
#### What the user might not know they need? 

The user may require assistence in understanding how the game works. They might, after playing the game, 
want to get in touch with the developer. 

To address this need we can include a How To Play section and a Contact Us form where the user can email us. 

### [**Structure**](#structure)

This section is concerned with how the content of the website will be organised. It will place structure on the user 
journey and make structural decisions based on our Strategy and Scope.

### Navigation

In terms of navigation, our game we  be designed with a linear nagivation model. This allows us to control
eaxtly what the user is able to do at each stage. 
- For example: Choose Round 1 Theme -> Answer Question 1 ... Answer Quesiton 4 -> New Round -> Choose Round Two Theme ..

Our overall navigation menu will be non-linear allowing the user to switch between contact, how-to, and home pages. 

### Feedback & Safety 

The user needs to feel safe throughout the experience and receive feedback for their actions. 

To do this we can include:
- Subtle changes in the UI when interacted with (Shadow, Colour etc)
- Ensure that we provide Exit and Restart options that are available via the menu throughout the game
- Ensure that content is loaded from the API before displaying it to the user
- Audio to indicate correct answers, life loses, and game over. 


### [**Design**](#design)

This section is concerned with how things might look and most importantly how we can give form (visual design) to function. 
We must remember that function and value is what is important and it should influence every design decision that is made.
 
Our goal with design is two fold
 - Rapidly establish value for the user
 - Lead and encourage the user to continue their experience

Our design must
 - Be audience appropriate
 - Meet the needs of the intended audience

Things to remember
 - Too many choices leads to confusion (too few leads to lack of customisation)
 - Minimum but effective design is key
 - Use conventions that people are used to (don’t change it unless it really adds more value)

 #### Landing Page 

<img src="readme-images/Landing-Page-wire.png" width ="300px" alt="landing-page-wireframe">

1.
- Function: It should be immediately obvious to the user what steps they can take in order to contintue their experience.
- Form: We will include a large and visually ovious 'Play Now' option as the most obious next step in the user experience 

2.
 - Function - The purpose of the site/app should be immediately obvious 
 - Form - We can include a logo and a title that matches the purpose of the game (Guess that Title / Think you know your movies?)
3.
 - Function: There should be a 'safety' option immediately obious to the user on landing if they don't understand what the site is about 
 - Form: We can include a large and easy to access 'How to Play' button on the landing page 

 4.
 - Function: The user should have an option to explore, learn more, and contact us
 - Form: We will include a collapsing menu that the user can use to access these functions 


 #### How To Play

<img src="readme-images/how-to-play-wire.png" width ="300px" alt="how-to-play-wireframe">

1. 
- Function: The user should be able to see an easy to read, visually appealing set of instructions that will provide them with all necessary
information to play the game 
- Form: We can include visual instructions for the two key steps in playing the game (Choosing a theme and guessing a title). We can also include 
information on how many lives the user will have and under what terms they will lose a life. 

2. 
- Function: After reading the instructions, it should be very easy to take the next step and play the game 
- Form: We can include a Play Now button at the end of the instructions so the user can easily access the game 

#### Learn More 

<img src="readme-images/learn-more-wire.png" width ="300px" alt="learn-more-wireframe">

1. 
- Function: The user should be easily able to learn the basics of how the app works and the story behind it 
- Form: We can include information and a link to the OMDB API used by the app. We can also describe the languages used to build the app. 

2. 
- Function: The user should be able to contact the developer if they have any further questions 
- Form: We can include a contact us form that allows the user to send us an email

#### Display Questions 

<img src="readme-images/display-question-wireframe.png" width ="300px" alt="display-question-wireframe">

1. 
- Function: The user should be able to view the question easily and know how to answer it 
- Form: We will display the question in a large font size and include a placeholder 'Type Answer Here' in the html input box 

2. 
- Function: The user should be able to see what question they are on and have many lives they have 
- Form: We will include a question counter and a lives counter in the top left and right hand of the screen 

3. 
- Function: The user should be able to skip a question if they don't know the answer 
- Form: We will include a Skip Question button just under the answer section 

4. 
<img src="readme-images/loading-wire.png" width ="100px" alt="loading-wireframe">

- Function: We must retrive the content from the API before display the questions to the user 
- Form: We will include a loading GIF that will run until all the information is restrived from the API. This will allow for the 
smoother user experience.


### [**Surface**](#surface)


