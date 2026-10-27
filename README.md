# Sunfield Home Fortuna  
<p align="center"><img style="width:600px;" src="https://github.com/NicciVanZyl/Sunfield-Home-Fortuna/blob/main/ReadmeAssets/Group%2090.svg"/></p>

### <p align="center" style="text-decoration: none !important;padding:0;margin:0;">Eunice van Zyl 251023</p>
### <p align="center" style="text-decoration: none !important;padding:0;margin:0;">Interactive Development Semester 2 Theme 4</p>

## Table of Contents

* [About the Project](#about-the-project)
  * [App description](#app-description)
  * [Built With](#built-with)
  * [ERD](#erd)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [How to install](#how-to-install)
* [Limitations, Features and Functionality](#Limitations,-Features-and-Functionality:)
* [Final Outcome](#final-outcome)
    * [Mockups](#mockups)
    * [Live Deployments](#live-deployments)

---

## About the project:

### Built with:
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white)](#)
[![Microsoft Azure](https://custom-icon-badges.demolab.com/badge/Microsoft%20Azure-0089D6?logo=msazure&logoColor=white)](#)
[![Visual Studio Code](https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=visualstudiocode&logoColor=white)](#)
[![Microsoft SQL Server](https://custom-icon-badges.demolab.com/badge/Microsoft%20SQL%20Server-CC2927?logo=mssqlserver-white&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![CSS](https://img.shields.io/badge/CSS-639?logo=css&logoColor=fff)](#)
[![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](#)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)](#)
[![MUI](https://img.shields.io/badge/MUI-007FFF?logo=mui&logoColor=fff)](#)
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)](#)
[![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff)](#)
[![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?logo=nodemon&logoColor=fff)](#)
[![Google Analytics](https://shields.io)]
 
### App Description:
Sunfield Home Fortuna is a NGO based in South Africa. The NGO needed a we platform to allow for donations and foe staff to view the incoming donations.

### ERD:
<p align="center"><img src="https://github.com/NicciVanZyl/Sunfield-Home-Fortuna/blob/main/ReadmeAssets/Screenshot%202026-10-22%20122548.png"/></p>

---

## Getting Started:

### Prerequisites:

* [Git](https://git-scm.com/downloads)
* [Node Package Manager](https://www.npmjs.com/)

### How to install:

To get started, clone the repo:
```
git clone https://github.com/NicciVanZyl/Sunfield-Home-Fortuna.git
```

Install all the dependencies using npm in both backend and frontend files:
```
npm i
```
Add your own .env file in the Backend folder OR keep it blank to connect to the Sunfield Database:
```
.env file containing the JWT Secret and database login details
```
Run the app using npm start:
```
npm start for the frontend on local host
```

### File Structure:
```text
 sunfield-home-fortuna/
    ├── README.md
    ├── backend/
    │   ├── package.json
    │   ├── server.js
    │   ├── .deployment
    │   ├── config/
    │   │   └── db.js
    │   ├── controllers/
    │   │   ├── authController.js
    │   │   ├── donationController.js
    │   │   ├── userController.js
    │   │   └── wishlistController.js
    │   ├── middleware/
    │   │   ├── auth.js
    │   │   └── errorHandler.js
    │   ├── models/
    │   │   ├── donationModel.js
    │   │   ├── userModel.js
    │   │   └── wishlistModel.js
    │   └── routes/
    │       ├── authRoutes.js
    │       ├── donationRoutes.js
    │       ├── userRoutes.js
    │       └── wishlistRoutes.js
    ├── frontend/
    │   ├── README.md
    │   ├── package.json
    │   ├── public/
    │   │   ├── index.html
    │   │   ├── manifest.json
    │   │   ├── robots.txt
    │   │   └── staticwebapp.config.json
    │   └── src/
    │       ├── App.css
    │       ├── App.js
    │       ├── App.test.js
    │       ├── index.css
    │       ├── index.js
    │       ├── reportWebVitals.js
    │       ├── setupTests.js
    │       ├── components/
    │       │   ├── accordion.js
    │       │   ├── addWishlistModal.js
    │       │   ├── ADItemDonations.js
    │       │   ├── ADMoneyDonations.js
    │       │   ├── ADOverview.js
    │       │   ├── ADWishlist.js
    │       │   ├── carousel.js
    │       │   ├── DashboardItem.js
    │       │   ├── dashboardItemDetailed.js
    │       │   ├── dashboardNavAdmin.js
    │       │   ├── dashboardNavUser.js
    │       │   ├── donationItem.js
    │       │   ├── donationModal.js
    │       │   ├── editWishlistModal.js
    │       │   ├── errorModal.js
    │       │   ├── footer.js
    │       │   ├── homePageCards.js
    │       │   ├── navbar.js
    │       │   ├── paymentModal.js
    │       │   ├── ScrollToTop.js
    │       │   ├── successModal.js
    │       │   ├── teamCards.js
    │       │   ├── UDDonations.js
    │       │   ├── UDOverview.js
    │       │   ├── UDProfile.js
    │       │   └── wishlistItem.js
    │       ├── context/
    │       │   ├── api.js
    │       │   └── authContext.js
    │       └── pages/
    │           ├── adminDashboard.js
    │           ├── contact.js
    │           ├── donate.js
    │           ├── home.js
    │           ├── login.js
    │           └── userDashboard.js
    └── .github/
        └── workflows/
            └── azure-static-web-apps-polite-beach-0c34c961e.yml

```
---

## Features and Functionality:

### Features 

* users are able to log in or create accounts with secure database storage
* Users can view their dashboards to see an overview of their donations made as well as their profile information
* Users can make both monetary and item donations by filling out the forms (Donations are not actually processed since it is a student project)
* Admins can view all donations made on the admin dashboard.
* Admins can add items to their wishlist as well as see the progress on dontations to the wishlist.

---

## Concept Process:

### Designs:
 The designs in this project where made by the UX 200 students and passed to us. We then had the opportunity to adjust some aspects of the design to make it more user friendly and deployment realistic. 
---

## Final Outcome:

### Mockups:

## Desktop
<p align="center"><img src="https://github.com/NicciVanZyl/Sunfield-Home-Fortuna/blob/main/ReadmeAssets/jAQHKS3k0.png" width="600" /></p>

## Laptop
<p align="center"><img src="https://github.com/NicciVanZyl/Sunfield-Home-Fortuna/blob/main/ReadmeAssets/6d519ff0dec.png" width="600" /></p>

## Tablet
<p align="center"><img src="https://github.com/NicciVanZyl/Sunfield-Home-Fortuna/blob/main/ReadmeAssets/DTnLaiYLj.png" width="600" /></p>

## Mobile
<p align="center"><img src="https://github.com/NicciVanZyl/Sunfield-Home-Fortuna/blob/main/ReadmeAssets/tshDnRIQoN1.png" width="600" /></p>

---

### Live Deployments:

#### Azure Cloud Deployment
[Sunfield Home Fortuna Azure](https://polite-beach-0c34c961e.5.azurestaticapps.net/)

#### Google Cloud Platform Deployment
[Sunfield Home Fortuna Google Cloud Platform](https://sunfield-fortuna-service-673714714255.africa-south1.run.app)

---

### Authors
Eunice van Zyl 251023
