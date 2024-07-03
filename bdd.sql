-- DATABASENAME : warehouse_management

CREATE TABLE Produit (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE Entrepot (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    localisation VARCHAR(255) NOT NULL
);

CREATE TABLE Stock (
    id SERIAL PRIMARY KEY,
    produitId INT REFERENCES Produit(id),
    entrepotId INT REFERENCES Entrepot(id),
    quantite INT NOT NULL
);

CREATE TABLE Client (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    localisation VARCHAR(255) NOT NULL
);

CREATE TABLE Commande (
    id SERIAL PRIMARY KEY,
    clientId INT REFERENCES Client(id),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE DetailCommande (
    id SERIAL PRIMARY KEY,
    commandeId INT REFERENCES Commande(id),
    produitId INT REFERENCES Produit(id),
    quantite INT NOT NULL
);


-- Datas

INSERT INTO "Produit" ("nom", "description") VALUES ('Reflex', 'Appareil photo reflex');
INSERT INTO "Produit" ("nom", "description") VALUES ('Drone', 'Drone quadricoptère');

INSERT INTO "Entrepot" ("nom", "localisation") VALUES ('Entrepôt A', 'Paris');
INSERT INTO "Entrepot" ("nom", "localisation") VALUES ('Entrepôt B', 'Lyon');
INSERT INTO "Entrepot" ("nom", "localisation") VALUES ('Entrepôt C', 'Marseille');

INSERT INTO "Stock" ("produitId", "entrepotId", "quantite") VALUES (1, 1, 1); 
INSERT INTO "Stock" ("produitId", "entrepotId", "quantite") VALUES (1, 2, 1);
INSERT INTO "Stock" ("produitId", "entrepotId", "quantite") VALUES (2, 1, 1); 
INSERT INTO "Stock" ("produitId", "entrepotId", "quantite") VALUES (2, 3, 1);

INSERT INTO "Client" ("nom", "localisation") VALUES ('Client 1', 'Paris');
INSERT INTO "Client" ("nom", "localisation") VALUES ('Client 2', 'Lyon');
INSERT INTO "Client" ("nom", "localisation") VALUES ('Client 3', 'Marseille');

INSERT INTO "Commande" ("clientId") VALUES (1);
INSERT INTO "Commande" ("clientId") VALUES (2); 
INSERT INTO "Commande" ("clientId") VALUES (3); 

INSERT INTO "DetailCommande" ("commandeId", "produitId", "quantite") VALUES (1, 1, 1); 
INSERT INTO "DetailCommande" ("commandeId", "produitId", "quantite") VALUES (1, 2, 1);
INSERT INTO "DetailCommande" ("commandeId", "produitId", "quantite") VALUES (2, 1, 1); 
INSERT INTO "DetailCommande" ("commandeId", "produitId", "quantite") VALUES (3, 2, 1);
