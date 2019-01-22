import os
import sys

from google.auth.transport.requests import Request
from google.oauth2 import service_account

def main():
    creds = os.path.join(os.path.dirname(os.path.realpath(sys.argv[0])), 'creds.json')
    credentials = service_account.Credentials.from_service_account_file(creds, scopes=[
            'https://www.googleapis.com/auth/photoslibrary',
            'https://www.googleapis.com/auth/photoslibrary.sharing'
        ])
    credentials.refresh(Request())
    print credentials.token

if __name__ == "__main__":
    main()
