DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
    id serial,
    age integer not null,
    kind text not null,
    name text not null
);
INSERT INTO pets (age, kind, name) VALUES (3, 'dragon', 'Mr. PotatoBum');
INSERT INTO pets (age, kind, name) VALUES (3, 'banana spider', 'Potassiocho');
INSERT INTO pets (age, kind, name) VALUES (3, 'butterfly', 'Butternut');