-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 10, 2016 at 10:36 AM
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
  
    	SET p_nameRand = (select floor(1+rand()*count(*)) from name);
    SET p_lastnameRand = (select floor(1+rand()*count(*)) from lastname);
	SET p_natRand = (select floor(1+rand()*count(*)) from nationality);
	SET p_skinRand = (select floor(1+rand()*count(*)) from skintone);
	SET p_noteRand = (select floor(1+rand()*count(*)) from notes);
    SET p_supplierRand = (select floor(1+rand()*count(*)) from supplier);
    SET p_hairRand = (select floor(1+rand()*count(*)) from hairstyle);
    
    	SET p_noteCount = (select count(*) from notes);
	SET p_noteAmount = (select floor(1+RAND()*5));
    
    	SET issueDate = TIMESTAMPADD(SECOND, FLOOR(RAND() * TIMESTAMPDIFF(SECOND, '2011-01-01 00:00:00', '2016-12-31 00:00:00')), '2011-01-01 00:00:00');
	SET expiryDate = DATE_ADD(issueDate, INTERVAL 5 YEAR);
  
    	concatNotes: LOOP
		SET p1 = p1 + 1;
		if p1 < p_noteAmount THEN
			SET p_noteRand = (select floor(1+rand()*p_noteCount));
			SET p_note = CONCAT(p_note, (select Notes from notes where ID = p_noteRand));
			SET p_note = CONCAT(p_note, ':');
			ITERATE concatNotes;
		END IF;
		LEAVE concatNotes;
	END LOOP concatNotes;
    
        INSERT INTO person (	NameID, 
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
  
		select CONCAT(nam.Name,CONCAT(' ',lst.name)) as Name, nam.Gender, nat.Country, st.SkinTone, p_note as Notes, issueDate, expiryDate, sup.Name as Supplier
	from name nam, Nationality nat, skintone st, lastname lst, supplier sup
	where nam.ID = p_nameRand 
	AND nat.ID = p_natRand
	AND st.ID = p_skinRand
    AND	lst.ID = p_lastnameRand
    AND sup.ID = p_supplierRand;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spValidNatGet` (IN `amount` INT)  BEGIN
	DECLARE natCount INT;
    DECLARE whileCount INT;
    SET natCount = (select count(*) from nationality);
    SET whileCount = 0;
	WHILE whileCount < natCount DO
		SET whileCount = whileCount + 1;
		update nationality
		SET randAssign = floor(1+rand()*1000)
		WHERE ID = whileCount;
	END WHILE;
        
	if amount = 0 then
		select Country,RegionCode 
		from nationality 
		ORDER BY RandAssign;
    ELSE
		select Country,RegionCode 
		from nationality 
		ORDER BY RandAssign
		LIMIT amount;
	END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spValidTicketGet` (IN `amount` INT)  BEGIN
	DECLARE natCount INT;
    DECLARE whileCount INT;
    SET natCount = (select count(*) from supplier);
    SET whileCount = 0;
	WHILE whileCount < natCount DO
		SET whileCount = whileCount + 1;
		update supplier
		SET randAssign = floor(1+rand()*1000)
		WHERE ID = whileCount;
	END WHILE;
        
	if amount = 0 then
		select Name,RegionCode 
		from supplier 
		ORDER BY RandAssign;
	ELSE 
		select Name,RegionCode 
		from supplier 
		ORDER BY RandAssign
		LIMIT amount;
    end if;
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
(1, 'Great Britain', 'gb', 785),
(2, 'France', 'fr', 183),
(3, 'Germany', 'de', 560);

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
(1, 9, 11, 1, 1, 1, 1, 'test note 5:test 3:', '2012-07-03 05:40:23', '2017-07-03 05:40:23');

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
(1, 'AsiaAir', 'hk', 558),
(2, 'China Air', 'cn', 518),
(3, 'Qantas', 'gb', 917),
(4, 'British Airways	 ', 'fr', 32),
(5, 'easyJet', 'de', 409),
(6, 'Alitalia', 'gb', 946),
(7, 'Iberia Group', 'gb', 502),
(8, 'Norwegian Air Shuttle', 'fr', 671),
(9, 'el plano', 'de', 849),
(10, 'Air Berlin Group', 'de', 231),
(11, 'Air France KLM', 'fr', 610);

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
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
