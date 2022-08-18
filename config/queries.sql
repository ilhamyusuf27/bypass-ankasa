INSERT INTO airlines(airline_code, airline_name, class_category, price_adult, price_child, facilities, refundable, reschedulable)
VALUES ('KG-323', 'Lion Air', 'economy', 250000, 100000, Array['facility 1', 'facility 2'], true, true);

INSERT INTO destination(country, city, airport_name, destination_image) 
VALUES
('Indonesia', 'Kupang', 'El Tari', null),
('Indonesia', 'Jakarta', 'Soekarno-Hata', null),
('Indonesia', 'Bandung', 'Bandung Airport', null)
;



INSERT INTO flight (airline_id, destination_id)