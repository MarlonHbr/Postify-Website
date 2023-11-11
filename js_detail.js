// Diese Javascript datei soll für Detail.html verwendet werden

//Hier wird die ID aus der URL ausgelesen

window.addEventListener("load", () => {
  //HTML-Elemente werden in Variablen gespeichert
  const detailPostingContainer = document.getElementById("detailansicht");
  const KommentarContainer = document.getElementById("comments");
  const userContainer = document.getElementById("user-detailansicht");
  const kommentarButton = document.getElementById("kommentar-button");
  const fehlerZeile = document.getElementById("fehler-zeile");

  //Variablen werden deklariert
  let postID = "";
  let userID = "";

  function idHolen() {
    //Extrahieren der ID, die über die URL mitgeliefert wurde, mittels URLSearchParams
    const urlParams = new URLSearchParams(window.location.search);

    //Auslesen der ID aus der URL
    postID = urlParams.get("id");

    //in 3. Funktion springen
    getData(postID);
  }

  //genaue Postdaten werden abgerufen
  async function getData(id) {
    try {
      fetch("https://dummyjson.com/posts/" + id) //Hier werden die Daten abgerufen
        .then((res) => res.json()) // res.json() gibt ein Promise zurück (die formatierten Daten)
        .then((data) => {
          //data als Parameter wir übergeben, Pfeilfuntion

          //ID des Posts wird gespeichert um nachher Kommentare zu laden
          postID = data.id;

          //User ID wird gespeichert um nachher Userdaten zu laden
          userID = data.userId;

          //in 2. Funktion springen | Userdaten werden abgerufen
          getUser();

          detailPostingContainer.innerHTML = "";

          //Es werden HTML Elemente erzeugt, die den Inhalt der JSON-Daten enthalten
          detailPostingContainer.innerHTML = ` 

                    <p class="posting-text">${data.body}</p>
                    <p class="hashtags">#${data.tags[0]} #${data.tags[1]} #${data.tags[2]}</p>
                    <p class="reaktionen"> &#10084 ${data.reactions} </p>
                    <p class="rang"> Dieser Post ist auf Beliebtheitsrang: ${data.id} </p>
                `;
        });

      //Fehlerbehandlung
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error);
      suchErgebnisse.innerHTML =
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.";
    }
  }

  //Kommentare werden abgerufen
  async function getKommentare(postID) {
    try {
      fetch("https://dummyjson.com/posts/" + postID + "/comments") //Hier werden die Kommentare abgerufen
        .then((res) => res.json())
        .then((data) => {
          let kommi = data.comments;
          
          if (kommi.length == 0 ) {

            fehlerZeile.innerHTML= "";
            fehlerZeile.innerHTML= `
            <h1 class="fett-titel-dunkel">:&#40</h1>
            <p class="fehlerhafte-suche">
            Schade. Es existieren noch keine Kommentare.
            <br>
            Sei der erste, der kommentiert!
            </p>
            `;

          } else {
                    //Ergebniscontainer leeren
                    fehlerZeile.innerHTML = "";
                    KommentarContainer.innerHTML = "";

                    // Hier wird für jeden Post in der Liste posts in einer Schleife folgende Funktion ausgeführt.
                    kommi.forEach((comment) => {
                      //Es werden HTML Elemente erzeugt, die den Inhalt der JSON-Daten enthalten
                      KommentarContainer.innerHTML += `   
                              <div class="box wrapper">
                                  <h3 class="username"><I><B>${comment.user.username}</B></I> hat folgendes kommentiert: </h3>
                                  <p class="kommentar">${comment.body}</p>
                              </div>`;
                    });
                  }
        });

      //Fehlerbehandlung
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error);
      KommentarContainer.innerHTML =
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.";
    }
  }

  //genaue Userdaten werden abgerufen
  async function getUser() {
    try {
      fetch("https://dummyjson.com/users/" + userID) //Hier werden die Daten abgerufen
        .then((res) => res.json())
        .then((data) => {
          userContainer.innerHTML = "";

          //Es werden HTML Elemente erzeugt, die den Inhalt der JSON-Daten enthalten
          userContainer.innerHTML = `   
                    <h4>${data.firstName} ${data.lastName} (<I>${data.username}</I>) postete neulich: </h4>
                    `;
        });

      //Fehlerbehandlung
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error);
      KommentarContainer.innerHTML =
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.";
    }
  }

  //Funktion, die den Daten-Hol-Prozess startet | In 1. Funktion springen
  idHolen();

  //Eventlistener für den Button, der die Kommentare anzeigt
  kommentarButton.addEventListener("click", function () {
    //in die 3. Funktion springen | Kommentare werden abgerufen
    getKommentare(postID);
  });
});
