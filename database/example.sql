CREATE TABLE Groups (
  Id    serial,
  Name  varchar(50) NOT NULL
);

ALTER TABLE Groups ADD CONSTRAINT pkGroups PRIMARY KEY (Id);

CREATE UNIQUE INDEX akGroupName ON Groups (Name);

INSERT INTO Groups VALUES
  (1, 'Greatest'),
  (2, 'Well-known'),
  (3, 'Politics'),
  (4, 'Poets');

CREATE TABLE Users (
  Id        serial,
  GroupId   integer NOT NULL,
  Name      varchar(50) NOT NULL,
  Password  varchar(50) NOT NULL
);

ALTER TABLE Users ADD CONSTRAINT pkUsers PRIMARY KEY (Id);

CREATE UNIQUE INDEX akUserName ON Users (Name);

ALTER TABLE Users ADD CONSTRAINT fkUserGroup FOREIGN KEY (GroupId) REFERENCES Groups (Id) ON DELETE RESTRICT;

INSERT INTO Users VALUES
  (1, 2, 'admin', 'admin'),
  (2, 2, 'einstein', 'qwerty'),
  (3, 2, 'aristotle', 'qazqazqaz'),
  (4, 1, 'isa', 'qazwsxedc'),
  (5, 1, 'mao', '1234567890'),
  (6, 3, 'lenin', 'asdfgh');

CREATE TABLE Sessions (
  Id      serial,
  UserId  integer NOT NULL,
  SID     varchar(50) NOT NULL
);

ALTER TABLE Sessions ADD CONSTRAINT pkSessions PRIMARY KEY (Id);

CREATE UNIQUE INDEX akSessions ON Sessions (SID);

ALTER TABLE Sessions ADD CONSTRAINT fkSessionsUsers FOREIGN KEY (UserId) REFERENCES Users (Id) ON DELETE CASCADE;

