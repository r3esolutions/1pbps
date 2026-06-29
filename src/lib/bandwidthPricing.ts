export function getBandwidthPrice(speed:number){

  if(speed <= 100){
    return 0;
  }

  return (speed - 100) * 0.60;
}
