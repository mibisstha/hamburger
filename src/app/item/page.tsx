"use client";
import { useEffect, useState } from "react";

type Row = { id: string } & Record<string, any>;

export default function ItemPage(){
  const [rows,setRows]=useState<Row[]>([]);
  const [draft,setDraft]=useState<Record<string,any>>({});
  const base="/api/item";

  const refresh=async()=>setRows(await (await fetch(base)).json());
  useEffect(()=>{refresh();},[]);

  const create=async()=>{ await fetch(base,{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify(draft)}); setDraft({}); await refresh(); }
  const update=async(id:string)=>{ await fetch(`${base}/${id}`,{method:"PUT",headers:{'Content-Type':'application/json'},body:JSON.stringify(draft)}); setDraft({}); await refresh(); }
  const remove=async(id:string)=>{ await fetch(`${base}/${id}`,{method:"DELETE"}); await refresh(); }

  return (<main className="p-6 space-y-4">
    <h1 className="text-2xl font-bold">Item (Prisma CRUD)</h1>
    <pre className="text-xs opacity-70">Draft: {JSON.stringify(draft)}</pre>
    <div className="flex gap-2">
      <input className="border p-2 rounded" placeholder="field=value" onKeyDown={e=>{
        if(e.key==='Enter'){
          const [k,...rest]=(e.target as HTMLInputElement).value.split("=");
          setDraft(d=>({...d,[k]:rest.join("=")}));
          (e.target as HTMLInputElement).value="";
        }
      }}/>
      <button className="border rounded px-3 py-2" onClick={create}>Create</button>
    </div>
    <ul className="space-y-2">
      {rows.map(r=>(
        <li key={r.id} className="border rounded p-3 flex items-center gap-2">
          <code className="text-xs flex-1 overflow-x-auto">{JSON.stringify(r)}</code>
          <button className="border px-2 py-1 rounded" onClick={()=>update(r.id)}>Update</button>
          <button className="border px-2 py-1 rounded" onClick={()=>remove(r.id)}>Delete</button>
        </li>
      ))}
    </ul>
  </main>);
}