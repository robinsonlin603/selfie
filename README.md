# Selfie
<p align="center">
  <img src="https://user-images.githubusercontent.com/93252094/173016139-87a0c0ec-046d-4b1f-a6d0-44b4b52406fa.png" />
</p>

<p>
  <img src="https://user-images.githubusercontent.com/93252094/173021335-77343e70-b743-4211-967c-ceed96cbaf7a.png"/>
  Selfie is a free photo sharing website. People can upload photos to our service and share them with others. Users can also view, comment and like posts shared by    other users on Selfie. Anyone can create an account by registering an email address and selecting a username.
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/93252094/173027154-edc8fbd6-905c-4db0-a5a2-f0798eb59ab1.gif" />
</p>
<br />
<p>
  <img src="https://user-images.githubusercontent.com/93252094/173026944-30e89b38-1971-4905-8fa8-3200dd9e4a73.png"/>
    Webstie URL: https://theselfie-59eaf.web.app/
</p>

<h4>Test Account<h4/>

|    -    |        -    | 
| :-------------: |:-------------:| 
| Account     | cat@cat.com |
| Password      | 123456   | 

## Table of Contents ##
+ [Skills Structure](#skills-structure)
+ [Frontend Technique](#frontend-technique)
    + [Component Structure](#component-structure)
    + [Global State](#global-state)
    + [Custom Hook](#custom-hook)
    + [useRef](#useref)
    + [React Router](#react-router)
+ [Cloud Service Technique (Firebase V9)](#cloud-service-technique-firebase-v9)
    + [Firebase Authentication](#firebase-authentication)
    + [Cloud Firestore](#cloud-firestore)
    + [Firebase Storage](#firebase-storage)
    + [Firebase Hosting](#firebase-hosting)
+ [Main Features](#main-features)
+ [Contact](#contact)
## Skills Structure
The development of Selfie in frontend is constructed by **React**, and is used with **React Router** to implement **Single Page Application (SPA)**. The part of backend uses the **Firebase** to set up the website, database, storage and member system. The development tools use **Webpack** for module bundle, **Babel** for compatible version of JavaScript in environments., **NPM** for package management, **ESLint** to check syntax and unified coding styled, and **Github** to control the Git version. 
 <br/>
<p align="center">
  <img src="https://user-images.githubusercontent.com/93252094/175520403-0b68115e-6bec-44ba-8aa8-bc9ee2e58406.png"/>
</p>

## Frontend Technique
### Component Structure
<p align="center">
  <img src="https://user-images.githubusercontent.com/93252094/175522419-5f562216-5604-437c-b865-0aaaaf9ba914.png"/>
</p>

### Global State
+ Get action from custom hook, then **useReducer** return a new state.
+ Store state in global by **useContext**.
### Custom Hook
+ Implement **CRUD** operation on **Firebase**.
+ Dispatch action to **useReducer**.
### useRef
+ Reference to the element which wants to observe, then **mutable observational object**.  
### React Router
+ Version: 6
+ Handle single-page application routes. 
  
## Cloud Service Technique (Firebase V9)
### Firebase Authentication
+ Login/logout with email and password.
### Cloud Firestore
+ Store user data, posts data and conversation data
+ Use onSnapShot to listen to documents.Then, each time the contents change, another call updates the document snapshot.
### Firebase Storage
+ Hosting images uploaded from users.
### Firebase Hosting
+ Hosting static and dynamic content of the web.
## Main Features
### Infinite scroll
+ Use **Intersection observer** observer **useRef** binding element.
<p align="center">
  <img src="https://user-images.githubusercontent.com/93252094/175103275-e53ea392-f368-4c64-ae12-0cba3d5a679c.gif" />
</p>
  
### Edit post & profile
+ Only creators have authenticated to delete or edit posts.
+ Through user data from **Global State**, the web can confirm who is the post's creator.
<p align="center">
  <img src="https://user-images.githubusercontent.com/93252094/173233730-4552f312-8a68-4bbb-9914-94a044a11750.gif" />
</p>

### Add post
+ Store photo in **Storgae**.
+ Create post's data by **Firestore** in **Custom Hook**.
<p align="center">
  <p align="center"><img src="https://user-images.githubusercontent.com/93252094/173230049-ce3ab034-5c09-4b72-858a-aa2332b18b79.gif" />
</p>

### Leave comment 
+ Users can leave comments and likes posts to interact with the creator, then update to **Firestore**.
<p align="center">
  <img src="https://user-images.githubusercontent.com/93252094/173234533-4ff21704-3666-461b-a3e6-374b8ab88bce.gif" />
</p>

### Chatroom
+ Realtime chat with friend by **Firestore onSnapshot method**.
+ Switch chatroom by **React Router Outlet** to render children route elements.
<p align="center">
  <img src="https://user-images.githubusercontent.com/93252094/173236873-79585239-30b4-476b-b771-58c95037c080.gif" />
</p>
  
### Friend list
+ In the friend list, you can see a list of the people you're following and who's following you.
+ Remind you when you have new follower.
<p align="center">
  <img src="https://user-images.githubusercontent.com/93252094/173234533-4ff21704-3666-461b-a3e6-374b8ab88bce.gif" />
</p>

### User Profile
+ Render different content by user data from **Global State**.
+ Provide a user profile, you can see what users have shared.
+ Follow/Unfollow friends and send messages.
<p align="center">
  <img src="https://user-images.githubusercontent.com/93252094/173234680-a42e4782-c217-4e72-bf29-37cbe0a12dda.gif" />
</p>
  
### Find new friend
+ Build search bar by pure *JavaScript*, not used third party library.
+ Search user who you interested.
<p align="center">
  <img src="https://user-images.githubusercontent.com/93252094/173241998-4f520ab2-eb69-4a5d-b121-88f90a601b15.gif" />
</p>

## Contact
+ Hou-An,Lin
+ LinkedIn: www.linkedin.com/in/robinson0603
+ mail: am810603@gamil.com
