# HealthCure

HealthCure is a full-stack web application that helps patients and doctors schedule and manage appointments. Built with [Next.js](https://nextjs.org) and [Appwrite](https://appwrite.io), and monitored with [Sentry](https://sentry.io), HealthCure aims to streamline the appointment process and improve healthcare efficiency.

## Table of Contents
- [Project Description](#project-description)
- [Technologies Used](#technologies-used)
- [Database Setup](#database-setup)
- [Installation](#installation)
- [Screenshots](#screenshots)
- [Environment Variables](#environment-variables)
- [License](#license)

## Project Description
HealthCure is a solution for scheduling and managing appointments between patients and doctors. It includes features such as appointment booking, reminders, and secure access controls.

## Technologies Used
- **[Next.js](https://nextjs.org)**: A React framework for building fast and scalable web applications.
- **[Appwrite](https://appwrite.io)**: An open-source backend server for web, mobile, and flutter developers.
- **[Sentry](https://sentry.io)**: A monitoring platform that helps developers identify and fix issues in real-time.

## Project Setup

### 1. Create an Appwrite Project
1. Sign in to your [Appwrite console](https://appwrite.io/console) and create a new project

### 2. Set Up an API Key
1. Go to the `overview` tab of your new project.
2. Scroll down and under `Integrate with your server`, create a new API key. You can allow all permissions.

### 3. Set Up the Database
1. In your Appwrite project dashboard, navigate to the "Database" section.
2. Create a new database and name it appropriately (e.g., `HealthCure`).

### 4. Create Collections and Documents
You need to create several collections and define the documents (tables and fields) as outlined below:

#### Collections

- **Patients**
  - `phone`: String ***(required)***
  - `email`: Email ***(required)***
  - `name`: String ***(required)***
  - `gender`: Enum("male", "female", "other")
  - `address`: String
  - `occupation`: String
  - `allergies`: String
  - `userId`: String ***(required)***
  - `birthDate`: String ***(required)***
  - `primaryPhysician`: String ***(required)***
  - `emergencyContactName`: String ***(required)***
  - `emergencyContactNumber`: String ***(required)***
  - `insuranceProvider`: String ***(required)***
  - `insurancePolicyNumber`: String ***(required)***
  - `currentMedication`: String
  - `familyMedicalHistory`: String
  - `pastMedicalHistory`: String
  - `identificationType`: String
  - `identificationNumber`: String
  - `identificationDocumentId`: String ***(required)***
  - `identificationDocumentUrl`: String ***(required)***
  - `privacyConsent`: Boolean ***(required)***
  - `treatmentConsent`: Boolean ***(required)***
  - `disclosureConsent`: Boolean ***(required)***

- **Appointments**
  - `patient`: Many to one relationship with Patients ***(Set NULL on delete)***
  - `schedule`: Datetime ***(required)***
  - `reason`: String ***(required)***
  - `note`: String
  - `primaryPhysician`: String ***(required)***
  - `status`: Enum("scheduled", "pending", "cancelled") ***(required)***
  - `userId`: String ***(required)***
  - `cancellationReason`: String
 
### 5. Enable messaging

In your Appwrite project dashboard, navigate to the `Messaging` section and create an SMS provider.

### 6. Configure Sentry
1. Go to http://sentry.io and create a new Next.js project.
2. Follow the prompts to include sentry in your local project. Make sure to copy the auth token when given to you. You will use it in the next step.

## Environment Variables

This project requires certain environment variables to be set up for proper functioning. Create a .env.local file in the root directory and add the following variables:

```env
PROJECT_ID=YOUR_APPWRITE_PROJECT_ID
API_KEY=YOUR_APPWRITE_API_KEY
DATABASE_ID=YOUR_APPWRITE_DATABASE_ID
PATIENT_COLLECTION_ID=YOUR_APPWRITE_PATIENT_COLLECTION_ID
DOCTOR_COLLECTION_ID=YOUR_APPWRITE_DOCTOR_COLLECTION_ID
APPOINTMENT_COLLECTION_ID=YOUR_APPWRITE_APPOINTMENT_COLLECTION_ID
NEXT_PUBLIC_STORAGE_BUCKET_ID=YOUR_APPWRITE_STORAGE_BUCKET_ID
NEXT_PUBLIC_ENDPOINT=YOUR_APPWRITE_ENDPOINT
NEXT_PUBLIC_ADMIN_PASSKEY=YOUR_CUSTOM_PASSKEY (example: 123456)
SENTRY_AUTH_TOKEN=YOUR_SENTRY_AUTH_TOKEN
```

You should now have the required setup for the provided code to work correctly.

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/healthcure.git
     
   cd healthcure
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```
4. Open http://localhost:3000 with your browser to see the result.

## Screenshots

put em here


## License
This project is not licensed. Feel free to use and modify it as you see fit.
