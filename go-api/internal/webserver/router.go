package webserver

import (
	"net/http"

	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
)

func NewRouter(handlers map[string]http.Handler) *chi.Mux {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	for path, handler := range handlers {
		r.Mount(path, handler)
	}

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("go-api version 1.0"))
	})

	return r
}
