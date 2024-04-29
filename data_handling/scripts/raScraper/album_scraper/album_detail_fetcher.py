import requests
import json

# Constants
URL = 'https://ra.co/graphql'
HEADERS = {
    'Content-Type': 'application/json',
    'Referer': 'https://ra.co',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:106.0) Gecko/20100101 Firefox/106.0'
}
def fetch_review_details(review_id):
    # Load the query and update the variable dynamically
    with open('album_detail_template.json', 'r') as file:
        payload = json.load(file)
        payload['variables']['id'] = review_id  # Dynamically set the review ID

    # Make the POST request to the GraphQL endpoint
    response = requests.post(URL, headers=HEADERS, json=payload)
    if response.status_code == 200:
        return response.json()  # Returns the JSON response
    else:
        raise Exception(f"Query failed to run with a status code {response.status_code}. {response.text}")

def extract_specific_details(data):
    # Extract specific data
    review = data['data']['review']
    genres = review.get('genres', [])
    labels = review.get('labels', [])
    tracklist = review.get('tracklist', '').split('\n')  # Split the tracklist by newline

    # Print the required information
    print("Genres:")
    for genre in genres:
        print(f"- {genre['name']} ({genre['slug']})")

    print("\nLabels:")
    for label in labels:
        print(f"- {label['name']} (URL: {label['contentUrl']})")

    print("\nTracklist (Excerpt):")
    # Assuming you want to print only a subset of the tracklist
    for track in tracklist:  # Print only first 5 tracks for brevity
        print(f"- {track}")

def main():
    review_id = "36052"  # Example ID, replace or modify as necessary
    try:
        review_data = fetch_review_details(review_id)
        extract_specific_details(review_data)  # Extract and print only the relevant parts
    except Exception as e:
        print(str(e))
if __name__ == "__main__":
    main()
