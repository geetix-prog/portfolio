import pb from "../src/utils/pb.ts";

export async function allCompetences() {
  try {
    let record = await pb.collection("logiciels").getFullList({
      sort: "nom",
    });
    record = record.map((logiciel) => {
      logiciel.img = pb.files.getURL(logiciel, logiciel.logo);
      return logiciel;
    });
    return record;
  } catch (error) {
    console.log(
      "Une erreur est survenue en lisant la liste des compétences",
      error
    );
    return [];
  }
}

export async function allProjets() {
  try {
    let record = await pb.collection("projets").getFullList({
      sort: "titre",
    });
    record = record.map((projets) => {
      projets.img = pb.files.getURL(projets, projets.cover);
      return projets;
    });
    return record;
  } catch (error) {
    console.log(
      "Une erreur est survenue en lisant la liste des compétences",
      error
    );
    return [];
  }
}

export async function getProjet(id) {
  try {
    let record = await pb.collection("projets").getOne(id);
    record.cover = pb.files.getURL(record, record.cover);
    record.visuels = pb.files.getURL(record, record.visuels);
    record.galerie = pb.files.getURL(record, record.galerie);
    record.moodboard = pb.files.getURL(record, record.moodboard);
    
    if (record.competence && record.competence.length > 0) {
      const competencesDetails = await Promise.all(
        record.competence.map(async (competenceId) => {
          try {
            const logiciel = await pb.collection("logiciels").getOne(competenceId);
            return {
              id: logiciel.id,
              nom: logiciel.nom,
              logo: pb.files.getURL(logiciel, logiciel.logo)
            };
          } catch (error) {
            console.log(`Erreur lors de la récupération de la compétence ${competenceId}`, error);
            return null;
          }
        })
      );
      record.competences = competencesDetails.filter(c => c !== null);
    } else {
      record.competences = [];
    }
    
    return record;
  } catch (error) {
    console.log("Une erreur est survenue en lisant le projet", error);
    return null;
  }
}

export async function createContact(data) {
  try {
    const record = await pb.collection("contacts").create(data);
    return { success: true, record };
  } catch (error) {
    console.log("Une erreur est survenue lors de la création du contact", error);
    return { success: false, error: error.message };
  }
}
