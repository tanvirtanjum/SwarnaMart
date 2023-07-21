-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 21, 2023 at 09:15 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `businessdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `cartitems`
--

CREATE TABLE `cartitems` (
  `CartItemId` int(11) NOT NULL,
  `Product` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `CartRef` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cartitems`
--

INSERT INTO `cartitems` (`CartItemId`, `Product`, `Quantity`, `CartRef`) VALUES
(7, 34, 4, 5),
(8, 35, 1, 5),
(9, 42, 1, 5),
(10, 34, 1, 6),
(11, 34, 1, 12),
(12, 42, 2, 12),
(13, 44, 2, 12),
(14, 45, 10, 13),
(15, 38, 25, 13),
(17, 34, 6, 14),
(18, 35, 1, 14),
(19, 34, 3, 15),
(20, 35, 2, 15),
(21, 46, 4, 15),
(22, 34, 2, 16);

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `CartId` int(11) NOT NULL,
  `CartCode` varchar(250) DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CartStatus` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`CartId`, `CartCode`, `CreatedBy`, `CartStatus`) VALUES
(5, 'SM-1669768165260-6', 6, 1),
(6, 'SM-1689768195292-6', 6, 1),
(11, 'SM-1689769023561-6', 6, 0),
(12, 'SM-1689781998094-7', 7, 1),
(13, 'SM-1689782292608-7', 7, 1),
(14, 'SM-1689782708980-7', 7, 1),
(15, 'SM-1689826065126-7', 7, 1),
(16, 'SM-1689826347821-7', 7, 1),
(17, 'SM-1689929924080-7', 7, 0);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `OrderId` int(11) NOT NULL,
  `Customer` int(11) DEFAULT NULL,
  `Cart` int(11) DEFAULT NULL,
  `Deliveryman` int(11) DEFAULT NULL,
  `OrderDate` date DEFAULT NULL,
  `DeliveryDate` date DEFAULT NULL,
  `ApprovedBy` int(11) DEFAULT NULL,
  `Status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`OrderId`, `Customer`, `Cart`, `Deliveryman`, `OrderDate`, `DeliveryDate`, `ApprovedBy`, `Status`) VALUES
(1, 6, 5, 8, '2023-07-19', '2023-07-21', 5, 2),
(2, 6, 6, 8, '2023-07-19', '2023-07-21', 5, 2),
(3, 7, 12, 8, '2023-07-19', '0000-00-00', 5, -1),
(4, 7, 13, 8, '2023-07-19', '2023-07-21', 5, 2),
(5, 7, 14, 0, '2023-07-20', '0000-00-00', 0, -1),
(6, 7, 15, 0, '2023-07-20', '0000-00-00', 0, -1),
(7, 7, 16, 0, '2023-07-21', '0000-00-00', 0, -1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ProductId` int(11) NOT NULL,
  `Title` varchar(250) DEFAULT NULL,
  `ImagePath` varchar(255) DEFAULT NULL,
  `Description` longtext DEFAULT NULL,
  `UnitPrice` float DEFAULT NULL,
  `IsStock` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductId`, `Title`, `ImagePath`, `Description`, `UnitPrice`, `IsStock`) VALUES
(33, 'Premium Jamdani 1', 'uploads\\1687838810557-92639794-Standard_Saree_SR-1084_291_3.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1235, 0),
(34, 'Premium Jamdani 2', 'uploads\\1687775117253-332803179-31888-201855-saree-aarong-726987-667-thumbnail-1080x1080-70.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1725, 1),
(35, 'Tangail Tat', 'uploads\\1687849099357-535527316-219e39a7e99a67fca3af5c0753ecb9b0.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1090, 1),
(36, 'Tangaile Silk Jamdani', 'uploads\\1687849182454-884604989-0f9319a0379e06a46503d71eeb1fd533.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 810, 1),
(37, 'Dhakaia Jamdani', 'uploads\\1687849241459-932355824-Standard_Saree_SR-1084_291_3.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 434, 1),
(38, 'Black & White Dhupiyan', 'uploads\\1687849304841-709797588-Standard_Saree_SR-1084_291_3.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 264, 1),
(39, 'Kanchi Katan', 'uploads\\1687849403512-821015303-0f9319a0379e06a46503d71eeb1fd533.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 880, 1),
(40, 'Multicolor Satkahon', 'uploads\\1687849469605-391278030-Standard_Saree_SR-1084_291_3.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 399, 1),
(41, 'Traditional Handloom Half Silk Ball Moni Jamdani', 'uploads\\1687849583047-71083980-Standard_Saree_SR-1084_291_3.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 500, 1),
(42, 'Fashionable Tangail Tat Half Silk', 'uploads\\1687850795630-179529802-Standard_Saree_SR-1084_291_3.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 300, 1),
(43, 'Jorna Cotton', 'uploads\\1687850834077-876992813-Standard_Saree_SR-1084_291_3.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 449, 1),
(44, 'Half Silk Chumki', 'uploads\\1687850899791-523480093-Standard_Saree_SR-1084_291_3.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 275, 1),
(45, 'Jog Pair', 'uploads\\1687851022317-69897588-Standard_Saree_SR-1084_291_3.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 490, 1),
(46, 'Jum Sharee', 'uploads\\1687851078592-963913248-Standard_Saree_SR-1084_291_3.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 439, 1);

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `ProfileId` int(11) NOT NULL,
  `Name` varchar(250) DEFAULT NULL,
  `Gender` varchar(255) DEFAULT NULL,
  `Phone` varchar(14) DEFAULT NULL,
  `Addess` text DEFAULT NULL,
  `user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`ProfileId`, `Name`, `Gender`, `Phone`, `Addess`, `user`) VALUES
(1, 'Nabila Islam Swarna', 'Female', '+8801772217555', 'Gopibag, Dhaka', 1),
(3, 'Tanvir Tanjum Shourav', 'Male', '+8801515217821', 'Motijheel\nAGB Colony B-6/E-4', 5),
(4, 'Ragib Tanjum Sharnav', 'Male', '+8801746564424', 'Potanga, Chittagong', 6),
(5, 'Jarin Tasnim Shama', 'Female', '+8801972310199', 'Manikganj', 7),
(6, 'Zishad Hossain Limon', 'Male', '+8801521203725', 'Shahajahanpur,\nDhaka', 8),
(7, 'Dewan Amor Chowdhury', 'Male', '01515217821', 'Gulshan,\nDhaka', 9),
(8, 'Samiul Haque Chowdhury', 'Male', '+8801515217821', 'Mirpur,\nDhaka', 10),
(9, 'Anika Tahsin Tina', 'Female', '+8801763456432', 'Rampura,\nDhaka', 11),
(10, 'Shakib Al Hasan', 'Male', '01543678234', 'Gulshan,\nDhaka', 12),
(11, 'Joya Ahsan', 'Female', '01986634572', 'Kuril,\nDhaka', 13);

-- --------------------------------------------------------

--
-- Table structure for table `usergroups`
--

CREATE TABLE `usergroups` (
  `GroupId` int(11) NOT NULL,
  `GroupName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usergroups`
--

INSERT INTO `usergroups` (`GroupId`, `GroupName`) VALUES
(1, 'Admin'),
(2, 'Manager'),
(3, 'Salesman'),
(4, 'Deliveryman'),
(5, 'Customer');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserId` int(11) NOT NULL,
  `UserName` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `GroupId` int(11) DEFAULT NULL,
  `LoginAccess` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserId`, `UserName`, `Password`, `GroupId`, `LoginAccess`) VALUES
(1, 'swarna', 'admin123', 1, 1),
(5, 'shourav', 'admin123', 3, 1),
(6, 'sharnav', 'admin123', 5, 1),
(7, 'shama', 'admin123', 5, 1),
(8, 'zishad', 'admin123', 4, 1),
(9, 'amor', 'admin123', 4, 1),
(10, 'samiul', 'admin123', 3, 1),
(11, 'tina', 'admin123', 3, 1),
(12, 'shakib', 'admin123', 5, 1),
(13, 'joya', 'admin123', 5, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cartitems`
--
ALTER TABLE `cartitems`
  ADD PRIMARY KEY (`CartItemId`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`CartId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ProductId`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`ProfileId`);

--
-- Indexes for table `usergroups`
--
ALTER TABLE `usergroups`
  ADD PRIMARY KEY (`GroupId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cartitems`
--
ALTER TABLE `cartitems`
  MODIFY `CartItemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `CartId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `OrderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ProductId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `ProfileId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `usergroups`
--
ALTER TABLE `usergroups`
  MODIFY `GroupId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
