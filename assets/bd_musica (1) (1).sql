drop database if exists bquate_test_musica;
create database bquate_test_musica;
use bquate_test_musica;

create table users(
 id int auto_increment primary key,
 name varchar(100), 
 email varchar(50),
 countrycode varchar(50),
 status int
);

create table albums(
 id int auto_increment primary key,
 title varchar(255),
 artist varchar(255),
 label varchar(255),
 upc varchar(255),
 genre varchar(255),
 userid int,
 status int,
 CONSTRAINT albums_users FOREIGN KEY (userid) REFERENCES users (id) 
 ON UPDATE no action ON DELETE no action
);

create table tracks(
id int auto_increment primary key,
 title  varchar(255),
 artist  varchar(255),
 isrc  varchar(255),
 albumid int,
 genre  varchar(255),
 userid int,
 status int,
 CONSTRAINT tracks_albums FOREIGN KEY (albumid) REFERENCES albums (id) 
 ON UPDATE no action ON DELETE no action
 );

create table country(
id int auto_increment primary key,
code  varchar(50),
name  varchar(255)
);
-- ----------------------------------------- INSERTAR DATOS ---------------------------------------
-- USERS
INSERT INTO `users` (`id`,`name`,`email`,`countrycode`,`status`) VALUES (22,'Felipe','mercury.musica@gmail.com','CO',1);
INSERT INTO `users` (`id`,`name`,`email`,`countrycode`,`status`) VALUES (24,'Desire','desmandriba@yahoo.com','PE',1);
INSERT INTO `users` (`id`,`name`,`email`,`countrycode`,`status`) VALUES (26,'Diego','cobra.rockmetal@gmail.com','PE',1);
INSERT INTO `users` (`id`,`name`,`email`,`countrycode`,`status`) VALUES (42,'Diego','diegoreyes.bernardini@gmail.com','PE',1);
INSERT INTO `users` (`id`,`name`,`email`,`countrycode`,`status`) VALUES (183,'Guillermo','guillermobruno@rocketmail.com','AR',1);
INSERT INTO `users` (`id`,`name`,`email`,`countrycode`,`status`) VALUES (195,'Joel','djcaile@outlook.com','CL',1);
-- ALBUMS
INSERT INTO `albums` (`id`,`title`,`artist`,`label`,`upc`,`genre`,`userid`,`status`) VALUES (10,'To Hell','Cobra','Austral Holocaust Productions','4250936511415','ROCK',26,1);
INSERT INTO `albums` (`id`,`title`,`artist`,`label`,`upc`,`genre`,`userid`,`status`) VALUES (12,'After','Vanilla Funk','Independiente','634654350398','ROCK',42,1);
INSERT INTO `albums` (`id`,`title`,`artist`,`label`,`upc`,`genre`,`userid`,`status`) VALUES (13,'We Are Mercury','Mercury','All We Do Is Party','634654350206','DANCE',22,1);
INSERT INTO `albums` (`id`,`title`,`artist`,`label`,`upc`,`genre`,`userid`,`status`) VALUES (14,'Amante','Desiré Mandrile','Lupa','634654350060','R_B_SOUL',24,1);
INSERT INTO `albums` (`id`,`title`,`artist`,`label`,`upc`,`genre`,`userid`,`status`) VALUES (142,'Lethal Strike','Cobra','Austral Holocaust','4250936511316','ROCK',26,1);
INSERT INTO `albums` (`id`,`title`,`artist`,`label`,`upc`,`genre`,`userid`,`status`) VALUES (2146,'Likeflow (Tropical Dance Music)','DJ Caile','Independiente','634654352965','DANCE',195,1);
INSERT INTO `albums` (`id`,`title`,`artist`,`label`,`upc`,`genre`,`userid`,`status`) VALUES (4587,'Tormenta','Desire Mandrile',NULL,'634654356031','ALTERNATIVE',24,1);
INSERT INTO `albums` (`id`,`title`,`artist`,`label`,`upc`,`genre`,`userid`,`status`) VALUES (8092,'Indómitos','Desire Mandrile ',NULL,'634654363220','POP',24,1);
INSERT INTO `albums` (`id`,`title`,`artist`,`label`,`upc`,`genre`,`userid`,`status`) VALUES (10479,'Cumbia Space (Digital Cumbia 2017)','Mooglisound','Independiente','634654367914','ELECTRONIC',195,1);
INSERT INTO `albums` (`id`,`title`,`artist`,`label`,`upc`,`genre`,`userid`,`status`) VALUES (20840,'Intensidad','Desire Mandrile','Independiente','651973325548','LATIN',24,1);
-- TRACKS
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (1,'Cuando pienso en ti','Desiré Mandrile Ballón','PEDM11403001',14,'ROCK',24,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (2,'Lo que no fue no será','Desiré Mandrile Ballón','PEDM11403002',14,'R_B_SOUL',24,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (3,'Ahora','Desiré Mandrile Ballón','PEDM11403003',14,'R_B_SOUL',24,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (4,'Almohada','Desiré Mandrile Ballón','PEDM11403004',14,'R_B_SOUL',24,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (5,'Cuando llegue la hora','Desiré Mandrile Ballón','PEDM11403005',14,'R_B_SOUL',24,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (6,'Mío','Desiré Mandrile Ballón','PEDM11403006',14,'R_B_SOUL',24,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (7,'Que somos amantes','Desiré Mandrile Ballón','PEDM11403007',14,'R_B_SOUL',24,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (8,'Cóncavo y convexo','Desiré Mandrile Ballón','PEDM11403008',14,'R_B_SOUL',24,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (9,'Aventurero','Desiré Mandrile Ballón','PEDM11403009',14,'R_B_SOUL',24,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (10,'Jamás impedirás','Desiré Mandrile Ballón','PEDM11403010',14,'R_B_SOUL',24,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (32,'El lagarto','Diego Reyes Bernardini','PEBQ91400305',12,'ROCK',42,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (33,'Ghostbusters','Diego Reyes Bernardini','PEBQ91400306',12,'ROCK',42,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (34,'Máncora','Diego Reyes Bernardini','PEBQ91400307',12,'ROCK',42,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (35,'Mario Bross','Diego Reyes Bernardini','PEBQ91400308',12,'ROCK',42,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (36,'Mingacho','Diego Reyes Bernardini','PEBQ91400309',12,'ROCK',42,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (37,'Strikeforce','Diego Reyes Bernardini','PEBQ91400310',12,'ROCK',42,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (38,'Payasito','Diego Reyes Bernardini','PEBQ91400311',12,'ROCK',42,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (39,'Beyond the Curse','Austral Holocaust Productions','PEBQ91400009',10,'ROCK',26,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (40,'Fallen Soldier','Austral Holocaust Productions','PEBQ91400010',10,'ROCK',26,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (41,'Danger Zone','Austral Holocaust Productions','PEBQ91400011',10,'ROCK',26,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (42,'Rough Riders','Austral Holocaust Productions','PEBQ91400012',10,'ROCK',26,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (43,'Beware My Wrath','Austral Holocaust Productions','PEBQ91400013',10,'ROCK',26,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (44,'When I Walk the Streets','Austral Holocaust Productions','PEBQ91400014',10,'ROCK',26,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (45,'To Hell','Austral Holocaust Productions','PEBQ91400015',10,'ROCK',26,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (46,'Inner Demon','Austral Holocaust Productions','PEBQ91400016',10,'ROCK',26,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (47,'Overwhelmed','Austral Holocaust Productions','PEBQ91400364',142,'ROCK',26,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (48,'Rockmetal','Austral Holocaust Productions','PEBQ91400365',142,'ROCK',26,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (49,'Men of War','Austral Holocaust Productions','PEBQ91400366',142,'ROCK',26,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (50,'Whitechapel','Austral Holocaust Productions','PEBQ91400367',142,'ROCK',26,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (51,'The Roadrunner (Bite my Dust)','Austral Holocaust Productions','PEBQ91400368',142,'ROCK',26,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (52,'Denim Attack','Austral Holocaust Productions','PEBQ91400369',142,'ROCK',26,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (53,'Blessed by Beer','Austral Holocaust Productions','PEBQ91400370',142,'ROCK',26,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (54,'Scene of Our End','Austral Holocaust Productions','PEBQ91400371',142,'ROCK',26,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (55,'Highland Warrior','Austral Holocaust Productions','PEBQ91400372',142,'ROCK',26,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (70,'Don\'t You know Why','Felipe Gordon, Camilo Gómez, Leonardo La Rotta, Santiago Uribe, Juan Uribe','PEBQ91400046',13,'DANCE',22,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (71,'Going On (Ft Purple Zippers)','Felipe Gordon, Camilo Gómez, Leonardo La Rotta, Santiago Uribe, Juan Uribe','PEBQ91400047',13,'DANCE',22,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (72,'Jelly Beach','Felipe Gordon, Camilo Gómez, Leonardo La Rotta, Santiago Uribe, Juan Uribe','PEBQ91400048',13,'DANCE',22,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (73,'Right Now','Felipe Gordon, Camilo Gómez, Leonardo La Rotta, Santiago Uribe, Juan Uribe','PEBQ91400049',13,'DANCE',22,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (77,'Likeflow (Tropical Dance Music)','Joel Saez','PEBQ91502130',2146,'DANCE',195,1);
INSERT INTO `tracks` (`id`,`title`,`artist`,`isrc`,`albumid`,`genre`,`userid`,`status`) VALUES (78,'Cumbia Space (Digital Cumbia 2017)',NULL,'PEBQ91610734',10479,'ELECTRONIC',195,1);
-- COUNTRY
INSERT INTO `country` (`id`,`code`,`name`) VALUES (1,'AR','Argentina');
INSERT INTO `country` (`id`,`code`,`name`) VALUES (2,'CO','Colombia');
INSERT INTO `country` (`id`,`code`,`name`) VALUES (3,'PE','Peru');