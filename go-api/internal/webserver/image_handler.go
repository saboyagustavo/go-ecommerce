package webserver

import (
	"errors"
	"io"
	"mime/multipart"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/saboyagustavo/go-ecommerce/internal/service"
)

type WebImageHandler struct {
	ImageService *service.ImageService
}

func NewWebImageHandler(imageService *service.ImageService) *WebImageHandler {
	return &WebImageHandler{ImageService: imageService}
}

func (wih *WebImageHandler) UploadImage(w http.ResponseWriter, r *http.Request) (string, error) {
	// Parse form data to get the uploaded image file
	owner := r.FormValue("imageOwner")

	if owner == "" {
		return "", errors.New("imageOwner is a required fields")
	}

	err := r.ParseMultipartForm(10 << 20) // 10 MB limit
	if err != nil {
		return "", err
	}

	form := r.MultipartForm
	files := form.File["image"]

	if len(files) == 0 {
		return "", errors.New("image file is required")
	}

	// Assuming only one image is uploaded for simplicity
	imageFile := files[0]
	file, err := imageFile.Open()
	if err != nil {
		return "", err
	}

	defer file.Close()

	// Validate image format
	err = validateImageFormat(file)
	if err != nil {
		return "", err
	}

	fileBytes, err := io.ReadAll(file)
	if err != nil {
		return "", err
	}

	// Assuming imageFile has "name" and "owner" fields
	image, err := wih.ImageService.CreateImage(imageFile.Filename, owner, fileBytes)

	if err != nil {
		return "", err
	}

	return image.ID, nil
}

func validateImageFormat(file multipart.File) error {
	// Read the first bytes to detect image type
	buffer := make([]byte, 512)
	_, err := file.Read(buffer)
	if err != nil {
		return err
	}

	// Reset the file cursor back to start
	_, err = file.Seek(0, 0)
	if err != nil {
		return err
	}

	mimeType := http.DetectContentType(buffer)

	// Check if MIME type is a valid image format
	switch mimeType {
	case "image/jpeg", "image/png", "image/gif":
		return nil
	default:
		return errors.New("invalid image format")
	}
}

func (wih *WebImageHandler) GetImage(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if id == "" {
		http.Error(w, "id is required", http.StatusBadRequest)
		return
	}

	buf, err := wih.ImageService.GetImage(id)

	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "image/png")
	w.Write(buf)
}

func (wih *WebImageHandler) GetRouter() http.Handler {
	r := chi.NewRouter()

	r.Get("/{id}", wih.GetImage)

	return r
}
