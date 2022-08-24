CREATE TYPE genders AS ENUM('male', 'female');
CREATE TYPE roles AS ENUM('admin', 'user');

CREATE TABLE IF NOT EXISTS users(
  user_id INT GENERATED ALWAYS AS IDENTITY,
  full_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(12) UNIQUE,
  user_image VARCHAR(255),
  gender genders,
  role roles DEFAULT 'user',
  nationality VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(user_id)
);

CREATE TABLE IF NOT EXISTS destination(
  destination_id INT GENERATED ALWAYS AS IDENTITY,
  country VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  airport_name VARCHAR(50),
  destination_image VARCHAR(255),
  PRIMARY KEY(destination_id)
);

CREATE TYPE airline_class AS ENUM('economy', 'business', 'first class');

CREATE TABLE IF NOT EXISTS airlines(
  airline_id INT GENERATED ALWAYS AS IDENTITY,
  airline_code VARCHAR(10),
  airline_name VARCHAR(100) NOT NULL,
  airline_image VARCHAR(255),
  class_category airline_class,
  price_adult INT DEFAULT 0,
  price_child INT DEFAULT 0,
  facilities TEXT[],
  pic VARCHAR(255),
  phone VARCHAR(12) UNIQUE,
  refundable BOOLEAN NOT NULL,
  reschedulable BOOLEAN,
  PRIMARY KEY(airline_id)
);

CREATE TABLE IF NOT EXISTS flight(
  flight_id INT GENERATED ALWAYS AS IDENTITY,
  airline_id INT,
  destination_id INT,
  PRIMARY KEY(flight_id),
  FOREIGN KEY(airline_id) REFERENCES airlines(airline_id),
  FOREIGN KEY(destination_id) REFERENCES destination(destination_id)
);

CREATE TABLE IF NOT EXISTS tickets(
  ticket_id INT GENERATED ALWAYS AS IDENTITY,
  airline_id INT,
  origin VARCHAR(255),
  destination VARCHAR(255),
  departure DATE,
  price INT,
  stock INT,
  PRIMARY KEY(ticket_id),
  FOREIGN KEY(airline_id) REFERENCES airlines(airline_id)
);

CREATE TYPE status_ticket AS ENUM('success', 'waiting', 'failed');

CREATE TABLE IF NOT EXISTS booking(
  booking_id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT,
  airline_id INT,
  ticket_id INT,
  ticket_status status_ticket DEFAULT 'waiting',
  is_used boolean,
  child INT,
  adult INT,
  total_price INT,
  PRIMARY KEY(booking_id),
  FOREIGN KEY(user_id) REFERENCES users(user_id),
  FOREIGN KEY(airline_id) REFERENCES airlines(airline_id),
  FOREIGN KEY(ticket_id) REFERENCES tickets(ticket_id)
);