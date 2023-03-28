let query = `select (
    case
    when worldcupmatches.hometeaminitials = worldcupplayers.teaminitials then worldcupmatches.hometeamname
    else worldcupmatches.awayteamname
    end
) as teamname, count(teaminitials) as redcards
from worldcupplayers inner join worldcupmatches on worldcupplayers.matchid = worldcupmatches.matchid 
where worldcupplayers.event like '%R%' and worldcupmatches.year = 2014
group by teamname;
`
;

module.exports = query;
