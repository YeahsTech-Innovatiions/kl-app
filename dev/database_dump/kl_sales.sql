-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: kl
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Pid` text,
  `Cid` text,
  `Name` varchar(255) DEFAULT NULL,
  `Qty` bigint DEFAULT NULL,
  `Unit` bigint DEFAULT NULL,
  `Total` double DEFAULT NULL,
  `Table` varchar(255) DEFAULT NULL,
  `Server` varchar(255) DEFAULT NULL,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Status` varchar(255) DEFAULT 'NOTCLEARED',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (14,'51','Bar','MONSTER',2,2000,4000,'Table','Seyi','2024-01-04 12:56:38','CLEARED'),(15,'82','Grill','ASUN',2,2500,5000,'Table','Seyi','2024-01-04 12:56:38','CLEARED'),(16,'10','bar','CAMINO',2,30000,60000,'Table','Temitope','2024-01-04 12:56:38','CLEARED'),(17,'51','Bar','MONSTER',2,2000,4000,'Table','Temitope','2024-01-04 14:01:31','CLEARED'),(18,'82','Grill','ASUN',2,2500,5000,'Table','Temitope','2024-01-04 14:01:31','CLEARED'),(19,'10','bar','CAMINO',2,30000,60000,'Table','Temitope','2024-01-04 14:01:31','CLEARED'),(20,'51','Bar','MONSTER',2,2000,4000,'Table','Temitope','2024-01-04 14:07:19','CLEARED'),(21,'82','Grill','ASUN',2,2500,5000,'Table','Temitope','2024-01-04 14:07:19','CLEARED'),(22,'10','bar','CAMINO',2,30000,60000,'Table','Temitope','2024-01-04 14:07:19','CLEARED'),(23,'82','Grill','ASUN',2,2500,5000,'Table','Temitope','2024-01-04 14:08:35','CLEARED'),(24,'51','Bar','MONSTER',2,2000,4000,'Table','Temitope','2024-01-04 14:08:35','CLEARED'),(25,'10','bar','CAMINO',2,30000,60000,'Table','Temitope','2024-01-04 14:08:35','CLEARED'),(26,'82','Grill','ASUN',2,2500,5000,'Table','Temitope','2024-01-04 14:10:02','CLEARED'),(27,'51','Bar','MONSTER',2,2000,4000,'Table','Temitope','2024-01-04 14:10:02','CLEARED'),(28,'10','bar','CAMINO',2,30000,60000,'Table','Temitope','2024-01-04 14:10:02','CLEARED'),(29,'51','Bar','MONSTER',2,2000,4000,'Table','Temitope','2024-01-04 14:10:27','CLEARED'),(30,'10','bar','CAMINO',2,30000,60000,'Table','Temitope','2024-01-04 14:10:27','CLEARED'),(31,'82','Grill','ASUN',2,2500,5000,'Table','Temitope','2024-01-04 14:10:27','CLEARED'),(32,'51','Bar','MONSTER',2,2000,4000,'Table','Temitope','2024-01-04 14:11:53','CLEARED'),(33,'82','Grill','ASUN',2,2500,5000,'Table','Temitope','2024-01-04 14:11:53','CLEARED'),(34,'10','bar','CAMINO',2,30000,60000,'Table','Temitope','2024-01-04 14:11:53','CLEARED'),(35,'51','Bar','MONSTER',2,2000,4000,'Table','Temitope','2024-01-04 14:11:53','CLEARED'),(36,'82','Grill','ASUN',2,2500,5000,'Table','Temitope','2024-01-04 14:11:53','CLEARED'),(37,'10','bar','CAMINO',2,30000,60000,'Table','Temitope','2024-01-04 14:11:53','CLEARED'),(38,'51','Bar','MONSTER',2,2000,4000,'Table','Temitope','2024-01-04 14:11:58','CLEARED'),(39,'82','Grill','ASUN',2,2500,5000,'Table','Temitope','2024-01-04 14:11:58','CLEARED'),(40,'10','bar','CAMINO',2,30000,60000,'Table','Temitope','2024-01-04 14:11:58','CLEARED'),(41,'51','Bar','MONSTER',2,2000,4000,'Table','Temitope','2024-01-04 14:12:53','CLEARED'),(42,'82','Grill','ASUN',2,2500,5000,'Table','Temitope','2024-01-04 14:12:53','CLEARED'),(43,'10','bar','CAMINO',2,30000,60000,'Table','Temitope','2024-01-04 14:12:53','CLEARED'),(44,'51','Bar','MONSTER',2,2000,4000,'Table','Temitope','2024-01-04 14:13:13','CLEARED'),(45,'82','Grill','ASUN',2,2500,5000,'Table','Temitope','2024-01-04 14:13:13','CLEARED'),(46,'10','bar','CAMINO',2,30000,60000,'Table','Temitope','2024-01-04 14:13:13','CLEARED'),(47,'7','bar','OLMECA',1,35000,35000,'Table','Temitope','2024-01-04 15:42:23','CLEARED'),(48,'7','bar','OLMECA',1,35000,35000,'Table4Z','Temitope','2024-01-04 15:43:45','CLEARED'),(49,'13','Bar','DESPERADOS',1,800,800,'Table4E','Temitope','2024-01-04 15:49:52','CLEARED'),(50,'13','Bar','DESPERADOS',1,800,800,'Table4E','Temitope','2024-01-04 15:55:19','CLEARED'),(51,'10','bar','CAMINO',1,30000,30000,'Table4E','Temitope','2024-01-04 15:58:21','CLEARED'),(52,'6','bar','OLMECA',1,35000,35000,'Table4E','Temitope','2024-01-04 15:59:08','CLEARED'),(53,'10','bar','CAMINO',1,30000,30000,'Table4E','Temitope','2024-01-04 16:01:20','CLEARED'),(54,'7','bar','OLMECA',1,35000,35000,'Table4E','Temitope','2024-01-04 16:02:42','CLEARED'),(55,'10','bar','CAMINO',1,30000,30000,'Table4E','Temitope','2024-01-04 16:03:21','CLEARED'),(56,'9','bar','AZUL',1,280000,280000,'Table3O','Temitope','2024-01-04 16:04:41','CLEARED'),(57,'7','bar','OLMECA',1,35000,35000,'Table2A','Temitope','2024-01-04 16:05:49','CLEARED'),(58,'6','bar','OLMECA',1,35000,35000,'Table7V','Temitope','2024-01-04 16:06:55','CLEARED'),(59,'7','bar','OLMECA',1,35000,35000,'Table7V','Temitope','2024-01-04 16:11:43','CLEARED'),(60,'10','bar','CAMINO',1,30000,30000,'Table7V','Temitope','2024-01-04 16:11:43','CLEARED'),(61,'7','bar','OLMECA',1,35000,35000,'Table2K','Temitope','2024-01-06 18:28:22','CLEARED'),(62,'10','bar','CAMINO',1,30000,30000,'Table2K','Temitope','2024-01-06 18:28:22','CLEARED'),(63,'106','Kitchen','ASSORTED PEPPER SOUP',6,3000,18000,'Table3P','Temitope','2024-01-08 00:14:02','CLEARED'),(64,'27','Bar','4TH STREET',4,15000,60000,'Table3V','Temitope','2024-01-08 00:20:26','CLEARED'),(65,'134','Kitchen','AMALA',3,1000,3000,'Table3V','Temitope','2024-01-08 00:20:26','CLEARED'),(66,'32','Bar','33',3,800,2400,'Table6B','Temitope','2024-01-08 04:00:58','CLEARED'),(67,'75','Bar','ANDRE ROSE',1,15000,15000,'Table6B','Temitope','2024-01-08 04:00:58','CLEARED'),(68,'107','Kitchen','CATFISH PEPPER SOUP (1/2)',2,3500,7000,'Table6B','Temitope','2024-01-08 04:00:58','CLEARED'),(69,'113','Kitchen','BEEF BURGER & CHIPS',1,5000,5000,'Table6B','Temitope','2024-01-08 04:00:58','CLEARED'),(70,'87','Kitchen','JOLLOF RICE',1,1500,1500,'Table6B','Temitope','2024-01-08 04:00:58','CLEARED'),(71,'27','Bar','4TH STREET',1,15000,15000,'Table4Q','Temitope','2024-01-08 16:05:41','CLEARED'),(72,'134','Kitchen','AMALA',1,1000,1000,'Table4Q','Temitope','2024-01-08 16:05:41','CLEARED'),(73,'134','Kitchen','AMALA',1,1000,1000,'Table4Z','Temitope','2024-01-08 16:07:03','CLEARED');
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-09 18:37:25
