import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { ATTRACTIONS_FLEURY, POINTS_DE_VENTE, EVENEMENTS_INITIAL } from '../constants/fleuryData';

export async function importerToutesLesDonnees() {
  try {
    console.log("🚀 Début de l'importation dans Firebase...");

    // 1. Importation des Attractions
    for (const item of ATTRACTIONS_FLEURY) {
      await setDoc(doc(db, "attractions", item.id), {
        nom: item.name,
        zone: item.zone,
        type: item.type,
        restrictions: item.restrictions,
        image: item.image,
        isOpen: item.isOpen,
        horaires: item.horaires || "10h00 - 18h00",
        attente: "10 min",
        numeroPlan: item.numeroPlan
      });
    }
    console.log("✅ Attractions importées !");

    // 2. Importation des Points de Vente
    for (const item of POINTS_DE_VENTE) {
      await setDoc(doc(db, "points_de_vente", item.id), {
        nom: item.name,
        zone: item.zone,
        type: item.type,
        isOpen: item.isOpen,
        horaires: item.horaires || "11h00 - 18h00",
        lettre: item.numeroPlan || ""
      });
    }
    console.log("✅ Points de vente importés !");

    // 3. Importation des Événements
    for (const item of EVENEMENTS_INITIAL) {
      await setDoc(doc(db, "evenements", item.id), {
        titre: item.title,
        heure: `${item.time} - ${item.location}`
      });
    }
    console.log("✅ Événements importés !");

    alert("🎉 Importation de toutes vos données réussie avec succès dans Firebase !");
  } catch (error) {
    console.error("❌ Erreur lors de l'importation : ", error);
    alert("Erreur : " + error.message);
  }
}