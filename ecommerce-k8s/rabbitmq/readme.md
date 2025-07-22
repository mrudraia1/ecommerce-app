

rabbitmqctl add_user admin admin
rabbitmqctl set_permissions -p / admin  ".*" ".*" ".*"