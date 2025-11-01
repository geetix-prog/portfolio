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
