# Legend Mama - Server Side
## Development
### Local
When working locally, Google Cloud resources can be accessed through user credentials or service account credentials.
To use user credentials, make sure the gcloud CLI is installed. Then login using the following command:

`gcloud auth application-default login`

If using service account credentials with an account key and environment variable, make sure these details are not 
committed to the GitHub repository.

For more details, see:
https://cloud.google.com/docs/authentication/provide-credentials-adc#local-dev

### Cloud Run
Cloud Run will use Application Default Credentials to automatically detect whether the Cloud Run service identity is 
authenticated to perform the operation with other Google Cloud APIs. The Cloud Run service identity is a service account
that ws assigned as the Cloud Run instance's identity when a revision is deployed. 

For more details see:
https://cloud.google.com/run/docs/securing/service-identity#how_service_identity_works

## Testing
### Setting Up Firebase Emulator
1. Install the [Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli)
2. Initialize the server directory `cd server` as a Firebase project `firebase init`. Choose an existing project, select Firestore, and opt-in to defaults.
3. Add the following variables to your environment file:
`
FIRESTORE_EMULATOR_HOST="127.0.0.1:8080"
GCLOUD_PROJECT="legend-mama"
`

WARNING: If testing authentication middleware, make sure Firebase Auth emulator is disabled and any references to it in the environment or config files are removed.

### Running Tests with Emulators
1. Start up the emulators: `firebase emulators:start`
2. Run `npm test`

