## Torc LMS

This is a corporate learning management system with a Java backend developed using Spring Boot. The frontend is developed using Vue and Bootstrap (pre-processed with Sass).

## DevOps Presentation

Forwarding Prometheus:

``kubectl port-forward --namespace default svc/devops-prometheus-server 9090:80``

Forwarding Grafana

``kubectl port-forward --namespace default svc/devops-grafana 7070:80``



### User Roles / Functionality

- Admin
    - Manage users
    - Manage course content
- Manager
    - Assign course content to trainees
    - Unlock assigned course content
    - View trainee progress
- Trainee
    - Take Course
    - View past courses 
    
### Additional Functionality

- Course content text to speech conversion (using Google Cloud Text to Speech)

### Future Development

- Upload video and audio files from course creator (currently manually uploaded to CDN)