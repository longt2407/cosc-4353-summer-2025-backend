-- volunteer --

INSERT INTO `volunteer` (
    `id`,
    `email`,
    `password`,
    `reset_password_question`,
    `reset_password_answer`,
    `first_name`,
    `last_name`,
    `address_1`,
    `address_city`,
    `address_state`,
    `address_zip`,
    `skill`,
    `availability`
)
VALUES
(
    1,
    'volunteer1@domain.com',
    '$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa', -- 123456
    '1 + 1 = ?',
    '$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu', -- 2
    'volunteer',
    '1',
    '123 Street Dr',
    'Houston',
    'TX',
    '70000',
    '["communication","technology","leader"]',
    '["2025-07-28T03:11:45.818Z","2025-07-29T03:11:45.818Z","2025-07-30T03:11:45.818Z"]'
), (
    2,
    'volunteer2@domain.com',
    '$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa', -- 123456
    '1 + 1 = ?',
    '$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu', -- 2
    'volunteer',
    '2',
    '456 Street Dr',
    'Austin',
    'TX',
    '70000',
    '["strong","technology"]',
    '["2025-07-27T03:15:31.611Z","2025-07-28T03:15:31.611Z","2025-07-29T03:15:31.611Z"]'
), (
    3,
    'volunteer3@domain.com',
    '$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa', -- 123456
    '1 + 1 = ?',
    '$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu', -- 2
    'volunteer',
    '3',
    '789 Street Dr',
    'Austin',
    'TX',
    '70000',
    '["strong","technology"]',
    '["2025-07-29T03:15:31.611Z","2025-07-30T03:15:31.611Z","2025-07-31T03:15:31.611Z"]'
), (
    4,
    'volunteer4@domain.com',
    '$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa', -- 123456
    '1 + 1 = ?',
    '$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu', -- 2
    'volunteer',
    '4',
    '012 Street Dr',
    'Austin',
    'TX',
    '70000',
    '["communication","leader"]',
    '["2025-07-27T03:15:31.611Z","2025-07-28T03:15:31.611Z"]'
), (
    5,
    'volunteer5@domain.com',
    '$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa', -- 123456
    '1 + 1 = ?',
    '$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu', -- 2
    'volunteer',
    '5',
    '345 Street Dr',
    'Austin',
    'TX',
    '70000',
    '["communication","technology"]',
    '["2025-07-29T03:15:31.611Z","2025-07-30T03:15:31.611Z"]'
), (
    6,
    'volunteer6@domain.com',
    '$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa', -- 123456
    '1 + 1 = ?',
    '$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu', -- 2
    'volunteer',
    '6',
    '678 Street Dr',
    'Austin',
    'TX',
    '70000',
    '["strong","leader"]',
    '["2025-07-31T03:15:31.611Z"]'
), (
    7,
    'volunteer7@domain.com',
    '$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa', -- 123456
    '1 + 1 = ?',
    '$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu', -- 2
    'volunteer',
    '7',
    '901 Street Dr',
    'Austin',
    'TX',
    '70000',
    '["strong"]',
    '["2025-07-27T03:15:31.611Z","2025-07-31T03:15:31.611Z"]'
), (
    8,
    'volunteer8@domain.com',
    '$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa', -- 123456
    '1 + 1 = ?',
    '$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu', -- 2
    'volunteer',
    '8',
    '234 Street Dr',
    'Austin',
    'TX',
    '70000',
    '["leader"]',
    '["2025-07-28T03:15:31.611Z","2025-07-30T03:15:31.611Z"]'
), (
    9,
    'volunteer9@domain.com',
    '$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa', -- 123456
    '1 + 1 = ?',
    '$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu', -- 2
    'volunteer',
    '9',
    '567 Street Dr',
    'Austin',
    'TX',
    '70000',
    '["technology"]',
    '["2025-07-27T03:15:31.611Z","2025-07-29T03:15:31.611Z"]'
), (
    10,
    'volunteer10@domain.com',
    '$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa', -- 123456
    '1 + 1 = ?',
    '$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu', -- 2
    'volunteer',
    '10',
    '890 Street Dr',
    'Austin',
    'TX',
    '70000',
    '["communication"]',
    '["2025-07-28T03:15:31.611Z","2025-07-30T03:15:31.611Z"]'
);

-- admin --

INSERT INTO `admin` (
    `id`,
    `email`,
    `password`,
    `reset_password_question`,
    `reset_password_answer`,
    `first_name`,
    `last_name`
)
VALUES
(
    1,
    'admin1@domain.com',
    '$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa', -- 123456
    '1 + 1 = ?',
    '$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu', -- 2
    'admin',
    '1'
), (
    2,
    'admin2@domain.com',
    '$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa', -- 123456
    '1 + 1 = ?',
    '$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu', -- 2
    'admin',
    '2'
);

-- event --

INSERT INTO `event` (
   `id`,
   `admin_id`,
   `name`,
   `description`,
   `location`,
   `skill`,
   `urgency`,
   `date`
)
VALUES
   (
       101,
       1,
       'Food Drive',
       'Help organize and distribute food to families in need.',
       'Community Center, Houston, TX',
       '["organization", "teamwork"]',
       2,
       '2025-05-01 09:00:00'
   ),
   (
       102,
       1,
       'Beach Cleanup',
       'Clean up litter along the shoreline and promote environmental awareness.',
       'Galveston Beach, TX',
       '["physical", "environmental"]',
       3,
       '2025-06-10 08:30:00'
   ),
   (
       103,
       1,
       'Toy Donation Drive',
       'Collect and distribute toys to children in local shelters.',
       'Main Street Shelter, Houston, TX',
       '["organization", "communication"]',
       1,
       '2025-06-25 11:00:00'
   ),
   (
       104,
       1,
       'Park Restoration',
       'Assist with planting trees and cleaning public park areas.',
       'Memorial Park, Houston, TX',
       '["gardening", "maintenance"]',
       2,
       '2025-06-15 10:00:00'
   );


INSERT INTO `volunteer_history` (`volunteer_id`, `event_id`, `type`, `date`)
VALUES
   (1, 101, 'assigned', '2025-05-01'),
   (1, 102, 'participated', '2025-06-10'),
   (1, 103, 'no-show', '2025-06-25'),
   (2, 104, 'assigned', '2025-06-15');

