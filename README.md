## Pet Emotion Tracker

This is a simple application that allows you to track your pet's emotions.

Log your pet's emotions and see how they change over time and analyze using AI. (OpenAI)

## Features

This application has the following features:

- Pets
- Emotions
- Pet Emotion Summary
- OpenAI API Integration
- Apache Airflow Integration

- Basically, its must be come from IoT application, in cat collar or in dog collar, so when detect changes, it logs the emotion into this API, and at 12PM we can send data to AI and send email to you, so you now know how your pet is feeling.

## Screenshots

![1](https://github.com/adexaja/pet-emotions-tracker/assets/1.jpg)
![2](https://github.com/adexaja/pet-emotions-tracker/assets/2.jpg)
![3](https://github.com/adexaja/pet-emotions-tracker/assets/3.jpg)

## Installation

1. Clone the repository
2. Create a .env file in the root directory and add the following variables:

```
OPENAI_API_KEY=<your_openai_api_key>
NESTJS_API_URL=<your_nestjs_api_url>
PET_ID=<your_pet_id> (currently only support to detect 1 pet at the time per dag)
EMAIL_RECIPIENT=<your_email_recipient>
EMAIL_SENDER=<your_email_sender>
SMTP_SERVER=<your_smtp_server>
SMTP_PORT=<your_smtp_port>
SMTP_USERNAME=<your_smtp_username>
SMTP_PASSWORD=<your_smtp_password>
DB_HOST_DOCKER=<your_db_host> (this is db host in docker env, i use host.docker.internal because the postgresql in my host)
DB_PORT=<your_db_port>
DB_NAME=<your_db_name>
DB_USERNAME=<your_db_username>
DB_PASSWORD=<your_db_password>
```

3. Run the following commands in the root directory:
   pnpm install
   pnpm migrate
   pnpm start:dev

4. Run docker-compose up -d in the root directory
5. Open <http://localhost:8080> in your browser to Access Apache Airflow
6. Open <http://localhost:3000> in your browser to Access NestJS API
7. NestJS Postman Collection is in documentation folder

## For further integrations

- Integrate with IoT devices
