use `quanlybanhang`;

create unique index p_id 
on product(pid);

create unique index p_nameprice
on product(pname,pprice);

explain select pname 
from product 
where pname = 'maygiat';

create view tableview as
select pid, pname
from product;

drop view tableview;

delimiter //
create procedure displayall()
begin 
select * from product;
end//
delimiter ;

call displayall();

delimiter //
create procedure addproduct(
in pid1 int(10),
in pname1 varchar(30),
in pprice1 int(10))
begin
	insert into product (pid, pname,pprice)
    values (pid1,pname1,pprice1);
end //
delimiter ;
select * from product;
call addproduct(6,'xetank',10);