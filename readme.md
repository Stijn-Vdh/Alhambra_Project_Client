# Alhambra web project group [number]

## Important URLs  
* Remote API: http://172.21.22.52:48201/alhambra-api/
* Swagger UI: testing http://172.21.22.52:48201/alhambra-api-ui/
* Sonar reports: http://172.21.23.0/sonar/projects

## Please complete the following before committing the final version on the project
Please **add** any **instructions** required to 
* Make your application work if applicable 
* Be able to test the application (login data)
* View the wireframes

Also clarify
* If there are known **bugs**
* If you haven't managed to finish certain required functionality

## Instructions for local CI testing
You can run the validator, CSS and JS rules locally. There is no need to push to the server to check if you are compliant with our rules. In the interest of sparing the server, please result to local testing as often as possible. If everyone will push to test, the remote will not last. 

* Make sure the group for sonar report is correctly set to your group number in ``sonar-project.properies``
* Go to the project folder in your command line editor 
* Execute `npm run validate`
* If there are errors, the program execution will halt and show the first error
* If there are no error, a report file will be generated in the `.scannerworks/` directory. You will find the link to the sonar report in this file 

If you want to skip ci remotely, include `[ci skip]` in your commit message. 
This is convenient for when you want to quickly add a certain commit, but do not wish to trigger the whole CI sequence. 

## Install swagger plugin for IntelliJ
Install "OpenAPI"'s swagger plugin for IntelliJ. This will allow you to preview the resources/alhambra.yaml file in the browser if you were to add anything to the API by extension (once you program the server)

## Default files
### Images
You'll find some of Alhambra's default images in the `images` and `assets/media` directories. Using these is optional. You have permission to use graphics of your own choosing. 

If you do use them, you are allowed to change in which folder they live. This is an initial proposal. 

### CSS 
The `reset.css` has aleady been supplied, but it's up to you and your team to add the rest of the styles. Please feel free to split those up in multiple files. We'll handle efficient delivery for products in production in later semesters. 

### JavaScript
A demonstration for connecting with the API has already been set up. We urge you to separate your JS files as **atomically as possible**. Add folders as you please.  
 
## Extra tips for CSS Grid
In case you get stuck or confused 
https://learncssgrid.com/

And for your convenience, yet use with caution
https://grid.layoutit.com/ 

## Wat werkt er:
    •	Speler aanmaken
    •	Lobby’s maken en joinen
    •	Speler ready status aanpassen
    •	Game maken en starten
    •	Speler ontvangt zijn startgeld
    •	Bank wordt automatisch aangevuld
    •	Markt wordt automatisch aangevuld na wisselen van speler
    •	Speler kan geld nemen
    •	Speler kan gebouw kopen
    •	Speler kan gebouw plaatsen in zijn alhambra en zijn reserve 
    •	Speler kan gebouw uit zijn alhambra halen en in zijn reserve plaatsen
    •	Extra actie mogelijk bij exacte betaling voor een gebouw
    •	Miniatuur alhambras zijn zichtbaar van de tegenstanders
    •	Scores berekenen bij eerste scoretellingsronde (hergebruikt voor 2de en 3de scoreronde)
    •	Bepaling van de juiste rondes voor scoretellingen
    •	Juiste startspeler bepalen
    •	Werkend beurtensysteem
    •	Scores van iedereen zijn zichtbaar
    •	Spel eindigen met een endscreen (als gebouwen op zijn)
    •	Huidige speler duidelijk zichtbaar
    •	Aantal resterende gebouwen zichtbaar
    •	Aantal resterende coins zichtbaar
    •	Beveiligde playertoken
    •	Veilige admintoken


## Wat hebben we niet:
    •	Berekening langste muur en toevoeging van de punten hiervoor
    •	Bereikbaar pad naar de fontein controleren 
    •	Reservetegel met gebouw op spelbord wisselen en omgekeerd
    •	Correcte scorerondes
    •	Zichtbaar geld en reserve van de tegenstanders 
    •	Geld aanvullen als de bank leeg is
    •	Gebouwen verdelen op het einde van het spel
    •	Geen controle op bouwen rondom een lege plek

## Waar zijn we trots op:
    •	Onze quickplay functie 
    •	Onze UI voor het spelbord
    •	Onze visuele scoretelling
    •	We hebben toch een iets of wat speelbare versie van Alhambra kunnen maken


## Gekende bugs:
    •	Kans op een error buildingsInHand undefined -> Easy fix start nieuw spel
    •	Gekocht gebouw plaatsen op fontein, gekocht gebouw zit vast in hand (geeft problemen voor later) en uw beurt is over -> Easy fix zie vorige



## Mogelijke bug:
    •	Als je een gebouw koopt en deze probeert te plaatsen waar het niet mag, dan ben je je gebouw en je geld kwijt.

## Eastereggs:
    •	2 verborgen eastereggs