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
    '[1753672305818,1753758705818,1753845105818]' -- 07/27/2025, 07/28/2025, 07/29/2025
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
    '[1753845331611,1753931731611,1754018131611]' -- 07/29/2025, 07/30/2025, 07/31/2025
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
    '07/29/2025 14-16PM',
    'Houston, TX',
    '["technology"]',
    1,
    '2025-07-28 10:32:00' -- 07/28/2025
);

INSERT INTO notification (volunteer_id, type, title, message, status, is_deleted, created_at, updated_at, deleted_at)
VALUES
(1, 0, 'Event Assigned', 'Event assigned to you.', 0, FALSE, NOW(), NOW(), NULL),
(1, 2, 'Reminder', 'Your shift is tomorrow.', 0, FALSE, NOW(), NOW(), NULL);
