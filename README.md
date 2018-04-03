# GroupProject

*requirement:

1. You need to know how to run local server.
- Our project needs to load a local JSON file for the conversion from zip code to coordinate. Chrome does not allow to load JSON files on your local storage. It will give you such an error message:
    "Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https."
- So, we will run a local server to pretend the JSON file is on the server.
- You may already install MAMP. Run it and click "start server.
- You have to copy your work to the folder " C:\MAMP\htdocs". Or you can go to "Preference" --> "web server" --> "open"
- On the web browser, type   localhost:8888. Then your homepage will open.



2. Install "Allow-Control-Allow-Origin" plugin 
- Because of technical security issues , ajax sometimes cannot pull the information properly. You can bypass this issue by installing a chrome plugin.
- go to  https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en
or in the Chrome web store, find "Allow-Control-Allow-Origin"

