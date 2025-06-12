### ATLAN TASK
A google doc on the task
https://docs.google.com/document/d/1ZtHGoBM4h4cJu247ITLmzrLTqhzTPC7koXPqbhyo-g0/edit?usp=sharing 


The Above application architecture is deployed in an kubernetes/Openshift environment. I have created a custom url to access the application 

## Please click on the below link to access the assigned task
http://frontend-ecommerce.apps.marula-cl.ocs-osd.syseng.devcluster.openshift.com/  

## Clone the repo ecommerce-app
https://github.com/mrudraia1/ecommerce-app.git 

## Change the working directory to ecommerce-app
cd ecommerce-app

Note: Change the image-registry of your convenience
Eg: Image-registry: hub.docker.io/repo_name

## Create a project namespace in kubernetes/Openshift
kubectl apply -f ecommerce-k8s/namespace.yaml

## Backend:
Backend server is a node js rest application running on server 5000. 

## To build the backend server:
make build-backend 

## Push the backend to the container registry:
make push-backend

## Deploy the backend server in kubernetes/Openshift
kubectl apply -f ecommerce-k8s/backend




## Frontend: 
A react js frontend application serving on 3000 port locally and running on cluster ip service in kubernetes

## To build the fronted server
make build-frontend

## Push the frontend to the container registry:
make push-frontend

## Deploy the frontend server in kubernetes/Openshift
kubectl apply -f ecommerce-k8s/frontend 


## Message-Broker:
A node js server which runs and connects to both mongo db and rabbitmq instances


## To build the message server
make build-message

## Push the message to the container registry:
make push-message

## Deploy the message server in kubernetes/Openshift
kubectl apply -f ecommerce-k8s/message 


## Database: MongoDB Deployment
Kubectl apply -f ecommerce-k8s/mongodb

## Message Queue: RabbitMQ Deployment
Kubectl apply -f ecommerce-k8s/rabbitmq


## Secure kubernetes secrets with Sealed Secrets
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.30.0/controller.yaml 

client side

curl -OL "https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.30.0/kubeseal-0.30.0-linux-amd64.tar.gz"
tar -xvzf kubeseal-0.30.0-linux-amd64.tar.gz kubeseal
sudo install -m 755 kubeseal /usr/local/bin/kubeseal


Generate the public key  from the kubeseal client
kubeseal --fetch-cert > mycert.pem

Once you have the public key, you can encrypt all your secrets.

cd exommerce-k8s/mongodb
kubeseal <mongodb-secrets.json >mongodbsealedsecre
ts.json
