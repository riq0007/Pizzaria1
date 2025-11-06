CREATE TABLE IF NOT EXISTS produtos (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  preco NUMERIC(10,2) NOT NULL
);

INSERT INTO produtos (nome, preco) VALUES
('Margherita', 39.90),
('Calabresa', 44.90)
ON CONFLICT DO NOTHING;


