# HomeMed
HomeMed is a platform designed for doctors and patients to manage medical records, appointments, and consultations. This document will provide technical and design requirements for the application.


## Members
- Motricală Alin-Gabriel
- Radu Mihai-Alexandru

## Video presentation
https://www.youtube.com/watch?v=7nvfC8DQs-Y&feature=youtu.be

[![Video](https://i.ytimg.com/vi/7nvfC8DQs-Y/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGD4gXyhlMA8=&rs=AOn4CLA0jEQj0r0a2H9Z7cA-EHI27cahGw)](https://www.youtube.com/watch?v=7nvfC8DQs-Y&feature=youtu.be)

## Installation

To install HomeMed, follow the steps below:

Clone the repository:
```bash
git clone https://github.com/FR13ND-ly/homemed.git
```

Navigate to the project directory:
```bash
cd homemed/frontend
```

Install dependencies:
```bash
npm install
```

Start the server:
```bash
npm start
```

Open another terminal emulator and access the backend directory:
```bash
cd homemed/backend
```

Install dependencies:
```bash
pip install -r requirements
```
Start the server
```bash
python manage.py runserver
```

Access the application at http://localhost:3000/

## Usage

HomeMed provides a simple and intuitive interface for managing patient records. The main features of the application are:

* Patient management: You can add new patients, view their details, transfer to another doctor and update their information.

* Appointment management: You can schedule new appointments, view upcoming appointments, and manage appointment details.

* Medical history management: You can view and update a patient's medical history, including allergies, medications, and previous diagnoses.

* Consultations: You can generate consultations for patients.

To use HomeMed, simply navigate to the appropriate section of the application and use the provided forms and buttons to manage your data.

## Customization

HomeMed can be customized to fit the needs of your practice. You can modify the application's interface and functionality by editing the source code.

The application is built using the ADF stack (Angular, Firebase and Django). The frontend is built using Angular, while the backend is built using Django and Firebase.
