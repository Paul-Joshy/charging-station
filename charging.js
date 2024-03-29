// program to calculate number of vehicles not charged in a charging station

function getUnchargedVehicles(history, chargingPoints){
  let remainingPoints = chargingPoints;
  let EVHashmap = {};
  let priorityQueue = [];
  let unchargedValue = 0;


  if(!history.length || history[0] === ""){
    return 0;
  }

  history.map(v => {

      // handle priority vehicles
      if(priorityQueue.length){
        if(remainingPoints > 0){
          let pv = priorityQueue.shift();
          EVHashmap[pv].state = "charging";
          remainingPoints--;
        }
      }
    //  handle vehicle leaving
    if(EVHashmap[v] && EVHashmap[v].state && EVHashmap[v].state !== "leaving"){
      switch (EVHashmap[v].state) {
        case "charging":{
          remainingPoints++;
          EVHashmap[v].state = "leaving";
          unchargedValue--;
          break;
        }
        case "waiting":{
          EVHashmap[v].state = "leaving";
          priorityQueue.shift();
        }
        default:
          break;
      }
    }

    else{

      // handle vehicle entry
      if(remainingPoints > 0){
        EVHashmap[v] = {state: "charging"};
        remainingPoints--;
        unchargedValue++;
      }

      // handle waiting vehicles
      else{
        EVHashmap[v] = {state: "waiting"};
        priorityQueue.push(v);
        unchargedValue++;
      }
    }

  })

  return unchargedValue;
};

const input = [ "A", "B", "A", "C", "B", "D", "C", "D"];
console.log(getUnchargedVehicles(input, 2));
