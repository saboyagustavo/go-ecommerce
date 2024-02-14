FROM golang:alpine AS build  

WORKDIR /usr/src/app  

COPY . .  

RUN go build -o /go/catalog ./cmd/catalog  

FROM scratch  

WORKDIR /usr/src/app

COPY --from=build /go/catalog /catalog  

COPY .env .env 

COPY internal/static/images internal/static

CMD ["/catalog"]