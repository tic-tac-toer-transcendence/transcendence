# Building the backend server
FROM golang:1.26.0 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download && go get -u github.com/gin-gonic/gin@v1.12.0

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=$TARGETARCH \
    go build -o /server ./cmd/server

# Running the backend server
FROM gcr.io/distroless/static-debian12:nonroot

WORKDIR /

COPY --from=builder /server /server

EXPOSE 8080

USER nonroot:nonroot

ENTRYPOINT ["/server"]
