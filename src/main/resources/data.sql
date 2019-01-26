INSERT INTO `courses` (`course_id`, `date_created`, `enabled`, `image_name`, `title`, `title_audio`) VALUES
	(1, '2019-01-26 14:05:06', 0, '', 'Introduction to DevOps', '30a78769-ef77-4d94-8dac-dce6d056981a.mp3');

INSERT INTO `stages` (`stage_id`, `step_order`, `title`, `title_audio`, `transcript`, `video_url`, `course_id`) VALUES
	(1, 0, 'First Steps', '1fd750ae-32f9-4205-bda5-49137fa94880.mp3', '', 'video1.mp4', 1);

INSERT INTO `questions` (`question_id`, `explanation`, `explanation_audio`, `question`, `question_audio`, `stage_id`) VALUES
	(1, 'Explanation 3', 'e9ca9f8e-1775-489f-b232-cef56500a2a8.mp3', 'Question 3', '2b595297-e863-47f7-8dc4-0bd183b337f7.mp3', 1),
	(2, 'Explanation 6', '908abb8f-a350-4f92-9a90-2ddc5a5394cc.mp3', 'Question 6', '44bd00e1-41e3-453f-bdf7-9037e69dede4.mp3', 1),
	(3, 'Explanation 6', '3e5edae1-3a84-4745-b0c5-1c62d845482d.mp3', 'Question 1', '8d11b958-fc24-431d-abc7-c48bfd42204e.mp3', 1),
	(4, 'Explanation 5', 'e9a79e3a-0a60-409c-a79e-91da9b0cd9a1.mp3', 'Question 5', '72485958-98c8-42a0-9b52-2447f0b57aa2.mp3', 1),
	(5, 'Explanation 2', '648df04e-2bcb-4b93-8b51-23ecf5d67cbb.mp3', 'Question 2', '5690da7c-c8ba-42b0-82fa-735279298122.mp3', 1),
	(6, 'Explanation 4', '7247a60e-f766-409b-8894-963c000dceab.mp3', 'Question 4', '77af0c3f-e3a8-4bb4-8bff-d7142fcec51f.mp3', 1);

INSERT INTO `question_options` (`option_id`, `is_correct`, `text`, `text_audio`, `question_id`) VALUES
	(1, 0, 'Option 2', '0773a863-4713-4861-810f-4fed8005119c.mp3', 1),
	(2, 1, 'Option 4 (Correct)', '357d194b-d8f9-438b-ab2f-8347b269191c.mp3', 1),
	(3, 1, 'Option 3 (Correct)', 'faeba943-7f0d-42d1-8e9e-e2f03fd4099d.mp3', 1),
	(4, 0, 'Option 1', '6a3e6807-581a-4c93-ac8f-83d63001065c.mp3', 1),
	(5, 1, 'Option 4 (Correct', 'e4ad66f2-efaf-4ab0-b9ce-683af439eb2d.mp3', 2),
	(6, 0, 'Option 2', '62ecd09b-6500-44de-aab1-65db5ef11a42.mp3', 2),
	(7, 0, 'Option 3', 'e5682922-7311-48ca-8456-8e2dde933f02.mp3', 2),
	(8, 0, 'Option 1', 'c409de89-874b-4bcd-9251-3c8fb7caa8ec.mp3', 2),
	(9, 1, 'Option 1 (Correct)', '3c7655e1-73cd-4d88-a2b5-78c157779e3f.mp3', 3),
	(10, 0, 'Option 2', '5b592584-bb6d-4b4c-9f39-3e9b1c24e5b5.mp3', 3),
	(11, 0, 'Option 3', '7f26717d-15f2-43c1-a401-04ad381ae321.mp3', 3),
	(12, 0, 'Option 4', '5c4201cf-c44d-451c-b4d5-ac407092891c.mp3', 3),
	(13, 0, 'Option 3', 'a4f51cca-903c-4252-b8cc-ebaac2c53c62.mp3', 4),
	(14, 0, 'Option 4', 'efbe8d52-3ba4-4ea5-a4c0-40a0f8273e5f.mp3', 4),
	(15, 0, 'Option 1', '2f43d04c-ce92-4d03-b029-996b26040b5b.mp3', 4),
	(16, 1, 'Option 2 (Correct)', '8368e7d7-a9c9-469d-a0ae-cf7484ba08ee.mp3', 4),
	(17, 0, 'Option 4', '9ec1d6e9-4a1a-4d84-984a-e8f84f09212e.mp3', 5),
	(18, 0, 'Option 2', '6fe77008-f3c2-40ef-9c3f-df06e051840c.mp3', 5),
	(19, 1, 'Option 3 (Correct)', 'febbf401-d46a-4675-b091-52d1773aff8e.mp3', 5),
	(20, 0, 'Option 1', 'd1ebd634-2167-43f2-8a53-e9b8f902ccc9.mp3', 5),
	(21, 0, 'Option 4', 'f38d20df-0b6e-4f47-9a2f-9cb34efbe24a.mp3', 6),
	(22, 1, 'Option 1 (Correct', '9e1d2e2c-7555-49b5-9787-cb557a735cec.mp3', 6),
	(23, 0, 'Option 3', '968bd2de-d517-4599-9639-4e74e1fa6b5f.mp3', 6),
	(24, 0, 'Option 2', 'bc4b974e-9d86-4d24-95cb-3ba4f96a24fe.mp3', 6);

INSERT INTO `roles` (`role_id`, `role`) VALUES
	(1, 'TRAINEE'),
	(2, 'ADMIN'),
	(3, 'MANAGER');

INSERT INTO `users` (`user_id`, `email`, `enabled`, `firstname`, `password`, `registered_on`, `surname`) VALUES
	(1, 'mdgriffin064@gmail.com', 1, 'Michael', '$2a$10$/OiXpvP7S82iCnQ.dKrjXuJ2DQqOPcJhLl9lKALpC4y83grwEXokS', '2019-01-26 13:25:14', 'Griffin'),
	(2, 'andrew.shields@example.com', 1, 'Andrew', '$2a$10$jafIhwT2rTAH/iU8bFH5SOndKjSTznxVklY12DYA9kF7CYro/ytv6', '2019-01-26 13:39:27', 'Shields'),
	(3, 'j.doe@example.com', 1, 'John', '$2a$10$/k.Y53uzfrJWyWObCPNB4.Wk5g7QoDJsGJQoB7pOjjYpux3NlXfIu', '2019-01-26 14:09:00', 'Doe');

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
	(1, 2),
	(2, 3),
	(3, 1);