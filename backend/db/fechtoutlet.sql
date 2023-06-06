-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 06. Jun 2023 um 17:56
-- Server-Version: 10.4.24-MariaDB
-- PHP-Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `fechtoutlet`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `articles`
--

CREATE TABLE `articles` (
  `article_id` int(11) NOT NULL,
  `article_sizes` int(11) NOT NULL COMMENT '"0" stands for no size options, "1" stands for clothes sizes, "2" stands for blade length options (not sure if 2 is gonna be implemented in the scope of the project) ',
  `article_price` double NOT NULL,
  `article_attributes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Json String for all not required attributes that can be skipped',
  `article_picturepath` varchar(100) NOT NULL,
  `name` text DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `articles`
--

INSERT INTO `articles` (`article_id`, `article_sizes`, `article_price`, `article_attributes`, `article_picturepath`, `name`, `description`) VALUES
(1, 1, 9, '{\"Hersteller\": \"Spes\",\"Nummer\": \"1234-5678-9012-3456\",\"Produktbeschreibung\": \"Hier könnte ihre Produktbeschreibung stehen\"}\r\n', '../res/img/fechthelm.png', 'Test', 'Testssadadadadadadadadadadada asdadsadadadasdadad.'),
(2, 1, 10, 'qwqeqew', '../res/img/fechthelm.png', 'Fechthelm', 'Die Fechtmaske schützt den Kopf und das Gesicht des Fechters vor Verletzungen.'),
(3, 1, 10, '2313123', '../res/img/fechtjacke1.png', 'Fechtjacke', 'Die Fechtjacke ist eine spezielle Schutzbekleidung für Fechter.'),
(4, 1, 10, '1232112', '../res/img/fechthose1.png', 'Fechthose', 'Die Fechthose ist eine spezielle Hose, die den Fechter vor Verletzungen schützt.'),
(5, 1, 1, '345353', '../res/img/saebel1.png', 'Fechtsäbel', 'Der Säbel ist eine Fechtwaffe mit gebogener Klinge und scharfer Schneide.'),
(6, 1, 1, 'asdada', '../res/img/schaumstoff1.png', 'Schaumstoff-Säbel', 'Der Schaumstoff-Säbel ist eine sichere und spaßige Alternative zum klassischen Fechtsäbel.'),
(7, 1, 1, 'ewerwwwsdw', '../res/img/shirt1.png', 'Funktionsshirt', 'Das atmungsaktive Funktionsshirt sorgt durch seine hohe Funktionalität für ein angenehmes Tragegefühl.'),
(8, 1, 1, 'sdsdads', '../res/img/handschuh1.png', 'Handschuhe', 'Fechthandschuhe schützen deine Hände vor Verletzungen und bieten ein besseres Griffgefühl.'),
(9, 1, 44, 'sadasdads', '../res/img/socken1.png', 'Fechtsocken', 'Fechtsocken sind spezielle Socken, die einen sicheren Halt im Fechtschuh gewährleisten.'),
(10, 1, 1, 'sdasasda', '../res/img/tasche1.png', 'Tasche', 'Die geräumige Fechttasche bietet genug Platz für all dein Equipment.');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_password` varchar(200) NOT NULL,
  `user_mail` varchar(100) NOT NULL,
  `user_role` int(11) NOT NULL COMMENT '"0" stands for customer, "1" stands for admin',
  `user_status` int(11) NOT NULL COMMENT '"0" stands for inactive, "1" for an active user',
  `user_phone` varchar(30) NOT NULL,
  `user_adress` varchar(50) NOT NULL,
  `user_zipcode` varchar(50) NOT NULL,
  `user_city` varchar(50) NOT NULL,
  `user_billingname` varchar(50) NOT NULL,
  `user_country` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_password`, `user_mail`, `user_role`, `user_status`, `user_phone`, `user_adress`, `user_zipcode`, `user_city`, `user_billingname`, `user_country`) VALUES
(1, 'outlet_admin', '1234', 'wi22b038@technikum-wien.at', 1, 1, '0664/6271166', 'Haasgasse 7', '2120', 'Wolkersdorf', 'Haas David', 'Österreich');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`article_id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `articles`
--
ALTER TABLE `articles`
  MODIFY `article_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
