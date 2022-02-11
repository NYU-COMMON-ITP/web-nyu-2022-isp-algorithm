-- Sweet script from Stephen to wrangle and export some data as csv from a local db
drop function if exists create_property_id(home_name varchar);
drop table if exists tmp_properties;
drop table if exists tmp_spaces;

create function create_property_id(home_name varchar)
    returns varchar
    language plpgsql
as
$$
begin
    return substr(md5(home_name), 0, 12);
end;
$$;

create temp table tmp_properties as
select * from (
                  select id,
                         home_name,
                         create_property_id(home_name)              as property_id,
                         brand,
                         city_name,
                         neighborhood,
                         timezone,
                         count(1) over (partition by home_name)     as unit_count,
                         row_number() over (partition by home_name) as rownum
                  from l16_skuniverse
                  where status != 'expired'
                    and buildingid ~ '^e'
                    and occupancy_type != 'commercial'
                  order by 2, rownum
              ) x
where rownum = 1;

select count(1) from tmp_properties;

create temp table tmp_spaces as
select sku.id                                                                                     as space_id,
       property_id,
       apartment_name,
       room_name,
       (case when occupancy_type = 'traditional' then 'traditional' else 'coliving' end)        as occupancy_type,
       (case when coalesce(security_deposit, 0) < 1 then null else security_deposit / 1000 end) as security_deposit,
       date_available,
       status,
       created_at,
       updated_at,
       mo3_price/100 as mo3_price,
       mo6_price/100 as mo6_price,
       mo9_price/100 as mo9_price,
       mo12_price/100 as mo12_price,
       apartment_bdrm_count                                                                     as bedroom_count,
       bath_count,
       least(mo3_price, mo6_price, mo9_price, mo12_price)/100 as min_price,
       greatest(mo3_price, mo6_price, mo9_price, mo12_price) /100 as max_price
from l16_skuniverse sku
inner join tmp_properties p using (home_name);


select count(1) from tmp_spaces;

COPY tmp_properties to '/tmp/properties.csv' DELIMITER E',' CSV HEADER;
COPY tmp_spaces to '/tmp/spaces.csv' DELIMITER E',' CSV HEADER;
