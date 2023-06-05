# School-Net

This project aims to encompass the entire nation’s school system. The project will be
able to virtualize the tedious and repetitive tasks that take place in school
environments.
The system should be able to provide the following functionalities and features:

## Functional Requirements

1. **Student Management**: The system should enable effortless management of
   student information. This might include student academic progress, attendance
   records, medical information, conduct, contact information and more.
2. **Teacher Management** : The system should allow for management of teacher
   information, contact information, course assignments, events such as
   employment date, employment history, etc.
3. Finance : The system should allow for storing and managing billing and financial
   records, including tuition, payments, expenses, subscriptions, teacher payroll,
   etc.
4. **Communication** : The system should allow communication between teachers,
   students, parents, and other staff members. People must be able to send
   documents, pictures, etc. and should be monitored carefully as to not let
   unnecessary or harmful content pass by.
5. **Grades and Assessment** : Although this was put together with the student
   management above, it must be noted that the system should allow for filtering,
   sorting and aggregating student data with respect to their grades, find out
   vulnerabilities, and help schools deal with them accordingly.
6. **Analytics and Reporting** : The system should generate useful analytics that
   could be used by the school to improve the teaching-learning progress. This
   includes tracking student attendance, analyzing academic performance, tracking
   financial reports, finding out vulnerabilities, etc.
7. **Security and Data Privacy**: he system should ensure the security and privacy
   of student, teacher, parent and any other relevant parties’ data. This includes
   monitoring data leaks, transferring data in secure protocols, encryption, and
   more

## Non-functional Requirements

1. **Scalability**: The system should be able to scale well. Given the sheer size of the
   data and clients, servers should be able to handle request with an exceptionally
   efficient manner.
2. **Fault Tolerant** : The system should be exceptionally fault tolerant, handling
   failures and outages. The system should implement a form of circuit breaking in
   order to protect further failure/damage from happening to vulnerable services.
3. **Performance** : The system should have excellent performance, taking into
   consideration the vast array of devices the users, it should be built to run on any
   device.
4. **Reliability** : The system should be reliable enough for any school to store and
   migrate their workflows to the system.
5. **Data integrity** : Extensive validation and verification of data should be conducted
   to ensure its integrity. Consistency should be guaranteed across all instances.
6. **Maintainability** : The system should be maintainable by anyone with the specific
   skillset. The system should be done by following best software patterns and
   practices.
7. **Auditability** : The system should keep track of ALL events that happen on a
   system level in order to debug failures, etc.

## Architecture

Given the immense requirements this project has, going with a microservices
architecture gives the most sense.

Going with a microservices architecture has the following advantages:

1. **Loose Coupling:** Having microservices allow for loose coupling between each
   service. This means that every service has little knowledge of other services.
2. **Flexibility** : Given the independent nature of microservices, having different
   languages and tech stack is possible.
3. **Team autonomy and speed:** Again, given the independent nature of
   microservices, each service could be developed in parallel allowing for faster
   completion of the project.
4. **Fault isolation:** Having a microservice architecture allows for
   compartmentalization, thus any failure that impacts a specific service will only be
   able take down that service and not more.
5. **Scalability:** Since each service is an app on its own, independent scalability is
   possible thus efficient resource usage. New services could also easily be
   plugged into the entire project effortlessly
6. **CI/CD** : Microservices will allow for excellent DevOps practices. Each service can
   have its own testing, development and deployment pipeline.

![Architecture of the project](https://res.cloudinary.com/dqbnj4bxr/image/upload/c_scale,q_100,w_720/v1685980667/arch_nvbnqq.png)

The image above provides an overview of the architectural design of the entire
project. Each service shown at the bottom of the image are independently running
docker containers that communicate with a managed Kafka stream platform.

### Tools

1. **Docker**: Will be used to containerize each service
2. **ElasticSearch**: Will be used to index data to make it suitable for searching
3. **Redis**: Will be used for caching on numerous layers to provide fast response
4. **PostgreSQL/MySQL**: Will be used to store data
5. **Apache Cassandra** : Due to its amazing scalability and speed, will be used to
   handle enormous amounts of data
6. **Amazon S3** : Will be used to store documents, images, etc.
7. **Consul/etcd/zookeeper**: Container registries that can be used to store
   container location and for facilitation of communication.
8. **Kafka**: Will be used for event streaming and logging. Due to its high throughput,
   can handle multiple services at a time.
9. **CDN**: Will be used for caching the website to provide efficient responses.
