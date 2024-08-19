import React, { useState } from 'react';
import { Container } from '@mui/material';

const SystemAbregeBilanAvantRepartition = () => {
      const tableHeadData = [
        { label: "ACTIF", rowSpan: 2, colSpan: 1 },
        { label: "Exercice N", rowSpan: 1, colSpan: 3 },
        { label: "Exercice N-1", rowSpan: 1, colSpan: 1 },
        { label: "PASSIF", rowSpan: 2, colSpan: 1 },
        { label: "Exercice N", rowSpan: 2, colSpan: 1 },
        { label: "Exercice N-1", rowSpan: 2, colSpan: 1 },
      ];
    
      const secondRowData = [
        { label: "Brut", rowSpan: 1, colSpan: 1 },
        { label: "Amortissements et dépréciations (à déduire)", rowSpan: 1, colSpan: 1 },
        { label: "Net", rowSpan: 1, colSpan: 1 },
        { label: "Net", rowSpan: 1, colSpan: 1 },
      ];
    
    
  const tableBodyData = [
    [
      { label: "Actif immobilisé (a) :", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "Capitaux propres (c) :", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
    ],
    [
      { label: "Immobilisations incorporelles :", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "Capital", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
    ],
    [
      { label: "fonds commercial (b)", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "Ecart de réévaluation (c)", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
    ],
    [
      { label: "autres", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "Réserves :", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
    ],
    [
      { label: "Immobilisations corporelles", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "réserve légale", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
    ],
    [
      { label: "Immobilisations financières (1)", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "réserves réglementées", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
    ],
    [
      { label: "Total I", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "autres (4)", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
    ],
    [
      { label: "Actif circulant :", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "Report à nouveau (d)", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
    ],
    [
      { label: "Stocks et en-cours (autres que marchandises) (a)", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "Résultat de l'exercice [bénéfice ou perte] (d)", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
    ],
    [
      { label: "Marchandises (a)", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "Provisions réglementées", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
    ],
    [
      { label: "Avances et acomptes versés sur commandes", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "Total I", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
    ],
    [
      { label: "Créances (2) :", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "Provisions (II)", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
    ],
    [
      { label: "clients et comptes rattachés(a)", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "Dettes (5) :", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
    ],
    [
      { label: "autres (3)", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "Emprunts et dettes assimilées", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
    ],
    [
      { label: "Valeurs mobilières de placement", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "Avances et acomptes reçus sur commandes en cours", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
    ],
    [
      { label: "Disponibilités (autres que caisse)", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "Fournisseurs et comptes rattachés", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
    ],
    [
      { label: "Caisse", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "Autres (3)", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
    ],
    [
      { label: "Total II", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "Total III", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
    ],
    [
      { label: "Charges constatées d'avance (2) (*) (III)", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "Produits constatés d'avance (2) (IV)", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
    ],
    [
      { label: "TOTAL", colSpan: 1, rowSpan: 1 },
      { label: "GENERAL", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
      { label: "TOTAL", colSpan: 1, rowSpan: 1 },
      { label: "GENERAL", colSpan: 1, rowSpan: 1 },
      { label: "X", colSpan: 1, rowSpan: 1 },
    ],
    [
      { label: "(I + II + III)", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "(I + II + III + IV)", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
      { label: "", colSpan: 1, rowSpan: 1 },
    ],
    [
      { label: "(1) Dont à moins d'un an", colSpan: 5, rowSpan: 1 },
      { label: "(4) Dont réserves statutaires", colSpan: 3, rowSpan: 1 },
    ],
    [
      { label: "(2) Dont à plus d'un an", colSpan: 5, rowSpan: 1 },
      { label: "(5) Dont à plus de 5 ans", colSpan: 3, rowSpan: 1 },
    ],
    [
      { label: "(3) Dont comptes courants d'associés", colSpan: 5, rowSpan: 1 },
      { label: "Dont à plus d'un an et moins de 5 ans", colSpan: 3, rowSpan: 1 },
    ],
    [
      { label: "", colSpan: 5, rowSpan: 1 },
      { label: "Dont à moins d'un an", colSpan: 3, rowSpan: 1 },
    ],
  ];

    
      return (
        <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              {tableHeadData.map((header, index) => (
                <th
                  key={index}
                  rowSpan={header.rowSpan}
                  colSpan={header.colSpan}
                >
                  {header.label}
                </th>
              ))}
            </tr>
            <tr>
              {secondRowData.map((header, index) => (
                <th
                  key={index}
                  rowSpan={header.rowSpan}
                  colSpan={header.colSpan}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableBodyData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    colSpan={cell.colSpan}
                    rowSpan={cell.rowSpan}
                    style={{ textAlign: cell.align || "left" }}
                  >
                    {cell.label}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    };
    

const BaseSystemCompteDeResultatEnListe2 = () => {
    return (
      <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th></th>
            <th>Exercice N</th>
            <th>Exercice N-1</th>
          </tr>
        </thead>
        <tbody>
          {data11.rows.map((row, index) => (
            <tr key={index}>
              <td style={{ paddingLeft: row.startsWith(' ') ? '20px' : '0px' }}>
                {row.trim()}
              </td>
              <td>{data11.exerciceN[index]}</td>
              <td>{data11.exerciceN1[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  // Sample JSON Data
  const data11 = {
    "exerciceN": ["", "", "", "", "X", "X", "", "", "", "", "", "", "X", "", "X", "", "", "", "", "", "", "X", "", "", "", "", "", "", "X", "", "", "", "", "X", "", "X", "", "X", "", "", "", "X", "X", "X", "X", "", "X"],
    "exerciceN1": ["", "", "", "", "", "X", "", "", "", "", "", "", "X", "", "X", "", "", "", "", "", "", "X", "", "", "", "", "", "", "X", "", "", "", "", "X", "", "X", "", "X", "", "", "", "X", "X", "X", "X", "", "X"],
    "rows": [
      "1. RESULTAT D'EXPLOITATION (I - II)",
      "Quote-part de résultat sur opérations faites en commun :",
      "Bénéfice ou perte transférée III",
      "Pertes ou bénéfice transférée IV",
      "Produits financiers :",
      "De participation (3)",
      "D’autres valeurs mobilières et créances de l’actif immobilisé (3)",
      "Autres intérêts et produits assimilés (3)",
      "Reprises sur provisions, dépréciations et transferts de charge",
      "Différences positives de change",
      "Produits nets sur cessions de valeurs mobilières de placement",
      "Total V",
      "Charges financières :",
      "Dotations aux amortissements, aux dépréciations et aux provisions",
      "Intérêts et charges assimilées (4)",
      "Différences négatives de change",
      "Charges nettes sur cessions de valeurs mobilières de placement",
      "Total VI",
      "2. RESULTAT FINANCIER (V - VI)",
      "3. RESULTAT COURANT avant impôts (I - II + III - IV + V - VI)",
      "Produits exceptionnels :",
      "Sur opérations de gestion",
      "Sur opérations en capital",
      "Reprises sur provisions et dépréciations et transferts de charges",
      "Total VII",
      "Charges exceptionnelles :",
      "Sur opérations de gestion",
      "Sur opérations en capital",
      "Dotations aux amortissements, aux dépréciations et aux provisions",
      "Total VIII",
      "4. RESULTAT EXCEPTIONNEL (VII - VIII)",
      "Participation des salariés aux résultats (IX)",
      "Impôts sur les bénéfices (X)",
      "Total des produits (I + II + V)",
      "Total des charges (II + IV + VI + VIII + X)",
      "Bénéfice ou perte"
    ]
  };
// Sous-section 4 – Modèle de compte de résultat en liste (produits et charges hors taxes)

const BaseSystemCompteDeResultatEnListe = () => {
    return (
      <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th></th>
            <th>Exercice N</th>
            <th>Exercice N-1</th>
          </tr>
        </thead>
        <tbody>
          {data10.rows.map((row, index) => (
            <tr key={index}>
              <td style={{ paddingLeft: row.startsWith(' ') ? '20px' : '0px' }}>
                {row.trim()}
              </td>
              <td>{data10.exerciceN[index]}</td>
              <td>{data10.exerciceN1[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  // Sample JSON Data
  const data10 = {
    "exerciceN": ["", "", "", "X", "", "", "", "", "", "", "", "X", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "X", "", "", "", "", "", "", "", "", "", "", ""],
    "exerciceN1": ["", "", "", "X", "", "", "", "", "", "", "", "X", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "X", "", "", "", "", "", "", "", "", "", "", ""],
    "rows": [
      "Produits d’exploitation (1) :",
      "Ventes de marchandises",
      "Production vendue [biens et services] (a)",
      "Montant net du chiffre d’affaires dont à l’exportation :",
      "Production stockée (b)",
      "Production immobilisée",
      "Subventions d’exploitation",
      "Reprises sur provisions (et amortissements), transferts de charges",
      "Autres produits",
      "Total I",
      "Charges d’exploitation (2) :",
      "Achats de marchandises (d) :",
      "Variation de stock (e)",
      "Achats de matières premières et autres approvisionnements (c)",
      "Variation de stock (e)",
      "* Autres achats et charges externes",
      "Impôts, taxes et versements assimilés",
      "Salaires et traitements",
      "Charges sociales",
      "Dotations aux amortissements et aux dépréciations :",
      "Sur immobilisations : dotations aux amortissements (e)",
      "Sur immobilisations : dotations aux dépréciations",
      "Sur actif circulant : dotations aux dépréciations",
      "Dotations aux provisions",
      "Autres charges",
      "Total II"
    ]
  };
  
const BaseSystemCompteDeResultatEnTableau2 = () => {
    return (
      <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>PRODUITS</th>
            <th>Exercice N</th>
            <th>Exercice N-1</th>
          </tr>
        </thead>
        <tbody>
          {data9.rows.map((row, index) => (
            <tr key={index}>
              <td style={{ paddingLeft: row.startsWith(' ') ? '20px' : '0px' }}>
                {row.trim()}
              </td>
              <td>{data9.exerciceN[index]}</td>
              <td>{data9.exerciceN1[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  // Sample JSON Data
  const data9 = {
    "exerciceN": ["", "", "", "", "", "", "X", "", "", "", "", "", "", "", "", "", "X", "X", "X", "X", "", "", "", "", "", "", "X", "", "", "", "", "", "X", "", "X", "X", ""],
    "exerciceN1": ["", "", "", "", "", "", "X", "", "", "", "", "", "", "", "", "", "X", "X", "X", "X", "", "", "", "", "", "", "X", "", "", "", "", "", "X", "", "X", "X", ""],
    "rows": [
      "PRODUITS (hors taxes)",
      "Produits d’exploitation (1) :",
      "Ventes de marchandises",
      "Production vendue [biens et services] (a)",
      "Sous total A - Montant net du chiffre d’affaires dont à l’exportation :",
      "Production stockée (b)",
      "Production immobilisée",
      "Subventions d’exploitation",
      "Reprises sur provisions, dépréciations (et amortissements) et transferts de charges",
      "Autres produits",
      "Sous total B",
      "Total I (A + B)",
      "Quote-part de résultat sur opérations faites en commun (II)",
      "Produits financiers :",
      "De participation (2)",
      "D’autres valeurs mobilières et créances de l’actif immobilisé (2)",
      "Autres intérêts et produits assimilés (2)",
      "Reprises sur provisions, dépréciations et transferts de charges",
      "Différences positives de change",
      "Produits nets sur cessions de valeurs mobilières de placement",
      "Total III",
      "Produits exceptionnels :",
      "Sur opérations de gestion",
      "Sur opérations en capital",
      "Reprises sur provisions, dépréciations et transferts de charges",
      "TOTAL IV",
      "Total des produits (I + II + III + IV)",
      "Solde débiteur = perte",
      "TOTAL GENERAL"
    ]
  };
const BaseSystemCompteDeResultatEnTableau = () => {
    return (
      <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>CHARGES</th>
            <th>Exercice N</th>
            <th>Exercice N-1</th>
          </tr>
        </thead>
        <tbody>
          {data8.rows.map((row, index) => (
            <tr key={index}>
              <td style={{ paddingLeft: row.startsWith(' ') ? '20px' : '0px' }}>
                {row.trim()}
              </td>
              <td>{data8.exerciceN[index]}</td>
              <td>{data8.exerciceN1[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  // Sample JSON Data
  const data8 = {
    "exerciceN": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "X", "", "X", "", "", "", "X", "X", "", "X", "X", "", "", "", "", "X", "", "X", "", "", "X", "X", ""],
    "exerciceN1": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "X", "", "X", "", "", "", "X", "X", "", "X", "X", "", "", "", "", "X", "", "X", "", "", "X", "X", ""],
    "rows": [
      "CHARGES (hors taxes)",
      "Charges d’exploitation (1) :",
      "Achats de marchandises (a)",
      "Variation des stocks (b)",
      "Achats de matières premières et autres approvisionnements (a)",
      "Variation des stocks (b)",
      "* Autres achats et charges externes",
      "Impôts, taxes et versements assimilés",
      "Salaires et traitements",
      "Charges sociales",
      "Dotations aux amortissements et dépréciations :",
      "Sur immobilisations : dotations aux amortissements (c)",
      "Sur immobilisations : dotations aux dépréciations",
      "Sur actif circulant : dotations aux dépréciations",
      "Dotations aux provisions",
      "Autres charges",
      "TOTAL I",
      "Quote-parts de résultat sur opérations faites en commun",
      "Charges financières :",
      "Dotations aux amortissements, aux dépréciations et aux provisions",
      "Intérêts et charges assimilées (2)",
      "Différences négatives de change",
      "Charges nettes sur cessions de valeurs mobilières de placement",
      "TOTAL II",
      "Charges exceptionnelles :",
      "Sur opérations de gestion",
      "Sur opérations en capital",
      "Dotations aux amortissements, aux dépréciations et aux provisions",
      "TOTAL III",
      "Participations des salariés aux résultats (V)",
      "Impôts sur les bénéfices (VI)",
      "Total des charges (I + II + III + IV + V + VI)",
      "Solde créditeur – bénéfice (3)",
      "TOTAL GENERAL"
    ]
  };
  
const BaseSystemBilanEnListeAvantRepartition3 = () => {
    return (
      <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th></th>
            <th>Exercice N</th>
            <th>Exercice N-1</th>
          </tr>
        </thead>
        <tbody>
          {data7.rows.map((row, index) => (
            <tr key={index}>
              <td style={{ paddingLeft: row.startsWith(' ') ? '20px' : '0px' }}>
                {row.trim()}
              </td>
              <td>{data7.exerciceN[index]}</td>
              <td>{data7.exerciceN1[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  // Sample JSON Data
  const data7 = {
    "exerciceN": ["", "", "", "", "", "", "", "", "", "X", "", "X", "", "", "", "", "", "", "", "X", "", "X", "", "X", "", "", "X", "", "X", ""],
    "exerciceN1": ["", "", "", "", "", "", "", "", "", "X", "", "X", "", "", "", "", "", "", "", "X", "", "X", "", "X", "", "", "X", "", "X", ""],
    "rows": [
      "DETTES À MOINS D'UN AN",
      "Emprunts obligataires convertibles",
      "Autres emprunts obligataires",
      "Emprunts et dettes auprès des établissements de crédit (4)",
      "Emprunts et dettes financières divers",
      "Avances et acomptes reçus sur commandes en cours",
      "Dettes Fournisseurs et Comptes rattachés (g)",
      "Dettes fiscales et sociales",
      "Dettes sur immobilisations et Comptes rattachés",
      "Autres dettes",
      "Instruments financiers à terme",
      "Produits constatés d’avance",
      "Total VII",
      "Excédent de l’actif circulant sur les dettes à moins d’un an (II - VII)",
      "Excédent de l’actif sur les dettes à moins d’un an (VI - VII)",
      "DETTES À PLUS D'UN AN",
      "Emprunts obligataires convertibles",
      "Autres emprunts obligataires",
      "Emprunts et dettes auprès des établissements de crédit (4)",
      "Emprunts et dettes financières divers",
      "Avances et acomptes reçus sur commandes en cours",
      "Dettes Fournisseurs et Comptes rattachés (g)",
      "Dettes fiscales et sociales",
      "Dettes sur immobilisations et Comptes rattachés",
      "Autres dettes",
      "Instruments financiers à terme",
      "Produits constatés d’avance",
      "Total VIII",
      "Ecarts de conversion et différences d’évaluation Passif (IX)",
      "PROVISIONS",
      "Provisions pour risques",
      "Provisions pour charges",
      "Total X",
      "CAPITAUX PROPRES",
      "Capital [dont versé…]",
      "Primes d’émission, de fusion, d’apport,…",
      "Ecarts de réévaluation (h)",
      "Ecart d’équivalence (i)",
      "Réserves :",
      "Réserve légale",
      "Réserves statutaires ou contractuelles",
      "Réserves réglementées",
      "Autres",
      "Report à nouveau (j)",
      "Résultat de l’exercice [bénéfice ou perte] (k)",
      "Subventions d’investissement",
      "Provisions réglementées",
      "Total XI ou [VI - (VII + VIII + IX + X)]"
    ]
  };
  

const BaseSystemBilanEnListeAvantRepartition2 = () => {
    return (
      <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th rowSpan="2">ACTIF</th>
            <th colSpan="3">Exercice N</th>
            <th rowSpan="2">Exercice N-1</th>
          </tr>
          <tr>
            <th>Brut</th>
            <th>Amortissements et dépréciations (à déduire)</th>
            <th>Net</th>
          </tr>
        </thead>
        <tbody>
          {data6.rows.map((row, index) => (
            <tr key={index}>
              <td style={{ paddingLeft: row.startsWith(' ') ? '20px' : '0px' }}>
                {row.trim()}
              </td>
              <td>{data6.exerciceN.brut[index]}</td>
              <td>{data6.exerciceN.amortissements[index]}</td>
              <td>{data6.exerciceN.net[index]}</td>
              <td>{data6.exerciceN1[index]}</td>
            </tr>
          ))}
          <tr>
            <td>{data6.totalI}</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
          </tr>
          <tr>
            <td>{data6.totalII}</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
          </tr>
          <tr>
            <td>{data6.totalIII}</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
          </tr>
          <tr>
            <td>{data6.ecartConversion}</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
          </tr>
          <tr>
            <td>{data6.totalGeneral}</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
          </tr>
        </tbody>
      </table>
    );
  };
  
  // Sample JSON Data
  const data6 = {
    "exerciceN": {
      "brut": Array(18).fill(""),
      "amortissements": Array(18).fill(""),
      "net": Array(18).fill("")
    },
    "exerciceN1": Array(18).fill(""),
    "rows": [
      "ACTIF CIRCULANT",
      "Stocks et en-cours (b) :",
      "Matières premières et autres approvisionnements",
      "En-cours de production [biens et services] (d)",
      "Produits intermédiaires et finis",
      "Marchandises",
      "Avances et acomptes versés sur commandes",
      "Créances (3) :",
      "Créances Clients (a) et Comptes rattachés (e)",
      "Autres",
      "Capital souscrit - appelé, non versé",
      "Valeurs mobilières de placement (f) :",
      "Actions propres",
      "Autres titres",
      "Instruments financiers à terme et jetons détenus",
      "Disponibilités",
      "Charges constatées d’avance (3)"
    ],
    "totalI": "Total I",
    "totalII": "Charges à répartir sur plusieurs exercices (III)",
    "totalIII": "Primes de remboursement des emprunts (IV)",
    "ecartConversion": "Ecarts de conversion et différences d’évaluation Actif (V)",
    "totalGeneral": "TOTAL ACTIF (I + II + III + IV + V)"
  };
  
const BaseSystemBilanEnListeAvantRepartition = ({ data }) => {
    return (
      <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th rowSpan="2">ACTIF</th>
            <th colSpan="3">Exercice N</th>
            <th rowSpan="2">Exercice N-1</th>
          </tr>
          <tr>
            <th>Brut</th>
            <th>Amortissements et dépréciations (à déduire)</th>
            <th>Net</th>
          </tr>
        </thead>
        <tbody>
          {data5.rows.map((row, index) => (
            <tr key={index}>
              <td style={{ paddingLeft: row.startsWith(' ') ? '20px' : '0px' }}>
                {row.trim()}
              </td>
              <td>{data5.exerciceN.brut[index]}</td>
              <td>{data5.exerciceN.amortissements[index]}</td>
              <td>{data5.exerciceN.net[index]}</td>
              <td>{data5.exerciceN1[index]}</td>
            </tr>
          ))}
          <tr>
            <td>{data5.totalI}</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
          </tr>
        </tbody>
      </table>
    );
  };
  
  // Sample JSON Data
  const data5 = {
    "exerciceN": {
      "brut": Array(23).fill(""),
      "amortissements": Array(23).fill(""),
      "net": Array(23).fill("")
    },
    "exerciceN1": Array(23).fill(""),
    "rows": [
      "Capital souscrit - non appelé",
      "ACTIF IMMOBILISÉ (b)",
      "Immobilisations incorporelles :",
      "Frais d’établissement",
      "Frais de recherche et de développement",
      "Concessions, brevets, licences, marques, procédés, logiciels, droits et valeurs similaires",
      "Fonds commercial (1)",
      "Autres",
      "Immobilisations incorporelles en cours",
      "Avances et acomptes",
      "Immobilisations corporelles :",
      "Terrains",
      "Constructions",
      "Installations techniques, matériel et outillage industriels",
      "Autres",
      "Immobilisations corporelles en cours",
      "Avances et acomptes",
      "Immobilisations financières (2) :",
      "Participations (c)",
      "Créances rattachées à des participations",
      "Titres immobilisés de l’activité de portefeuille",
      "Autres titres immobilisés",
      "Prêts",
      "Autres"
    ],
    "totalI": "Total I"
  };
  
  
const BaseSystemBilanEnTableau4 = () => {
    return (
      <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>PASSIF (après répartition)</th>
            <th>Exercice N</th>
            <th>Exercice N-1</th>
          </tr>
        </thead>
        <tbody>
          {data4.rows.map((row, index) => (
            <tr key={index}>
              <td style={{ paddingLeft: row.startsWith(' ') ? '20px' : '0px' }}>
                {row.trim()}
              </td>
              <td>{data4.exerciceN[index]}</td>
              <td>{data4.exerciceN1[index]}</td>
            </tr>
          ))}
          <tr>
            <td>{data4.totalI}</td>
            <td>X</td>
            <td>X</td>
          </tr>
          <tr>
            <td>{data4.totalII}</td>
            <td>X</td>
            <td>X</td>
          </tr>
          <tr>
            <td>{data4.totalIII}</td>
            <td>X</td>
            <td>X</td>
          </tr>
          <tr>
            <td>{data4.ecartConversion}</td>
            <td>X</td>
            <td>X</td>
          </tr>
          <tr>
            <td>{data4.totalGeneral}</td>
            <td>X</td>
            <td>X</td>
          </tr>
        </tbody>
      </table>
    );
  };
  
  // Sample JSON Data
  const data4 = {
    "exerciceN": ["", "", "", "", "", "", "", "", "", "X", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    "exerciceN1": ["", "", "", "", "", "", "", "", "", "X", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    "rows": [
      "CAPITAUX PROPRES*",
      "Capital [dont versé] (a)",
      "Primes d’émission, de fusion, d’apport,…",
      "Ecarts de réévaluation (b)",
      "Ecarts d’équivalence (c)",
      "Réserves :",
      "Réserve légale",
      "Réserves statutaires ou contractuelles",
      "Réserves réglementées",
      "Autres",
      "Report à nouveau (d)",
      "Sous total : Situation nette",
      "Subventions d’investissement",
      "Provisions réglementées",
      "PROVISIONS",
      "Provisions pour risques",
      "Provisions pour charges",
      "DETTES",
      "Emprunts obligataires convertibles",
      "Autres emprunts obligataires",
      "Emprunts et dettes auprès des établissements de crédit (2)",
      "Emprunts et dettes financières divers (3)",
      "Avances et acomptes reçus sur commandes en cours",
      "Dettes Fournisseurs et Comptes rattachés (f)",
      "Dettes fiscales et sociales",
      "Dettes sur immobilisations et Comptes rattachés",
      "Autres dettes",
      "Instruments financiers à terme",
      "Produits constatés d’avance (1)"
    ],
    "totalI": "Total I",
    "totalII": "Total II",
    "totalIII": "Total III",
    "ecartConversion": "Ecarts de conversion et différences d’évaluation Passif (IV)",
    "totalGeneral": "TOTAL GENERAL (I + II + III + IV)"
  };
  
const BaseSystemBilanEnTableau3 = () => {
    return (
      <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>PASSIF (avant répartition)</th>
            <th>Exercice N</th>
            <th>Exercice N-1</th>
          </tr>
        </thead>
        <tbody>
          {data3.rows.map((row, index) => (
            <tr key={index}>
              <td style={{ paddingLeft: row.startsWith(' ') ? '20px' : '0px' }}>
                {row.trim()}
              </td>
              <td>{data3.exerciceN[index]}</td>
              <td>{data3.exerciceN1[index]}</td>
            </tr>
          ))}
          <tr>
            <td>{data3.totalI}</td>
            <td>X</td>
            <td>X</td>
          </tr>
          <tr>
            <td>{data3.totalII}</td>
            <td>X</td>
            <td>X</td>
          </tr>
          <tr>
            <td>{data3.totalIII}</td>
            <td>X</td>
            <td>X</td>
          </tr>
          <tr>
            <td>{data3.ecartConversion}</td>
            <td>X</td>
            <td>X</td>
          </tr>
          <tr>
            <td>{data3.totalGeneral}</td>
            <td>X</td>
            <td>X</td>
          </tr>
        </tbody>
      </table>
    );
  };
  
  // Sample JSON Data
  const data3 = {
    "exerciceN": Array(30).fill(""),
    "exerciceN1": Array(30).fill(""),
    "rows": [
      "CAPITAUX PROPRES*",
      "Capital (dont versé…) (a)",
      "Primes d’émission, de fusion, d’apport,…",
      "Ecarts de réévaluation (b)",
      "Ecart d’équivalence (c)",
      "Réserves :",
      "Réserve légale",
      "Réserves statutaires ou contractuelles",
      "Réserves réglementées",
      "Autres",
      "Report à nouveau (d)",
      "Résultat de l’exercice (bénéfice ou perte) (e)",
      "Subventions d’investissement",
      "Provisions réglementées",
      "PROVISIONS",
      "Provisions pour risques",
      "Provisions pour charges",
      "DETTES (1) (g)",
      "Emprunts obligataires convertibles",
      "Autres emprunts obligataires",
      "Emprunts et dettes auprès des établissements de crédit (2)",
      "Emprunts et dettes financières diverses (3)",
      "Avances et acomptes reçus sur commandes en cours",
      "Dettes Fournisseurs et Comptes rattachés (f)",
      "Dettes fiscales et sociales",
      "Dettes sur immobilisations et Comptes rattachés",
      "Autres dettes",
      "Instruments financiers à terme",
      "Produits constatés d’avance (1)"
    ],
    "totalI": "Total I",
    "totalII": "Total II",
    "totalIII": "Total III",
    "ecartConversion": "Ecarts de conversion et différences d’évaluation Passif (IV)",
    "totalGeneral": "TOTAL GENERAL (I + II + III + IV)"
  };

  // Sample JSON Data
const data2 = {
    "exerciceN": {
      "brut": Array(17).fill(""),
      "amortissements": Array(17).fill(""),
      "net": Array(17).fill("")
    },
    "exerciceN1": Array(17).fill(""),
    "rows": [
      "ACTIF CIRCULANT",
      "Stocks et en-cours (a) :",
      "Matières premières et autres approvisionnements",
      "En-cours de production [biens et services] (c)",
      "Produits intermédiaires et finis",
      "Marchandises",
      "Avances et acomptes versés sur commandes",
      "Créances (3) :",
      "Créances Clients (a) et Comptes rattachés (d)",
      "Autres",
      "Capital souscrit - appelé, non versé",
      "Valeurs mobilières de placement (e) :",
      "Actions propres",
      "Autres titres",
      "Instruments financiers à terme et jetons détenus",
      "Disponibilités",
      "Charges constatées d’avance (3)"
    ],
    "totalI": "Total II",
    "totalII": "Charges à répartir sur plusieurs exercices (III)",
    "totalIII": "Primes de remboursement des emprunts (IV)",
    "totalIV": "Ecarts de conversion et différences d’évaluation Actif (V)",
    "totalGeneral": "TOTAL GENERAL (I + II + III + IV + V)"
  };
  

const BaseSystemBilanEnTableau2 = () => {
    return (
      <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th rowSpan="2">ACTIF</th>
            <th colSpan="3">Exercice N</th>
            <th rowSpan="2">Exercice N-1</th>
          </tr>
          <tr>
            <th>Brut</th>
            <th>Amortissements et dépréciations (à déduire)</th>
            <th>Net</th>
          </tr>
        </thead>
        <tbody>
          {data2.rows.map((row, index) => (
            <tr key={index}>
              <td style={{ paddingLeft: row.startsWith(' ') ? '20px' : '0px' }}>
                {row.trim()}
              </td>
              <td>{data2.exerciceN.brut[index]}</td>
              <td>{data2.exerciceN.amortissements[index]}</td>
              <td>{data2.exerciceN.net[index]}</td>
              <td>{data2.exerciceN1[index]}</td>
            </tr>
          ))}
          <tr>
            <td>{data2.totalI}</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
          </tr>
          <tr>
            <td>{data2.totalII}</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
          </tr>
          <tr>
            <td>{data2.totalIII}</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
          </tr>
          <tr>
            <td>{data2.totalIV}</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
          </tr>
          <tr>
            <td>{data2.totalGeneral}</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
          </tr>
        </tbody>
      </table>
    );
  };
  
  // Sample JSON Data
  const data1 = {
    "exerciceN": {
      "brut": Array(23).fill(""),
      "amortissements": Array(23).fill(""),
      "net": Array(23).fill("")
    },
    "exerciceN1": Array(23).fill(""),
    "rows": [
      "Capital souscrit - non appelé",
      "ACTIF IMMOBILISÉ (a)",
      "Immobilisations incorporelles :",
      "Frais d'établissement",
      "Frais de recherche et de développement",
      "Concessions, brevets, licences, marques, procédés, logiciels, droits et valeurs similaires",
      "Fonds commercial (1)",
      "Autres",
      "Immobilisations incorporelles en cours",
      "Avances et acomptes",
      "Immobilisations corporelles :",
      "Terrains",
      "Constructions",
      "Installations techniques, matériel et outillage industriels",
      "Autres",
      "Immobilisations corporelles en cours",
      "Avances et acomptes",
      "Immobilisations financières (2) :",
      "Participations (b)",
      "Créances rattachées à des participations",
      "Titres immobilisés de l’activité de portefeuille",
      "Autres titres immobilisés",
      "Prêts",
      "Autres"
    ]
  };

  const BaseSystemBilanEnTableau = () => {
    return (
      <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th rowSpan="2">ACTIF</th>
            <th colSpan="3">Exercice N</th>
            <th rowSpan="2">Exercice N-1</th>
          </tr>
          <tr>
            <th>Brut</th>
            <th>Amortissements et dépréciations (à déduire)</th>
            <th>Net</th>
          </tr>
        </thead>
        <tbody>
          {data1.rows.map((row, index) => (
            <tr key={index}>
              <td style={{ paddingLeft: row.startsWith(' ') ? '20px' : '0px' }}>
                {row.trim()}
              </td>
              <td>{data1.exerciceN.brut[index]}</td>
              <td>{data1.exerciceN.amortissements[index]}</td>
              <td>{data1.exerciceN.net[index]}</td>
              <td>{data1.exerciceN1[index]}</td>
            </tr>
          ))}
          <tr>
            <td>Total I</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
            <td>X</td>
          </tr>
        </tbody>
      </table>
    );
  };

const depreciations = [
    {
      rubrique: 'Immobilisations incorporelles',
      debutExercice: 10000,
      dotations: 2000,
      reprises: 1000,
    },
    {
      rubrique: 'Immobilisations corporelles',
      debutExercice: 25000,
      dotations: 5000,
      reprises: 2000,
    },
    {
      rubrique: 'Stocks',
      debutExercice: 15000,
      dotations: 3000,
      reprises: 1500,
    },
    {
      rubrique: 'Créances',
      debutExercice: 8000,
      dotations: 1600,
      reprises: 800,
    },
    {
      rubrique: 'Immobilisations financières',
      debutExercice: 12000,
      dotations: 2400,
      reprises: 1200,
    }
  ];

const bilanData = {
    actif: {
        immobilise: [
            { nom: 'Fonds de commerce', montant: 50000 },
            { nom: 'Brevets', montant: 15000 },
            { nom: 'Terrains', montant: 80000 },
            { nom: 'Bâtiments', montant: 120000 },
            { nom: 'Machines de production', montant: 45000 }
        ],
        circulant: [
            { nom: 'Stocks', montant: 30000 },
            { nom: 'Créances clients', montant: 20000 },
            { nom: 'Valeurs mobilières de placement', montant: 10000 },
            { nom: 'Trésorerie', montant: 15000 }
        ],
        regularisation: [
            { nom: 'Charges constatées d’avance', montant: 5000 }
        ]
    },
    passif: {
        capitauxPropres: [
            { nom: 'Capital social', montant: 100000 },
            { nom: 'Réserves', montant: 50000 },
            { nom: 'Résultat de l’exercice', montant: 20000 }
        ],
        dettesLongTerme: [
            { nom: 'Emprunts bancaires', montant: 80000 },
            { nom: 'Provisions pour retraites', montant: 15000 }
        ],
        dettesCourtTerme: [
            { nom: 'Dettes fournisseurs', montant: 30000 },
            { nom: 'Dettes fiscales et sociales', montant: 20000 }
        ],
        regularisation: [
            { nom: 'Produits constatés d’avance', montant: 10000 }
        ]
    }
};

const BilanComptable = () => {
    const [bilan, setBilan] = useState(bilanData);
    const renderItems = (items, level = 0) => {
        return items.map((item, index) => (
            <tr key={`${item.nom}-${index}`} style={{ paddingLeft: `${level * 20}px` }}>
                <td>{item.nom}</td>
                <td>{item.montant ? item.montant.toFixed(2) : ''}</td>
            </tr>
        ));
    };

    return (
        <Container maxWidth="xl"  sx={{ mt: 12, mb: 12 }}>
            <BaseSystemBilanEnTableau></BaseSystemBilanEnTableau>
            <br></br>
            <br></br>
            <br></br>
            <BaseSystemBilanEnTableau2></BaseSystemBilanEnTableau2>
            <br></br>

            <br></br>

            <br></br>

            <BaseSystemBilanEnTableau3></BaseSystemBilanEnTableau3>
            <br></br>
            <br></br>
            <BaseSystemBilanEnTableau4></BaseSystemBilanEnTableau4>

        <br></br>
        <br></br>

        <BaseSystemBilanEnListeAvantRepartition></BaseSystemBilanEnListeAvantRepartition>

<br></br>
<br></br>
<BaseSystemBilanEnListeAvantRepartition2></BaseSystemBilanEnListeAvantRepartition2>

<br></br>
<br></br>

<BaseSystemBilanEnListeAvantRepartition3></BaseSystemBilanEnListeAvantRepartition3>


<br></br>
<br></br>
<BaseSystemCompteDeResultatEnTableau></BaseSystemCompteDeResultatEnTableau>
<br></br>
<br></br>
<BaseSystemCompteDeResultatEnTableau2></BaseSystemCompteDeResultatEnTableau2>

<br></br>
<br></br>
<BaseSystemCompteDeResultatEnListe></BaseSystemCompteDeResultatEnListe>

<br></br>
<br></br>
<BaseSystemCompteDeResultatEnListe2></BaseSystemCompteDeResultatEnListe2>

<br></br>
<br></br>
<SystemAbregeBilanAvantRepartition></SystemAbregeBilanAvantRepartition>
                    <div>
            <h2>Bilan Comptable</h2>
            <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Éléments</th>
                        <th>Montant (€)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="2"><strong>Total des Actifs</strong></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><strong>Actif Immobilisé</strong></td>
                    </tr>
                    {renderItems(bilan.actif.immobilise)}
                    <tr>
                        <td colSpan="2"><strong>Actif Circulant</strong></td>
                    </tr>
                    {renderItems(bilan.actif.circulant)}
                    <tr>
                        <td colSpan="2"><strong>Comptes de Régularisation (Actif)</strong></td>
                    </tr>
                    {renderItems(bilan.actif.regularisation)}
                    <tr>
                        <td colSpan="2"><strong>Total des Passifs</strong></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><strong>Capitaux Propres</strong></td>
                    </tr>
                    {renderItems(bilan.passif.capitauxPropres)}
                    <tr>
                        <td colSpan="2"><strong>Dettes à Long Terme</strong></td>
                    </tr>
                    {renderItems(bilan.passif.dettesLongTerme)}
                    <tr>
                        <td colSpan="2"><strong>Dettes à Court Terme</strong></td>
                    </tr>
                    {renderItems(bilan.passif.dettesCourtTerme)}
                    <tr>
                        <td colSpan="2"><strong>Comptes de Régularisation (Passif)</strong></td>
                    </tr>
                    {renderItems(bilan.passif.regularisation)}
                </tbody>
            </table>
        </div>

        <TableauDepreciations></TableauDepreciations>
        </Container>
    );
};

export default BilanComptable;



const TableauDepreciations = () => {
  return (
    <div>
      <h2>Tableau des Dépréciations (Art. 841-3)</h2>
      <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Rubriques (a)</th>
            <th>Dépréciations au début de l'exercice (A)</th>
            <th>Augmentations : dotations de l'exercice (B)</th>
            <th>Diminutions : reprises de l'exercice (C)</th>
            <th>Dépréciations à la fin de l'exercice (D = A + B - C)</th>
          </tr>
        </thead>
        <tbody>
          {depreciations.map((dep, index) => (
            <tr key={index}>
              <td>{dep.rubrique}</td>
              <td>{dep.debutExercice.toFixed(2)}</td>
              <td>{dep.dotations.toFixed(2)}</td>
              <td>{dep.reprises.toFixed(2)}</td>
              <td>{(dep.debutExercice + dep.dotations - dep.reprises).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td><strong>TOTAL</strong></td>
            <td><strong>{depreciations.reduce((acc, dep) => acc + dep.debutExercice, 0).toFixed(2)}</strong></td>
            <td><strong>{depreciations.reduce((acc, dep) => acc + dep.dotations, 0).toFixed(2)}</strong></td>
            <td><strong>{depreciations.reduce((acc, dep) => acc + dep.reprises, 0).toFixed(2)}</strong></td>
            <td><strong>{depreciations.reduce((acc, dep) => acc + (dep.debutExercice + dep.dotations - dep.reprises), 0).toFixed(2)}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
