import requests
import json
import os

URL = 'https://ra.co/graphql'
HEADERS = {
    'Content-Type': 'application/json',
    'Referer': 'https://ra.co',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:106.0) Gecko/20100101 Firefox/106.0'
}

class ReviewsFetcher:
    """
    A class to fetch and print details of reviews based on filters.
    """

    def __init__(self, indices, language, review_type, genre, page=1, page_size=20):
        self.payload = self.load_and_generate_payload(indices, language, review_type, genre, page, page_size)

    def load_and_generate_payload(self, indices, language, review_type, genre, page, page_size):
        """
        Load the GraphQL query from a file and generate the payload with dynamic values.

        :return: The generated payload.
        """
        with open("album_fetcher_template.json", "r") as file:
            payload = json.load(file)
            payload["variables"]["indices"] = [indices]
            payload["variables"]["pageSize"] = page_size
            payload["variables"]["page"] = page
            payload["variables"]["aggregations"] = ["YEAR", "GENRE"]
            payload["variables"]["filters"][0]["value"] = language
            payload["variables"]["filters"][1]["value"] = review_type
            payload["variables"]["filters"][2]["value"] = genre
            return payload

    def fetch_reviews(self):
        """
        Fetch reviews based on the set filters and return them.

        :return: A dictionary containing review data.
        """
        try:
            response = requests.post(URL, headers=HEADERS, json=self.payload)
            response.raise_for_status()
            data = response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error: {str(e)}")
            return {}
        except ValueError as e:
            print(f"JSON Error: {str(e)}")
            return {}
        finally:
            print("Fetch attempt completed.")  # Optional: cleanup or final actions go here

        if 'data' not in data:
            print("Error in response data:", data)
            return {}
            
        return data["data"]

    def print_reviews_details(self, reviews_data):
        """
        Print details of reviews from the response.

        :param reviews_data: A dictionary containing review data.
        """
        for review in reviews_data.get('listing', {}).get('data', []):
            print(f"Title: {review['title']}")
            print(f"Date: {review['date']}")
            print(f"Blurb: {review['blurb']}")
            print(f"Recommended: {review['recommended']}")
            print(f"Author: {review['author']['name']}")
            print("-" * 80)

    def save_review_details(self, reviews_data, genre_name, review_type):
        # Extract relevant data and reformat
        formatted_reviews = []
        for review in reviews_data.get('listing', {}).get('data', []):
            formatted_review = {
                'Title': review.get('title'),
                'Date': review.get('date'),
                'Blurb': review.get('blurb'),
                'Recommended': review.get('recommended', False),  # Default to False if not specified
                'Author': review.get('author', {}).get('name', 'Unknown')  # Default to 'Unknown' if not available
            }
            formatted_reviews.append(formatted_review)
        
         # Define the directory for genre JSON files
        genre_dir = 'Genres'
        cur_dir = os.path.join(genre_dir, review_type)

        if not os.path.exists(genre_dir):
            os.makedirs(genre_dir)

        if not os.path.exists(cur_dir):
            os.makedirs(cur_dir)
            
        # Define the file path using the genre name
        file_path = os.path.join(genre_dir, review_type, f"{genre_name}.json")
        
        # Write the review data to the JSON file
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(formatted_reviews, f, ensure_ascii=False, indent=4)
        
        print(f"Review data for genre '{genre_name}' has been written to {file_path}")

