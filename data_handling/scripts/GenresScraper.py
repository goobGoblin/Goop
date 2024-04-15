import json
import pymysql

# Connect to the database
connection = pymysql.connect(host='localhost',
                             user='user',
                             password='passwd',
                             database='dbname',
                             cursorclass=pymysql.cursors.DictCursor)

with connection:
    with connection.cursor() as cursor:
        # Open JSON file
        with open('your_data.json', 'r') as file:
            data = json.load(file)

            # Insert Genre
            genre_sql = "INSERT INTO Genres (GenreName, Description) VALUES (%s, %s)"
            cursor.execute(genre_sql, (data['name'], data['description']))
            genre_id = cursor.lastrowid  # Get the last inserted id

            # Iterate over subgenres
            for subgenre in data['subgenres']:
                # Check if subgenre already exists to avoid duplicates
                check_sql = "SELECT SubgenreID FROM Subgenres WHERE SubgenreName = %s"
                cursor.execute(check_sql, (subgenre['name'],))
                result = cursor.fetchone()

                if result is None:
                    # Insert Subgenre
                    subgenre_sql = "INSERT INTO Subgenres (SubgenreName, Description) VALUES (%s, %s)"
                    cursor.execute(subgenre_sql, (subgenre['name'], subgenre['description']))
                    subgenre_id = cursor.lastrowid
                else:
                    subgenre_id = result['SubgenreID']

                # Link genre and subgenre
                link_sql = "INSERT INTO GenreSubgenre (GenreID, SubgenreID) VALUES (%s, %s)"
                cursor.execute(link_sql, (genre_id, subgenre_id))

        # Commit changes
        connection.commit()
