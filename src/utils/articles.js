import article1_en from '../articles/the-five-levels-of-treasury-management';
import article1_fr from '../articles/les-cinq-piliers-de-gestion-de-tresorerie';
import article2_en from '../articles/quick-overview';
import article2_fr from '../articles/apercu-rapide-de-notre-logiciel';
import article3_en from '../articles/sepa-support';
import article3_fr from '../articles/soutenir-les-paiements-sepa';

const articles = [
  { 
    slug: 'the-five-levels-of-treasury-management', 
    content: { en: article1_en, fr: article1_fr }, 
    title: { en: "The Five Levels of Treasury Management", fr: "Les cinq piliers de gestion de trésorerie" } 
  },
  { 
    slug: 'quick-overview', 
    content: { en: article2_en, fr: article2_fr }, 
    title: { en: "Quick overview of our software", fr: "Aperçu rapide de notre logiciel" } 
  },
  { 
    slug: 'sepa-support', 
    content: { en: article3_en, fr: article3_fr }, 
    title: { en: "Supporting SEPA Euro Payments for Streamlined Transactions", fr: "Soutenir les paiements en euros SEPA pour des transactions simplifiées" } 
  },
];

export default articles;
