-- Link an artists to the genres and subgenres of their albums
CREATE VIEW ArtistGenresView AS
SELECT
    a.ArtistID,
    a.name AS ArtistName,
    g.GenreID,
    g.name AS GenreName,
    sg.SubgenreID,
    sg.name AS SubgenreName
FROM
    Artists a
JOIN Albums al ON a.ArtistID = al.ArtistID
JOIN AlbumGenres ag ON al.AlbumID = ag.AlbumID
JOIN Genres g ON ag.GenreID = g.GenreID
LEFT JOIN Subgenres sg ON ag.SubgenreID = sg.SubgenreID;

-- EXAMPLE USAGE:
/*
SELECT ArtistName, GenreName, SubgenreName
FROM ArtistGenresView
WHERE ArtistName = 'Artist Name';
*/