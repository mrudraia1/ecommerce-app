.PHONY: \
	build-frontend \
	push-frontend \
	build-backend \
	push-backend \
	build-custom-rabbitmq \
	push-custom-rabbitmq



REGISTRY_NAMESPACE = quay.io/rh_ee_mrudraia
IMAGE_TAG = local

build-frontend: 
	@echo "Running frontend build"
	docker build  -t ${REGISTRY_NAMESPACE}/atlan-ecommerce-frontend:${IMAGE_TAG} ecommerce-frontend/

push-frontend: 
	@echo "Pushing frontend image to container registry"
	docker push ${REGISTRY_NAMESPACE}/atlan-ecommerce-frontend:${IMAGE_TAG}

build-backend: 
	@echo "Running backend build"
	docker build -t ${image-registry}/atlan-ecommerce-backend:alpha ecommerce-backend/

push-backend: 
	@echo "Pushing backend build to container registry"
	docker push ${image-registry}/atlan-ecommerce-backend:alpha

build-message: 
	@echo "Running message build"
	docker build  -t ${image-registry}/atlan-ecommerce-message:alpha ecommerce-message/

push-message: 
	@echo "Pushing message image to container registry"
	docker push ${image-registry}/atlan-ecommerce-message:alpha


build-custom-rabbitmq:
	@echo "Building the custom rabbitmq"
	docker build -t ${image-registry}/atlan-ecommerce-rabbitmq:v1 ecommerce-rabbitmq/

push-custom-rabbitmq:
	@echo "Pushing the custom rabbitmq"
	docker push ${image-registry}/atlan-ecommerce-rabbitmq:v1

