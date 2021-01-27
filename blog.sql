-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Янв 27 2021 г., 18:57
-- Версия сервера: 5.7.32-cll-lve
-- Версия PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `ktfzxxfa_diit_it`
--

-- --------------------------------------------------------

--
-- Структура таблицы `like`
--

CREATE TABLE `like` (
  `id` int(11) UNSIGNED NOT NULL,
  `post_id` int(11) UNSIGNED DEFAULT NULL,
  `user_id` int(11) UNSIGNED DEFAULT NULL,
  `plus` tinyint(1) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `like`
--

INSERT INTO `like` (`id`, `post_id`, `user_id`, `plus`) VALUES
(1, 15, 1, 0),
(2, 15, 2, 0),
(3, 15, 3, 0),
(4, 12, 1, 1),
(5, 12, 2, 1),
(6, 12, 3, 1),
(7, 14, 1, 0),
(8, 13, 1, 1),
(9, 7, 1, 1),
(10, 6, 1, 0),
(11, NULL, 6, 0),
(12, 15, 6, 0),
(13, 14, 6, 1),
(14, NULL, 1, 1),
(15, 27, 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `post`
--

CREATE TABLE `post` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED DEFAULT NULL,
  `title` tinytext COLLATE utf8mb4_unicode_ci,
  `text` text COLLATE utf8mb4_unicode_ci,
  `created` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `post`
--

INSERT INTO `post` (`id`, `user_id`, `title`, `text`, `created`) VALUES
(1, 1, 'Title', 'The [b]post[/b].', '2019-04-23 05:43:43'),
(2, 3, 'Title', '330439002', '2019-04-23 05:45:00'),
(3, 1, 'Title', '346645064', '2019-04-23 05:45:02'),
(4, 1, 'Title', '1047822884', '2019-04-23 05:45:03'),
(5, 1, 'Title', '25013628', '2019-04-23 05:45:03'),
(6, 1, 'Title', '1022885727', '2019-04-23 05:45:05'),
(7, 1, 'Title', '395124615', '2019-04-23 05:45:05'),
(8, 1, 'Title', '1134336761', '2019-04-23 05:45:06'),
(9, 1, 'Title', '511542932', '2019-04-23 05:45:07'),
(10, 1, 'Title', '2066389856', '2019-04-23 05:45:07'),
(11, 1, 'Title', 'The [b]post[/b].', '2019-04-23 06:45:46'),
(12, 1, 'Title', 'L 3', '2019-04-23 06:46:33'),
(13, 1, 'Title', 'The [b]post[/b].', '2019-04-23 06:46:55'),
(14, 1, 'Title', 'L 0', '2019-04-23 06:47:41'),
(15, 1, 'title', 'te xt\r\nL 1', '2019-04-29 06:43:56'),
(24, 1, 'markup', '[b]b[/b]\n[i]i[/i]\n[u]u[/u]\n[s]s[/s]', '2019-05-29 15:58:21'),
(26, 1, 'image', '[img]http://localhost/img/linus.jpeg[/img]', '2019-05-29 15:59:01'),
(27, 1, '12 концепций JavaScript, о которых нужно знать', '[img]http://localhost/img/12-javascript.jpeg[/img]\r\nПонимание того, как именно в JavaScript назначаются значения переменных крайне важно для тех, кто хочет писать правильно работающий код. Непонимание этого механизма ведёт к написанию программ, в которых значения переменных могут непреднамеренно меняться.\r\nJavaScript, если некая сущность имеет один из примитивных типов (в частности — это типы Boolean, null, undefined, String и Number), всегда работает со значением этой сущности. То есть, в соответствующую переменную записывается именно значение. Если же речь идёт об объекте (это, например, типы Object, Array, Function), то, при назначении его переменной, в неё записывается ссылка на него, адрес, по которому он расположен в памяти.\r\nРассмотрим пример. В следующем фрагменте кода в переменную var1 записана строка. После этого в переменную var2 записано значение переменной var1. Так как переменная var1 имеет примитивный тип (String), то в var2 будет записана копия строки, имеющейся в var1. Это позволяет рассматривать var2 как переменную, полностью независимую от var1, хотя и хранящую то же значение, что и var1. Запись в var2 нового значения на var1 не влияет.\r\nИсточник: https://habr.com/ru/company/ruvds/blog/441566/', '2019-05-29 16:01:47'),
(33, 6, 'Линус Торвальдс не верит, что серверы на ARM-архитектуре заменят x86. «Продавать 64-битную модель — идиотизм»', '[img]http://localhost/img/linus.jpeg[/img]\r\nНа прошлой неделе компания ARM Holdings объявила, что разрабатывает новую микро-архитектуру для серверных процессоров. Вычислительное ядро, которое будет в ней использоваться, носит кодовое имя Ares, и по обещаниям должно дать 60% прирост по сравнению с текущей платформой. С каждым следующим поколением производительность должна расти еще на 30%. \r\nСерверный рынок — пока не самый большой для ARM. Сейчас процессоры на ее архитектуре используются в мобильных и встраиваемых устройствах. Скачок производительности, который компания обещает производителям серверов, будет выше чем Intel и IBM проделали за последние несколько лет.\r\nТем не менее, создатель Linux Линус Торвальдс скептично прокомментировал анонс. Он считает, что будущее новой архитектуры не так радужно.\r\nИсточник: https://habr.com/ru/post/441664/', '2019-05-29 16:13:03'),
(34, 1, 'Test post #2', '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25', '2021-01-27 14:56:11');

-- --------------------------------------------------------

--
-- Структура таблицы `token`
--

CREATE TABLE `token` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED DEFAULT NULL,
  `token` char(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `token`
--

INSERT INTO `token` (`id`, `user_id`, `token`, `created`) VALUES
(1, 1, 'V84WJTbW23XDlCd1ylf56juZo6PZDyYv', '2019-04-23 05:43:43'),
(2, 1, 'zkOpyfZLNmW4CAcznNQNeYuQeFuMT68L', '2019-04-29 06:19:05'),
(3, 1, '23qkQLlOr6OWXOezWjfZyDC50ZByFvfk', '2019-05-11 10:36:25'),
(4, 1, '7LO1i8V3RXnabE1ZkeroscjQfVl9NAuL', '2019-05-11 10:38:04'),
(5, 1, 'IMkX03HQqQZdsLV44k1Wq35MrGDvbtth', '2019-05-11 10:40:23'),
(6, 1, 'VHIY51gdqVbmEcvGqNPhNk8KnkeHLPtv', '2019-05-11 13:44:29'),
(7, 1, 'FPox7iqZqK7vRdpzTO3HpFo2Kge7J9jS', '2019-05-11 13:51:39'),
(8, 1, '88qzGldhl0neCNnU4T6kDKdq104I39Go', '2019-05-11 13:59:54'),
(9, 1, 'itjRqcs5TYjuAJaYoUOqKyf3x2MYaD2m', '2019-05-11 14:01:30'),
(10, 1, 'NEUrK6SgWsCql56qWpABUUySLLAMqtjX', '2019-05-11 14:03:22'),
(11, 1, 'LnVdyGqLcjUo1A9J9bXXlQLFzyBehOpG', '2019-05-14 07:03:58'),
(12, 5, '20K1qWdplQPaRdar4gxFsXx4hIxQglq9', '2019-05-29 11:45:49'),
(13, 6, 'GelLJO8dcaHHycccS6BM56X1iavlQRhO', '2019-05-29 14:04:27'),
(14, 6, 'u2Sb1SbKyt5L0D8SNyZARWhxGF6hFX2E', '2019-05-29 14:08:12'),
(15, 1, 'iG3eNFbxE9V9ma0kDUiDj8uTPPNSAi32', '2019-05-29 14:57:02'),
(16, 1, 'pmnyJvEp4Eq7qKQK63ZqjIHQncdO9jhL', '2019-05-29 14:58:02'),
(17, 1, 'uoRhckGXPTnknav6MbuqTA7tIROap2yN', '2021-01-27 14:56:03');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) UNSIGNED NOT NULL,
  `nick` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` char(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `nick`, `email`, `password`, `created`) VALUES
(1, 'artem', 'nartem277@gmail.com', 'W5JZAAguOADVI61VJMLrDtygRRSkW6a$21fdbf7ec7cc9796750aa5a3cc9687e9', '2019-04-23 05:43:43'),
(2, 'artem2', 'nartem27@gmail.com', 'L4HgOJ7cxnC5sNEfyyU5b0staCvLCyk$9effee45ab9c24bcbb2cdd49613f7634', '2019-04-23 07:09:53'),
(3, 'artem4', 'nartem2776@gmail.com', 'TWXXeO9sj4l7sfuhjt8O489MtNe5lfU$13284199cb11fd8776fe1e1be8587b86', '2019-04-23 07:10:42'),
(4, 'artem555', 'nartem27@yandex.ru', 'eerKqDooR0eh2fVlz15YeNOTjpnYoOJ$c3b794dcbd395799c790178ad48212ab', '2019-04-29 06:51:49'),
(5, 'catat', 'catat@ya.ru', 'ZZIaCx31OqiDRrOApDbvpVYZLJa77rc$dd75492031f9b0c2fba5520d2144ca7c', '2019-05-29 11:45:37'),
(6, 'nyan1', 'nyan1@localhost.ru', 'Nz42JMXRFVQqppD3AEiKoSlr6vqR40a$dcc14fd8f9b0246d7b6ab0a6b4a446ef', '2019-05-29 14:02:38');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `like`
--
ALTER TABLE `like`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_foreignkey_like_user` (`user_id`),
  ADD KEY `index_foreignkey_like_post` (`post_id`);

--
-- Индексы таблицы `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_foreignkey_post_user` (`user_id`);

--
-- Индексы таблицы `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_foreignkey_token_user` (`user_id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `like`
--
ALTER TABLE `like`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT для таблицы `token`
--
ALTER TABLE `token`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `like`
--
ALTER TABLE `like`
  ADD CONSTRAINT `c_fk_like_post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `c_fk_like_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Ограничения внешнего ключа таблицы `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `c_fk_post_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Ограничения внешнего ключа таблицы `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `c_fk_token_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
