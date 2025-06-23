FROM golang:1.23.4-alpine3.22 AS builder
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o voiceapi cmd/api/main.go

FROM alpine:3.22
RUN apk update && apk upgrade && apk add --no-cache ca-certificates
WORKDIR /root/

COPY --from=builder /app/voiceapi .

CMD ["./voiceapi"]
