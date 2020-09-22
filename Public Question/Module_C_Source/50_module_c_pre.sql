-- phpMyAdmin SQL Dump
-- version 5.0.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2020 at 10:00 AM
-- Server version: 10.4.6-MariaDB-log
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `50_module_c_pre`
--

-- --------------------------------------------------------

--
-- Table structure for table `blacklist`
--

CREATE TABLE `blacklist` (
  `id` int(11) NOT NULL,
  `operator_user_id` int(11) NOT NULL,
  `punished_user_id` int(11) NOT NULL,
  `from` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `to` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`) VALUES
(1, '教育'),
(2, '娛樂'),
(3, '體育');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reply_comment_id` int(11) DEFAULT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `video_id`, `user_id`, `reply_comment_id`, `text`, `created_at`) VALUES
(1, 1, 1, NULL, 'comment 1', '2019-09-02 03:16:35'),
(2, 1, 2, 1, 'comment 1 - 1', '2019-09-02 03:17:35'),
(3, 1, 3, 1, 'comment 1 - 2', '2019-09-02 03:18:35'),
(4, 1, 1, NULL, 'comment 2', '2019-09-02 03:19:35'),
(5, 1, 2, NULL, 'comment 3', '2019-09-02 03:20:35'),
(6, 1, 3, NULL, 'comment 4', '2019-09-02 03:21:35'),
(7, 1, 1, NULL, 'comment 5', '2019-09-02 03:22:35'),
(8, 1, 2, NULL, 'comment 6', '2019-09-02 03:23:35'),
(9, 1, 3, NULL, 'comment 7', '2019-09-02 03:24:35'),
(10, 1, 1, NULL, 'comment 8', '2019-09-02 03:25:35'),
(11, 1, 2, NULL, 'comment 9', '2019-09-02 03:26:35'),
(12, 1, 3, NULL, 'comment 10', '2019-09-02 03:27:35'),
(13, 1, 1, NULL, 'comment 11', '2019-09-02 03:28:35'),
(14, 1, 1, 13, 'comment 11 - 1', '2019-09-02 03:29:35'),
(15, 1, 2, 13, 'comment 11 - 2', '2019-09-02 03:30:35'),
(16, 1, 3, 13, 'comment 11 - 3', '2019-09-02 03:31:35'),
(17, 1, 2, NULL, 'comment 12', '2019-09-02 03:32:35'),
(18, 1, 3, NULL, 'comment 13', '2019-09-02 03:33:35'),
(19, 2, 1, NULL, 'comment 1', '2019-09-02 03:16:35'),
(20, 4, 1, NULL, 'comment 1', '2019-09-02 03:16:35'),
(21, 4, 2, NULL, 'comment 2', '2019-09-02 03:17:35'),
(22, 4, 2, NULL, 'comment 3', '2019-09-02 03:18:35'),
(23, 4, 1, 22, 'comment 3 - 1', '2019-09-02 03:19:35'),
(24, 4, 2, 22, 'comment 3 - 2', '2019-09-02 03:20:35'),
(25, 4, 3, 22, 'comment 3 - 3', '2019-09-02 03:21:35'),
(26, 4, 1, NULL, 'comment 4', '2019-09-02 03:22:35'),
(27, 4, 2, NULL, 'comment 5', '2019-09-02 03:23:35'),
(28, 4, 3, NULL, 'comment 6', '2019-09-02 03:24:35');

-- --------------------------------------------------------

--
-- Table structure for table `danmu`
--

CREATE TABLE `danmu` (
  `id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `danmu`
--

INSERT INTO `danmu` (`id`, `video_id`, `user_id`, `text`, `position`) VALUES
(1, 2, 1, '頭香', 0),
(2, 2, 2, '頭香', 0),
(3, 2, 3, '完結灑花', 195),
(4, 2, 1, '求續集', 196);

-- --------------------------------------------------------

--
-- Table structure for table `episodes`
--

CREATE TABLE `episodes` (
  `id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `episodes`
--

INSERT INTO `episodes` (`id`, `program_id`, `video_id`, `title`, `order`) VALUES
(1, 1, 1, 'Program 1 - Episode 1', 1),
(2, 1, 4, 'Program 1 - Episode 2', 2),
(3, 1, 5, 'Program 1 - Episode 3', 3),
(4, 39, 1, 'Program 39 - Episode 1', 1),
(5, 99, 2, 'Program 99 - Episode 1', 1),
(6, 100, 3, 'Program 100 - Episode 1', 1),
(7, 98, 4, 'Program 98 - Episode 1', 1),
(8, 97, 5, 'Program 97 - Episode 1', 1),
(9, 96, 4, 'Program 96 - Episode 1', 1),
(10, 96, 5, 'Program 96 - Episode 2', 1);

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `video_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`video_id`, `user_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(4, 1),
(4, 2),
(5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`id`, `user_id`, `title`) VALUES
(1, 1, 'Alan Walker'),
(2, 1, 'OneRepublic');

-- --------------------------------------------------------

--
-- Table structure for table `playlist_videos`
--

CREATE TABLE `playlist_videos` (
  `playlist_id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `playlist_videos`
--

INSERT INTO `playlist_videos` (`playlist_id`, `video_id`, `order`) VALUES
(1, 2, 1),
(1, 3, 2),
(2, 1, 1),
(2, 2, 2),
(2, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `id` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `authorized_start_datetime` timestamp NULL DEFAULT NULL,
  `authorized_end_datetime` timestamp NULL DEFAULT NULL,
  `type` enum('FREE','MEMBER_ONLY') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'FREE',
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `programs`
--

INSERT INTO `programs` (`id`, `title`, `cover_path`, `description`, `authorized_start_datetime`, `authorized_end_datetime`, `type`, `updated_at`) VALUES
(1, 'Friends', 'cover/SJ5e2DGtNb4Cp4nTuJXp.jpg', 'This hit sitcom follows the merry misadventures of six 20-something pals as they navigate the pitfalls of work, life and love in 1990s Manhattan.', '2019-09-02 03:16:35', '2020-09-03 03:16:35', 'FREE', '2019-09-02 03:16:35'),
(2, 'The Big Bang Theory', 'cover/8yiQ54aRoxlOpkRBOLel.jpg', 'The Big Bang Theory is an American television sitcom created by Chuck Lorre and Bill Prady, both of whom served as executive producers on the series, along with Steven Molaro. All three also served as head writers. The show premiered on CBS on September 24, 2007 and concluded on May 16, 2019, having broadcast a total of 279 episodes over 12 seasons.', '2019-09-03 03:16:35', '2020-09-04 03:16:35', 'FREE', '2019-09-03 03:16:35'),
(3, 'The Walking Dead', 'cover/D3eDGDwwBex50nPJPrnC.jpg', 'Sheriff Deputy Rick Grimes wakes up from a coma to learn the world is in ruins, and must lead a group of survivors to stay alive.', '2019-07-02 03:16:35', '2020-07-02 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(4, 'Black Mirror', 'cover/gNmR5YbTqEGDPqBvtUFr.jpg', 'An anthology series exploring a twisted, high-tech world where humanity\'s greatest innovations and darkest instincts collide.', '2019-07-03 03:16:35', '2020-07-03 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(5, 'Westworld', 'cover/Vb0Unnbzz37RJu8zJezt.jpg', 'Set at the intersection of the near future and the reimagined past, explore a world in which every human appetite can be indulged without consequence.', '2019-07-04 03:16:35', '2020-07-04 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(6, 'The Handmaid\'s Tale', 'cover/EkzfQSBCHzH5FQrmxh8R.jpg', 'Set in a dystopian future, a woman is forced to live as a concubine under a fundamentalist theocratic dictatorship.', '2019-07-05 03:16:35', '2020-07-05 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(7, 'Grey\'s Anatomy', 'cover/4WrtB77WRMoLpLhJyykh.jpg', 'A drama centered on the personal and professional lives of five surgical interns and their supervisors.', '2019-07-06 03:16:35', '2020-07-06 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(8, 'The Haunting of Hill House', 'cover/gjyT1FSgZSK0DVJxSyCb.jpg', 'Flashing between past and present, a fractured family confronts haunting memories of their old home and the terrifying events that drove them from it.', '2019-07-07 03:16:35', '2020-07-07 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(9, 'American Horror Story', 'cover/cqZtJIdTORP4tJZGQ6zb.jpg', 'An anthology series centering on different characters and locations, including a house with a murderous past, an insane asylum, a witch coven, a freak show, a hotel, a possessed farmhouse, a cult, the apocalypse and a summer camp.', '2019-07-08 03:16:35', '2020-07-08 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(10, 'Vikings', 'cover/eP0C5vptwAHD8WDEcQf2.jpg', 'Vikings transports us to the brutal and mysterious world of Ragnar Lothbrok, a Viking warrior and farmer who yearns to explore - and raid - the distant shores across the ocean.', '2019-07-09 03:16:35', '2020-07-09 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(11, '13 Reasons Why', 'cover/LyNmXCQbMOsusLAErwFy.jpg', 'Follows teenager Clay Jensen, in his quest to uncover the story behind his classmate and crush, Hannah, and her decision to end her life.', '2019-07-10 03:16:35', '2020-07-10 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(12, 'Shameless', 'cover/8qdvSTAOx1vlZx4F0IPP.jpg', 'A scrappy, fiercely loyal Chicago family makes no apologies.', '2019-07-11 03:16:35', '2020-07-11 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(13, 'Altered Carbon', 'cover/spYdk5D1BtHbrhir1zLT.jpg', 'Set in a future where consciousness is digitized and stored, a prisoner returns to life in a new body and must solve a mind-bending murder to win his freedom.', '2019-07-12 03:16:35', '2020-07-12 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(14, 'Jack Ryan', 'cover/XhT1wIexegXksJ5E1t3t.jpg', 'An up-and-coming CIA analyst, Jack Ryan, is thrust into a dangerous field assignment as he uncovers a pattern in terrorist communication that launches him into the center of a dangerous gambit.', '2019-07-13 03:16:35', '2020-07-13 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(15, 'Lost in Space', 'cover/6Fy4M1yWHSS0RdoKRTHu.jpg', 'After crash-landing on an alien planet, the Robinson family fight against all odds to survive and escape, but they\'re surrounded by hidden dangers.', '2019-07-14 03:16:35', '2020-07-14 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(16, 'Supernatural', 'cover/jucFOSAPGAqeVK5VBmFL.jpg', 'Two brothers follow their father\'s footsteps as hunters, fighting evil supernatural beings of many kinds, including monsters, demons, and gods that roam the earth.', '2019-07-15 03:16:35', '2020-07-15 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(17, 'The Flash', 'cover/B376CKGCJguP80MKv8Dr.jpg', 'After being struck by lightning, Barry Allen wakes up from his coma to discover he\'s been given the power of super speed, becoming the Flash, fighting crime in Central City.', '2019-07-16 03:16:35', '2020-07-16 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(18, 'Suits', 'cover/YJFpGHo5iAub89EwaFYS.jpg', 'On the run from a drug deal gone bad, Mike Ross, a brilliant college dropout, finds himself a job working with Harvey Specter, one of New York City\'s best lawyers.', '2019-07-17 03:16:35', '2020-07-17 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(19, 'Orange Is the New Black', 'cover/TXKVyMZfcvwDrXJyuyTI.jpg', 'Convicted of a decade old crime of transporting drug money to an ex-girlfriend, normally law-abiding Piper Chapman is sentenced to a year and a half behind bars to face the reality of how life-changing prison can really be.', '2019-07-18 03:16:35', '2020-07-18 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(20, 'Chilling Adventures of Sabrina', 'cover/J6bPrLjszjQFjsHBT97v.jpg', 'As her 16th birthday nears, Sabrina must choose between the witch world of her family and the human world of her friends. Based on the Archie comic.', '2019-07-19 03:16:35', '2020-07-19 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(21, 'Maniac', 'cover/roXwVDXQ7tUPAKbLWUJK.jpg', 'Two strangers are drawn to a mysterious pharmaceutical trial that will, they\'re assured, with no complications or side-effects whatsoever, solve all of their problems, permanently. Things do not go as planned.', '2019-07-20 03:16:35', '2020-07-20 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(22, 'Riverdale', 'cover/h8jU5jY7ENwRO0Nl3pvI.jpg', 'While navigating the troubled waters of romance, school and family, Archie and his gang become entangled in dark Riverdale mysteries.', '2019-07-21 03:16:35', '2020-07-21 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(23, 'This Is Us', 'cover/cgE0OcMMDhzYQni63p61.jpg', 'A heartwarming and emotional story about a unique set of triplets, their struggles, and their wonderful parents.', '2019-07-22 03:16:35', '2020-07-22 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(24, 'Ozark', 'cover/popnuauxsmUpi8h7IMkR.jpg', 'A financial adviser drags his family from Chicago to the Missouri Ozarks, where he must launder $500 million in five years to appease a drug boss.', '2019-07-23 03:16:35', '2020-07-23 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(25, 'Arrow', 'cover/9TNOsc9IoKydKznFvbDI.jpg', 'Spoiled billionaire playboy Oliver Queen is missing and presumed dead when his yacht is lost at sea. He returns five years later a changed man, determined to clean up the city as a hooded vigilante armed with a bow.', '2019-07-24 03:16:35', '2020-07-24 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(26, 'Castle Rock', 'cover/2ufC8zJvgPprtKLaSRqA.jpg', 'Based on the stories of Stephen King, the series intertwines characters and themes from the fictional town of Castle Rock.', '2019-07-25 03:16:35', '2020-07-25 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(27, 'Disenchantment', 'cover/9GrdfwCIFJRPB1Q1wzNp.jpg', 'Princess Tiabeanie, \'Bean\', is annoyed at her imminent arranged marriage to Prince Merkimer. Then she meets Luci, a demon, and Elfo, an elf, and things get rather exciting, and dangerous.', '2019-07-26 03:16:35', '2020-07-26 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(28, 'Brooklyn Nine-Nine', 'cover/JqQ3Rq81WSOgpPqdFhWI.jpg', 'Jake Peralta, an immature, but talented N.Y.P.D. detective in Brooklyn\'s 99th Precinct, comes into immediate conflict with his new commanding officer, the serious and stern Captain Ray Holt.', '2019-07-27 03:16:35', '2020-07-27 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(29, 'Peaky Blinders', 'cover/WMYErB5qaCAksENBzB0i.jpg', 'A gangster family epic set in 1919 Birmingham, England; centered on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.', '2019-07-28 03:16:35', '2020-07-28 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(30, 'Better Call Saul', 'cover/V81xwViRx8dSEhshxtAZ.jpg', 'The trials and tribulations of criminal lawyer, Jimmy McGill, in the time leading up to establishing his strip-mall law office in Albuquerque, New Mexico.', '2019-07-29 03:16:35', '2020-07-29 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(31, 'Lucifer', 'cover/EzSS6IMSsZhW9tcFX1O8.jpg', 'Lucifer Morningstar has decided he\'s had enough of being the dutiful servant in Hell and decides to spend some time on Earth to better understand humanity. He settles in Los Angeles - the City of Angels.', '2019-07-30 03:16:35', '2020-07-30 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(32, 'Homeland', 'cover/QLGZmoENO7JukZcUXpC3.jpg', 'A bipolar CIA operative becomes convinced a prisoner of war has been turned by al-Qaeda and is planning to carry out a terrorist attack on American soil.', '2019-07-31 03:16:35', '2020-07-31 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(33, 'Agents of S.H.I.E.L.D.', 'cover/ci6EeJ2qAXlU0iv4gYjv.jpg', 'The missions of the Strategic Homeland Intervention, Enforcement and Logistics Division.', '2019-08-01 03:16:35', '2020-08-01 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(34, 'The 100', 'cover/xxGwaE8TfkoXVq5XiNDU.jpg', 'Set ninety-seven years after a nuclear war has destroyed civilization, when a spaceship housing humanity\'s lone survivors sends one hundred juvenile delinquents back to Earth, in hopes of possibly re-populating the planet.', '2019-08-02 03:16:35', '2020-08-02 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(35, 'Criminal Minds', 'cover/Is0q3f1jbXyVLVqGFYXF.jpg', 'The cases of the F.B.I. Behavioral Analysis Unit (B.A.U.), an elite group of profilers who analyze the nation\'s most dangerous serial killers and individual heinous crimes in an effort to anticipate their next moves before they strike again.', '2019-08-03 03:16:35', '2020-08-03 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(36, 'Daredevil', 'cover/7m8s5KmBXwcpeOSUmY95.jpg', 'A blind lawyer by day, vigilante by night. Matt Murdock fights the crime of New York as Daredevil.', '2019-08-04 03:16:35', '2020-08-04 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(37, 'Sharp Objects', 'cover/DOadyFvf2I0rsmuXjd0C.jpg', 'A reporter confronts the psychological demons from her past when she returns to her hometown to cover a violent murder.', '2019-08-05 03:16:35', '2020-08-05 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(38, 'Titans', 'cover/930e0WhLZEt5KNi9rUFi.jpg', 'A team of young superheroes led by Nightwing (formerly Batman\'s first Robin) form to combat evil and other perils.', '2019-08-06 03:16:35', '2020-08-06 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(39, 'The End of the F***ing World', 'cover/x5KT2jrgNELxRG5vFV63.jpg', 'James is 17 and is pretty sure he is a psychopath. Alyssa, also 17, is the cool and moody new girl at school. The pair make a connection and she persuades him to embark on a road trip in search of her real father.', '2019-08-07 03:16:35', '2020-08-07 03:16:35', 'FREE', '2019-09-01 03:16:35'),
(40, 'Gotham', 'cover/iBHzNX8Oqj6Odg1EjrRr.jpg', 'The story behind Detective James Gordon\'s rise to prominence in Gotham City in the years before Batman\'s arrival.', '2019-08-08 03:16:35', '2020-08-08 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(41, 'The Blacklist', 'cover/DY4WFSbU61VEpv7aQHc7.jpg', 'A new FBI profiler, Elizabeth Keen, has her entire life uprooted when a mysterious criminal, Raymond Reddington, who has eluded capture for decades, turns himself in and insists on speaking only to her.', '2019-08-09 03:16:35', '2020-08-09 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(42, 'NCIS: Naval Criminal Investigative Service', 'cover/k9PTw1kCxCGRDvMefRRl.jpg', 'The cases of the Naval Criminal Investigative Service\'s Washington, D.C. Major Case Response Team, led by Special Agent Leroy Jethro Gibbs.', '2019-08-10 03:16:35', '2020-08-10 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(43, 'La Casa de Papel', 'cover/kPdtv2RR2uuKcokOIgsD.jpg', 'A group of very peculiar robbers assault the Factory of Moneda and Timbre to carry out the most perfect robbery in the history of Spain and take home 2.4 billion euros.', '2019-08-11 03:16:35', '2020-08-11 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(44, 'Law & Order: Special Victims Unit', 'cover/skhUhOrcSiw0obGrnYAs.jpg', 'The Special Victims Unit, a specially trained squad of detectives in the NYPD, investigate sexually related crimes.', '2019-08-12 03:16:35', '2020-08-12 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(45, 'Insatiable', 'cover/oymc3saKmkkfQnvPLRXR.jpg', 'A disgraced, dissatisfied civil lawyer-turned-beauty pageant coach takes on a vengeful, bullied teenager as his client and has no idea what he\'s about to unleash upon the world.', '2019-08-13 03:16:35', '2020-08-13 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(46, 'The Good Doctor', 'cover/yhTZ1e546ukpBtBlNJWD.jpg', 'Shaun Murphy, a young surgeon with autism and Savant syndrome, is recruited into the surgical unit of a prestigious hospital.', '2019-08-14 03:16:35', '2020-08-14 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(47, 'Doctor Who', 'cover/gS7ajQRh0MjhEnnkVlmS.jpg', 'The further adventures in time and space of the alien adventurer known as the Doctor and their companions from planet Earth.', '2019-08-15 03:16:35', '2020-08-15 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(48, 'The Sinner', 'cover/DRiHxyPeFVQfh26ghBwj.jpg', 'Anthology series that examines how and why ordinary people commit brutal crimes.', '2019-08-16 03:16:35', '2020-08-16 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(49, 'Supergirl', 'cover/UOnRpQqcknQN75HBqzEy.jpg', 'The adventures of Superman\'s cousin in her own superhero career.', '2019-08-17 03:16:35', '2020-08-17 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(50, 'Fear the Walking Dead', 'cover/ZpnVkK4TVxDpfZtj1FXO.jpg', 'A Walking Dead spin-off, set in Los Angeles, following two families who must band together to survive the undead apocalypse.', '2019-08-18 03:16:35', '2020-08-18 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(51, 'Cobra Kai', 'cover/6nzXqbE374dfsLRzIaBy.jpg', 'Decades after their 1984 All Valley Karate Tournament bout, a middle-aged Daniel LaRusso and Johnny Lawrence find themselves martial-arts rivals again.', '2019-08-19 03:16:35', '2020-08-19 03:16:35', 'FREE', '2019-07-02 03:16:35'),
(52, 'Luke Cage', 'cover/dNgMiEw0UBnz0wMzpa3z.jpg', 'When a sabotaged experiment gives him super strength and unbreakable skin, Luke Cage becomes a fugitive attempting to rebuild his life in Harlem and must soon confront his past and fight a battle for the heart of his city.', '2019-08-20 03:16:35', '2020-08-20 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(53, 'Bodyguard', 'cover/gdKk27TAJyjJBjjFyURs.jpg', 'A contemporary thriller featuring the Royalty and Specialist Protection Branch of London\'s Metropolitan Police Service.', '2019-08-21 03:16:35', '2020-08-21 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(54, 'Jessica Jones', 'cover/fJRx3oWSLcarxb0JxuDh.jpg', 'Following the tragic end of her brief superhero career, Jessica Jones tries to rebuild her life as a private investigator, dealing with cases involving people with remarkable abilities in New York City.', '2019-08-22 03:16:35', '2020-08-22 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(55, 'Star Trek: Discovery', 'cover/o5E1azlawXoyOffd95nh.jpg', 'Ten years before Kirk, Spock, and the Enterprise, the USS Discovery discovers new worlds and lifeforms as one Starfleet officer learns to understand all things alien.', '2019-08-23 03:16:35', '2020-08-23 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(56, 'Modern Family', 'cover/inKYo5ZDbJMjPZwxBq8G.jpg', 'Three different but related families face trials and tribulations in their own uniquely comedic ways.', '2019-08-24 03:16:35', '2020-08-24 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(57, 'The Crown', 'cover/DM7Pi0fxyuZ84FAbNynz.jpg', 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.', '2019-08-25 03:16:35', '2020-08-25 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(58, 'Mayans M.C.', 'cover/5O6vc4XC0aE4MzOnB4oa.jpg', 'Set in a post-Jax Teller world, \"Mayans MC\" sees EZ Reyes, a former golden boy now fresh out of prison, as a prospect in the Mayan MC charter on the California-Mexico border who must carve out his new outlaw identity.', '2019-08-26 03:16:35', '2020-08-26 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(59, 'Big Mouth', 'cover/JxNnu1pB1STj9awwKEq4.jpg', 'Teenage friends find their lives upended by the wonders and horrors of puberty.', '2019-08-27 03:16:35', '2020-08-27 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(60, 'Billions', 'cover/TvmdQjrUe3yqXtSW96bM.jpg', 'U.S. Attorney Chuck Rhoades goes after hedge fund king Bobby \"Axe\" Axelrod in a battle between two powerful New York figures.', '2019-08-28 03:16:35', '2020-08-28 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(61, '9-1-1', 'cover/KIqnKQedb3BjpUev8EAj.jpg', 'Explores the high-pressure experiences of the first responders who are thrust into the most frightening, shocking and heart-stopping situations.', '2019-08-29 03:16:35', '2020-08-29 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(62, 'House of Cards', 'cover/tlingTRVRR2vdXYvrjne.jpg', 'A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.', '2019-08-30 03:16:35', '2020-08-30 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(63, 'Outlander', 'cover/F27YoQDiTMOXiem9Ofg8.jpg', 'An English combat nurse from 1945 is mysteriously swept back in time to 1743.', '2019-08-31 03:16:35', '2020-08-31 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(64, 'The Originals', 'cover/Xff8AS0r2LsqY7fXOihy.jpg', 'A family of power-hungry thousand year old vampires look to take back the city that they built and dominate all those who have done them wrong.', '2019-09-01 03:16:35', '2020-09-01 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(65, 'The Terror', 'cover/zonqVMucVYFNI3VuOERO.jpg', 'Supernatural, semihistorical, horror anthology series, where each season is inspired by a different infamous or mysterious real life historical tragedy.', '2019-09-02 03:16:35', '2020-09-02 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(66, 'A Series of Unfortunate Events', 'cover/zxZyPqRTTiJSNH5xNlDV.jpg', 'After the loss of their parents in a mysterious fire, the three Baudelaire children face trials and tribulations attempting to uncover dark family secrets.', '2019-09-03 03:16:35', '2020-09-03 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(67, 'Rick and Morty', 'cover/w1YP5SFKcPX4aXsiyv9g.jpg', 'An animated series that follows the exploits of a super scientist and his not-so-bright grandson.', '2019-09-04 03:16:35', '2020-09-04 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(68, 'Legends of Tomorrow', 'cover/b6Qs50SRx7ygw5uQPBP1.jpg', 'Time-travelling rogue Rip Hunter has to recruit a rag-tag team of heroes and villains to help prevent an apocalypse that could impact not only Earth, but all of time.', '2019-09-05 03:16:35', '2020-09-05 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(69, 'Once Upon a Time', 'cover/0XpkJJWFazYSpvF5Us64.jpg', 'A young woman with a troubled past is drawn to a small town in Maine where fairy tales are to be believed.', '2019-09-06 03:16:35', '2020-09-06 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(70, 'It\'s Always Sunny in Philadelphia', 'cover/JQnFEbRow6j3RapZ2uSZ.jpg', 'Five friends with big egos and slightly arrogant attitudes are the proprietors of an Irish pub in Philadelphia.', '2019-09-07 03:16:35', '2020-09-07 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(71, 'It\'s Always Sunny in Philadelphia', 'cover/jEYaULsxb1zfJRkMfBld.jpg', 'Five friends with big egos and slightly arrogant attitudes are the proprietors of an Irish pub in Philadelphia.', '2019-09-08 03:16:35', '2020-09-08 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(72, 'Roseanne', 'cover/7zZRDhw6N320uBIZtol6.jpg', 'A revival of the popular 1990s sitcom \'Roseanne,\' which centered on the everyday life of an American working-class family.', '2019-09-09 03:16:35', '2020-09-09 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(73, 'Hawaii Five-0', 'cover/y7z4qMvlNh49h6rEtjB4.jpg', 'Steve McGarrett returns home to Oahu, in order to find his father\'s killer. The Governor offers him the chance to run his own task force (Five-0).', '2019-09-10 03:16:35', '2020-09-10 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(74, 'How to Get Away with Murder', 'cover/CyMywc3xZVpL0nFGiBJ7.jpg', 'A group of ambitious law students and their brilliant criminal defense professor become involved in a twisted murder plot that promises to change the course of their lives.', '2019-09-11 03:16:35', '2020-09-11 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(75, 'Lethal Weapon', 'cover/kGolDmmllO6sRwX5jhbe.jpg', 'A slightly unhinged cop is partnered with a veteran detective trying to maintain a low stress level in his life.', '2019-09-12 03:16:35', '2020-09-12 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(76, 'Yellowstone', 'cover/TdEOAjvJgpkm4FRBi2c6.jpg', 'A ranching family in Montana faces off against others encroaching on their land.', '2019-09-13 03:16:35', '2020-09-13 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(77, 'Legion', 'cover/XJQyaRcbacGaP4mcAZnw.jpg', 'David Haller is a troubled young man diagnosed as schizophrenic, but after a strange encounter, he discovers special powers that will change his life forever.', '2019-09-14 03:16:35', '2020-09-14 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(78, 'The Vampire Diaries', 'cover/CmF0FmU31m8nR4IBdupI.jpg', 'The lives, loves, dangers and disasters in the town, Mystic Falls, Virginia. Creatures of unspeakable horror lurk beneath this town as a teenage girl is suddenly torn between two vampire brothers.', '2019-09-15 03:16:35', '2020-09-15 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(79, 'Iron Fist', 'cover/MrDUfk8fdT6DFyk1q9eL.jpg', 'A young man is bestowed with incredible martial arts skills and a mystical force known as the Iron Fist.', '2019-09-16 03:16:35', '2020-09-16 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(80, 'The Good Place', 'cover/VM4bALr9p4DoddIvFgr3.jpg', 'Four people and their otherworldly frienemy struggle in the afterlife to define what it means to be good.', '2019-09-17 03:16:35', '2020-09-17 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(81, 'The X Files', 'cover/tUxGNs7gD3kuCFduvwuA.jpg', 'Two F.B.I. Agents, Fox Mulder the believer and Dana Scully the skeptic, investigate the strange and unexplained, while hidden forces work to impede their efforts.', '2019-09-18 03:16:35', '2020-09-18 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(82, 'American Crime Story', 'cover/OPtfwj1PQ0iiIfEGjuCU.jpg', 'An anthology series centered around America\'s most notorious crimes and criminals.', '2019-09-19 03:16:35', '2020-09-19 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(83, 'Narcos', 'cover/v1xQhsl1V9cKHTsZJHod.jpg', 'A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar, as well as the many other drug kingpins who plagued the country through the years.', '2019-09-20 03:16:35', '2020-09-20 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(84, 'Designated Survivor', 'cover/uhb5kGzaeevWnSdHsY9P.jpg', 'A low-level Cabinet member becomes President of the United States after a catastrophic attack kills everyone above him in the line of succession.', '2019-09-21 03:16:35', '2020-09-21 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(85, 'The Affair', 'cover/ZXbMguakpyrA5ij8LDk9.jpg', 'A struggling novelist and a young waitress strike up an extramarital relationship that promises to forever change the course of their lives.', '2019-09-22 03:16:35', '2020-09-22 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(86, 'New Girl', 'cover/vsbUXJZpx10ojt3BCicN.jpg', 'After a bad break-up, Jess, an offbeat young woman, moves into an apartment loft with three single men. Although they find her behavior very unusual, the men support her - most of the time.', '2019-09-23 03:16:35', '2020-09-23 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(87, 'The Punisher', 'cover/tKXxg1scHvxgQaQMNOnv.jpg', 'After the murder of his family, Marine veteran Frank Castle becomes the vigilante known as \"The Punisher,\" with only one goal in mind: to avenge them.', '2019-09-24 03:16:35', '2020-09-24 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(88, 'The Expanse', 'cover/9gk37WiYvWjJ7KdY4brG.jpg', 'A police detective in the asteroid belt, the first officer of an interplanetary ice freighter and an earth-bound United Nations executive slowly discover a vast conspiracy that threatens the Earth\'s rebellious colony on the asteroid belt.', '2019-09-25 03:16:35', '2020-09-25 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(89, 'The Gifted', 'cover/gL9A2yAub8pyHf2rrLby.jpg', 'In a world where mutated humans are treated with distrust and fear, an institute for mutants battles to achieve peaceful co-existence with humanity.', '2019-09-26 03:16:35', '2020-09-26 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(90, 'The Resident', 'cover/kPTCbgtQLfydVi2ByumS.jpg', 'A group of doctors at Chastain Memorial Hospital face personal and professional challenges on a daily basis.', '2019-09-27 03:16:35', '2020-09-27 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(91, 'Dark', 'cover/w9HKtHKkWadee1nU61tH.jpg', 'A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the relationships among four families.', '2019-09-28 03:16:35', '2020-09-28 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(92, 'Black Lightning', 'cover/90J76gNNpTCT4xnXaSbs.jpg', 'A crusading school principal gets back into action as the original African-American electrical superhero.', '2019-09-29 03:16:35', '2020-09-29 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(93, 'GLOW', 'cover/LEKVkk1OM29iV5a3TCMv.jpg', 'A look at the personal and professional lives of a group of women who perform for a wrestling organization in Los Angeles during the 1980s.', '2019-09-30 03:16:35', '2020-09-30 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(94, 'The Alienist', 'cover/CY1GZjA1hLjyGavLjlVN.jpg', 'Newspaper illustrator John Moore meets with criminal psychologist (alienist) Dr. Laszlo Kreizler to investigate a serial killer in New York during the late 19th century.', '2019-10-01 03:16:35', '2020-10-01 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(95, 'Killing Eve', 'cover/C4aNx0BpmLbW8lCyFj9u.jpg', 'After a series of events, the lives of a security operative and an assassin become inextricably linked.', '2019-10-02 03:16:35', '2020-10-02 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(96, 'Manifest', 'cover/2YvFVF58LxJR47XrvKKe.jpg', 'After a turbulent, but routine flight, those onboard discover the world has aged five years, and soon a deeper mystery unfolds.', '2019-10-03 03:16:35', '2020-10-03 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(97, 'The Americans', 'cover/5Ln10I4YkAnxp6JEKohS.jpg', 'At the height of the Cold War two Russian agents pose as your average American couple, complete with family.', '2019-10-04 03:16:35', '2020-10-04 03:16:35', 'MEMBER_ONLY', '2019-07-02 03:16:35'),
(98, 'Fargo', 'cover/6cvJBr7g9dVqcqsFKjD6.jpg', 'Various chronicles of deception, intrigue and murder in and around frozen Minnesota. Yet all of these tales mysteriously lead back one way or another to Fargo, North Dakota.', '2019-10-05 03:16:35', '2020-10-05 03:16:35', 'MEMBER_ONLY', '2019-09-15 03:16:35'),
(99, 'Sherlock', 'cover/QQqAmhKIwWqGwqRlsQYC.jpg', 'A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.', '2019-09-02 03:16:35', '2019-09-03 03:16:35', 'FREE', '2019-09-16 03:16:35'),
(100, 'Big Little Lies', 'cover/prs9HcKGUyS9k6Z45j9z.jpg', 'The apparently perfect lives of upper-class mothers, at a prestigious elementary school, unravel to the point of murder when a single-mother moves to their quaint Californian beach town.', '2020-09-02 03:16:35', '2020-09-03 03:16:35', 'FREE', '2019-09-02 03:16:35');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 1,
  `verified` tinyint(1) NOT NULL DEFAULT 0,
  `user_type` enum('NORMAL','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` char(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `nickname`, `password`, `enabled`, `verified`, `user_type`, `token`, `created_at`, `updated_at`) VALUES
(1, 'root@localhost', 'sysop', '$2y$12$nOfLhJrNW1LV2lbsTi8BRO.MPBxFTRsNJSQvLTBf2vg61qAShHWsW', 1, 1, 'ADMIN', '0a44f8735cbc275f1efcdf43159dcd20e54a1c994d0daeb92d04c389078057b5', '2019-09-01 19:16:35', '2019-09-01 21:10:48'),
(2, 'user1@localhost', 'user1', '$2y$12$YiF2sNJ.pZ1l4MKO.743ZuIlBPH9MCYSTHny3YmHv5QtDuyYtK9tS', 1, 1, 'NORMAL', '462d5f5fb3c12bfd376eafe181f896dbc2de7a42d8bc14f1603d62299722126e', '2019-09-01 19:16:35', '2019-09-01 21:10:48'),
(3, 'user2@localhost', 'user2', '$2y$12$MZ5ZT8Tc.MkUkxdRVbKkf.TMTwloyc.nNowKPGfp99EDQtzQIildu', 0, 1, 'NORMAL', 'db471d68929324b888da72ce0066e8ba5cc57789cfb15a9b62d96a3f78754758', '2019-09-01 19:16:35', '2019-09-01 21:10:48');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int(11) NOT NULL,
  `process_state` enum('PENDING','PROCESSING','SUCCESS','FAILED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `visibility` enum('PUBLIC','LINK','PRIVATE') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PUBLIC',
  `user_id` int(11) NOT NULL,
  `video_screenshot_id` int(11) DEFAULT NULL,
  `duration` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `title`, `description`, `category_id`, `process_state`, `visibility`, `user_id`, `video_screenshot_id`, `duration`, `created_at`) VALUES
(1, 'Faded', 'You were the shadow to my light Did you feel us Another start You fade away Afraid our aim is out of sight Wanna see us Alive', 2, 'SUCCESS', 'PUBLIC', 1, 1, 213, '2019-09-02 03:16:35'),
(2, 'Alone', 'Lost in your mind I wanna know Am I losing my mind? Never let me go', 2, 'SUCCESS', 'PUBLIC', 1, 2, 200, '2019-09-02 03:16:35'),
(3, 'Darkside', 'We are not in love We share no stories Just something in your eyes Do not be afraid The shadows know me Let us leave the world behind', 2, 'SUCCESS', 'PUBLIC', 1, 3, 239, '2019-09-02 03:16:35'),
(4, 'Something Just Like This', 'I have been reading books of old The legends and the myths Achilles and his gold Hercules and his gifts', 2, 'SUCCESS', 'LINK', 2, 4, 239, '2019-09-02 03:16:35'),
(5, 'Counting Stars', 'Lately I been, I been losing sleep Dreaming about the things that we could be But baby I been, I been praying hard Said no more counting dollars We will be counting stars Yeah, we will be counting stars', 2, 'SUCCESS', 'PRIVATE', 2, 5, 283, '2019-09-13 03:16:35'),
(6, 'The One Where Monica Gets a Roommate', 'Monica and the gang introduce Rachel to the \"real world\" after she leaves her fiancé at the altar.', 3, 'SUCCESS', 'PUBLIC', 1, 6, 2048, '2019-09-12 03:16:35'),
(7, 'The One with the Sonogram at the End', 'Ross finds out his ex-wife is pregnant. Rachel returns her engagement ring to Barry. Monica becomes stressed when her and Ross\'s parents come to visit.', 3, 'SUCCESS', 'PUBLIC', 1, 7, 2048, '2019-09-14 03:16:35'),
(8, 'The One with the Thumb', 'Monica becomes irritated when everyone likes her new boyfriend more than she does. Chandler resumes his smoking habit. Phoebe is given $7000 when she finds a thumb in a can of soda.', 2, 'SUCCESS', 'PUBLIC', 1, 8, 2048, '2019-09-15 03:16:35'),
(9, 'The One with George Stephanopoulos', 'Joey and Chandler take Ross to a hockey game to take his mind off the anniversary of the first time he slept with Carol, while the girls become depressed when they realize they don\'t have a \'plan\'.', 2, 'SUCCESS', 'PUBLIC', 1, 9, 2048, '2019-09-16 03:16:35'),
(10, 'The One with the East German Laundry Detergent', 'Eager to spend time with Rachel, Ross pretends his washroom is rat-infested so he can join her at the laundromat. Meanwhile, Joey has Monica pose as his girlfriend, and Chandler struggles to break up with his girlfriend.', 2, 'SUCCESS', 'PUBLIC', 1, 10, 2048, '2019-09-02 03:16:35'),
(11, 'The One with the Butt', 'Monica\'s obsessiveness is put to the test after Rachel cleans the apartment. Joey lands a film role as Al Pacino\'s butt double. Chandler enjoys a relationship with all of the fun but none of the responsibility.', 2, 'SUCCESS', 'PUBLIC', 1, 11, 2048, '2019-09-02 03:16:35'),
(12, 'The One with the Blackout', 'When New York suffers from a blackout, Ross tries to tell Rachel that he likes her, and Chandler gets stuck in an ATM vestibule with a model.', 3, 'SUCCESS', 'PUBLIC', 1, 12, 2048, '2019-09-02 03:16:35'),
(13, 'The One Where Nana Dies Twice', 'Monica and Ross mourn the loss of their grandmother. Chandler is shocked to find that people think he is gay.', 3, 'SUCCESS', 'PUBLIC', 1, 13, 2048, '2019-09-02 03:16:35'),
(14, 'The One Where Underdog Gets Away', 'The gang\'s plans for Thanksgiving go awry after they get locked out of Monica and Rachel\'s apartment.', 1, 'SUCCESS', 'PUBLIC', 1, 14, 2048, '2019-09-02 03:16:35'),
(15, 'The One with the Monkey', 'The gang make (and break) a pact not to bring dates to their New Years Eve party. Phoebe starts dating a scientist. Ross compensates for his loneliness by getting a monkey.', 3, 'SUCCESS', 'PUBLIC', 1, 15, 2048, '2019-09-02 03:16:35'),
(16, 'The One with Mrs. Bing', 'Chandler\'s flamboyant romance-novelist mother comes to visit, and Joey catches her kissing Ross. Meanwhile, Monica and Phoebe fight over a guy in a coma.', 3, 'SUCCESS', 'PUBLIC', 1, 16, 2048, '2019-09-02 03:16:35'),
(17, 'The One with the Dozen Lasagnas', 'Rachel and Paolo\'s relationship hits a snag when he makes a pss at Phoebe. Ross refuses to find out the sex of his baby until it\'s born. Chandler and Joey go shopping for a new kitchen table.', 2, 'SUCCESS', 'PUBLIC', 1, 17, 2048, '2019-09-02 03:16:35'),
(18, 'The One with the Boobies', 'Joey finds out his dad has a mistress. Rachel tries to even the score after Chandler inadvertently catches a glimpse of her breasts. Phoebe dates a shrink who analyzes the gang.', 1, 'SUCCESS', 'PUBLIC', 1, 18, 2048, '2019-09-02 03:16:35'),
(19, 'The One with the Candy Hearts', 'As Valentine\'s Day approaches; Ross and his date end up at the same restaurant as Carol and Susan, Joey inadvertently sets Chandler up on a blind date with Janice, and the girls burn mementos of their old boyfriends.', 1, 'SUCCESS', 'PUBLIC', 1, 19, 2048, '2019-09-02 03:16:35'),
(20, 'The One with the Stoned Guy', 'Monica cooks a gourmet meal for a restaurateur who is looking for a new chef, however he arrives at the apartment stoned. Meanwhile, Ross tries to master \'dirty talk\'.', 2, 'SUCCESS', 'PUBLIC', 1, 20, 2048, '2019-09-02 03:16:35'),
(21, 'The One with Two Parts: Part 1', 'Phoebe feels neglected when Joey falls for her twin sister. Chandler struggles to fire an attractive co-worker. Ross attends Lamaze classes with Carol and Susan.', 2, 'SUCCESS', 'PUBLIC', 1, 21, 2048, '2019-09-02 03:16:35'),
(22, 'The One with Two Parts: Part 2', 'Rachel switches identities with Monica so she can use her health insurance. Meanwhile, Ursula continues to come between Phoebe and Joey.', 3, 'SUCCESS', 'PUBLIC', 1, 22, 2048, '2019-09-02 03:16:35'),
(23, 'The One with All the Poker', 'As Rachel interviews for a new job, the girls take on the guys in a game of poker.', 2, 'SUCCESS', 'PUBLIC', 1, 23, 2048, '2019-09-02 03:16:35'),
(24, 'Unaired Pilot', 'The first Pilot of what will become \"The Big Bang Theory\". Leonard and Sheldon are two awkward scientists who share an apartment. They meet a drunk girl called Katie and invite her to stay at their place, because she has nowhere to stay. The two guys have a female friend, also a scientist, called Gilda.', 1, 'SUCCESS', 'PUBLIC', 1, 24, 2048, '2019-09-02 03:16:35'),
(25, 'Pilot', 'A\', pair of socially awkward theoretical physicists meet their new neighbor Penny, who is their polar opposite.', 3, 'SUCCESS', 'PUBLIC', 1, 25, 2048, '2019-09-02 03:16:35'),
(26, 'The Big Bran Hypothesis', 'Penny is furious with Leonard and Sheldon when they sneak into her apartment and clean it while she is sleeping.', 3, 'SUCCESS', 'PUBLIC', 1, 26, 2048, '2019-09-02 03:16:35'),
(27, 'The Fuzzy Boots Corollary', 'Leonard gets upset when he discovers that Penny is seeing a new guy, so he tries to trick her into going on a date with him.', 2, 'SUCCESS', 'PUBLIC', 1, 27, 2048, '2019-09-02 03:16:35'),
(28, 'The Luminous Fish Effect', 'Sheldon\'s mother is called to intervene when he delves into numerous obsessions after being fired for being disrespectful to his new boss.', 2, 'SUCCESS', 'PUBLIC', 1, 28, 2048, '2019-09-02 03:16:35'),
(29, 'The Hamburger Postulate', 'Leslie seduces Leonard, but afterwards tells him that she is only interested in a one-night stand.', 3, 'SUCCESS', 'PUBLIC', 1, 29, 2048, '2019-09-02 03:16:35'),
(30, 'The Middle Earth Paradigm', 'The guys are invited to Penny\'s Halloween party, where Leonard has yet another run-in with Penny\'s ex-boyfriend Kurt.', 1, 'SUCCESS', 'PUBLIC', 1, 30, 2048, '2019-09-02 03:16:35'),
(31, 'The Dumpling Paradox', 'When Howard hooks up with Penny\'s old friend, his absence in the gang causes problems for the rest of the guys.', 2, 'SUCCESS', 'PUBLIC', 1, 31, 2048, '2019-09-02 03:16:35'),
(32, 'The Grasshopper Experiment', 'When Raj\'s parents set him up on a blind date, he finds he can talk to women with the aid of alcohol.', 2, 'SUCCESS', 'PUBLIC', 1, 32, 2048, '2019-09-02 03:16:35'),
(33, 'The Cooper-Hofstadter Polarization', 'Leonard and Sheldon\'s friendship is put to the test when Leonard wants to present a paper they co-authored at a physics convention, but Sheldon doesn\'t.', 2, 'SUCCESS', 'PUBLIC', 1, 33, 2048, '2019-09-02 03:16:35'),
(34, 'The Loobenfeld Decay', 'Leonard lies to Penny so that he and Sheldon can get out of watching her perform. However, Sheldon believes that the lie has too many loose ends, so he comes up with a new, unnecessarily complex one to replace it.', 1, 'SUCCESS', 'PUBLIC', 1, 34, 2048, '2019-09-02 03:16:35'),
(35, 'The Pancake Batter Anomaly', 'When Sheldon gets sick, Leonard, Howard and Raj go AWOL, leaving a reluctant Penny to deal with him.', 3, 'SUCCESS', 'PUBLIC', 1, 35, 2048, '2019-09-02 03:16:35'),
(36, 'The Jerusalem Duality', 'Sheldon decides to give up his work and focus on other tasks when a 15-year-old prodigy joins the university, so the other guys come up with a plan to get rid of him.', 2, 'SUCCESS', 'PUBLIC', 1, 36, 2048, '2019-09-02 03:16:35'),
(37, 'The Bat Jar Conjecture', 'Sheldon becomes so intent on demonstrating his intellectual superiority over the other guys that they kick him off the Physics Bowl team and replace him with his nemesis, Leslie.', 3, 'SUCCESS', 'PUBLIC', 1, 37, 2048, '2019-09-02 03:16:35'),
(38, 'The Nerdvana Annihilation', 'Penny gets mad at the guys when their full scale model of a time machine causes her to miss work, which prompts Leonard to give up all of his nerd memorabilia.', 2, 'SUCCESS', 'PUBLIC', 1, 38, 2048, '2019-09-02 03:16:35'),
(39, 'The Pork Chop Indeterminacy', 'Leonard, Howard and Raj fight over Sheldon\'s twin sister when she arrives in town. Raj takes part in a drug trial to suppress his selective mutism.', 2, 'SUCCESS', 'PUBLIC', 1, 39, 2048, '2019-09-02 03:16:35'),
(40, 'The Peanut Reaction', 'When Penny learns that Leonard has never had a birthday party, she and the rest of the guys plan a surprise party for him.', 3, 'SUCCESS', 'PUBLIC', 1, 40, 2048, '2019-09-02 03:16:35'),
(41, 'The Tangerine Factor', 'After a bad breakup, Penny finally agrees to go out on a date with Leonard, however they both develop doubts and turn to Sheldon for advice.', 1, 'SUCCESS', 'PUBLIC', 1, 41, 2048, '2019-09-02 03:16:35');

-- --------------------------------------------------------

--
-- Table structure for table `video_files`
--

CREATE TABLE `video_files` (
  `video_id` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `width` int(11) NOT NULL,
  `file_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `video_files`
--

INSERT INTO `video_files` (`video_id`, `height`, `width`, `file_path`) VALUES
(1, 240, 360, 'video/MTWMC2Euya5OvyFNSJJQ.mp4'),
(1, 320, 480, 'video/L2k0JB3VCI2A1UWwVeH7.mp4'),
(2, 240, 360, 'video/3jIOgd6Cb70NiXtx3Y7R.mp4'),
(3, 240, 360, 'video/5wbRp276nXmAqqE1S3m6.mp4'),
(4, 240, 360, 'video/qXtQn6xUnDq0TiUMlG9j.mp4'),
(5, 240, 360, 'video/xsADuBbfAHJ6FczH1Fi1.mp4'),
(5, 320, 480, 'video/1tpr7ls4CI0osUnfh2w4.mp4'),
(5, 480, 720, 'video/2HEhdJyMshSkv195Slth.mp4'),
(6, 240, 360, 'video/bxx4ElVRZqxhyis35Eqw.mp4'),
(7, 240, 360, 'video/w962Ljzh2hapIREfSOum.mp4'),
(8, 240, 360, 'video/Wk1RFoD0nuI2lDJ3tcTd.mp4'),
(9, 240, 360, 'video/cpVEoMIv2X0mL3uA1AZd.mp4'),
(10, 240, 360, 'video/nuCP1GiKDyKO4rEQ98H0.mp4'),
(11, 240, 360, 'video/O9Mn6Yr8YnD6mJC1S9Qz.mp4'),
(12, 240, 360, 'video/EKQTsEoX1Ti8F2vOlWHC.mp4'),
(13, 240, 360, 'video/P3D3laPZUpPkoqkHkndb.mp4'),
(14, 240, 360, 'video/F9ODvOakDhWephVdceAZ.mp4'),
(15, 240, 360, 'video/5FzUimCxLlCD5yKq7Rle.mp4'),
(16, 240, 360, 'video/8jq1lHAQcZLJsiCpeXil.mp4'),
(17, 240, 360, 'video/TiqvRJRvMtPO7vTfqull.mp4'),
(18, 240, 360, 'video/wywZYHnJR58BebWpyUt5.mp4'),
(19, 240, 360, 'video/ydrtGj9BC02G2n9RKVo1.mp4'),
(20, 240, 360, 'video/EJieJBr1juKz8LyCKRPw.mp4'),
(21, 240, 360, 'video/AcWDkDZ2UglRigfnmvXM.mp4'),
(22, 240, 360, 'video/FpTBuxpBNQ33fEvAwN5K.mp4'),
(23, 240, 360, 'video/SNx9nslLcr5q94uUMYok.mp4'),
(24, 240, 360, 'video/2j3Dx2SOKyUwZcpiFFRQ.mp4'),
(25, 240, 360, 'video/iD7FCjicCrGEch3Qji0f.mp4'),
(26, 240, 360, 'video/OwitQJWXiFgYDOzbuc61.mp4'),
(27, 240, 360, 'video/OVXZR2QkDtKztzUsIz3g.mp4'),
(28, 240, 360, 'video/e2KHxUVAjbXVA10k3puN.mp4'),
(29, 240, 360, 'video/DAskl7JsUB8P5MVhh32g.mp4'),
(30, 240, 360, 'video/NlzMSNfJbRd6VxxZUDKm.mp4'),
(31, 240, 360, 'video/MQUcRcdAt6Lm67kOKIXW.mp4'),
(32, 240, 360, 'video/nSUDvEmynbDYM99fkMNp.mp4'),
(33, 240, 360, 'video/EQLIFnlLh548TROyheho.mp4'),
(34, 240, 360, 'video/N6dUz3FCSQ3vAaaK11YB.mp4'),
(35, 240, 360, 'video/NLyTbB0yryehCghTY1cY.mp4'),
(36, 240, 360, 'video/ke1LZwk7KpKuHOUWzzXW.mp4'),
(37, 240, 360, 'video/kNTTxUGQnUIsPOvjKqAD.mp4'),
(38, 240, 360, 'video/2WDFwOiQFtGJxJl4WHfT.mp4'),
(39, 240, 360, 'video/1PpSwbkLPlSSAMvNXoD5.mp4'),
(40, 240, 360, 'video/tgKJxsAByHhhyCINkjPI.mp4'),
(41, 240, 360, 'video/r2RWMYWm4hHTiXmsifPW.mp4');

-- --------------------------------------------------------

--
-- Table structure for table `video_play_history`
--

CREATE TABLE `video_play_history` (
  `id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `play_datetime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `video_play_history`
--

INSERT INTO `video_play_history` (`id`, `video_id`, `user_id`, `play_datetime`) VALUES
(1, 1, 1, '2019-09-02 03:16:35'),
(2, 1, 1, '2019-09-02 03:16:35'),
(3, 1, 1, '2019-09-02 03:16:35'),
(4, 1, 1, '2019-09-02 03:16:35'),
(5, 1, 1, '2019-09-02 03:16:35'),
(6, 1, 1, '2019-09-02 03:16:35'),
(7, 1, 1, '2019-09-02 03:16:35'),
(8, 1, 1, '2019-09-02 03:16:35'),
(9, 1, 1, '2019-09-02 03:16:35'),
(10, 1, 1, '2019-09-16 03:16:35'),
(11, 1, 2, '2019-09-02 03:16:35'),
(12, 1, 2, '2019-09-02 03:16:35'),
(13, 1, 2, '2019-09-02 03:16:35'),
(14, 1, 2, '2019-09-02 03:16:35'),
(15, 1, 2, '2019-09-16 03:16:35'),
(16, 1, 3, '2019-09-02 03:16:35'),
(17, 1, 3, '2019-09-02 03:16:35'),
(18, 1, 3, '2019-09-16 03:16:35'),
(19, 4, 1, '2019-09-02 03:16:35'),
(20, 4, 1, '2019-09-02 03:16:35'),
(21, 4, 1, '2019-09-02 03:16:35'),
(22, 4, 1, '2019-09-02 03:16:35'),
(23, 4, 1, '2019-09-02 03:16:35'),
(24, 4, 1, '2019-09-16 03:16:35'),
(25, 4, 2, '2019-09-02 03:16:35'),
(26, 4, 2, '2019-09-02 03:16:35'),
(27, 4, 2, '2019-09-02 03:16:35'),
(28, 4, 2, '2019-09-02 03:16:35'),
(29, 4, 2, '2019-09-02 03:16:35'),
(30, 4, 2, '2019-09-16 03:16:35'),
(31, 5, 1, '2019-09-16 03:16:35'),
(32, 2, 1, '2019-09-16 03:16:35'),
(33, 2, 2, '2019-09-16 03:16:35'),
(34, 2, 3, '2019-09-16 03:16:35'),
(35, 2, 1, '2019-09-16 03:16:35');

-- --------------------------------------------------------

--
-- Table structure for table `video_screenshots`
--

CREATE TABLE `video_screenshots` (
  `id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `video_screenshots`
--

INSERT INTO `video_screenshots` (`id`, `video_id`, `image_path`, `order`) VALUES
(1, 1, 'screenshot/jN2oFAoDxFx2kwork22E.jpg', 1),
(2, 2, 'screenshot/ZZEEc1jFJtqrAXN2oCi0.jpg', 1),
(3, 3, 'screenshot/CIbxGBz1M64CmY8HRRQs.jpg', 1),
(4, 4, 'screenshot/oVUrHiCKy3Kbxi3IArV1.jpg', 1),
(5, 5, 'screenshot/xKo0ky4z4u5fdIu3ESUm.jpg', 1),
(6, 6, 'screenshot/PCkb2fhtSS500OVgSoRs.jpg', 1),
(7, 7, 'screenshot/fyT8IT00XiNgyvTbMTLe.jpg', 1),
(8, 8, 'screenshot/uJMcSsb4ozRkKMuIQIq0.jpg', 1),
(9, 9, 'screenshot/SapA4lY0F70j8CF0A7ss.jpg', 1),
(10, 10, 'screenshot/UNuy5GHZ4bsluAZMFQR4.jpg', 1),
(11, 11, 'screenshot/e96zHRP1n7sN2ixsxOhu.jpg', 1),
(12, 12, 'screenshot/CO5ogqO4JqKCehI4DCcz.jpg', 1),
(13, 13, 'screenshot/1X4QKfN4uPJGCpuoTHMT.jpg', 1),
(14, 14, 'screenshot/pY8Aw7oWnydc47tjqbE1.jpg', 1),
(15, 15, 'screenshot/EZBB1jfMSNob2HRMbhy3.jpg', 1),
(16, 16, 'screenshot/RnrvuY5lbNx3IQcwcX9V.jpg', 1),
(17, 17, 'screenshot/EEOAutk5sm1RJtzdSh7j.jpg', 1),
(18, 18, 'screenshot/xj0OBTxzuQrqqZutiAoB.jpg', 1),
(19, 19, 'screenshot/xI2zIMYRdv5vpd8uHDWf.jpg', 1),
(20, 20, 'screenshot/2Aps0yV1TrvbuAS1x2RM.jpg', 1),
(21, 21, 'screenshot/9AWtG9jA4JTPbvcfAGHk.jpg', 1),
(22, 22, 'screenshot/dGsu1grziiNEXhgyiqCj.jpg', 1),
(23, 23, 'screenshot/ohlDOTdGBU5T23VmiwBj.jpg', 1),
(24, 24, 'screenshot/ztIwjuck9cpqLI5sAKFj.jpg', 1),
(25, 25, 'screenshot/VGb8lJh6mFXFg4T5dnjx.jpg', 1),
(26, 26, 'screenshot/GhKBdO8j8iB7rTrJffQT.jpg', 1),
(27, 27, 'screenshot/TAUUhffQpNvbuZduXjrG.jpg', 1),
(28, 28, 'screenshot/pbWGNNZmaSSAhRNTmcX5.jpg', 1),
(29, 29, 'screenshot/MlUdsDqRwuQ3XP0fZWOZ.jpg', 1),
(30, 30, 'screenshot/SzoGbcSgojYV7K1rzTQ7.jpg', 1),
(31, 31, 'screenshot/eYjLxeJip5Cd3qFDfJXT.jpg', 1),
(32, 32, 'screenshot/Fx0zkJ2R279ta6hRN7Ge.jpg', 1),
(33, 33, 'screenshot/iHrf2QXX9ZmOPBbnv3ec.jpg', 1),
(34, 34, 'screenshot/JFXCIqNmHmU6cH8FaEit.jpg', 1),
(35, 35, 'screenshot/yXiJNjA7bAnb5PKRMa91.jpg', 1),
(36, 36, 'screenshot/MoxyhSHD3D6sFNumWKd1.jpg', 1),
(37, 37, 'screenshot/QL28DLwgOirvtvgyqzlU.jpg', 1),
(38, 38, 'screenshot/vtjmztvC7nMlO7HziVB1.jpg', 1),
(39, 39, 'screenshot/Sc4OtuykEGPFqMy2YJ1p.jpg', 1),
(40, 40, 'screenshot/lmMzjcMI3YSxjEVpXQxI.jpg', 1),
(41, 41, 'screenshot/4tBp7pcZoRx0lhWXMJZA.jpg', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blacklist`
--
ALTER TABLE `blacklist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `operator_user_id` (`operator_user_id`),
  ADD KEY `punished_user_id` (`punished_user_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_ibfk_2` (`user_id`),
  ADD KEY `comments_ibfk_3` (`reply_comment_id`),
  ADD KEY `comments_ibfk_1` (`video_id`);

--
-- Indexes for table `danmu`
--
ALTER TABLE `danmu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `video_id` (`video_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `episodes`
--
ALTER TABLE `episodes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `program_id` (`program_id`),
  ADD KEY `video_id` (`video_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`video_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `playlists_ibfk_1` (`user_id`);

--
-- Indexes for table `playlist_videos`
--
ALTER TABLE `playlist_videos`
  ADD PRIMARY KEY (`playlist_id`,`video_id`),
  ADD KEY `video_id` (`video_id`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `programs` ADD FULLTEXT KEY `title` (`title`,`description`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `token` (`token`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `video_screenshot_id` (`video_screenshot_id`);
ALTER TABLE `videos` ADD FULLTEXT KEY `title` (`title`,`description`);

--
-- Indexes for table `video_files`
--
ALTER TABLE `video_files`
  ADD PRIMARY KEY (`video_id`,`height`);

--
-- Indexes for table `video_play_history`
--
ALTER TABLE `video_play_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `video_id` (`video_id`);

--
-- Indexes for table `video_screenshots`
--
ALTER TABLE `video_screenshots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `video_id` (`video_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blacklist`
--
ALTER TABLE `blacklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `danmu`
--
ALTER TABLE `danmu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `episodes`
--
ALTER TABLE `episodes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `programs`
--
ALTER TABLE `programs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `video_play_history`
--
ALTER TABLE `video_play_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `video_screenshots`
--
ALTER TABLE `video_screenshots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blacklist`
--
ALTER TABLE `blacklist`
  ADD CONSTRAINT `blacklist_ibfk_1` FOREIGN KEY (`operator_user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `blacklist_ibfk_2` FOREIGN KEY (`punished_user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`reply_comment_id`) REFERENCES `comments` (`id`);

--
-- Constraints for table `danmu`
--
ALTER TABLE `danmu`
  ADD CONSTRAINT `danmu_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`),
  ADD CONSTRAINT `danmu_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `episodes`
--
ALTER TABLE `episodes`
  ADD CONSTRAINT `episodes_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`id`),
  ADD CONSTRAINT `episodes_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`);

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`);

--
-- Constraints for table `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `playlist_videos`
--
ALTER TABLE `playlist_videos`
  ADD CONSTRAINT `playlist_videos_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`),
  ADD CONSTRAINT `playlist_videos_ibfk_2` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`);

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `videos_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `videos_ibfk_3` FOREIGN KEY (`video_screenshot_id`) REFERENCES `video_screenshots` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `video_files`
--
ALTER TABLE `video_files`
  ADD CONSTRAINT `video_files_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`);

--
-- Constraints for table `video_play_history`
--
ALTER TABLE `video_play_history`
  ADD CONSTRAINT `video_play_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `video_play_history_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`);

--
-- Constraints for table `video_screenshots`
--
ALTER TABLE `video_screenshots`
  ADD CONSTRAINT `video_screenshots_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

