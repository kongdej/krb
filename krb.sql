# ************************************************************
# Database: <DB>
# Generation Time: 2021-08-25 15:01:15 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table rb
# ------------------------------------------------------------

CREATE TABLE `rb` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cat` varchar(100) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `content` mediumtext DEFAULT NULL,
  `keyword` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `modified` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  FULLTEXT KEY `filename` (`filename`,`content`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table rb_logs
# ------------------------------------------------------------

CREATE TABLE `rb_logs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `keysearch` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `category` varchar(100) DEFAULT NULL,
  `result` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `empn` (`keysearch`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table rb_users
# ------------------------------------------------------------

CREATE TABLE `rb_users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `empn` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `role` char(10) NOT NULL DEFAULT 'user',
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `enabled` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table rb_views
# ------------------------------------------------------------

CREATE TABLE `rb_views` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` varchar(100) DEFAULT NULL,
  `did` int(11) DEFAULT NULL,
  `modified` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
