# liri-node-app

##Liri Search Bot##

This node application at it's core is a simple SWITCH CASE statement.  From the command line run the liri.js file as you would any other Node.js and provide it with any of the following commands then a search term as noted below:

Commands & Filter:
  * "*concert-this*" *Artist*
     - Will call the Bands In Town API and return the first result of a concert matching the artist that you entered.  
      
  - "*spotify-this-song*" *Song*
      - Will call the Spotify API and return the first result matching the song you entered.  
      
  - "*movie-this*" *Movie*
      - Will call the IMBD API and display the details of the movie you searched for.  
    
  - "*do-what-it-says*" n/a
      - No search filter accepted, just call liri.js with this command and it will read in a search term from the file "random.txt" and search Spotify for the term that was read into the file.  Random.txt is structured as a comma delimited file so the search term is always index 1 on the array created using the javascript "split()" function.  
      
 All entered commands are logged to the comma delimited log.txt file so that it can be easily read into an array later if desired.  You'll need to strip off the trailing ",".  
 
 
Dependancies:
- fs
- moment
- axios
- node-spotify-api

The successful Commands called in iTerm
 ![alt text](https://github.com/jaspreetsidhu/liri-bot/blob/master/images/commandline.png)