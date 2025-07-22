from pymongo import MongoClient
import os

DB_USER = os.getenv('MONGODB_USER')
DB_PASS = os.getenv('MONGODB_PASSWORD')
DB_HOST = os.getenv("MONGODB_HOST")
DB_PORT = os.getenv("MONGODB_PORT")
DB_NAME = os.getenv("MONGODB_DB")

# Replace with your MongoDB Atlas connection string
CONNECTION_STRING = f"mongodb://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}?authSource=admin&retryWrites=true&w=majority"

# Create a MongoClient using the connection string
client = MongoClient(CONNECTION_STRING)

# Access a specific database
db = client['ecommerce']


# Access a collection
my_collection = db["products"]


documents_to_insert = [
        {
            "name": "iphone 16 pro",
            "description": "Aluminium design Latest-generation Ceramic Shield front Colour-infused glass back (Black, Pink, Teal, Ultramarine)",
            "price": 799.00,
            "image": "https://via.placeholder.com/200"
        },
        {  
            "name": "samsung s24 ultra",
            "description": "With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility — starting with the most important device in your life. Your smartphone",
            "price": 1000.00,
            "image": "https://via.placeholder.com/200"
        },
        {
            "name": "Sony WH-CH520 Wireless Bluetooth Headphones",
            "description": "Enhance the quality of compressed music files and enjoy streaming music with high-fidelity sound through DSEE technology, which ensures an enhanced audio experience.",
            "price": 55.00,
            "image": "https://via.placeholder.com/200"
        },
        {
            "name": "Apple MacBook Pro Laptop",
            "description": "BUILT FOR APPLE INTELLIGENCE — Apple Intelligence is the personal intelligence system that helps you write, express yourself and get things done effortlessly. With groundbreaking privacy protections, it gives you peace of mind that no one else can access your data — not even Apple.",
            "price": 2000.00,
            "image": "https://via.placeholder.com/200"
        },
        {
            "name": "Apple Watch Ultra 2",
            "description": "Apple Watch Ultra 2 GPS + Cellular, 49mm Natural Titanium Case with Tan Alpine Loop - Small",
            "price": 1050.00,
            "image": "https://via.placeholder.com/200"
        },
    ]

document = my_collection.insert_many(documents_to_insert)


if document:
    print(f"Found document: {document}")
else:
    print("No document found.")

print("Connected to MongoDB and completed the init job.")
