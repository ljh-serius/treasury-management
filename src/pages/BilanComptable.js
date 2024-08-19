import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';

const SystemdeveloppeModeldeCompteDeResulat3 = () => {
    const tableHeadData = [
        { label: "PRODUITS (hors taxes)", colSpan: 1, rowSpan: 2 },
        { label: "Exercice N", colSpan: 1, rowSpan: 1 },
        { label: "Exercice N-1", colSpan: 1, rowSpan: 1 },
    ];

    const secondRowData = [
        { label: "", colSpan: 1, rowSpan: 1 },
        { label: "Totaux partiels", colSpan: 1, rowSpan: 1 },
        { label: "Totaux partiels", colSpan: 1, rowSpan: 1 },
    ];

    const tableBodyData = [
        [{ label: "Produits d'exploitation (1) :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Ventes de marchandises", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Production vendue", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Ventes", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Travaux", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Prestations de services", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Montant net du chiffre d’affaires dont à l’exportation : ………", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Production stockée (a)", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "En-cours de production de biens (a)", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "En-cours de production de services (a)", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Produits (a)", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Production immobilisée", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Subventions d’exploitation", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Reprises sur provisions, dépréciations (et amortissements)", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Transferts de charges", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Autres produits", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Quote-part de résultat sur opérations faites en commun", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Produits financiers", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "De participation (2)", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "D’autres valeurs mobilières de créances de l’actif immobilisé (2)", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Autres intérêts et produits assimilés (2)", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Reprises sur provisions et dépréciations et transfert de charges financières", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Différences positives de change", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Produits nets sur cessions de valeurs mobilières de placement", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Produits exceptionnels", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Sur opérations de gestion", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Sur opérations en capital :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "- produits des cessions d’éléments d’actif (c)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "- subventions d’investissement virées au résultat de l’exercice", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "- autres", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Reprises sur provisions et dépréciations et transfert de charges exceptionnelles", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Solde débiteur = perte", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "TOTAL GENERAL", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "(1) Dont produits afférents à des exercices antérieurs.", colSpan: 3, rowSpan: 1 }],
        [{ label: "Les conséquences des corrections d’erreurs significatives, calculées après impôt, sont présentées sur une ligne séparée sauf s’il s’agit de corriger une écriture ayant été directement imputée sur les capitaux propres.", colSpan: 3, rowSpan: 1 }],
        [{ label: "(2) Dont produits concernant les entités liées.", colSpan: 3, rowSpan: 1 }],
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


const SystemdeveloppeModeldeCompteDeResulat2 = () => {
    const tableHeadData = [
        { label: "CHARGES (hors taxes)", colSpan: 1, rowSpan: 2 },
        { label: "Exercice N", colSpan: 1, rowSpan: 1 },
        { label: "Exercice N-1", colSpan: 1, rowSpan: 1 },
    ];

    const secondRowData = [
        { label: "", colSpan: 1, rowSpan: 1 },
        { label: "Totaux partiels", colSpan: 1, rowSpan: 1 },
        { label: "Totaux partiels", colSpan: 1, rowSpan: 1 },
    ];

    const tableBodyData = [
        [{ label: "Charges exceptionnelles", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Sur opérations de gestion", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Sur opérations en capital :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "- valeurs comptables des éléments immobilisés et financiers cédés (e)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "- autres", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Dotations aux amortissements, aux dépréciations et aux provisions :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "- dotations aux provisions réglementées", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "- dotations aux amortissements, aux dépréciations et aux autres provisions", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Participation des salariés aux résultats", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Impôts sur les bénéfices", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Solde créditeur = bénéfice", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "TOTAL GENERAL", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "(1) Dont charges afférentes à des exercices antérieurs.", colSpan: 3, rowSpan: 1 }],
        [{ label: "Les conséquences des corrections d’erreurs significatives, calculées après impôt, sont présentées sur une ligne séparée sauf s'il s’agit de corriger une écriture ayant été directement imputée sur les capitaux propres.", colSpan: 3, rowSpan: 1 }],
        [{ label: "(2) Dont intérêts concernant les entités liées.", colSpan: 3, rowSpan: 1 }],
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


const SystemdeveloppeModeldeCompteDeResulat = () => {
    const tableHeadData = [
        { label: "CHARGES (hors taxes)", colSpan: 1, rowSpan: 2 },
        { label: "Exercice N", colSpan: 2, rowSpan: 1 },
        { label: "Exercice N-1", colSpan: 1, rowSpan: 1 },
    ];

    const secondRowData = [
        { label: "", colSpan: 1, rowSpan: 1 },
        { label: "Totaux partiels", colSpan: 1, rowSpan: 1 },
        { label: "Totaux partiels", colSpan: 1, rowSpan: 1 },
    ];

    const tableBodyData = [
        [{ label: "Charges d'exploitation (1) :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Coût d'achat des marchandises vendues dans l'exercice", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "• Achats de marchandises (d)", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "• Variation des stocks de marchandises (b)", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Consommations de l'exercice en provenance de tiers", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "• Achats stockés d'approvisionnements (a) :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "• matières premières", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "• autres approvisionnements", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "• Variation des stocks d'approvisionnements (b)", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "• Achats de sous-traitances", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "• Achats non stockés de matières et fournitures", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "• Services extérieurs :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "• personnel extérieur", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "• loyers en crédit-bail (c)", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "• autres", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Impôts, taxes et versements assimilés", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Sur rémunérations", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Autres", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Charges de personnel", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Salaires et traitements", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Charges sociales", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Dotations aux amortissements et dépréciations", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Sur immobilisations : dotations aux amortissements (d)", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Sur immobilisations : dotations aux dépréciations", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Sur actif circulant : dotations aux dépréciations", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Dotations aux provisions", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Autres charges", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Quote-parts de résultat sur opérations faites en commun", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Charges financières", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Dotations aux amortissements, aux dépréciations et aux provisions", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Intérêts et charges assimilées (2)", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Différences négatives de change", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Charges nettes sur cessions de VMP", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
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


const SystemeDeloppeModelDeBilanApresRepartition = () => {
    const tableHeadData = [
        { label: "PASSIF (avant répartition)", colSpan: 1, rowSpan: 2 },
        { label: "Exercice N", colSpan: 1, rowSpan: 2 },
        { label: "Exercice N-1", colSpan: 1, rowSpan: 2 },
    ];

    const tableBodyData = [
        [{ label: "CAPITAUX PROPRES *", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Capital [dont versé…] (a)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Primes d’émission, de fusion, d’apport,…", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Ecarts de réévaluation (b)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Ecart d’équivalence (c)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Réserves :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Réserve légale", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Réserves statutaires ou contractuelles", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Réserves réglementées", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Autres", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Report à nouveau (d)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Résultat de l’exercice [bénéfice ou perte] (e)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Subventions d’investissement", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Provisions réglementées", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Total I", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "PROVISIONS", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Provisions pour risques", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Provisions pour charges", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Total II", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "DETTES (1) (3)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Dettes financières :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Emprunts obligataires convertibles", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Autres emprunts obligataires", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Emprunts et dettes auprès des établissements de crédit (2)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Emprunts et dettes financières diverses (3)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Avances et acomptes reçus sur commandes en cours", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Dettes d’exploitation :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Dettes Fournisseurs et Comptes rattachés (f)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Dettes fiscales et sociales", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Autres", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Dettes diverses :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Dettes sur immobilisations et Comptes rattachés", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Dettes fiscales (impôts sur les bénéfices)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Autres", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Instruments financiers à terme", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Produits constatés d’avance (1)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Total III", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Ecarts de conversion et différences d’évaluation Passif (IV)", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "TOTAL GENERAL (I + II + III + IV)", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "(1) Dont à plus d’un an", colSpan: 3, rowSpan: 1 }],
        [{ label: "Dont à moins d’un an", colSpan: 3, rowSpan: 1 }],
        [{ label: "(2) Dont concours bancaires courants et soldes créditeurs de banques", colSpan: 3, rowSpan: 1 }],
        [{ label: "(3) Dont emprunts participatifs", colSpan: 3, rowSpan: 1 }],
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
            </thead>
            <tbody>
                {tableBodyData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td
                                key={cellIndex}
                                colSpan={cell.colSpan}
                                rowSpan={cell.rowSpan}
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

const SystemeDeloppeModelDeBilan3 = () => {
    const tableHeadData = [
        { label: "PASSIF (avant répartition)", colSpan: 1, rowSpan: 2 },
        { label: "Exercice N", colSpan: 1, rowSpan: 2 },
        { label: "Exercice N-1", colSpan: 1, rowSpan: 2 },
    ];

    const tableBodyData = [
        [{ label: "CAPITAUX PROPRES *", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Capital [dont versé…] (a)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Primes d’émission, de fusion, d’apport,…", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Ecarts de réévaluation (b)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Ecart d’équivalence (c)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Réserves :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Réserve légale", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Réserves statutaires ou contractuelles", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Réserves réglementées", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Autres", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Report à nouveau (d)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Résultat de l’exercice [bénéfice ou perte] (e)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Subventions d’investissement", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Provisions réglementées", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Total I", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "PROVISIONS", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Provisions pour risques", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Provisions pour charges", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Total II", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "DETTES (1) (3)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Dettes financières :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Emprunts obligataires convertibles", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Autres emprunts obligataires", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Emprunts et dettes auprès des établissements de crédit (2)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Emprunts et dettes financières diverses (3)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Avances et acomptes reçus sur commandes en cours", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Dettes d’exploitation :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Dettes Fournisseurs et Comptes rattachés (f)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Dettes fiscales et sociales", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Autres", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Dettes diverses :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Dettes sur immobilisations et Comptes rattachés", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Dettes fiscales (impôts sur les bénéfices)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Autres", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Instruments financiers à terme", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Produits constatés d’avance (1)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Total III", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Ecarts de conversion et différences d’évaluation Passif (IV)", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "TOTAL GENERAL (I + II + III + IV)", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "(1) Dont à plus d’un an", colSpan: 3, rowSpan: 1 }],
        [{ label: "Dont à moins d’un an", colSpan: 3, rowSpan: 1 }],
        [{ label: "(2) Dont concours bancaires courants et soldes créditeurs de banques", colSpan: 3, rowSpan: 1 }],
        [{ label: "(3) Dont emprunts participatifs", colSpan: 3, rowSpan: 1 }],
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
            </thead>
            <tbody>
                {tableBodyData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td
                                key={cellIndex}
                                colSpan={cell.colSpan}
                                rowSpan={cell.rowSpan}
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

const SystemeDeloppeModelDeBilan2 = () => {
    const tableHeadData = [
        { label: "ACTIF (suite)", rowSpan: 2, colSpan: 1 },
        { label: "Exercice N", rowSpan: 1, colSpan: 3 },
        { label: "Exercice N-1", rowSpan: 1, colSpan: 1 },
    ];

    const secondRowData = [
        { label: "Brut", rowSpan: 1, colSpan: 1 },
        { label: "Amortissements et dépréciations (à déduire)", rowSpan: 1, colSpan: 1 },
        { label: "Net", rowSpan: 1, colSpan: 1 },
        { label: "Net", rowSpan: 1, colSpan: 1 },
    ];

    const tableBodyData = [
        [{ label: "ACTIF CIRCULANT", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Stocks et en-cours (a) :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Matières premières et autres approvisionnements", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "En-cours de production [biens et services] (c)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Produits intermédiaires et finis", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Marchandises", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Avances et acomptes versés sur commandes", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Créances d’exploitation (3) :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Créances Clients et Comptes rattachés (a) (d)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Autres", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Capital souscrit - appelé, non versé", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Valeurs mobilières de placement (e) :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Actions propres", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Autres titres", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Instruments financiers à terme et jetons détenus", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Disponibilités", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Charges constatées d’avance (3)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Total II", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Charges à répartir sur plusieurs exercices (III)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Primes de remboursement des emprunts (IV)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Ecarts de conversion d’éléments d’évaluation Actif (V)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "TOTAL GENERAL (I + II + III + IV + V)", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "(3) Dont à plus d’un an", colSpan: 5, rowSpan: 1 }],
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

const SystemeDeloppeModelDeBilan = () => {
    const tableHeadData = [
        { label: "ACTIF", rowSpan: 2, colSpan: 1 },
        { label: "Exercice N", rowSpan: 1, colSpan: 3 },
        { label: "Exercice N-1", rowSpan: 1, colSpan: 1 },
    ];

    const secondRowData = [
        { label: "Brut", rowSpan: 1, colSpan: 1 },
        { label: "Amortissements et dépréciations (à déduire)", rowSpan: 1, colSpan: 1 },
        { label: "Net", rowSpan: 1, colSpan: 1 },
        { label: "Net", rowSpan: 1, colSpan: 1 },
    ];

    const tableBodyData = [
        [{ label: "Capital souscrit - non appelé", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "ACTIF IMMOBILISÉ (a)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Immobilisations incorporelles :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Frais d’établissement", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Frais de recherche et de développement", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Concessions, brevets, licences, marques, procédés, logiciels, droits et valeurs similaires", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Fonds commercial (1)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Autres", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Immobilisations incorporelles en cours", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Avances et acomptes", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Immobilisations corporelles :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Terrains", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Constructions", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Installations techniques, matériel et outillage industriels", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Autres", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Immobilisations corporelles en cours", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Avances et acomptes", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Immobilisations financières (2) :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Participations (b)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Créances rattachées à des participations", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Titres immobilisés de l’activité de portefeuille", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Autres titres immobilisés", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Prêts", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Autres", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Total I", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "(1) Dont droit au bail", colSpan: 5, rowSpan: 1 }],
        [{ label: "(2) Dont à moins d’un an", colSpan: 5, rowSpan: 1 }],
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

const SystemAbregeModelModelDeCompteDeResulatEnListe = () => {
    const tableHeadData = [
        { label: "", rowSpan: 1, colSpan: 1 },
        { label: "Exercice N", rowSpan: 1, colSpan: 1 },
        { label: "Exercice N-1", rowSpan: 1, colSpan: 1 },
    ];

    const tableBodyData = [
        [{ label: "Produits d'exploitation (hors taxes) :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Ventes de marchandises", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Production vendue [biens et services] (a)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Production stockée (b)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Production immobilisée", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Subventions d'exploitation", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Autres produits", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Total I", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "dont à l'exportation", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Charges d'exploitation (hors taxes) :", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Achats de marchandises (c)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Variation de stock (marchandises) (d)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Achats d'approvisionnements (c)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Variation de stock d'approvisionnements (d)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Autres charges externes *", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Impôts, taxes et versements assimilés", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Rémunérations du personnel", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Charges sociales", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Dotations aux amortissements", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Dotations aux dépréciations", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Dotations aux provisions", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Autres charges", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Total II", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "RESULTAT D'EXPLOITATION (I - II)", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "Produits financiers (I)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Charges financières (IV)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Produits exceptionnels (V)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Charges exceptionnelles (VI)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "Impôts sur les bénéfices (VII)", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "BENEFICE OU PERTE (I - II + III - IV + V - VI - VII) (2)", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }, { label: "X", colSpan: 1, rowSpan: 1 }],
        [{ label: "", colSpan: 1, rowSpan: 1 }, { label: "Y", colSpan: 1, rowSpan: 1 }, { label: "", colSpan: 1, rowSpan: 1 }],
        [{ label: "- redevances de crédit-bail immobilier", colSpan: 3, rowSpan: 1 }],
        [{ label: "(1) Dont reprises sur dépréciations, provisions (et amortissements)", colSpan: 3, rowSpan: 1 }],
        [{ label: "(2) Compte tenu d'un résultat exceptionnel de (V - VI) ou (VI - V)", colSpan: 3, rowSpan: 1 }],
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
            </thead>
            <tbody>
                {tableBodyData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td
                                key={cellIndex}
                                colSpan={cell.colSpan}
                                rowSpan={cell.rowSpan}
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

const SystemeAbregeModelDeCompteDeResultatEnTableau = () => {
    const tableHeadData = [
        { label: "Charges (hors taxes)", rowSpan: 1, colSpan: 1 },
        { label: "N", rowSpan: 1, colSpan: 1 },
        { label: "N-1", rowSpan: 1, colSpan: 1 },
        { label: "Produits (hors taxes)", rowSpan: 1, colSpan: 1 },
        { label: "N", rowSpan: 1, colSpan: 1 },
        { label: "N-1", rowSpan: 1, colSpan: 1 },
    ];

    const tableBodyData = [
        [
            { label: "Charges d'exploitation :", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "Produits d'exploitation :", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
        ],
        [
            { label: "Achats de marchandises (a)", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "Ventes de marchandises", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
        ],
        [
            { label: "Variation de stocks [marchandises] (b)", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "Production vendue [biens et services] (c)", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
        ],
        [
            { label: "Achats d'approvisionnements (a)", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "Production stockée (d)", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
        ],
        [
            { label: "Variation de stocks [approvisionnements] (b)", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "Production immobilisée", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
        ],
        [
            { label: "* Autres charges externes", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "Subventions d'exploitation", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
        ],
        [
            { label: "Impôts, taxes et versements assimilés", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "Autres produits (2)", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
        ],
        [
            { label: "Rémunérations du personnel", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
        ],
        [
            { label: "Charges sociales", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
        ],
        [
            { label: "Dotations aux amortissements", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
        ],
        [
            { label: "Dotations aux dépréciations", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },

            { label: "X", colSpan: 1, rowSpan: 1 },

        ],
        [
            { label: "Dotations aux provisions", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
        ],
        [
            { label: "Autres charges", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },

            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },


        ],
        [
            { label: "Charges financières", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "Produits financiers (2)", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
        ],
        [
            { label: "Total I", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "Total I", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
        ],
        [
            { label: "Charges exceptionnelles (II)", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "dont à l'exportation", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "", colSpan: 1, rowSpan: 1 },
        ],
        [
            { label: "Impôts sur les bénéfices (III)", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "Produits exceptionnels (2) (II)", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
        ],
        [
            { label: "Total des charges (I + II + III)", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "Total des produits (I + II)", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
        ],
        [
            { label: "Solde créditeur : bénéfice (1)", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "Solde débiteur : perte (3)", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
        ],
        [
            { label: "TOTAL GENERAL", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "TOTAL GENERAL", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
        ],
        [
            { label: "* Y compris :", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },

            { label: "X", colSpan: 1, rowSpan: 1 },

            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },

        ],
        [
            { label: "* Y compris :", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },

            { label: "X", colSpan: 1, rowSpan: 1 },

            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },

        ],
        [
            { label: "(1) Compte tenu d'un résultat exceptionnel avant impôts de", colSpan: 1, rowSpan: 1 },
            { label: "(2) Dont reprises sur dépréciations, provisions (et amortissements)", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },

            { label: "X", colSpan: 1, rowSpan: 1 },

        ],
        [
            { label: "", colSpan: 1, rowSpan: 1 },
            { label: "(3) Compte tenu d'un résultat exceptionnel avant impôts de", colSpan: 1, rowSpan: 1 },
            { label: "X", colSpan: 1, rowSpan: 1 },

            { label: "X", colSpan: 1, rowSpan: 1 },

            { label: "X", colSpan: 1, rowSpan: 1 },

            { label: "X", colSpan: 1, rowSpan: 1 },

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
            </thead>
            <tbody>
                {tableBodyData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td
                                key={cellIndex}
                                colSpan={cell.colSpan}
                                rowSpan={cell.rowSpan}
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


const SystemAbregeBilanApresRepartition = () => {
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
        { label: "Amort. et dépréciations (à déduire)", rowSpan: 1, colSpan: 1 },
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
            { label: "Sous total : situation nette", colSpan: 2, rowSpan: 1 },
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
            { label: "", colSpan: 4, rowSpan: 1 },
            { label: "Dont à moins d'un an", colSpan: 4, rowSpan: 1 },
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


// Sample async function to fetch invoice amounts
const fetchInvoicesTotalAmountByType = async (type) => {
    // Simulate an API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(Math.floor(Math.random() * 10000)); // Replace this with your actual data fetching logic
        }, 500);
    });
};

const BaseSystemCompteDeResultatEnTableau = () => {
    const [exerciceNData, setExerciceNData] = useState([]);
    const [exerciceN1Data, setExerciceN1Data] = useState([]);

    useEffect(() => {
        // Fetch data for each type
        const fetchData = async () => {
            const types = data8.rows;
            const exerciceNResults = await Promise.all(types.map(type => fetchInvoicesTotalAmountByType(type)));
            const exerciceN1Results = await Promise.all(types.map(type => fetchInvoicesTotalAmountByType(type)));

            setExerciceNData(exerciceNResults);
            setExerciceN1Data(exerciceN1Results);
        };

        fetchData();
    }, []);

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
                        <td>{exerciceNData[index] || data8.exerciceN[index]}</td>
                        <td>{exerciceN1Data[index] || data8.exerciceN1[index]}</td>
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
                    <th rowSpan="1">Exercice N-1</th>
                </tr>
                <tr>
                    <th>Brut</th>
                    <th>Amortissements et dépréciations (à déduire)</th>
                    <th>Net</th>
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
                    <th rowSpan="1">Exercice N-1</th>
                </tr>
                <tr>
                    <th>Brut</th>
                    <th>Amortissements et dépréciations (à déduire)</th>
                    <th>Net</th>
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

    return (
        <Container maxWidth="xl" sx={{ mt: 12, mb: 12 }}>
            {/* <BaseSystemBilanEnTableau></BaseSystemBilanEnTableau>
            <br></br>
            <BaseSystemBilanEnTableau2></BaseSystemBilanEnTableau2>
            <br></br>
            <BaseSystemBilanEnTableau3></BaseSystemBilanEnTableau3>
            <br></br>
            <BaseSystemBilanEnTableau4></BaseSystemBilanEnTableau4>
            <br></br>
            <BaseSystemBilanEnListeAvantRepartition></BaseSystemBilanEnListeAvantRepartition>
            <br></br>
            <BaseSystemBilanEnListeAvantRepartition2></BaseSystemBilanEnListeAvantRepartition2>
            <br></br>
            <BaseSystemBilanEnListeAvantRepartition3></BaseSystemBilanEnListeAvantRepartition3>
            <br></br> */}
            <BaseSystemCompteDeResultatEnTableau></BaseSystemCompteDeResultatEnTableau>
            {/* <br></br>
            <BaseSystemCompteDeResultatEnTableau2></BaseSystemCompteDeResultatEnTableau2>
            <br></br>
            <BaseSystemCompteDeResultatEnListe></BaseSystemCompteDeResultatEnListe>
            <br></br>
            <BaseSystemCompteDeResultatEnListe2></BaseSystemCompteDeResultatEnListe2>
            <br></br>
            <SystemAbregeBilanAvantRepartition></SystemAbregeBilanAvantRepartition>
            <br></br>
            <SystemAbregeBilanApresRepartition></SystemAbregeBilanApresRepartition>
            <br></br>
            <SystemeAbregeModelDeCompteDeResultatEnTableau></SystemeAbregeModelDeCompteDeResultatEnTableau>
            <br></br>
            <SystemAbregeModelModelDeCompteDeResulatEnListe></SystemAbregeModelModelDeCompteDeResulatEnListe>
            <br></br>
            <SystemeDeloppeModelDeBilan></SystemeDeloppeModelDeBilan>
            <br></br>
            <SystemeDeloppeModelDeBilan2></SystemeDeloppeModelDeBilan2>
            <br></br>
            <SystemeDeloppeModelDeBilan3></SystemeDeloppeModelDeBilan3>
            <br></br>
            <SystemeDeloppeModelDeBilanApresRepartition></SystemeDeloppeModelDeBilanApresRepartition>
            <br></br>
            <SystemdeveloppeModeldeCompteDeResulat></SystemdeveloppeModeldeCompteDeResulat>
            <br></br>
            <SystemdeveloppeModeldeCompteDeResulat></SystemdeveloppeModeldeCompteDeResulat>
            <br></br>
            <SystemdeveloppeModeldeCompteDeResulat2></SystemdeveloppeModeldeCompteDeResulat2>
            <br></br>
            <SystemdeveloppeModeldeCompteDeResulat3></SystemdeveloppeModeldeCompteDeResulat3> */}
        </Container>
    )
};

export default BilanComptable;
