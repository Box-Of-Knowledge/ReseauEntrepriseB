DROP TABLE IF EXISTS commentary;
DROP TABLE IF EXISTS formation_student;
DROP TABLE IF EXISTS formation;
DROP TABLE IF EXISTS former;
DROP TABLE IF EXISTS student;


CREATE TABLE former(
    former_id SERIAL PRIMARY KEY,
    name CHAR(255) not null UNIQUE,
    password CHAR(255) not null
);

CREATE TABLE formation(
    formation_id SERIAL PRIMARY KEY,
    form_form_id int not null,
    title CHAR(255) not null UNIQUE,
    cursus VARCHAR,
    image_formation VARCHAR,
    CONSTRAINT fk_former FOREIGN KEY(form_form_id) REFERENCES former(former_id)
);

CREATE TABLE student(
    student_id SERIAL PRIMARY KEY,
    name CHAR(255) not null UNIQUE,
    password CHAR(255) not null
);

CREATE TABLE formation_student(
    stud_id SERIAL,
    form_id SERIAL,
    PRIMARY KEY (stud_id,form_id),
    CONSTRAINT fk_student FOREIGN KEY(stud_id) REFERENCES student(student_id),
    CONSTRAINT fk_formation FOREIGN KEY(form_id) REFERENCES formation(formation_id)
);

CREATE TABLE commentary(
    comment_id SERIAL PRIMARY KEY,
    description CHAR(255) not null,
    stud_id SERIAL,
    form_id SERIAL,
    CONSTRAINT fk_student FOREIGN KEY(stud_id) REFERENCES student(student_id),
    CONSTRAINT fk_formation FOREIGN KEY(form_id) REFERENCES formation(formation_id)
);