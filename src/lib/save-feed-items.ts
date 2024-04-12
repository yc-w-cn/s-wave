import { generateHash } from "@/utils";

export async function saveFeedItems(db: PouchDB.Database, items:any[]){
  const docs: any[] = []
  for(const item of items){
    docs.push({
      _id: await generateHash(item.guid),
      ...item,
    })
  }
  return db.bulkDocs(docs);
}