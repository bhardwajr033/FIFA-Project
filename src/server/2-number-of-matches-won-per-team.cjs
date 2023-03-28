const query = `
select teamname, count(*) as wins
from (
    select hometeamname as teamname
    from worldcupmatches
    where hometeamgoals > awayteamgoals
    union all
    select awayteamname as teamname
    from worldcupmatches
    where hometeamgoals < awayteamgoals
    union all
    select hometeamname as teamname
    from worldcupmatches
    where regexp_replace(winconditions, '\\D*', '', 'g') != '' and regexp_replace(winconditions, '\\D*', '', 'g')::int/10 > regexp_replace(winconditions, '\\D*', '', 'g')::int%10
    union all
    select awayteamname as teamname
    from worldcupmatches
    where regexp_replace(winconditions, '\\D*', '', 'g') != '' and regexp_replace(winconditions, '\\D*', '', 'g')::int/10 < regexp_replace(winconditions, '\\D*', '', 'g')::int%10
) as matches
group by teamname;
`;


module.exports = query;