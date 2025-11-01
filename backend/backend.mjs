import PocketBase from "pocketbase";
const pb = new PocketBase("http://127.0.0.1:8090/");

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
    record.img = pb.files.getURL(record, record.cover);
    return record;
  } catch (error) {
    console.log("Une erreur est survenue en lisant le projet", error);
    return null;
  }
}
