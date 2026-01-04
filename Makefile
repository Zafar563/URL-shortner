export DB_URL=postgres://user:12345678@localhost:5436/url_db?sslmode=disable

migrate-up:
	docker run --rm -v $(PWD)/schema/migrations:/migrations --network host migrate/migrate -path=/migrations/ -database "$(DB_URL)" up

migrate-down:
	docker run --rm -v $(PWD)/schema/migrations:/migrations --network host migrate/migrate -path=/migrations/ -database "$(DB_URL)" down 1

force:
	docker run --rm -v $(PWD)/schema/migrations:/migrations --network host migrate/migrate -path=/migrations/ -database "$(DB_URL)" force 1
