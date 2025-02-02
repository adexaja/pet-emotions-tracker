from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from datetime import datetime, timedelta
import requests
import openai
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import psycopg2  # PostgreSQL library
import os
from dotenv import load_dotenv

load_dotenv()

# OpenAI configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

# NestJS API configuration
PET_ID = os.getenv("PET_ID", "129c658c-876a-4118-8987-c766d32651e9")
NESTJS_API_URL = f"{os.getenv('NESTJS_API_URL')}/pet-emotions/{PET_ID}"

# Email configuration
EMAIL_RECIPIENT = os.getenv("EMAIL_RECIPIENT")
EMAIL_SENDER = os.getenv("EMAIL_SENDER")
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

# PostgreSQL configuration
POSTGRES_HOST = os.getenv("DB_HOST_DOCKER", "localhost") 
POSTGRES_PORT = int(os.getenv("DB_PORT", "5432"))
POSTGRES_DB = os.getenv("DB_NAME")
POSTGRES_USER = os.getenv("DB_USERNAME")
POSTGRES_PASSWORD = os.getenv("DB_PASSWORD")

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2025, 1, 1),
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

def fetch_daily_emotions():
    """Fetch Buddy's emotions for the day from the NestJS API."""
    date = datetime.now().strftime('%Y-%m-%d')
    response = requests.get(f"{NESTJS_API_URL}/{date}")
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to fetch emotions: {response.text}")

def analyze_emotions_with_openai(emotions):
    """Send emotions to OpenAI for analysis and summary."""
    try:
        # Prepare the prompt for OpenAI
        emotion_list = [f"{e['emotion']} at {e['createdAt']}" for e in emotions]
        prompt = (
            "Analyze the following pet emotions and provide a summary:\n"
            f"{emotion_list}\n\n"
            "Summary:"
        )

        # Call OpenAI API
        response = openai.Completion.create(
            engine="text-davinci-003",  # Use the appropriate OpenAI model
            prompt=prompt,
            max_tokens=100,  # Adjust as needed
            temperature=0.7,  # Adjust for creativity vs. accuracy
        )

        # Extract the summary from the OpenAI response
        summary = response.choices[0].text.strip()
        return summary
    except Exception as e:
        raise Exception(f"OpenAI API failed: {e}")

def store_summary_in_db(summary):
    """Store the summary in a PostgreSQL database."""
    try:
        # Connect to the PostgreSQL database
        connection = psycopg2.connect(
            host=POSTGRES_HOST,
            port=POSTGRES_PORT,
            dbname=POSTGRES_DB,
            user=POSTGRES_USER,
            password=POSTGRES_PASSWORD,
        )
        cursor = connection.cursor()

        # Insert the summary into the database
        insert_query = """
        INSERT INTO pet_emotion_summaries (pet_id, summary, createdAt)
        VALUES (%s, %s, %s);
        """
        cursor.execute(insert_query, (PET_ID, summary, datetime.now()))

        # Commit the transaction
        connection.commit()
        print(f"Summary stored in PostgreSQL: {summary}")

    except Exception as e:
        raise Exception(f"Failed to store summary in PostgreSQL: {e}")

    finally:
        # Close the database connection
        if connection:
            cursor.close()
            connection.close()

def send_summary_email(summary):
    """Send the summary via email using SMTP."""
    try:
        # Create the email
        msg = MIMEMultipart()
        msg['From'] = EMAIL_SENDER
        msg['To'] = EMAIL_RECIPIENT
        msg['Subject'] = "Daily Pet Emotion Summary"

        # Attach the summary as the email body
        body = f"Here is the daily summary of your pet's emotions:\n\n{summary}"
        msg.attach(MIMEText(body, 'plain'))

        # Connect to the SMTP server and send the email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()  # Upgrade the connection to secure
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.sendmail(EMAIL_SENDER, EMAIL_RECIPIENT, msg.as_string())
        print(f"Email sent to {EMAIL_RECIPIENT}")
    except Exception as e:
        raise Exception(f"Failed to send email: {e}")

# Define the DAG
dag = DAG(
    'pet_emotion_summary',
    default_args=default_args,
    description='A DAG to fetch, analyze, and summarize pet emotions daily',
    schedule_interval='0 12 * * *',  # Run at 12:00 PM (noon) every day

)

# Define tasks
fetch_emotions_task = PythonOperator(
    task_id='fetch_daily_emotions',
    python_callable=fetch_daily_emotions,
    dag=dag,
)

analyze_emotions_task = PythonOperator(
    task_id='analyze_emotions_with_openai',
    python_callable=analyze_emotions_with_openai,
    op_args=[fetch_emotions_task.output],
    dag=dag,
)

store_summary_task = PythonOperator(
    task_id='store_summary_in_db',
    python_callable=store_summary_in_db,
    op_args=[analyze_emotions_task.output],
    dag=dag,
)

send_email_task = PythonOperator(
    task_id='send_summary_email',
    python_callable=send_summary_email,
    op_args=[analyze_emotions_task.output],
    dag=dag,
)

# Define task dependencies
fetch_emotions_task >> analyze_emotions_task 
analyze_emotions_task >> store_summary_task
analyze_emotions_task >> send_email_task
