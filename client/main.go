package main

import (
	"context"
	"log"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"

	pb "github.com/alikarimii/traefik-grpc/client/proto"
)

func main() {
	// Load the system's root certificates.
	creds, err := credentials.NewClientTLSFromFile("certs/ca.pem", "")
	if err != nil {
		log.Fatalf("Failed to create TLS credentials %v", err)
	}

	// Establish a secure connection to the server.
	conn, err := grpc.Dial("localhost:50600", grpc.WithTransportCredentials(creds))
	if err != nil {
		log.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()

	// Create a new client for the AuthService.
	client := pb.NewAuthServiceClient(conn)

	// Prepare the request data.
	req := &pb.LoginRequest{
		Username: "your_username",
		Password: "1234",
	}

	// Set a timeout for the request.
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	// Call the Login method.
	res, err := client.Login(ctx, req)
	if err != nil {
		log.Fatalf("Failed to login: %v", err)
	}

	// Print the response.
	log.Printf("Access Token: %s", res.AccessToken)
	log.Printf("Refresh Token: %s", res.RefreshToken)
	log.Printf("Expires In: %d", res.Exp)
	log.Printf("Roles: %v", res.Roles)
}
