-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Дек 17 2022 г., 12:36
-- Версия сервера: 10.4.25-MariaDB
-- Версия PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `portfolio`
--

-- --------------------------------------------------------

--
-- Структура таблицы `category`
--

CREATE TABLE `category` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Учебные достижения'),
(2, 'Лабораторные'),
(3, 'Резюме'),
(4, 'Курсовая');

-- --------------------------------------------------------

--
-- Структура таблицы `direction`
--

CREATE TABLE `direction` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `direction`
--

INSERT INTO `direction` (`id`, `name`) VALUES
(1, 'Фундаментальная информатика'),
(3, 'Прикладная информатика'),
(4, 'Информационная безопасность'),
(5, 'Государственное муниципальное управление');

-- --------------------------------------------------------

--
-- Структура таблицы `faculty`
--

CREATE TABLE `faculty` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `university_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `faculty`
--

INSERT INTO `faculty` (`id`, `name`, `university_id`) VALUES
(1, 'ИМИТ', 1),
(2, 'МИЭЛ', 1),
(3, 'Физический', 1),
(4, 'Экономический', 1),
(5, 'Инноватика', 2),
(6, 'Нанотехнологии и микропроцессорная техника', 2),
(7, 'Экономика и право', 5);

-- --------------------------------------------------------

--
-- Структура таблицы `student_group`
--

CREATE TABLE `student_group` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `direction_id` int(10) NOT NULL,
  `faculty_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `student_group`
--

INSERT INTO `student_group` (`id`, `name`, `direction_id`, `faculty_id`) VALUES
(1, '02371-ДБ', 1, 1),
(2, '123', 1, 2),
(4, 'БД-321', 5, 2),
(5, 'БД-541', 5, 2),
(6, 'ПР-529', 4, 3),
(7, 'ГГ-761', 5, 4),
(8, 'ПБ-481', 5, 5),
(9, 'НМБ-213', 3, 6),
(10, 'ПК-571', 5, 7);

-- --------------------------------------------------------

--
-- Структура таблицы `university`
--

CREATE TABLE `university` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `university`
--

INSERT INTO `university` (`id`, `name`) VALUES
(1, 'ИГУ'),
(2, 'ИРНИТУ'),
(5, 'БГУ');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `student_group_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `name`, `login`, `password`, `student_group_id`) VALUES
(1, 'Иванов Иван', 'user1', 'password1', 1),
(2, 'Петров Петр', 'user2', 'password2', 1),
(3, 'admin', 'admin', '$2a$10$umiDzNoJliwSRMSnzQWJOO/5bIFJiEUasG/b94nH6FX4dFsiY85pm', 1),
(4, 'Петров Петр', 'qwerty', '$2a$10$k.v7u/nvaihWvDqFWdGBgOaOisKQoSynP.RcFwAz2YG7n0Z4AM4K2', 1),
(5, 'Кириченко Кирилл', 'qwerty1', '$2a$10$UCXcJtiEo3Nv0BPWulvNKOCGrpwCIOFH1dx5MMdmxXO3eWV0zm9QO', 2),
(6, 'Дубешко Юлия', 'dubeshko', '$2a$10$Q/kBA9b./3jL0eLHWkZXKOFrxpi7ylX7lypN5Pbs9uAPMqRwCn2l.', 1),
(7, 'Бубнов Роман', 'login', 'password', 4),
(8, 'Картошкин Олег', 'login', 'password', 5),
(9, 'Речкин Саша', 'login', 'password', 4),
(10, 'Орлов Олег', 'login', 'password', 5),
(11, 'Пригожин Анатолий', 'login', 'password', 6),
(12, 'Кошкин Николай', 'login', 'password', 6);

-- --------------------------------------------------------

--
-- Структура таблицы `work`
--

CREATE TABLE `work` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `category_id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(150) NOT NULL,
  `year` date NOT NULL,
  `link` varchar(50) NOT NULL,
  `mime_type` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `work`
--

INSERT INTO `work` (`id`, `user_id`, `category_id`, `name`, `description`, `year`, `link`, `mime_type`) VALUES
(7, 6, 4, 'Лабораторная', 'Веб-приложения', '2022-12-15', '7526bd16-e323-4d70-8375-dca67fe2a77a.png', 'image/png'),
(8, 6, 1, 'Лабораторная', 'Информатика', '2022-11-30', '2d66407a-5289-4311-92a5-8337c5b50cbf.png', 'image/png'),
(9, 6, 4, 'Курсовая работа', 'Веб-приложения', '2022-12-08', '85c9bc11-cc08-4252-96a2-9468df57b612.png', 'image/png'),
(10, 6, 2, 'Лабораторная 1', 'Информатика', '2022-12-11', '978bdea7-ce96-4201-946c-191eeb8b22ba.png', 'image/png'),
(11, 6, 3, 'Резюме', 'Резюме для меня', '2022-12-06', 'e988e46d-3c40-40d4-ba0a-5aee58c9dd0a.png', 'image/png');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `direction`
--
ALTER TABLE `direction`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`id`),
  ADD KEY `university_id` (`university_id`);

--
-- Индексы таблицы `student_group`
--
ALTER TABLE `student_group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `direction_id` (`direction_id`),
  ADD KEY `faculty_id` (`faculty_id`);

--
-- Индексы таблицы `university`
--
ALTER TABLE `university`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_group_id` (`student_group_id`);

--
-- Индексы таблицы `work`
--
ALTER TABLE `work`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `category`
--
ALTER TABLE `category`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `direction`
--
ALTER TABLE `direction`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `faculty`
--
ALTER TABLE `faculty`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `student_group`
--
ALTER TABLE `student_group`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `university`
--
ALTER TABLE `university`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `work`
--
ALTER TABLE `work`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `faculty`
--
ALTER TABLE `faculty`
  ADD CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`university_id`) REFERENCES `university` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `student_group`
--
ALTER TABLE `student_group`
  ADD CONSTRAINT `student_group_ibfk_1` FOREIGN KEY (`direction_id`) REFERENCES `direction` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_group_ibfk_2` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`student_group_id`) REFERENCES `student_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `work`
--
ALTER TABLE `work`
  ADD CONSTRAINT `work_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `work_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
