CREATE TABLE IF NOT EXISTS carts (
	id uuid PRIMARY KEY,
	user_id uuid NOT NULL,
	created_at date NOT NULL DEFAULT NOW(),
	updated_at date NOT NULL DEFAULT NOW(),
	status cart_status NOT NULL DEFAULT 'OPEN'
);

CREATE TABLE IF NOT EXISTS orders (
	id uuid PRIMARY KEY,
	user_id uuid NOT NULL,
	cart_id uuid REFERENCES carts (id) ON DELETE CASCADE,
	payment json,
	delivery json,
	comments varchar(200),
	total integer NOT null,
	status varchar(200)
);

CREATE TABLE IF NOT EXISTS cart_items (
	cart_id uuid REFERENCES carts (id) ON DELETE CASCADE,
	product_id uuid NOT NULL,
	"count" integer NOT NULL
);

INSERT INTO carts VALUES 
('d17ae096-e610-442d-b358-7a6ef39c2d20', '0339f8b7-79d4-4870-bd10-875cc9a9efbe', '2023-03-29', '2023-03-30', 'OPEN');

INSERT INTO orders VALUES 
('f97e3fcb-f691-4056-98f4-9f5eb13c83f4', '0339f8b7-79d4-4870-bd10-875cc9a9efbe', 'd17ae096-e610-442d-b358-7a6ef39c2d20', NULL, NULL, 'test', '300', 'OPEN');

INSERT INTO cart_items VALUES 
('d17ae096-e610-442d-b358-7a6ef39c2d20', '58de9b38-7cab-41ea-9661-e77019f90264', 2),
('d17ae096-e610-442d-b358-7a6ef39c2d20', 'cf18016b-aee4-43db-8540-91c5fd0ea591', 3);
