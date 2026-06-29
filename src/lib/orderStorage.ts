export function saveOrder(data:any){
  if(typeof window !== "undefined"){
    localStorage.setItem(
      "serverOrder",
      JSON.stringify(data)
    );
  }
}

export function getOrder(){
  if(typeof window !== "undefined"){
    const data =
      localStorage.getItem("serverOrder");

    return data
      ? JSON.parse(data)
      : null;
  }

  return null;
}
