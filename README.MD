# Transmission Watcher
This is a simple script which will watch a transmission server. When the Seeding ratio reaches 1.0 <strike title="Has not been implented yet.">or it has been seeding for 3 days</strike>, it removes it. 

### Environment Variables
#### Required: 
- TRANSMISSION_HOST: The Hostname or IP address of the Transmission Server.

#### Optional:
- TRANSMISSION_PORT: Assumed to be 9091
-  TRANSMISSION_USERNAME: Default is blank.
-  TRANSMISSION_PASSWORD: Default is blank.
