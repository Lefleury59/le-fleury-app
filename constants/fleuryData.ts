export interface Attraction {
  id: string;
  name: string;
  zone: string;
  type: string;
  restrictions: string;
  image: string;
  isOpen: boolean;
  horaires?: string;
  numeroPlan: string;
}

export interface PointDeVente {
  id: string;
  name: string;
  zone: string;
  type: string;
  isOpen: boolean;
  horaires?: string;
  numeroPlan?: string;
}

export interface Evenement {
  id: string;
  title: string;
  location: string;
  time: string;
}

export const ATTRACTIONS_FLEURY: Attraction[] = [
  // Carotte Ville
  { id: '1', name: 'Le Fleurby Express', zone: 'Carotte Ville', type: 'Jeune public', restrictions: 'Accompagné : -1m | Seul : +1m', image: 'https://www.hebergeur-image.fr/uploads/20261103/729179ff0922021dad8a9d23df7ed7ba0cc7e94c.jpg', isOpen: true, horaires: '10h00 - 18h00', numeroPlan: '7' },
  { id: '2', name: "L'Aircraft", zone: 'Carotte Ville', type: 'Famille', restrictions: 'Interdit : -90cm | Accompagné : 90cm à 1m10 | Seul : +1m10', image: 'https://i.postimg.cc/hjr3gXnq/aircraft-le-fleury-6486b838c789e.jpg', isOpen: true, horaires: '10h00 - 18h00', numeroPlan: '6' },
  { id: '3', name: 'Le Leonardo', zone: 'Carotte Ville', type: 'Jeune public', restrictions: 'Interdit : -90cm et + de 1m40 | Seul : 90cm à 1m40', image: 'https://i.postimg.cc/Xv62CfN8/IMG-0344-min-768x512.jpg', isOpen: true, horaires: '10h30 - 17h30', numeroPlan: '8' },
  { id: '4', name: 'La Warotte', zone: 'Carotte Ville', type: 'Famille', restrictions: 'Accompagné : -80cm | Seul : -80cm', image: 'https://i.postimg.cc/nVS0kbc3/0822-Le-Fleury-2022-142-WEB-768x513.jpg', isOpen: true, horaires: '10h00 - 18h00', numeroPlan: '1' },
  { id: '5', name: 'La Carotte', zone: 'Carotte Ville', type: 'Jeune public', restrictions: 'Interdit : -90cm | Accompagné : 90cm à 1m20 | Seul : +1m20', image: 'https://i.postimg.cc/rpq1TQFb/carotte-le-fleury-1-(1).jpg', isOpen: true, horaires: '10h00 - 18h00', numeroPlan: '4' },
  { id: '6', name: "L'Aéroclub", zone: 'Carotte Ville', type: 'Jeune public', restrictions: 'Seul : entre 95cm et 1m45', image: 'https://i.postimg.cc/9MnZG2tC/0179-Le-Fleury-175-WEB-768x513.jpg', isOpen: true, horaires: '10h00 - 18h00', numeroPlan: '3' },
  { id: '7', name: 'Tiny Carrousel', zone: 'Carotte Ville', type: 'Jeune public', restrictions: 'Accompagné : -1m | Seul : +1m', image: 'https://i.postimg.cc/Xq6F28hT/IMG-8432-768x512.jpg', isOpen: true, horaires: '10h00 - 18h00', numeroPlan: '2' },
  { id: '8', name: 'Le Cinéma Dynamique', zone: 'Carotte Ville', type: 'Famille', restrictions: 'Interdit : -1m | Accompagné : 1m à 1m20 | Seul : +1m20', image: 'https://i.postimg.cc/fLNTprz7/images-(1).jpg', isOpen: true, horaires: '11h00 - 18h00', numeroPlan: '5' },

  // Le Bayou
  { id: '9', name: "Dock's Boat", zone: 'Le Bayou', type: 'Famille', restrictions: 'Interdit : -90cm | Accompagné : 90cm à 1m20 | Seul : +1m20', image: 'https://i.postimg.cc/286jsvYr/IMG-5029-scaled.jpg', isOpen: true, horaires: '10h30 - 17h30', numeroPlan: '14' },
  { id: '10', name: 'Le Bayou Express', zone: 'Le Bayou', type: 'Famille', restrictions: 'Interdit : -90cm | Accompagné : 90cm à 1m20 | Seul : +1m20', image: 'https://i.postimg.cc/gj0dP9fS/0195-Le-Fleury-198-WEB-768x513.jpg', isOpen: true, horaires: '10h30 - 17h30', numeroPlan: '16' },
  { id: '11', name: 'Les Chaises Volantes', zone: 'Le Bayou', type: 'Sensations', restrictions: 'Interdit : -1m20 | Seul : +1m20', image: 'https://i.postimg.cc/h4YNG7xS/images-(2).jpg', isOpen: true, horaires: '10h30 - 17h30', numeroPlan: '17' },
  { id: '12', name: 'Les Kartings Électriques', zone: 'Le Bayou', type: 'Jeune public', restrictions: 'Seul : entre 1m et 1m40 (Supplément 2€)', image: 'https://i.postimg.cc/FFfNGvg6/test-91-4.jpg', isOpen: true, horaires: '10h30 - 17h30', numeroPlan: '15' },
  { id: '13', name: 'Le Cocoon', zone: 'Le Bayou', type: 'Jeune public', restrictions: 'Espace couvert réservé aux enfants : -1m10', image: 'https://i.postimg.cc/KzCXCKrd/images-(3).jpg', isOpen: true, horaires: '10h00 - 18h00', numeroPlan: '12' },
  { id: '14', name: 'Blood Bayou', zone: 'Le Bayou', type: 'Sensations', restrictions: 'Maison hantée - Déconseillé aux plus jeunes', image: 'https://i.postimg.cc/2SGsr97F/IMG-4923-768x512.jpg', isOpen: true, horaires: '12h00 - 18h00', numeroPlan: '19' },

  // Le Monde des Fleurs
  { id: '15', name: 'Les Pédalos', zone: 'Le monde des fleurs', type: 'Famille', restrictions: 'Seul dès 16 ans (ou accompagné)', image: 'https://www.hebergeur-image.fr/uploads/20261105/0f904dd72dcd254839d55d3baf09fe7393050fee.jpg', isOpen: true, horaires: '10h30 - 17h30', numeroPlan: '11' },
  { id: '16', name: 'La Ruche', zone: 'Le monde des fleurs', type: 'Jeune public', restrictions: 'Seul : entre 90cm et 1m50', image: 'https://www.hebergeur-image.fr/uploads/20261105/1d38c05861cfbd6840d79794f29a71c2a1ce6d52.jpeg', isOpen: true, horaires: '10h30 - 17h30', numeroPlan: '9' },
  { id: '17', name: 'Les Herbes Hautes', zone: 'Le monde des fleurs', type: 'Jeune public', restrictions: 'Réservé aux enfants entre 4 et 11 ans', image: 'https://www.hebergeur-image.fr/uploads/20261105/e4f28412e8f3614456058aa87d4206a8db6a43c2.jpg', isOpen: true, horaires: '10h30 - 17h30', numeroPlan: '10' },

  // Le Monde d'Elios
  { id: '18', name: 'La Catapulte', zone: "Le monde d'Elios", type: 'Sensations', restrictions: 'Poids requis : entre 35kg et 120kg', image: 'https://i.postimg.cc/Gpks4Y9q/0573-Le-Fleury-560-1024x684.jpg', isOpen: true, horaires: '11h00 - 18h00', numeroPlan: '20' },
  { id: '19', name: 'Le Drakkar', zone: "Le monde d'Elios", type: 'Sensations', restrictions: 'Interdit : -1m20 | Accompagné : 1m20 à 1m40 | Seul : +1m40', image: 'https://i.postimg.cc/NGx7Jhsn/0667-Le-Fleury-676-768x513.jpg', isOpen: true, horaires: '10h30 - 18h00', numeroPlan: '21' },
  { id: '20', name: "L'Épée d'Odin", zone: "Le monde d'Elios", type: 'Sensations', restrictions: 'Interdit : -1m20 | Accompagné : 1m20 à 1m30 | Seul : +1m30', image: 'https://i.postimg.cc/FRd8br5w/images.jpg', isOpen: true, horaires: '10h30 - 18h00', numeroPlan: '22' },
  { id: '21', name: 'Rhaegal', zone: "Le monde d'Elios", type: 'Sensations', restrictions: 'Interdit : -95cm | Accompagné : 95cm à 1m30 | Seul : +1m30', image: 'https://i.postimg.cc/sxJc7qX5/0182-Le-Fleury-2023-236-768x513.jpg', isOpen: true, horaires: '10h30 - 18h00', numeroPlan: '23' },
  { id: '22', name: 'Le Valeron', zone: "Le monde d'Elios", type: 'Jeune public', restrictions: 'Interdit : -90cm | Accompagné : 90cm à 1m10 | Seul : +1m10', image: 'https://i.postimg.cc/V68ngg2h/0706-Le-Fleury-2022-026-WEB-768x513.jpg', isOpen: true, horaires: '10h00 - 18h00', numeroPlan: '28' },
  { id: '23', name: 'Le Marteau de Thor', zone: "Le monde d'Elios", type: 'Sensations', restrictions: 'Interdit : -1m20 | Accompagné : 1m20 à 1m40 | Seul : +1m40', image: 'https://i.postimg.cc/YC03LXHc/0285-Le-Fleury-283-WEB-768x513.jpg', isOpen: true, horaires: '10h30 - 18h00', numeroPlan: '26' },
  { id: '24', name: 'Le Mini-Golf', zone: "Le monde d'Elios", type: 'Famille', restrictions: 'Accessible à tous (sous la responsabilité d’un adulte)', image: 'https://i.postimg.cc/RhbWkLbf/images-(4).jpg', isOpen: true, horaires: '10h00 - 18h00', numeroPlan: '27' },
  { id: '25', name: "Les Chopes d'Egill", zone: "Le monde d'Elios", type: 'Famille', restrictions: 'Interdit : -90cm | Accompagné : 90cm à 1m20 | Seul : +1m20', image: 'https://i.postimg.cc/gkPQRbSb/images-(1).jpg', isOpen: true, horaires: '10h30 - 18h00', numeroPlan: '25' },
  { id: '26', name: "L'Antre du Cyclope", zone: "Le monde d'Elios", type: 'Sensations', restrictions: 'Attraction à sensations - Respecter les consignes à l’entrée', image: 'https://i.postimg.cc/tgHsGTD7/images-(5).jpg', isOpen: true, horaires: '12h00 - 18h00', numeroPlan: '24' },
];

export const POINTS_DE_VENTE: PointDeVente[] = [
  { id: 'pv1', name: 'Le Rabbit Burger', zone: 'Le Bayou', type: 'Restauration rapide & Burgers', isOpen: true, horaires: '11h30 - 15h30', numeroPlan: 'A' },
  { id: 'pv2', name: 'Le Bar', zone: 'Le Bayou', type: 'Glaces, boissons fraiches et gaufre', isOpen: true, horaires: '11h00 - 18h00', numeroPlan: 'B' },
  { id: 'pv3', name: 'Le 4H', zone: 'Le Bayou', type: 'Glaces et boissons fraiches', isOpen: true, horaires: '14h00 - 18h00', numeroPlan: 'C' },
  { id: 'pv4', name: 'Le Magnus', zone: "Le monde d'Elios", type: 'Panini, sandwich, salade, glaces et boissons fraiches', isOpen: true, horaires: '11h30 - 15h30', numeroPlan: 'D' },
  { id: 'pv5', name: 'La Crêperie', zone: "Le monde d'Elios", type: 'Crêpes, gaufres et gourmandises', isOpen: true, horaires: '12h00 - 18h00', numeroPlan: 'E' },
  { id: 'pv6', name: 'La Boutique', zone: 'Carotte Ville', type: 'Souvenirs & Cadeaux', isOpen: true, horaires: '10h00 - 18h00', numeroPlan: 'F' },
];

export const EVENEMENTS_INITIAL: Evenement[] = [
  { id: 'e1', title: "Feu d'artifice", location: 'Zone scénique', time: '18h30' },
  { id: 'e2', title: 'Rencontre avec Fleurby et Fleurbel', location: 'Cabane de Fleurby', time: '14h00' },
  { id: 'e3', title: 'Soupes des deux Sorcières', location: 'Cabane de Fleurby', time: '16h00' },
];