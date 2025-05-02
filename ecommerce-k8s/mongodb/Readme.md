Install helm package manager

    brem install helm

Add the Bitname Helm Repository

    helm repo add bitnami https://charts.bitnami.com/bitnami
    helm repo update

deploy the MongoDB

    helm install atlan-db bitnami/mongodb



