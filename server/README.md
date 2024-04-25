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