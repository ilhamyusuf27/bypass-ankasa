SELECT booking.ticket_id, booking.user_id, tickets.ticket_id, destination.* FROM booking LEFT JOIN tickets ON booking.ticket_id = tickets.ticket_id LEFT JOIN destination ON tickets.destination = destination.city;

SELECT booking.ticket_id, COUNT(*), destination.country, destination.city, destination.destination_image FROM booking LEFT JOIN tickets ON booking.ticket_id = tickets.ticket_id LEFT JOIN destination ON tickets.destination = destination.city GROUP BY booking.ticket_id ,destination.country, destination.city, destination.destination_image ORDER BY COUNT(*) DESC LIMIT 5;

