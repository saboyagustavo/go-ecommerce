package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"os"

	"github.com/joho/godotenv"
	"github.com/saboyagustavo/go-ecommerce/payment-service/internal/entity"
	"github.com/saboyagustavo/go-ecommerce/payment-service/pkg/rabbitmq"

	amqp "github.com/rabbitmq/amqp091-go"
)

func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	rabbitMQURL := os.Getenv("RABBITMQ_URL")
	rabbitmq.UseEnvRabbitURL(rabbitMQURL)
}

func init() {
	loadEnv()
	fmt.Println("Payment Service v.1.0 is up and running")
}

func main() {
	ctx := context.Background()
	ch, err := rabbitmq.OpenChannel()
	if err != nil {
		panic(err)
	}
	defer ch.Close()

	err = rabbitmq.DeclareQueueAndBind(ch)
	if err != nil {
		panic(err)
	}

	msgs := make(chan amqp.Delivery)
	go rabbitmq.Consume(ch, msgs, "orders")

	for msg := range msgs {
		var orderRequest entity.OrderRequest
		err := json.Unmarshal(msg.Body, &orderRequest)
		if err != nil {
			slog.Error(err.Error())
			break
		}
		response, err := orderRequest.Process()
		if err != nil {
			slog.Error(err.Error())
			break
		}

		responseJSON, err := json.Marshal(response)
		if err != nil {
			slog.Error(err.Error())
			break
		}

		err = rabbitmq.Publish(ctx, ch, string(responseJSON), "amq.direct")
		if err != nil {
			slog.Error(err.Error())
			break
		}
		msg.Ack(false)
		slog.Info("Order processed")
	}
}
