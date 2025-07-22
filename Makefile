.PHONY: \
	build-frontend \
	push-frontend \
	build-backend \
	push-backend \
	build-custom-rabbitmq \
	push-custom-rabbitmq


build-frontend: 
	@echo "Running frontend build"
	docker build  -t quay.io/${REGISTRY_NAMESPACE}/atlan-ecommerce-frontend:${IMAGE_TAG} ecommerce-frontend/

push-frontend: 
	@echo "Pushing frontend image to container registry"
	docker push quay.io/${REGISTRY_NAMESPACE}/atlan-ecommerce-frontend:${IMAGE_TAG}

build-backend: 
	@echo "Running backend build"
	docker build -t quay.io/${REGISTRY_NAMESPACE}/atlan-ecommerce-backend:${IMAGE_TAG} ecommerce-backend/

push-backend: 
	@echo "Pushing backend build to container registry"
	docker push quay.io/${REGISTRY_NAMESPACE}/atlan-ecommerce-backend:${IMAGE_TAG}

build-message: 
	@echo "Running message build"
	docker build  -t quay.io/${REGISTRY_NAMESPACE}/atlan-ecommerce-message:${IMAGE_TAG} ecommerce-message/

push-message: 
	@echo "Pushing message image to container registry"
	docker push quay.io/${REGISTRY_NAMESPACE}/atlan-ecommerce-message:${IMAGE_TAG}

build-mongo-init: 
	@echo "Running message init"
	docker build  -t quay.io/${REGISTRY_NAMESPACE}/atlan_ecommerce_mongo_init:${IMAGE_TAG} ecommerce-message/

push-mongo-init: 
	@echo "Pushing mongo init image to container registry"
	docker push quay.io/${REGISTRY_NAMESPACE}/atlan_ecommerce_mongo_init:${IMAGE_TAG}


build-custom-rabbitmq:
	@echo "Building the custom rabbitmq"
	docker build -t ${image-registry}/atlan-ecommerce-rabbitmq:v1 ecommerce-rabbitmq/

push-custom-rabbitmq:
	@echo "Pushing the custom rabbitmq"
	docker push ${image-registry}/atlan-ecommerce-rabbitmq:v1

