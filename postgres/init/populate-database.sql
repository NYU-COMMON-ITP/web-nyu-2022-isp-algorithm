CREATE TABLE properties (
    id serial NOT NULL,
    home_name varchar,
    property_id varchar,
    brand varchar,
    city_name varchar,
    neighborhood varchar,
    timezone varchar,
    unit_count int4,
    rownum int4,
    wf_distance int4,
    wf_price int4,
    wf_time int4,
    wf_market int4,
    longitude float8,
    latitude float8,
    PRIMARY KEY (id)
);

CREATE TABLE spaces (
    space_id serial NOT NULL,
    property_id varchar NOT NULL,
    apartment_name varchar NOT NULL,
    room_name varchar NOT NULL,
    occupancy_type varchar NOT NULL,
    security_deposit int4,
    date_available date NOT NULL,
    status varchar NOT NULL,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL,
    mo3_price int4 NOT NULL,
    mo6_price int4 NOT NULL,
    mo9_price int4 NOT NULL,
    mo12_price int4 NOT NULL,
    bedroom_count int4 NOT NULL,
    bath_count int4 NOT NULL,
    min_price int4 NOT NULL,
    max_price int4 NOT NULL,
    PRIMARY KEY (space_id)
);

COPY properties(id, home_name, property_id, brand, city_name, neighborhood, timezone, unit_count, rownum, wf_distance, wf_price, wf_time, wf_market,longitude,latitude)
FROM '/usr/src/web/postgres/nyu-csv-data/properties.csv'
DELIMITER ','
CSV HEADER;

COPY spaces(space_id, property_id, apartment_name, room_name, occupancy_type, security_deposit, date_available, status, created_at, updated_at, mo3_price, mo6_price, mo9_price, mo12_price, bedroom_count, bath_count, min_price, max_price)
FROM '/usr/src/web/postgres/nyu-csv-data/spaces.csv'
DELIMITER ','
CSV HEADER;