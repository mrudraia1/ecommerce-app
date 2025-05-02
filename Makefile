.PHONY: \
	build-frontend \
	push-frontend \
	build-backend \
	push-backend \
	build-custom-rabbitmq \
	push-custom-rabbitmq



image-registry = quay.io/rh_ee_mrudraia


build-frontend: 
	@echo "Running frontend build"
	docker build  -t ${image-registry}/atlan-ecommerce-frontend:v18 ecommerce-frontend/

push-frontend: 
	@echo "Pushing frontend image to container registry"
	docker push ${image-registry}/atlan-ecommerce-frontend:v18

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

