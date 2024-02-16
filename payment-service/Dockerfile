FROM golang:alpine AS build  

WORKDIR /usr/src/app  

COPY . .  

RUN go build -o /go/payment ./cmd/payment  

FROM scratch  

WORKDIR /usr/src/app

COPY --from=build /go/payment /payment  

COPY .env .env 

CMD ["/payment"]