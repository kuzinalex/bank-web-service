CREATE TABLE `bank` (
  `id` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `client` (
  `id` bigint NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `bank_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKim95abd01ot21q2dn9mpxo7nc` (`bank_id`),
  CONSTRAINT `FKim95abd01ot21q2dn9mpxo7nc` FOREIGN KEY (`bank_id`) REFERENCES `bank` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `worker` (
  `id` bigint NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `bank_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhl74dyu4qp78u8tjplih02b5x` (`bank_id`),
  CONSTRAINT `FKhl74dyu4qp78u8tjplih02b5x` FOREIGN KEY (`bank_id`) REFERENCES `bank` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `bank_account` (
  `id` bigint NOT NULL,
  `amount` double DEFAULT NULL,
  `amount_of_credit` double DEFAULT NULL,
  `currency` double DEFAULT NULL,
  `client_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjuqwfph00x8hxnfo002xx0y25` (`client_id`),
  CONSTRAINT `FKjuqwfph00x8hxnfo002xx0y25` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `usr` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `last_visit` datetime DEFAULT NULL,
  `local` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user_pic` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
