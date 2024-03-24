import { db } from "@/db";

export default async function Home() {

  const items = await db.query.users.findMany();

  return (
    <main className="flex p-40">
      Hello
      {items.map(item => {
        return <div key={item.id}>
          {item.name}
        </div>
      })}
    </main>
  );
}
