DROP TABLE IF EXISTS formation;
DROP TABLE IF EXISTS former;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS commentary;

CREATE TABLE formation(
    formation_id SERIAL PRIMARY KEY,
    title CHAR(255) not null,
    data VARCHAR
    );

CREATE TABLE former(
    former_id SERIAL PRIMARY KEY,
    name CHAR(255) not null,
    password CHAR(255) not null,
    formation_id SERIAL,
    CONSTRAINT fk_formation
    FOREIGN KEY (formation_id)
    REFERENCES formation(formation_id)
    );

CREATE TABLE student(
    student_id SERIAL PRIMARY KEY,
    name CHAR(255) not null,
    password CHAR(255) not null,
    formation_id SERIAL,
    CONSTRAINT fk_formation
    FOREIGN KEY (formation_id)
    REFERENCES formation(formation_id)
    );

CREATE TABLE commentary(
    comment_id SERIAL PRIMARY KEY,
    description CHAR(255) not null,
    formation_id SERIAL,
    student_id SERIAL,
    CONSTRAINT fk_formation
    FOREIGN KEY (formation_id)
    REFERENCES formation(formation_id),

    CONSTRAINT fk_student
    FOREIGN KEY (student_id)
    REFERENCES student(student_id)
    );
