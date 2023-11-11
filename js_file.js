// JavaScript-Datei (js_file.js)

/* Anforderungen an meinen Javascript Code:
- funktion muss auslesen, was ich in die Suchzeile eingegeben habe - CHECK
- Button muss mit einem Action-Listener versehen werden, der merkt, dass ich ihn drücke... danach wird die Funktion ausgeführt - CHECK

- Irgendwas/Funktion muss auf Dummy-Json den Datensatz der Zitate abrufen - CHECK
- Funktion muss diesen Datensatz nach dem String scannen, der gesuch wird - 

- die Suchergebnisse werden in einer Auflistung angezeigt

- Falls die Suche nicht erfolgreich ist, muss eine Fehlermeldung ausgegeben werden (Catch... Block)

- Es muss möglich sein, dass man auf das Suchergebnis klicken kann. Eine Art Button oder Link, der einen auf eine Neue Seite leitet.

- einen Zurück-Button, der einen zurück auf die Hauptseite leitet
*/

//Hier wird er Datensatz geladen (mit Fetch )

window.addEventListener("DOMContentLoaded", function () {
  //Suche realisieren
  const suchButton = document.querySelector("#suchen");
  const suchZeile = document.querySelector("#search");
  const ausgabeZeile = document.getElementById("suchanfrage");
  const fehlerZeile = document.getElementById("fehlerhafte-suche");
  const resultsContainer = document.getElementById("suchergebnisse");
  let suchbegriff = "";

  suchButton.addEventListener("click", function () {
    suchbegriff = suchZeile.value;
    getData(suchbegriff);
  });

  //Datenausgabe realisieren
  //const suchErgebnisse = document.querySelector("#suchergebnisse"); // Hält das HTML-Element
  
  const eingabe = document;

  async function getData(suchbegriff) {
    try {
      //Hier werden die Daten abgerufen
      fetch("https://dummyjson.com/posts/search?q=" + suchbegriff)
        .then((res) => res.json()) // res.json() gibt ein Promise zurück
        .then((data) => {
          let posts = data.posts; //in dieser Variable werden die JSON-Daten gespeichert

          //hier wird der Fall abgehandelt, wo keine Suchergebnisse gefunden wurden
          if (posts.length == 0) {
            fehlerZeile.innerHTML = "";
            fehlerZeile.innerHTML = `
                        
              <h1 class="fett-titel-dunkel">:&#40</h1>
              <p class="fehlerhafte-suche">Schade. Zu deiner Suche "<I>${suchbegriff}</I>" wurden keine Postings gefunden. Probiere es mit einem anderen englischen Suchbegriff</p>
                        
                    `;
          } else {
            //Ergebnis-Container leeren
            fehlerZeile.innerHTML = "";
            ausgabeZeile.innerHTML = "";
            resultsContainer.innerHTML = "";

            //Ergbenis-Container mit Titel der Suche füllen
            ausgabeZeile.innerHTML = ` 
                        <p>Suchergebnisse für die Suche "<I>${suchbegriff}</I>":</p>  
                    `;

            //Ergebnis-Container mit den Suchergebnissen füllen
            posts.forEach((post) => {
              //Titel von Sonderzeichen "Hochkomma" bereinigen
              let title = post.title;
              title = title.replaceAll(/[']/g, "&prime");

              resultsContainer.innerHTML += `
                        <div class="box">
                            <p>${post.body}</p>
                            <p>#${post.tags[0]} #${post.tags[1]} #${post.tags[2]}</p>
                            <p> &#10084 ${post.reactions} </p>
                            <button title="Hier erfährst du mehr Über Post nr. ${post.id}" onclick="window.location.href = './Detail.html?id=${post.id}';"> mehr über diesen Post erfahren </a></button>
                        </div>`;

              //hier wird die ID des Posts gespeichert
              id = post.id;
            });
          }
        });

      //Fehlerbehandlung
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error);
      suchErgebnisse.innerHTML =
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.";
    }
  }
});
