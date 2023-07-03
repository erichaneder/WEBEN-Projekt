-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 03. Jul 2023 um 18:24
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
  `description` text DEFAULT NULL,
  `category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `articles`
--

INSERT INTO `articles` (`article_id`, `article_sizes`, `article_price`, `article_attributes`, `article_picturepath`, `name`, `description`, `category`) VALUES
(2, 1, 200, 'qwqeqew', '../res/img/fechthelm.png', 'Fechthelm', 'Die Fechtmaske schützt den Kopf und das Gesicht des Fechters vor Verletzungen.', 1),
(3, 1, 220, '2313123', '../res/img/fechtjacke1.png', 'Fechtjacke', 'Die Fechtjacke ist eine spezielle Schutzbekleidung für Fechter.', 1),
(4, 1, 120, '1232112', '../res/img/fechthose1.png', 'Fechthose', 'Die Fechthose ist eine spezielle Hose, die den Fechter vor Verletzungen schützt.', 1),
(5, 1, 189, '345353', '../res/img/saebel1.png', 'Fechtsäbel', 'Der Säbel ist eine Fechtwaffe mit gebogener Klinge und scharfer Schneide.', 2),
(6, 1, 10, 'asdada', '../res/img/schaumstoff1.png', 'Schaumstoff-Säbel', 'Der Schaumstoff-Säbel ist eine sichere und spaßige Alternative zum klassischen Fechtsäbel.', 2),
(7, 1, 30, 'ewerwwwsdw', '../res/img/shirt1.png', 'Funktionsshirt', 'Das atmungsaktive Funktionsshirt sorgt durch seine hohe Funktionalität für ein angenehmes Tragegefühl.', 1),
(8, 1, 45, 'sdsdads', '../res/img/handschuh1.png', 'Handschuhe', 'Fechthandschuhe schützen deine Hände vor Verletzungen und bieten ein besseres Griffgefühl.', 1),
(9, 1, 10, 'sadasdads', '../res/img/socken1.png', 'Fechtsocken', 'Fechtsocken sind spezielle Socken, die einen sicheren Halt im Fechtschuh gewährleisten.', 1),
(10, 1, 60, 'sdasasda', '../res/img/tasche1.png', 'Tasche', 'Die geräumige Fechttasche bietet genug Platz für all dein Equipment.', 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `order_date` date NOT NULL,
  `total_cost` float DEFAULT NULL,
  `product_name` text NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `order_date`, `total_cost`, `product_name`, `quantity`) VALUES
(16, 5, '2023-07-03', 220, 'Fechtjacke', 1),
(17, 5, '2023-07-03', 200, 'Fechthelm', 1),
(18, 5, '2023-07-03', 189, 'Fechtsäbel', 1);

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
(5, 'Eric Haneder', '$2y$10$oGL5uI8TtAIaqpqjbeYfSeUx6H6aXzhR9kbN.AKCcXOz.wDMHJ8he', 'eric.haneder@a1.net', 0, 1, '1234565', 'Baumstraße 10', '2020', 'Hollabrunn', 'Eric Haneder', 'AUT'),
(6, 'Admin', '$2y$10$b9eZpKm8Bd8gBZerjHZSFenOz2jkz6eTNA5KIICfE05U3hXkxYsAG', 'admin@fechtoutlet.at', 1, 1, '1312313', 'Bachgasse 7', '2000', 'Stockerau', 'Admin User', 'AUT');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`article_id`);

--
-- Indizes für die Tabelle `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT für Tabelle `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
