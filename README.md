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
[![Composer](https://img.shields.io/badge/Composer-885630?logo=composer&logoColor=fff)](#)
[![MariaDB](https://img.shields.io/badge/MariaDB-003545?logo=mariadb&logoColor=white)](#)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)
[![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white)](#)
[![PHP](https://img.shields.io/badge/php-%23777BB4.svg?&logo=php&logoColor=white)](#)
[![CSS](https://img.shields.io/badge/CSS-639?logo=css&logoColor=fff)](#)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

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

#### AWS Deployment
[Sunfield Home Fortuna AWS](https://polite-beach-0c34c961e.5.azurestaticapps.net/)

---

### Authors
Eunice van Zyl 251023
