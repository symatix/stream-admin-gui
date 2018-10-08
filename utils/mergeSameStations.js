
module.exports = function(arr){

   let mergedArr = arr.sort(function(a, b){
      if(a["station"] < b["station"]) return -1;
      if(a["station"] > b["station"]) return 1;
      return 0;
   })

   for (let i = 0; i < mergedArr.length; i++){
      let j = i < mergedArr.length - 1 ? i + 1 : 0;

      const aStation = mergedArr[i].station.split(" ")[0];
      const bStation = mergedArr[j].station.split(" ")[0];
      if (aStation === bStation){
         mergedArr[i].station = aStation;
         mergedArr[i].current_listeners = mergedArr[i].current_listeners + mergedArr[j].current_listeners;
         mergedArr[i].unique_listeners = mergedArr[i].unique_listeners + mergedArr[j].unique_listeners;

         mergedArr[i].current_song = mergedArr[i].current_song !== "[no data]" 
            ? mergedArr[i].current_song 
            : mergedArr[j].current_song;

         mergedArr[i].bitrate = mergedArr[i].bitrate > mergedArr[j].bitrate
            ? mergedArr[i].bitrate
            : mergedArr[j].bitrate;

         mergedArr.splice(j, 1)
         i = i > 2  ? i = i - 2 : 0;
      }
   }
   return mergedArr
}

