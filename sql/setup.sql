-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS creatures;

CREATE TABLE creatures (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  species TEXT NOT NULL,
  lifespan TEXT NOT NULL,
  environment TEXT NOT NULL,
  img_url TEXT NOT NULL
);

