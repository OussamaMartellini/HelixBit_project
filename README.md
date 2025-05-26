# Proposta di Consegna

## Descrizione

sito per recuperare informazione di rating e descrizone di giochi con possibilità di lasciare una recenzione ed aggiungere giochi ad una porpria lista di di giochi preferiti

## API

API per iterare i giochi: https://rawg.io/
API per il back-end: https://supabase.com/

## Stile

predominanza di CSS personale con l'usilio di Bootsrap 5 per la gestione del grid system ed alcuni componenti.

## Pagine

1. Pagina 1 - Home page con lista dei giochi
2. Pagina 2 - Pagina dettaglio del gioco 
3. Pagina 3 - Pagina Registrazione utente
4. Pagina 4 - Pagina Login utente
5. Pagina 5 - Pagina Modifica dettagli utente (account)
6. Pagina 6 - Pagina visualizzazione preferiti utente
7. Pagnia 7 - Pagina risultati di ricerca per nome


## User Interactions

1. Utente non autenticato puo scrollare sui giochi in piattaforma
2. Utente non autenticato puo filtrare per nome del gioco
3. Utente non autenicato puo registrarsi con email e password in piattaforma
4. Utente non autenticato puo eseguire un login
5. Utente auteticato puo creare una lista di giochi favoriti
6. Utente autenticato puo chattare co altri utenti dalla pagina di dettaglio gioco
7. Utente autenticato puo cambiare le sue info di profilo e aggiungere un avatar
8. Utente autenticato puo fare il logout

## Context

SessionContext: cattura della login e logout dell'utente.
FavoriteContext: gestione della lista dei preferiti.

## Deployment

Vercel

https://helix-bit-project.vercel.app/