# Netflix Clone - Progetto Didattico - ITS ICT Piemonte

## Team: Denise Zanella & Marco Tranaso

| Ruolo | Nome e Cognome | Contatto Email | Corso |
| :--- | :--- | :--- | :--- |
| Developer | Denise Zanella | denise.zanella@edu-its.it| WDV 24-26 |
| Developer | Marco Tranaso | marco.tranaso@edu-its.it| WDV 24-26 |

## 1. Descrizione del Progetto

Questo progetto è un **clone a scopo didattico** della piattaforma di streaming Netflix, sviluppato nell'ambito del corso **REACT - Web Developer WDV 24-26 presso l'ITS ICT Piemonte**.

L'obiettivo principale era replicare l'interfaccia utente (UI) e implementare le funzionalità chiave di visualizzazione e navigazione dinamica dei contenuti, rispettando le specifiche tecniche fornite dalla docente.

### Obiettivi Raggiunti (MVP)

  * **Homepage Funzionale:** Visualizzazione di un film in evidenza (`Hero Banner`) e di almeno due categorie di film (es. Popolari, Più Votati).
  * **Navigazione e Routing:** Implementazione di un sistema di routing dinamico tra le pagine principali.
  * **Dettaglio Film:** Pagina dedicata per la visualizzazione dei metadati di un film specifico.
  * **Gestione Contenuti:** Consumo di dati tramite API esterne per popolare dinamicamente l'interfaccia.
  * **Adattabilità:** Design responsive di base per l'accesso mobile (senza implementazione dell'Hamburger Menu).

### Funzionalità Sperimentali Aggiunte

Per ampliare l'esperienza didattica, sono state aggiunte le seguenti funzionalità non richieste dalla consegna:

  * **Pagina Login:** Scheletro per una futura gestione dell'autenticazione.
  * **Pagina *Movies*:** Una sezione dedicata che aggrega tutti i film disponibili, inclusa la funzionalità di **filtro** per categoria (Popolari, Top Rated, ecc.).
  * **Pagina *Player*:** Una pagina locale per la visualizzazione simulata di un trailer/contenuto video.

-----

## 2. Stack Tecnologico

Il progetto è interamente sviluppato utilizzando lo stack moderno e scalabile **React** e **Vite** per la configurazione.

| Categoria | Tecnologia | Motivazione Tecnica (Sezione 3) |
| :--- | :--- | :--- |
| **Framework UI** | React (Vite) | Scelto per l'approccio a componenti e l'efficienza di Vite (Sez. 3.1) |
| **Styling** | CSS Modulare (per Componente) | Scelto per l'isolamento degli stili e la semplicità |
| **API Dati** | TMDB (The Movie Database) | Scelto come sorgente autorevole per metadati e poster dei film |
| **Routing** | React Router DOM | Scelto per la gestione delle rotte lato client (Single Page Application) |

-----

## 3. Scelte Tecniche 

Questa sezione giustifica l'architettura e le scelte tecnologiche adottate, in linea con le moderne pratiche di sviluppo frontend.

### 3.1. REACT

React è stato scelto in quanto materia del corso predisposta per la consegna e per la sua capacità di costruire interfacce utente complesse attraverso un modello basato su **componenti**.

  * **Architettura a Componenti:** L'intera interfaccia (Navbar, Footer, MovieCard, ecc.) è stata scomposta in componenti riutilizzabili. Questo approccio migliora la **manutenibilità** e la **scalabilità** del codice.
  * **Gestione dello Stato (`Hooks`):** L'uso di `useState` e `useEffect` permette di gestire in modo efficiente lo stato locale e gli effetti collaterali (come le chiamate API) all'interno dei componenti funzione.
  * **Efficienza con il Virtual DOM:** React ottimizza gli aggiornamenti dell'interfaccia, modificando solo le parti del DOM che sono effettivamente cambiate (grazie al Virtual DOM), garantendo performance migliori.

### 3.2. Implementazione del Routing Dinamico

È stato utilizzato **React Router DOM** per creare una **Single Page Application (SPA)**.

  * **Rotte Dinamiche (`/movie/:id`):** Questo è cruciale per replicare il comportamento di una piattaforma reale. La rotta `MovieDetail` (`/movie/:id`) permette di visualizzare i dettagli di **qualsiasi** film, passando il suo ID come parametro URL. Il componente `MovieDetail` utilizza l'ID per effettuare una chiamata API specifica a TMDB.

> ⚠️ **Nota Tecnica sull'Hero Banner:** Per il film in evidenza (`Hero Banner`) in Homepage, a causa di una limitazione nell'accesso all'ID dinamico (non disponibile/non funzionale nel contesto della consegna), si è optato per una **rotta locale statica**. Questo ha permesso di mostrare il trailer/dettaglio tramite una pagina predefinita, aggirando il blocco API pur mantenendo il comportamento di navigazione richiesto.

### 3.3. Consumo Dati tramite API (TMDB)

L'API di **The Movie Database (TMDB)** è stata scelta per la sua documentazione chiara e la ricchezza di dati (metadati, poster, URL di immagini) che simulano un vero catalogo di contenuti.

  * **Principio DRY (Don't Repeat Yourself):** Le chiamate `fetch` sono state implementate in almeno due punti distinti (es. `Home` per le categorie e `MovieDetail` per il singolo film), dimostrando la capacità di gestire il consumo dati in modo mirato e dinamico.

### 3.4. Gestione degli Errori

Sono stati implementati i seguenti meccanismi di gestione degli errori per migliorare l'esperienza utente (UX):

  * **404 Not Found:** Tutte le rotte non specificate o le pagine non sviluppate (come future funzionalità) reindirizzano a una pagina `NotFound` dedicata, fornendo un feedback chiaro all'utente.
  * **Gestione `Nessun Risultato`:** Nella pagina di ricerca, viene gestito il caso in cui la chiamata API non restituisca risultati, mostrando un messaggio informativo anziché una pagina vuota o un errore non gestito.

-----

## 4. Struttura delle Cartelle

La struttura del progetto segue la convenzione standard di un'applicazione React moderna, garantendo separazione delle responsabilità (SoC).

```bash
netflix-clone/
├── node_modules/
├── public/                 # Contenuti statici (FavIcon, Hero Banner Image)
├── src/
│   ├── assets/             # Immagini, icone, font (Logo, poster locali)
│   ├── components/         # Componenti UI riutilizzabili
│   │   ├── Footer/
│   │   ├── MovieCard/      # Singola card per film
│   │   ├── Navbar/
│   │   ├── SearchBar/
│   │   └── TitleCards/     # Componente orizzontale per le categorie
│   ├── pages/              # Componenti che agiscono da "Pagine" (Corrispondenti alle rotte)
│   │   ├── Favorites/      # My List
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── MovieDetail/    # Dettaglio film (/movie/:id)
│   │   ├── Movies/         # Tutti i film con filtro (Extra)
│   │   ├── NotFound/       # Pagina 404
│   │   ├── Player/         # Simulazione Player (Extra)
│   │   └── Ranma/          # Gestione Locale del Banner Movie
│   ├── App.jsx             # Gestione del Routing principale e layout
│   ├── index.css           # Stili globali
│   └── main.jsx            # Entry point dell'applicazione (Vite/React)
│
├── .gitignore
├── package.json            # Dipendenze e script di build
├── README.md               # Documentazione del progetto (Questo file)
└── vite.config.js          # Configurazione di Vite
```

-----

## 5. Istruzioni per l'Installazione e l'Avvio

### Prerequisiti

Assicurati di avere installati [Node.js](https://nodejs.org/) e [npm](https://www.npmjs.com/) (o Yarn).

### Setup

1.  **Clona il Repository:**

    ```bash
    git clone https://github.com/Marco-Tranaso/zanella-tranaso-react.git
    cd zanella-tranaso-react
    ```

2.  **Installa le Dipendenze:**

    ```bash
    npm install
    # oppure
    yarn install
    ```

3.  **Configura Variabili d'Ambiente:**
    Crea un file `.env` nella root del progetto e inserisci la tua chiave API di TMDB.

    ```
    # Esempio per l'uso in Vite (VITE_ prefix è obbligatorio)
    VITE_TMDB_API_KEY=LaTuaChiaveAPIQui
    ```

4.  **Avvia l'Applicazione:**

    ```bash
    npm run dev
    # oppure
    yarn dev
    ```

L'applicazione sarà disponibile all'indirizzo `http://localhost:5173` (o la porta indicata da Vite).

-----

## 6. Contribuzione e Sviluppo

Il progetto è stato sviluppato in coppia, con versionamento gestito tramite **Git** e **GitHub** per garantire la tracciabilità del codice e facilitare la collaborazione (pull requests, merge, gestione dei conflitti).

### Workflow Consigliato

Si raccomanda l'uso dell'estensione **ES7+ React/Redux/React-Native snippets** per velocizzare lo sviluppo di componenti React (es. snippet `rafce`).

-----

