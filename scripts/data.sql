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
    '["2025-07-28T12:00:00.000Z","2025-07-29T12:00:00.000Z","2025-07-30T12:00:00.000Z"]'
), (
    2, 
    'volunteer2@domain.com', 
    '$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa', -- 123456
    '1 + 1 = ?',
    '$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu', -- 2
    'volunteer',
    '2',
    '456 Abc Dr',
    'Austin',
    'TX',
    '70000',
    '["strong","technology"]',
    '["2025-07-27T12:00:00.000Z","2025-07-28T12:00:00.000Z","2025-07-29T12:00:00.000Z"]'
), (
    3, 
    'volunteer3@domain.com', 
    '$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa', -- 123456
    '1 + 1 = ?',
    '$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu', -- 2
    'volunteer',
    '3',
    '789 Fgh St',
    'Austin',
    'TX',
    '70000',
    '["strong","technology"]',
    '["2025-07-29T12:00:00.000Z","2025-07-30T12:00:00.000Z","2025-07-31T12:00:00.000Z"]'
), (
    4, 
    'volunteer4@domain.com', 
    '$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa', -- 123456
    '1 + 1 = ?',
    '$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu', -- 2
    'volunteer',
    '4',
    '012 Bcd Ln',
    'Dallas',
    'TX',
    '70000',
    '["communication","leader"]',
    '["2025-07-27T12:00:00.000Z","2025-07-28T12:00:00.000Z"]'
), (
    5, 
    'volunteer5@domain.com', 
    '$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa', -- 123456
    '1 + 1 = ?',
    '$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu', -- 2
    'volunteer',
    '5',
    '345 Agh Rd',
    'Houston',
    'TX',
    '70000',
    '["communication","technology"]',
    '["2025-07-29T12:00:00.000Z","2025-07-30T12:00:00.000Z"]'
), (
    6, 
    'volunteer6@domain.com', 
    '$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa', -- 123456
    '1 + 1 = ?',
    '$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu', -- 2
    'volunteer',
    '6',
    '678 Bde Dr',
    'Waco',
    'TX',
    '70000',
    '["strong","leader"]',
    '["2025-07-31T12:00:00.000Z"]'
), (
    7, 
    'volunteer7@domain.com', 
    '$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa', -- 123456
    '1 + 1 = ?',
    '$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu', -- 2
    'volunteer',
    '7',
    '901 Def Dr',
    'Dallas',
    'TX',
    '70000',
    '["strong"]',
    '["2025-07-27T12:00:00.000Z","2025-07-31T12:00:00.000Z"]'
), (
    8, 
    'volunteer8@domain.com', 
    '$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa', -- 123456
    '1 + 1 = ?',
    '$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu', -- 2
    'volunteer',
    '8',
    '234 Afh Rd',
    'Houston',
    'TX',
    '70000',
    '["leader"]',
    '["2025-07-28T12:00:00.000Z","2025-07-30T12:00:00.000Z"]'
), (
    9, 
    'volunteer9@domain.com', 
    '$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa', -- 123456
    '1 + 1 = ?',
    '$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu', -- 2
    'volunteer',
    '9',
    '567 Jkl Dr',
    'Austin',
    'TX',
    '70000',
    '["technology"]',
    '["2025-07-27T12:00:00.000Z","2025-07-29T12:00:00.000Z"]'
), (
    10, 
    'volunteer10@domain.com', 
    '$2b$10$FXRPwd2PNEJf26aGd.ObZeYg2C9KhqGe9Zf9NC1W74qnawH5eDCxa', -- 123456
    '1 + 1 = ?',
    '$2b$10$Z0Xgpf4pyqYjTH9.foRvZOA1J1npBk61HdMINYLJBNjJ3UrEVCqwu', -- 2
    'volunteer',
    '10',
    '890 Xyz St',
    'Waco',
    'TX',
    '70000',
    '["communication"]',
    '["2025-07-28T12:00:00.000Z","2025-07-30T12:00:00.000Z"]'
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
    1, 
    '1', 
    'Event 1',
    '14-16PM',
    'Houston, TX',
    '["technology"]',
    1,
    '2025-07-28 12:00:00'
);