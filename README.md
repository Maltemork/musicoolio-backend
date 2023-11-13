# Musicbase Backend

backend til Musicoolio

Sådan kører du backenden lokalt:

    1. Åben projektet i VS Code.

    2. Klik på View > Terminal.

    3. I terminalen skriver i følgende (klik enter efter hver linje for at installere)
        npm install express
        npm install node
        npm install cors
        npm install mysql2

    4. Skriv følgende i terminalen for at køre backend appen:
        node backend.js

Der er undladt .env fil i backend projektet, da det er dårlig for sikkerheden af databasen. For at køre backend projektet lokalt, skal der laves en .env fil med de korrekte oplysninger i.
Hvis det er nødvendigt, kan der skrives til maso0001@stud.kea.dk for at få tilsendt denne .env fil.
Azure er dog deployet og virker korrekt - og det er klonet fra dette repository.

# Links:

Frontend repository: https://github.com/Maltemork/Musicbase-Frontend
Frontend deploy: https://maltemork.github.io/Musicbase-Frontend/
Backend deploy: https://musicooliowebapp.azurewebsites.net/

© Studiegruppe nr. 1: Malte Mørkeberg Sørensen, Malte Bjørklund, Andrew Shereef
