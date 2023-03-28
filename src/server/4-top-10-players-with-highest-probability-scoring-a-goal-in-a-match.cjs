const query = `SELECT PlayerName AS playername,
COUNT(*) AS matches,
SUM(CASE WHEN Event LIKE '%G%' THEN 1 ELSE 0 END) AS matchesWithGoal,
ROUND((SUM(CASE WHEN Event LIKE '%G%' THEN 1 ELSE 0 END) * 100.0 / COUNT(*))::numeric, 2) AS scoringProb
FROM worldCupPlayers
GROUP BY PlayerName
HAVING COUNT(*) > 5
ORDER BY scoringProb DESC
limit 10;
`
module.exports = query;