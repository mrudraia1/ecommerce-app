# Specify the base image
FROM rabbitmq:3.11.15-alpine

# Add a user named appuser and set ownership of the RabbitMQ data directory
RUN addgroup -S foouser && adduser -S foouser -G foouser
RUN mkdir -p "/var/lib/rabbitmq"
RUN chown -R foouser:foouser /var/lib/rabbitmq

VOLUME ["/var/lib/rabbitmq"]

# enable RabbitMQ management plugin
RUN rabbitmq-plugins enable --offline rabbitmq_management

# set timezone to UTC
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/UTC /etc/localtime && \
    echo "UTC" > /etc/timezone && \
    apk del tzdata

# remove 'apk-tools'
RUN apk --purge del apk-tools

# expose ports for RabbitMQ and RabbitMQ management
EXPOSE 5672 15672

# Switch to the foouser user
USER foouser

ENV RABBITMQ_CONFIG_FILE=/etc/rabbitmq/rabbitmq.conf

# Set the entrypoint to rabbitmq-server
CMD ["rabbitmq-server"]