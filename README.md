<img src="./readme/title1.svg"/>

<div align="center">

> Devlog is a web application built to make blogging an easy and accessible task to all developers

**[PROJECT PHILOSOPHY](#philosophy) • [WIREFRAMES](#wireframes) • [TECH STACK](#tech) • [IMPLEMENTATION](#implementation) • [HOW TO RUN?](#install)**

</div>

<br><br>

<img src="./readme/title2.svg" id='philosophy'/>

> Developers spend a lot of time trying to achieve a goal, fixing a bug, or refactoring code

> The idea behind Devlog is to be the go to place for devs, a place where they can write down their thoughts, or document their latest ideas around a community that share their same interests

Reasons why developers should blog:

- Teaching others will improve your skills and make you a better programmer
- blog posts are a great medium for developers to learn and share their ideas
- blogs are a way to staying up to date in the continuously evolving tech space
- writing based around technical words isn't always easy task, blogging can improve a developers writing and communication skills

<br><br>

<img id='wireframes' src='./readme/title3.svg'>

> This design was planned before on paper, then moved to Figma app for the fine details.
> Note that i didn't use any styling library or theme, all from scratch and using pure css modules

| Signup                                                                                                                         | Landing                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| <a href="https://ibb.co/qJHwGKy"><img src="https://i.ibb.co/qJHwGKy/Register.jpg" alt="Register" border="0" /></a>             | <a href="https://ibb.co/8rkTLhz"><img src="https://i.ibb.co/8rkTLhz/HOME.jpg" alt="HOME" border="0" /></a>             |
| single blog                                                                                                                    | Blog Editor                                                                                                            |
| <a href="https://ibb.co/St5J29F"><img src="https://i.ibb.co/St5J29F/SINGLE-ARTICLE.jpg" alt="SINGLE-ARTICLE" border="0" /></a> | <a href="https://ibb.co/7vJPYWK"><img src="https://i.ibb.co/7vJPYWK/Register-2.jpg" alt="Register-2" border="0" /></a> |

<br><br>

<img src="./readme/title4.svg" id='tech'/>

A brief high-level overview of the tech stack used in the Devlog web app:

- Frontend: Devlog uses [React](https://reactjs.org), a javascript library for building user interfaces.
  The styling of individual components was done using [SASS](https://sass-lang.com/), a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets (CSS).

  [Next.js](https://nextjs.org/) - for SSR (server-side rendering), statically generated pages.

  Next.js is an open source web development framework built on top of Node.js, it provides react based applications with functionalities such as server-side-rendering and generating static websites.

- Backend: Devlog uses [Node.js](https://nodejs.org/en) and [Express](https://expressjs.com/).

  Node.js is an open-source, server-side, JavaScript runtime environment that is solely based on the V8 JavaScript Chrome Engine. Node.js can be used to create a variety of applications, including Command-Line Applications, Web Applications, Real-time Chat Applications, and REST API Servers.

  Express is a Node.js web application framework that provides broad features for building web and mobile applications. It is used to build a single page, multipage, and hybrid web application. It's a layer built on the top of the Node js that helps manage servers and routes.

- For persistent storage, the app uses [MongoDB Atlas](https://www.mongodb.com/atlas/database). A Multi-Cloud Database Service offered by MongoDB that simplifies Database Deployment and Management while providing the flexibility required to build resilient and performant global applications on the Cloud providers of your choice.

- Amazon Simple Email Service [SES](https://aws.amazon.com/ses/) is used to verify user emails on signup, account activation, and password reset requests.

  **Note:** currently the app is running in _[SES sandbox mode](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html)_, email functionality is only working with emails listed in the SES verified identities.
  <br><br>

<img src="./readme/title5.svg" id='implementation'/>

> Using the above mentioned tech stack and the wireframes created with Figma, the implementation of the app is shown as below (animated gifs from the actual web app)

- Authentication & emails using AWS SES:

> | Register Validation                                                       | Account Activation                                                           |
> | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
> | <img src="readme/devlog-gifs/01-formValidation.gif" style="width:350px"/> | <img src="readme/devlog-gifs/03-accountActivation.gif" style="width:350px"/> |

> | Email confirmation                                                           | Password Reset                                                           |
> | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
> | <img src="readme/devlog-gifs/02-emailConfirmation.gif" style="width:350px"/> | <img src="readme/devlog-gifs/04-passwordReset.gif" style="width:350px"/> |

> | Contact                                                            |
> | ------------------------------------------------------------------ |
> | <img src="readme/devlog-gifs/05-Contact.gif" style="width:350px"/> |

- Admin:

> | Manage Categories                                                    | Manage Tags                                                          |
> | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
> | <img src="readme/devlog-gifs/06-adminCats.gif" style="width:350px"/> | <img src="readme/devlog-gifs/07-adminTags.gif" style="width:350px"/> |

> | Creating Blogs                                                         | Updating Blogs                                                      |
> | ---------------------------------------------------------------------- | ------------------------------------------------------------------- |
> | <img src="readme/devlog-gifs/08-adminCreate.gif" style="width:350px"/> | <img src="readme/devlog-gifs/09-adminDel.gif" style="width:350px"/> |

- User:

> | Manage Blogs                                                          | Update                                                                | Manage Profile                                                         |
> | --------------------------------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------- |
> | <img src="readme/devlog-gifs/10-userCreate.gif" style="width:350px"/> | <img src="readme/devlog-gifs/12-userUpdate.gif" style="width:350px"/> | <img src="readme/devlog-gifs/11-profUpdate.gif"  style="width:350px"/> |

- Extra features:

> | Disqus commenting system (linked to socials)                      | Blog Filtering (based on different criteria)                       | Infinite scroll on Blogs page                                      |
> | ----------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
> | <img src="readme/devlog-gifs/13-disqus.gif" style="width:350px"/> | <img src="readme/devlog-gifs/14-filters.gif" style="width:350px"/> | <img src="readme/devlog-gifs/15-scroll.gif"  style="width:350px"/> |

> | Dark Mode                                                     | Light Mode                                                    | Dark Mode Toggler                                                   |
> | ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------- |
> | <img src="readme/devlog-gifs/16-dm.png" style="width:350px"/> | <img src="readme/devlog-gifs/17-lm.png" style="width:350px"/> | <img src="readme/devlog-gifs/18-toggler.gif"  style="width:350px"/> |

<img src="./readme/title6.svg" id='install'/>

> To get a local copy up and running follow these simple steps.

### Prerequisites

- Download and install [Node.js](https://nodejs.org/en/)

- npm
  ```sh
  npm install npm@latest -g
  ```
- Create a .env file inside the backend folder to add private variables

  ```sh
  cd backend
  touch .env
  # add random jwt secret keys (for auth, email activation and email reset)
  echo "JWT_SECRET=$(openssl rand -base64 32)" > .env
  echo "JWT_ACTIVATE=$(openssl rand -base64 32)" >> .env
  echo "JWT_RESET_PASS=$(openssl rand -base64 32)" >> .env

  ```

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/omar-zeineddine/devlog
   ```

2. Navigate to the backend folder and install dependencies
   ```sh
   cd backend
   npm install
   ```
3. Navigate back and enter the frontend folder and install dependencies

   ```sh
   cd .. && cd frontend
   npm install
   ```

4. Run the web app
   ```sh
   cd backend
   npm run dev
   ```
