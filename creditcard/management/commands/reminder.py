from django.core.management.base import BaseCommand, CommandError
from creditcard.models import CreditCard
import datetime
from django.core.mail import EmailMessage
from django.template.loader import render_to_string

def send_email(card):
    subject = card.name + " Cancellation Reminder"
    message = render_to_string('creditcard/reminder.html',{
        'card': card,
    })
    to_email = card.author.email
    email = EmailMessage(subject, message, to=[to_email])
    email.send()

class Command(BaseCommand):
    help = 'Send reminder email for all expiring cards'

    def handle(self, *args, **options):
        cards = CreditCard.objects.filter(active=1)
        for card in cards:
            if card.date_reminder is not None:
                if card.date_reminder == datetime.date.today():
                    send_email(card)
                    #self.stdout.write(self.style.SUCCESS('Reminder Email Sent'))