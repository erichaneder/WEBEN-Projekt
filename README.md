# WEBEN-Projekt


Es wurde ein extra User erstellt der uneingeschränkten Zugang zur Datenbank hat (Die Zugangsdaten sind in der Datenbankuser.md Datei zu sehen):

CREATE USER 'fechtoutlet'@'localhost' IDENTIFIED VIA mysql_native_password USING '***';GRANT ALL PRIVILEGES ON *.* TO 'fechtoutlet'@'localhost' REQUIRE NONE WITH GRANT OPTION MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;

GRANT ALL PRIVILEGES ON `fechtoutlet`.* TO 'fechtoutlet'@'localhost';

Github Link: https://github.com/erichaneder/WEBEN-Projekt

Auszug der DB befindet sich in backend/db/fechtoutlet.sql

Trollo Link (zu unserem Kanban Board) https://trello.com/b/EEad5QXu/weben