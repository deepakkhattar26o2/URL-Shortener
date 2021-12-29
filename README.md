# URL-Shortener
A Simple API to shorten URLS using NodeJS, ExpressJS and MongoDB.


# Install dependencies
npm install

# Edit the default.json file in config with your mongoDB Connection String and localUrl

#Endpoints and Functionalities : 

POST : localURL/ => creates and returns a shortened URL  
GET : localURL/:code => redirects to the original URL 
GET : localURL/stat/:code => returns information about the shortened URL
DELETE: localURL/:code => deletes the shortened URL from the database

#Request Format for POST : 
{
    "url" : "your_long_url"
}
