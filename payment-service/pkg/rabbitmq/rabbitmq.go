package rabbitmq

import (
	"context"

	amqp "github.com/rabbitmq/amqp091-go"
)

var rabbitURL string

func UseEnvRabbitURL(URL string) {
	rabbitURL = URL
}

func DeclareQueueAndBind(ch *amqp.Channel) error {
	// Declare a queue named "orders"
	_, err := ch.QueueDeclare(
		"orders", // name
		true,     // durable
		false,    // delete when unused
		false,    // exclusive
		false,    // no-wait
		nil,      // arguments
	)
	if err != nil {
		return err
	}

	// Bind the queue to the exchange "amq.direct" with the routing key "OrderCreated"
	err = ch.QueueBind(
		"orders",       // queue name
		"OrderCreated", // routing key
		"amq.direct",   // exchange
		false,
		nil,
	)
	if err != nil {
		return err
	}

	return nil
}

func OpenChannel() (*amqp.Channel, error) {
	conn, err := amqp.Dial(rabbitURL)
	if err != nil {
		panic(err)
	}

	ch, err := conn.Channel()
	if err != nil {
		panic(err)
	}

	return ch, nil
}

func Consume(ch *amqp.Channel, out chan amqp.Delivery, queue string) error {
	msgs, err := ch.Consume(
		queue,
		"go-payment",
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return err
	}

	for msg := range msgs {
		out <- msg
	}

	return nil
}

func Publish(ctx context.Context, ch *amqp.Channel, body, exName string) error {
	err := ch.PublishWithContext(
		ctx,
		exName,
		"PaymentProcessed",
		false,
		false,
		amqp.Publishing{
			ContentType: "text/json",
			Body:        []byte(body),
		},
	)
	if err != nil {
		return err
	}

	return nil
}
