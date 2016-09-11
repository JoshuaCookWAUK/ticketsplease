-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 11, 2016 at 11:53 PM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ticketsplease`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `spPersonGet` ()  NO SQL
BEGIN

	

	DECLARE 	p_nameRand 		INT;
    DECLARE 	p_lastnameRand	INT;
	DECLARE  	p_natRand 		INT;
	DECLARE  	p_skinRand 		INT;
    DECLARE		p_supplierRand  INT;
    DECLARE		p_hairRand		INT;
	DECLARE		p_note			varchar(520) DEFAULT '';
	DECLARE   	p_noteRand 		INT;
	DECLARE   	p_noteCount		INT;
	DECLARE 	p_noteAmount 	INT;
	DECLARE   	p1				INT DEFAULT 0;
	DECLARE		issueDate		DateTime;
	DECLARE   	expiryDate		DateTime;
  
		SET p_nameRand =	(	SELECT	floor(1+rand()*count(*)) 
							FROM 	name);
    SET p_lastnameRand =(	SELECT 	floor(1+rand()*count(*)) 
							FROM 	lastname);
	SET p_natRand = 	(	SELECT 	floor(1+rand()*count(*)) 
							FROM 	nationality);
	SET p_skinRand = 	(	SELECT 	floor(1+rand()*count(*)) 
							FROM 	skintone);
	SET p_noteRand = 	(	SELECT 	floor(1+rand()*count(*)) 
							FROM 	notes);
    SET p_supplierRand =(	SELECT 	floor(1+rand()*count(*)) 
							FROM 	supplier);
    SET p_hairRand = 	(	SELECT 	floor(1+rand()*count(*)) 
							FROM 	hairstyle);
                            
		SET p_noteCount = 	(	SELECT 	count(*) 
							FROM 	notes);
	SET p_noteAmount = 	(	SELECT 	floor(1+RAND()*5));
    
    	SET issueDate = 	TIMESTAMPADD(SECOND
									, FLOOR(RAND() * TIMESTAMPDIFF(SECOND
																   , '2011-01-01 00:00:00', '2016-12-31 00:00:00'))
									, '2011-01-01 00:00:00');
	SET expiryDate = 	DATE_ADD(issueDate
								, INTERVAL 5 YEAR);
  
		concatNotes: LOOP
		SET p1 = p1 + 1;
		if p1 < p_noteAmount 	THEN
			SET p_noteRand = 	(SELECT floor(1+rand()*p_noteCount));
			SET p_note = 		CONCAT(p_note, (SELECT Notes 
												FROM notes 
												WHERE ID = p_noteRand));
			SET p_note = 		CONCAT(p_note, ':');
			ITERATE concatNotes;
		END IF;
		LEAVE concatNotes;
	END LOOP concatNotes;
    
    	INSERT INTO person (NameID, 
						lastnameID, 
						NationalityID, 
						SkinToneID, 
						HairID, 
						SupplierID, 
						Notes, 
						IssueDate, 
						ExpiryDate
	)VALUES (p_nameRand , 
			p_lastnameRand, 
            p_natRand, 
            p_skinRand, 
            p_hairRand, 
            p_supplierRand, 
            p_note, 
            issueDate, 
            expiryDate);
  
		
	SELECT 	CONCAT(nam.Name,CONCAT(' ',lst.name)) as Name, 
			nam.Gender, 
            nat.Country, 
            nat.RegionCode as natRegionCode, 
            st.SkinTone, 
            p_note as Notes, 
            issueDate, 
            expiryDate, 
            sup.Name as Supplier, 
            sup.RegionCode
	FROM 	name nam, 
			Nationality nat, 
            skintone st, 
            lastname lst, 
            supplier sup
	WHERE 	nam.ID = p_nameRand 
	AND 	nat.ID = p_natRand
	AND 	st.ID = p_skinRand
    AND		lst.ID = p_lastnameRand
    AND 	sup.ID = p_supplierRand;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spReqGet` ()  BEGIN

	

		DECLARE 	p_nameRand 		INT;
    DECLARE 	p_lastnameRand	INT;
    
    	DECLARE 	natCount 		INT;
    
        DECLARE 	whileCount 		INT;
		
    SET 		natCount = (		SELECT count(*) 
									FROM supplier);
	SET			p_nameRand = (		SELECT floor(1+rand()*count(*)) 
									FROM name);
    SET 		p_lastnameRand = (	SELECT floor(1+rand()*count(*)) 
									FROM lastname);
    
	SET 	whileCount = 0;
	WHILE 	whileCount < natCount DO
		SET 	whileCount = whileCount + 1;
		UPDATE 	supplier
		SET 	randAssign = floor(1+rand()*1000)
		WHERE 	ID = whileCount;
	END WHILE;
        
		SELECT 	s.Name as SupplierName,
			s.RegionCode as RegionCode,
            CONCAT(nam.Name,CONCAT(' ',lst.name)) as PersonName
	FROM	supplier s, 
			name nam, 
            lastname lst
    WHERE 	nam.ID = p_nameRand 
    AND 	lst.ID = p_lastnameRand
	ORDER BY s.RandAssign
    LIMIT 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spValidNatGet` (IN `amount` INT)  BEGIN
	
	DECLARE 	natCount INT;
    DECLARE 	whileCount INT;
    
        SET 	natCount = (SELECT count(*) 
						FROM nationality);
    SET 	whileCount = 0;
	WHILE 	whileCount < natCount DO
		SET 	whileCount = whileCount + 1;
		UPDATE 	nationality
		SET 	randAssign = floor(1+rand()*1000)
		WHERE 	ID = whileCount;
	END WHILE;
        
	
	IF amount = 0 then
		SELECT 	Country,RegionCode 
		FROM 	nationality 
		ORDER BY RandAssign;
    ELSE
		SELECT 	Country,RegionCode 
		FROM 	nationality 
		ORDER BY RandAssign
		LIMIT 	amount;
	END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spValidTicketGet` (IN `amount` INT)  BEGIN
	
	DECLARE natCount INT;
    DECLARE whileCount INT;
    
        SET 	natCount = (	SELECT 	count(*) 
							FROM 	supplier);
                            
	    SET 	whileCount = 0;
	WHILE 	whileCount < natCount DO
		SET 	whileCount = whileCount + 1;
		UPDATE 	supplier
		SET 	randAssign = floor(1+rand()*1000)
		WHERE 	ID = whileCount;
	END WHILE;
        
			IF amount = 0 THEN
		SELECT 	Name,RegionCode 
		FROM 	supplier 
		ORDER BY RandAssign;
	ELSE 
		SELECT 	Name,RegionCode 
		FROM 	supplier 
		ORDER BY RandAssign
		LIMIT 	amount;
    end IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `hairstyle`
--

CREATE TABLE `hairstyle` (
  `ID` int(11) NOT NULL,
  `Colour` varchar(100) NOT NULL,
  `style` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hairstyle`
--

INSERT INTO `hairstyle` (`ID`, `Colour`, `style`) VALUES
(1, 'brown', 'buzzcut');

-- --------------------------------------------------------

--
-- Table structure for table `lastname`
--

CREATE TABLE `lastname` (
  `ID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lastname`
--

INSERT INTO `lastname` (`ID`, `name`) VALUES
(1, 'Flaherty'),
(2, 'Boorer'),
(3, 'Cook'),
(4, 'Johnson'),
(5, 'Smith'),
(6, 'Williams'),
(7, 'Jones'),
(8, 'Brown'),
(9, 'Davis'),
(10, 'Miller'),
(11, 'Wilson'),
(12, 'Moore'),
(13, 'Taylor'),
(14, 'Johnson'),
(15, 'Smith'),
(16, 'Williams'),
(17, 'Jones'),
(18, 'Brown'),
(19, 'Davis'),
(20, 'Miller'),
(21, 'Wilson'),
(22, 'Moore'),
(23, 'Taylor');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `ID` int(11) NOT NULL,
  `UserName` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `HighScore` int(11) NOT NULL DEFAULT '0',
  `Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `name`
--

CREATE TABLE `name` (
  `Name` varchar(100) NOT NULL,
  `Gender` varchar(20) DEFAULT NULL,
  `ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `name`
--

INSERT INTO `name` (`Name`, `Gender`, `ID`) VALUES
('Lee', 'Male', 1),
('Joshua', 'Male', 2),
('Aubrey', 'Male', 3),
('James', 'Male', 4),
('Mary', 'Female', 5),
('John', 'Male', 6),
('Patricia', 'Female', 7),
('Robert', 'Male', 8),
('Linda', 'Female', 9),
('Michael', 'Male', 10),
('Barbara', 'Female', 11),
('William', 'Male', 12);

-- --------------------------------------------------------

--
-- Table structure for table `nationality`
--

CREATE TABLE `nationality` (
  `ID` int(11) NOT NULL,
  `Country` varchar(100) NOT NULL,
  `RegionCode` varchar(4) NOT NULL,
  `RandAssign` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `nationality`
--

INSERT INTO `nationality` (`ID`, `Country`, `RegionCode`, `RandAssign`) VALUES
(1, 'Great Britain', 'gb', 780),
(2, 'France', 'fr', 741),
(3, 'Germany', 'de', 363),
(4, 'Netherlands', 'nl', 591),
(5, 'South Africa', 'za', 867),
(6, 'Spain', 'esp', 563);

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `ID` int(11) NOT NULL,
  `Notes` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`ID`, `Notes`) VALUES
(1, 'test note 1'),
(2, 'test note 2'),
(3, 'test 3'),
(4, 'test 4'),
(5, 'test note 5');

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `ID` int(11) NOT NULL,
  `NameID` int(11) NOT NULL,
  `lastnameID` int(11) NOT NULL,
  `NationalityID` int(11) DEFAULT NULL,
  `SkinToneID` int(11) NOT NULL,
  `HairID` int(11) NOT NULL,
  `SupplierID` int(11) NOT NULL,
  `Notes` varchar(520) NOT NULL,
  `IssueDate` datetime NOT NULL,
  `ExpiryDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`ID`, `NameID`, `lastnameID`, `NationalityID`, `SkinToneID`, `HairID`, `SupplierID`, `Notes`, `IssueDate`, `ExpiryDate`) VALUES
(1, 11, 6, 2, 2, 1, 8, 'test 4:test note 1:', '2011-06-25 03:02:00', '2016-06-25 03:02:00'),
(2, 9, 19, 3, 2, 1, 5, 'test 3:test 3:test 4:test note 2:', '2011-06-17 00:42:51', '2016-06-17 00:42:51'),
(3, 7, 19, 2, 2, 1, 6, '', '2012-03-14 20:50:47', '2017-03-14 20:50:47'),
(4, 7, 17, 3, 2, 1, 5, 'test note 5:test 4:', '2016-03-16 06:10:00', '2021-03-16 06:10:00'),
(5, 2, 19, 3, 1, 1, 6, 'test 4:test 4:test note 1:', '2015-07-11 14:55:08', '2020-07-11 14:55:08'),
(6, 3, 19, 2, 2, 1, 11, 'test 4:test note 5:test note 1:test 3:', '2011-03-18 18:46:01', '2016-03-18 18:46:01'),
(7, 12, 8, 3, 2, 1, 6, 'test note 1:', '2016-09-11 14:52:50', '2021-09-11 14:52:50'),
(8, 7, 6, 3, 1, 1, 2, '', '2016-12-05 00:29:24', '2021-12-05 00:29:24'),
(9, 9, 8, 3, 2, 1, 10, 'test note 1:test 4:', '2011-08-03 01:50:40', '2016-08-03 01:50:40'),
(10, 7, 6, 2, 2, 1, 5, '', '2012-04-29 18:55:13', '2017-04-29 18:55:13'),
(11, 6, 19, 4, 1, 1, 2, '', '2012-10-27 16:54:53', '2017-10-27 16:54:53'),
(12, 2, 6, 4, 1, 1, 4, 'test 3:test note 5:test 3:', '2013-12-12 06:08:05', '2018-12-12 06:08:05'),
(13, 11, 21, 4, 2, 1, 1, 'test note 5:', '2014-01-02 22:02:57', '2019-01-02 22:02:57'),
(14, 1, 20, 1, 1, 1, 3, '', '2013-11-30 22:03:53', '2018-11-30 22:03:53'),
(15, 4, 15, 2, 2, 1, 4, '', '2013-03-19 06:03:59', '2018-03-19 06:03:59'),
(16, 11, 3, 4, 2, 1, 1, 'test note 5:test note 1:test 3:', '2014-09-07 19:35:39', '2019-09-07 19:35:39'),
(17, 12, 1, 2, 2, 1, 11, 'test note 5:test note 2:test 4:test note 2:', '2014-02-11 02:44:02', '2019-02-11 02:44:02'),
(18, 4, 5, 1, 2, 1, 1, 'test note 1:test note 5:test note 2:', '2014-07-14 07:40:07', '2019-07-14 07:40:07'),
(19, 9, 12, 3, 1, 1, 5, '', '2011-02-22 17:16:14', '2016-02-22 17:16:14'),
(20, 4, 12, 4, 1, 1, 3, 'test note 2:', '2016-04-21 10:57:57', '2021-04-21 10:57:57'),
(21, 6, 15, 6, 1, 1, 8, 'test note 1:test 3:test note 1:', '2013-06-25 01:09:27', '2018-06-25 01:09:27'),
(22, 7, 12, 5, 1, 1, 7, 'test note 5:test 3:', '2016-04-07 09:15:47', '2021-04-07 09:15:47'),
(23, 12, 23, 6, 2, 1, 8, 'test note 5:test note 2:test note 1:test 4:', '2016-06-11 03:17:10', '2021-06-11 03:17:10');

-- --------------------------------------------------------

--
-- Table structure for table `skintone`
--

CREATE TABLE `skintone` (
  `ID` int(11) NOT NULL,
  `SkinTone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `skintone`
--

INSERT INTO `skintone` (`ID`, `SkinTone`) VALUES
(1, 'White'),
(2, 'Black');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `RegionCode` varchar(3) NOT NULL,
  `RandAssign` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`ID`, `Name`, `RegionCode`, `RandAssign`) VALUES
(1, 'difficultJet ', 'gb', 256),
(2, 'DavidAir', 'roi', 182),
(3, 'HongKongCO2', 'hk', 143),
(4, 'El Plane-o ', 'esp', 168),
(5, 'Aer Cunni Lingus ', 'roi', 412),
(6, 'Joshua Cook', 'gb', 557),
(7, 'WebAppsAir ', 'gb', 545),
(8, 'BravoTwoZero ', 'us', 53),
(9, 'LiftHamza ', 'de', 630),
(10, 'Sacre Bleu', 'fr', 990),
(11, 'Air France', 'fr', 58);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hairstyle`
--
ALTER TABLE `hairstyle`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `lastname`
--
ALTER TABLE `lastname`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `name`
--
ALTER TABLE `name`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `nationality`
--
ALTER TABLE `nationality`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `skintone`
--
ALTER TABLE `skintone`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hairstyle`
--
ALTER TABLE `hairstyle`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `lastname`
--
ALTER TABLE `lastname`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `name`
--
ALTER TABLE `name`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `nationality`
--
ALTER TABLE `nationality`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `skintone`
--
ALTER TABLE `skintone`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
