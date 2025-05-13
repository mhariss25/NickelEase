package main

import (
	"NickelEase/routes"
	"log"
	"net/http"
)

func main() {
	router := routes.SetupRoutes()

	log.Println("Server started on :8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}
